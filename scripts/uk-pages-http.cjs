/** HTTP smoke test (not a substitute for hydrated browser QA).
 * node scripts/uk-pages-http.cjs https://www.tigertest.io /tmp/uk-http.json
 * Sends only GET requests, with UK country cookies. */
const fs = require("node:fs");
const { manifest } = require("./uk-pages-manifest.cjs");
const { htmlAuditText, htmlAuditTitle } = require("./uk-pages-text.cjs");
const base = process.argv[2] || "http://127.0.0.1:3100";
const output = process.argv[3] || "/tmp/uk-pages-http.json";
const american =
  /\b(?:color(?:s|ed|ing)?|behavior(?:s|al)?|center(?:s|ed)?|analyz(?:e|es|ed|ing)|organiz(?:e|es|ed|ing|ation|ations)|memor(?:ize|ized|izing)|customiz(?:e|ed|ing)|personaliz(?:e|ed|ing)|favorite(?:s)?|math|diaper(?:s)?|sidewalk(?:s)?|gasoline)\b/gi;
const queue = manifest().routes.slice();
const rows = [];
async function worker() {
  while (queue.length) {
    const r = queue.shift();
    try {
      const res = await fetch(base + r.path, {
        headers: {
          Cookie: "tt-region=UK; tt-region-src=chosen; tt-consent=declined",
        },
        signal: AbortSignal.timeout(90000),
      });
      const html = await res.text();
      const text = htmlAuditText(html);
      rows.push({
        ...r,
        status: res.status,
        url: res.url,
        bytes: html.length,
        title: htmlAuditTitle(html),
        american: [...new Set(text.match(american) || [])],
        error:
          res.status >= 400 ||
          /Application error:|Internal Server Error/.test(text),
        text:
          r.kind === "landing" || r.kind === "home" || r.kind === "shared"
            ? text
            : undefined,
      });
    } catch (e) {
      rows.push({ ...r, error: String(e) });
    }
    if (rows.length % 25 === 0) console.log(`${rows.length} routes checked`);
  }
}
(async () => {
  await Promise.all(
    Array.from({ length: Number(process.env.UK_HTTP_WORKERS || 4) }, worker),
  );
  rows.sort((a, b) => a.path.localeCompare(b.path));
  fs.writeFileSync(
    output,
    JSON.stringify(
      {
        base,
        checkedAt: new Date().toISOString(),
        total: rows.length,
        failures: rows.filter((r) => r.error),
        rows,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      {
        total: rows.length,
        failures: rows.filter((r) => r.error),
        american: rows
          .filter((r) => r.american?.length)
          .map((r) => ({ path: r.path, words: r.american })),
        output,
      },
      null,
      2,
    ),
  );
  process.exitCode = rows.some((r) => r.error) ? 1 : 0;
})();
