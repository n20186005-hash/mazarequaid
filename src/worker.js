import server from '@astrojs/cloudflare/entrypoints/server';
const canonicalHost = 'mazarequaid.com';
/** @param {Request} request @param {any} env @param {any} context */
export async function route(request, env, context, delegate = server) {
  const url = new URL(request.url);
  if (url.hostname === 'www.' + canonicalHost || (url.hostname === canonicalHost && url.protocol === 'http:')) {
    url.hostname = canonicalHost; url.protocol = 'https:';
    return new Response(null, {status:308, headers:{Location:url.href}});
  }
  const head = request.method === 'HEAD';
  if ((request.method === 'GET' || head) && ['/index','/index.html','/en/index','/en/index.html'].includes(url.pathname)) {
    url.pathname = url.pathname.startsWith('/en/') ? '/en/' : '/'; return new Response(null,{status:308,headers:{Location:url.href}});
  }
  const errorAlias = /^\/(?:(?:en)\/)?404(?:\/|\.html)?$/.test(url.pathname);
  const language = url.pathname.split('/')[1];
  const errorPath = ['en'].includes(language) ? `/${language}/404` : '/404';
  const effective = errorAlias ? new Request(new URL(errorPath,url),{method:'GET'}) : request;
  let response = await delegate.fetch(effective, env, context);
  if (errorAlias || response.status === 404) {
    if (!errorAlias) response = await delegate.fetch(new Request(new URL(errorPath,url),{method:'GET'}),env,context);
    const headers = new Headers(response.headers); headers.delete('Location'); headers.set('X-Robots-Tag','noindex'); headers.set('Cache-Control','no-store');
    return new Response(head ? null : response.body,{status:404,headers});
  }
  return head ? new Response(null,{status:response.status,headers:response.headers}) : response;
}
export default { fetch: route };
