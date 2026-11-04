import Anthropic from '@anthropic-ai/sdk';
import { MENTIONS_SINCE } from '@/lib/webMentionsSince';

// Web mentions for the daily update (lib/server/dailyBrief): Claude searches
// the web for people talking about Tigertest (Reddit, forums, blogs, news,
// school sites) since the search homepage launched, and returns each link it
// can confirm. The list is merged with the previous update's, so a link stays
// on the card and only links not seen before count as new.

const MAX_KEPT = 15;

export interface WebMention {
  url: string;
  site: string;
  /** YYYY-MM-DD as the page shows it, or '' when it shows none. */
  date: string;
  summary: string;
  /** Not in the previous update's list. */
  isNew: boolean;
}

const SYSTEM = `You search the web for places where people talk about Tigertest (tigertest.io), a site of free practice tests: DMV permit tests, CDL, nursing, IT certifications, citizenship, school and job exams in many countries. It was made by John Brophy.

Find posts, comments, threads, articles, videos and pages that mention Tigertest or link to tigertest.io: Reddit, Quora, forums, Facebook groups, X, YouTube, TikTok, blogs, news, school or course pages, app and tool directories, AI tool lists. Search with several phrasings ("tigertest", "tigertest.io", "tiger test practice test", "tigertest dmv", "tigertest reddit", site:reddit.com tigertest, and so on).

Only include a page when you saw it in the results and it is clearly about this Tigertest. Leave out other things named Tiger Test or TigerTest (software testing tools, medical or animal tests, sports), pages on tigertest.io itself, and pages published before ${MENTIONS_SINCE}. When a page shows no date, include it only if the result suggests it is recent, with the date left blank. Never invent a URL.

Answer with one line per page and nothing else, in this form:
URL | site name | YYYY-MM-DD or blank | what it says about Tigertest, at most 20 words
If you find nothing, answer exactly: NONE`;

/** Parses "URL | site | date | summary" lines; anything else is dropped. */
export function parseMentions(text: string): Omit<WebMention, 'isNew'>[] {
  const out: Omit<WebMention, 'isNew'>[] = [];
  for (const raw of text.split('\n')) {
    const parts = raw.replace(/^[-•*\d.)\s]+(?=https?:)/, '').split('|').map((s) => s.trim());
    if (parts.length < 4 || !/^https?:\/\/\S+$/.test(parts[0])) continue;
    let host = '';
    try {
      host = new URL(parts[0]).hostname.replace(/^www\./, '');
    } catch {
      continue;
    }
    if (host === 'tigertest.io' || host.endsWith('.tigertest.io')) continue;
    const date = /^\d{4}-\d{2}-\d{2}$/.test(parts[2]) ? parts[2] : '';
    if (date && date < MENTIONS_SINCE) continue;
    out.push({ url: parts[0], site: parts[1] || host, date, summary: parts.slice(3).join(' | ').replace(/\*\*/g, '') });
  }
  return out;
}

/** Normalised for de-duplication: no protocol, www, query or trailing slash. */
function urlKey(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname.replace(/^www\./, '')}${u.pathname.replace(/\/+$/, '')}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/** Today's finds plus the previous list, newest first, new ones marked. */
export function mergeMentions(found: Omit<WebMention, 'isNew'>[], previous: WebMention[]): WebMention[] {
  const seen = new Set(previous.map((m) => urlKey(m.url)));
  const byKey = new Map<string, WebMention>();
  for (const m of found) {
    const key = urlKey(m.url);
    if (!byKey.has(key)) byKey.set(key, { ...m, isNew: !seen.has(key) });
  }
  for (const m of previous) {
    const key = urlKey(m.url);
    if (!byKey.has(key)) byKey.set(key, { ...m, isNew: false });
  }
  return [...byKey.values()]
    .sort((a, b) => Number(b.isNew) - Number(a.isNew) || (b.date || '').localeCompare(a.date || ''))
    .slice(0, MAX_KEPT);
}

/** Searches the web. Throws when the key is missing or the model declines. */
export async function searchMentions(model: string, today: string): Promise<Omit<WebMention, 'isNew'>[]> {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');
  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = [
    { role: 'user', content: `Today is ${today}. Find everything people have posted about Tigertest since ${MENTIONS_SINCE}.` },
  ];
  // A long search can pause the server's loop; resume it a few times.
  for (let i = 0; i < 4; i++) {
    const response = await client.beta.messages.create({
      model,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low' },
      system: SYSTEM,
      tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 8, blocked_domains: ['tigertest.io'] }],
      messages,
    });
    if (response.stop_reason === 'refusal') {
      throw new Error(`Claude declined the web search (${response.stop_details?.category ?? 'no category'})`);
    }
    if (response.stop_reason === 'pause_turn') {
      messages.push({ role: 'assistant', content: response.content });
      continue;
    }
    const text = response.content.flatMap((b) => (b.type === 'text' ? [b.text] : [])).join('');
    return parseMentions(text);
  }
  throw new Error('Web search did not finish');
}
