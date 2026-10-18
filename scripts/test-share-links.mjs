import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../worker.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../share.html', import.meta.url), 'utf8');
const code = 'aB7kP2cD8mN4qR6s';
const endpoint = 'https://example.supabase.co/functions/v1/share-mix';
const assets = [];
const requests = [];
let status = 200;
let fail = false;
const context = vm.createContext({
  URL, Request, Response, Headers, AbortSignal,
  fetch: async (url, options) => {
    requests.push({ url: new URL(url), options });
    if (fail) throw new Error('offline');
    return new Response(options.method === 'HEAD' ? null : JSON.stringify({ success: true }), { status });
  },
});
vm.runInContext(source.replace('export default', 'globalThis.worker ='), context);
const env = {
  SHARE_MIX_FUNCTION_URL: endpoint,
  ASSETS: { fetch: async (request) => {
    const url = new URL(request.url);
    assets.push(url);
    return new Response(url.pathname === '/share.html' ? html : 'asset', { status: url.pathname === '/s/bad' ? 404 : 200 });
  } },
};
const fetchPath = (path, init) => context.worker.fetch(new Request(`https://get-mixly.app${path}`, init), env);

const shared = await fetchPath(`/s/${code}?preview=1`);
assert.equal(shared.status, 200);
assert.equal(assets.at(-1).pathname, '/share.html');
assert.match(await shared.text(), /Loading shared mix/);
assert.equal(shared.headers.get('Cache-Control'), 'no-store');
assert.equal(shared.headers.get('Referrer-Policy'), 'no-referrer');
assert.equal(shared.headers.get('X-Robots-Tag'), 'noindex, nofollow');
await fetchPath(`/s/${code}/`);
assert.equal(assets.at(-1).pathname, '/share.html');
assert.equal((await fetchPath('/s/bad')).status, 404);

const publicRead = await fetchPath(`/api/shared-mixes/${code}?target=https://evil.example`, { headers: { Authorization: 'Bearer private-user', Cookie: 'private-cookie' } });
assert.equal(publicRead.status, 200);
assert.equal(publicRead.headers.get('Cache-Control'), 'no-store');
assert.equal(requests.at(-1).url.origin, 'https://example.supabase.co');
assert.equal(requests.at(-1).url.search, `?code=${code}`);
assert.deepEqual(Object.keys(requests.at(-1).options.headers), ['Accept']);
assert.equal(requests.at(-1).options.redirect, 'error');
assert.equal((await fetchPath(`/api/shared-mixes/${code}`, { method: 'HEAD' })).status, 200);
assert.equal(requests.at(-1).options.method, 'HEAD');
const count = requests.length;
assert.equal((await fetchPath(`/api/shared-mixes/${code}`, { method: 'POST' })).status, 405);
assert.equal(requests.length, count);
status = 404;
assert.equal((await fetchPath(`/api/shared-mixes/${code}`)).status, 404);
fail = true;
assert.equal((await fetchPath(`/api/shared-mixes/${code}`)).status, 503);

await fetchPath('/share.html?mix=mix_42');
assert.equal(assets.at(-1).search, '?mix=mix_42');
await fetchPath('/share?lab=legacy');
assert.equal(assets.at(-1).pathname, '/share.html');
await fetchPath('/blog');
assert.equal(assets.at(-1).pathname, '/blog.html');
console.log('Production-based share route regression passed');
