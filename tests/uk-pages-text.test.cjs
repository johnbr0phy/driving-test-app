const { test } = require("node:test");
const assert = require("node:assert/strict");
const { htmlAuditText, htmlAuditTitle } = require("../scripts/uk-pages-text.cjs");

test("audit text preserves nested page copy and separates adjacent elements", () => {
  assert.equal(
    htmlAuditText(
      "<main><h1>Start <b>practising</b></h1><p>British\n English</p></main>",
    ),
    "Start practising British English",
  );
});

test("audit text excludes comments, scripts and styles case-insensitively", () => {
  const html =
    '<p>Before</p><!-- <p>hidden</p> --><ScRiPt type="module">if (a < b) { document.write("<p>color</p>"); }</sCrIpT><STYLE>.color{}</STYLE><p>After</p>';
  assert.equal(htmlAuditText(html), "Before After");
});

test("quoted angle brackets and event attributes never become audit copy", () => {
  assert.equal(
    htmlAuditText(
      '<p title="> color" data-x=\'<script>hidden</script>\' onclick="evil()">Visible</p>',
    ),
    "Visible",
  );
});

test("raw text ends only on its matching complete tag name", () => {
  assert.equal(
    htmlAuditText(
      "<script>hidden</scripture>also hidden</script><p>Visible</p>",
    ),
    "Visible",
  );
  assert.equal(
    htmlAuditText("<style>hidden</stylesheet>hidden</style >Visible"),
    "Visible",
  );
  assert.equal(
    htmlAuditText("<script/>hidden<p>still hidden</p></script>Visible"),
    "Visible",
  );
});

test("truncated comments, raw text and quoted tags are conservatively discarded", () => {
  for (const suffix of [
    "<!-- hidden",
    "<script>hidden",
    "<style>hidden",
    '<p title="unterminated>hidden',
  ]) {
    assert.equal(htmlAuditText("Visible" + suffix), "Visible");
  }
});

test("adversarial nested markup cannot reconstruct an executable tag", () => {
  const inputs = [
    "<scr<script>ipt>alert(1)</scr</script>ipt>",
    "<<img src=x onerror=evil()>>",
    "<!--><script>hidden</script>",
    "<!DOCTYPE html><div><svg><style>hidden</style></svg>Visible</div>",
    "&lt;script&gt;encoded example&lt;/script&gt;",
    "2 < 3 and 5 > 4",
  ];
  for (const input of inputs) {
    const text = htmlAuditText(input);
    assert.doesNotMatch(text, /[<>]/);
    assert.equal(htmlAuditText(text), text);
  }
  assert.equal(
    htmlAuditText(inputs[4]),
    inputs[4],
    "entities are not decoded into markup",
  );
});

test("long malformed input terminates without recursive parsing", () => {
  const text = htmlAuditText(
    "<".repeat(100000) + "<script>" + "x".repeat(100000),
  );
  assert.equal(text, "");
});

test("Unicode copy does not shift tag offsets during case folding", () => {
  assert.equal(
    htmlAuditText("İstanbul <SCRIPT>hidden</SCRIPT><p>Visible</p>"),
    "İstanbul Visible",
  );
});

test("audit title uses a bounded case-insensitive scan and returns only text", () => {
  assert.equal(htmlAuditTitle("<TITLE>UK <b>Practice</b> &amp; Tests</TITLE>"), "UK Practice &amp; Tests");
  assert.equal(htmlAuditTitle("<p>No title</p>"), undefined);
  assert.equal(htmlAuditTitle("<title>Unclosed"), undefined);
});

test("repeated unclosed title tags do not trigger repeated suffix scans", () => {
  assert.equal(htmlAuditTitle("<title>".repeat(100000)), undefined);
});
