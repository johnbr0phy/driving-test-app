/**
 * Extract plain text for the HTTP audit, never HTML for insertion into a page.
 * This deliberately conservative, linear tokenizer ignores comments, tags and
 * script/style raw text. It leaves entities encoded and never emits literal
 * angle brackets. It is not a general-purpose HTML sanitizer or DOM parser.
 */
function htmlAuditText(html) {
  // Fold ASCII tag names only: Unicode case folding can change string length.
  const lower = html.replace(/[A-Z]/g, (char) => char.toLowerCase());
  const pieces = [];
  let index = 0;
  let rawText = null;

  const isLetter = (char) => char >= "a" && char <= "z";
  const isNameChar = (char) =>
    isLetter(char) ||
    (char >= "0" && char <= "9") ||
    char === ":" ||
    char === "-";
  const isSpace = (char) =>
    char === " " ||
    char === "\t" ||
    char === "\r" ||
    char === "\n" ||
    char === "\f";

  // Consume one tag, respecting quoted attributes, even on malformed input.
  function tagEnd(start) {
    let quote = null;
    for (let cursor = start; cursor < html.length; cursor++) {
      const char = html[cursor];
      if (quote) {
        if (char === quote) quote = null;
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === ">") {
        return cursor + 1;
      }
    }
    return html.length;
  }

  while (index < html.length) {
    if (rawText) {
      const close = `</${rawText}`;
      if (lower.startsWith(close, index)) {
        const boundary = lower[index + close.length];
        if (boundary === ">" || boundary === "/" || isSpace(boundary)) {
          index = tagEnd(index + close.length);
          rawText = null;
          pieces.push(" ");
          continue;
        }
      }
      index++;
      continue;
    }

    if (html.startsWith("<!--", index)) {
      const end = html.indexOf("-->", index + 4);
      index = end === -1 ? html.length : end + 3;
      pieces.push(" ");
      continue;
    }

    if (html[index] === "<") {
      let cursor = index + 1;
      const closing = html[cursor] === "/";
      if (closing) cursor++;
      if (isLetter(lower[cursor])) {
        const nameStart = cursor;
        while (isNameChar(lower[cursor])) cursor++;
        const name = lower.slice(nameStart, cursor);
        index = tagEnd(cursor);
        // In HTML a self-closing slash does not end script/style raw text.
        if (!closing && (name === "script" || name === "style")) rawText = name;
      } else if (html[cursor] === "!" || html[cursor] === "?") {
        index = tagEnd(cursor + 1);
      } else {
        index++;
      }
      pieces.push(" ");
      continue;
    }

    if (html[index] === ">") {
      pieces.push(" ");
      index++;
      continue;
    }

    const start = index;
    while (index < html.length && html[index] !== "<" && html[index] !== ">")
      index++;
    pieces.push(html.slice(start, index));
  }

  return pieces.join("").replace(/\s+/g, " ").trim();
}

/** Next's document title, using bounded scans rather than a lazy-match regex. */
function htmlAuditTitle(html) {
  const lower = html.replace(/[A-Z]/g, (char) => char.toLowerCase());
  const start = lower.indexOf("<title>");
  if (start === -1) return undefined;
  const end = lower.indexOf("</title>", start + 7);
  return end === -1 ? undefined : htmlAuditText(html.slice(start + 7, end));
}

module.exports = { htmlAuditText, htmlAuditTitle };
