import { mintAccessToken } from '@/lib/server/mcp-auth';
const uid = process.argv[2];
if (!uid) { console.error('usage: mint-mcp-token <uid>'); process.exit(1); }
console.log(mintAccessToken(uid));
