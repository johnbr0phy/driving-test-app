import { readFile } from "fs/promises";
import { join } from "path";

/**
 * Reads a tiger face for an OG image as a PNG data URI, from the small copies
 * in assets/og-tigers/ (built by `node scripts/build-og-tigers.mjs`), never
 * from public/tigers/, which is too big to trace into a function.
 *
 * Takes the public path that getTigerAsset() / getTigerFace() return:
 *   /tigers/<set>/tiger_face_NN.png -> assets/og-tigers/<set>/tiger_face_NN.png
 *   /tiger_face_NN.png              -> assets/og-tigers/site/tiger_face_NN.png
 */
export async function readOgTiger(publicPath: string): Promise<string> {
  const set = publicPath.match(/^\/tigers\/([a-z0-9]+)\/(tiger_face_0[1-8]\.png)$/);
  const site = publicPath.match(/^\/(tiger_face_0[1-8]\.png)$/);
  const file = set
    ? join(process.cwd(), "assets/og-tigers", set[1], set[2])
    : site
      ? join(process.cwd(), "assets/og-tigers/site", site[1])
      : null;
  if (!file) throw new Error(`No OG copy for tiger asset ${publicPath}`);
  return `data:image/png;base64,${(await readFile(file)).toString("base64")}`;
}
