// Which redirect URIs an MCP OAuth client may register. Anyone can register a
// client, and the consent page sends the browser to this URI with the
// authorization code, so a script URL here would run on our origin and a plain
// http URL would leak the code. Allowed: https, http on the loopback interface
// (desktop clients), and an app's own scheme (cursor://, vscode://).

const BLOCKED_SCHEMES = new Set([
  "javascript:",
  "data:",
  "vbscript:",
  "file:",
  "blob:",
  "about:",
  "ws:",
  "wss:",
  "ftp:",
]);

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function isAllowedRedirectUri(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2000) return false;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol === "https:") return true;
  if (url.protocol === "http:") return LOOPBACK_HOSTS.has(url.hostname);
  return !BLOCKED_SCHEMES.has(url.protocol);
}

// What the consent screen shows as "where you will be sent": the host for a
// web address, the scheme for an app link.
export function redirectTarget(uri: string): string {
  try {
    const url = new URL(uri);
    return url.protocol === "https:" || url.protocol === "http:" ? url.host : url.protocol + "//";
  } catch {
    return "";
  }
}
