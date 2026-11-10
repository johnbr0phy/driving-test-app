#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
cmp ../../firestore.email-release.rules firestore.email-release.rules || {
  echo 'Candidate changed. Copy the current root rules into this fixture and rerun.' >&2
  exit 1
}
export JAVA_TOOL_OPTIONS="-Xms128m -Xmx512m -XX:ActiveProcessorCount=2"
export CI=1
npx --no-install firebase emulators:exec --only firestore --project demo-email-rules "node acceptance.mjs"
