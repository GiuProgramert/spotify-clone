import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_iRypMpif.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/giu/dev/misc/spotify-clone/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/get-info-playlist.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-info-playlist\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-info-playlist.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-info-playlist.json.ts","pathname":"/api/get-info-playlist.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BScVxmeO.js"}],"styles":[{"type":"external","src":"/_astro/index.UyyBhzIa.css"}],"routeData":{"route":"/playlist/[id]","isIndex":false,"type":"page","pattern":"^\\/playlist\\/([^/]+?)\\/?$","segments":[[{"content":"playlist","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/playlist/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BScVxmeO.js"}],"styles":[{"type":"external","src":"/_astro/index.UyyBhzIa.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/giu/dev/misc/spotify-clone/src/pages/playlist/[id].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/playlist/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/giu/dev/misc/spotify-clone/src/components/PlayListItemCard.astro",{"propagation":"in-tree","containsHead":false}],["/home/giu/dev/misc/spotify-clone/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/giu/dev/misc/spotify-clone/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/get-info-playlist.json@_@ts":"pages/api/get-info-playlist.json.astro.mjs","\u0000@astro-page:src/pages/playlist/[id]@_@astro":"pages/playlist/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_grBvoN50.mjs","@astrojs/svelte/client.js":"_astro/client.CWY0IrnN.js","/astro/hoisted.js?q=0":"_astro/hoisted.BScVxmeO.js","@astrojs/react/client.js":"_astro/client.cJJlVZJi.js","@/components/CardPlayButton":"_astro/CardPlayButton.D9txWFHk.js","@/components/Player":"_astro/Player.CADhOQYW.js","/home/giu/dev/misc/spotify-clone/src/components/CardPlayButton":"_astro/CardPlayButton.BG4lZZV3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.UyyBhzIa.css","/favicon.svg","/_astro/CardPlayButton.BG4lZZV3.js","/_astro/CardPlayButton.D9txWFHk.js","/_astro/Player.CADhOQYW.js","/_astro/Player.dQ6ea467.js","/_astro/client.CWY0IrnN.js","/_astro/client.cJJlVZJi.js","/_astro/hoisted.BScVxmeO.js","/_astro/index.Gi7JMEER.js","/fonts/CircularStd-Black.woff2","/fonts/CircularStd-Bold.woff2","/fonts/CircularStd-Book.woff2","/fonts/CircularStd-Light.woff2","/fonts/CircularStd-Medium.woff2","/screenshots/index.png","/screenshots/playlist.png","/music/1/01.mp3","/music/1/02.mp3","/music/1/03.mp3","/music/1/04.mp3","/music/1/05.mp3","/music/3/01.mp3","/music/3/02.mp3","/music/3/03.mp3","/music/3/04.mp3","/music/3/05.mp3","/music/2/01.mp3","/music/2/02.mp3","/music/2/03.mp3","/music/2/04.mp3","/music/2/05.mp3","/music/4/01.mp3","/music/4/02.mp3","/music/4/03.mp3","/music/4/04.mp3","/music/4/05.mp3","/music/5/01.mp3","/music/5/02.mp3","/music/5/03.mp3","/music/5/04.mp3","/music/5/05.mp3","/music/6/01.mp3","/music/6/02.mp3","/music/6/03.mp3","/music/6/04.mp3","/music/6/05.mp3"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"fTTwIp8kqbVQ9KC82L5TZPWREj5C/xcofAvHCDhvcRs=","experimentalEnvGetSecretEnabled":false});

export { manifest };
