(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__1ept8q0._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/frontend/src/lib/admin-auth.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Sessions are issued by the backend; here we only verify the signed cookie
// so the middleware can redirect signed-out visitors. Both apps must share
// the same ADMIN_SESSION_SECRET. Web Crypto so this runs on the edge.
__turbopack_context__.s([
    "ADMIN_SESSION_COOKIE",
    ()=>ADMIN_SESSION_COOKIE,
    "isSessionTokenValid",
    ()=>isSessionTokenValid
]);
const ADMIN_SESSION_COOKIE = "methmi_admin_session";
const DEFAULT_SECRET = "methmi-dev-only-secret-change-me";
function getSecret() {
    return process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
}
function bufferToHex(buf) {
    return Array.from(new Uint8Array(buf)).map((b)=>b.toString(16).padStart(2, "0")).join("");
}
async function hmacHex(secret, message) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
    }, false, [
        "sign"
    ]);
    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
    return bufferToHex(signature);
}
async function isSessionTokenValid(token) {
    if (!token) return false;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;
    const expected = await hmacHex(getSecret(), payload);
    if (expected.length !== signature.length) return false;
    // Constant-time-ish comparison.
    let mismatch = 0;
    for(let i = 0; i < expected.length; i += 1){
        mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    if (mismatch !== 0) return false;
    const expiresAt = Number(payload);
    if (Number.isNaN(expiresAt) || Date.now() > expiresAt) return false;
    return true;
}
}),
"[project]/frontend/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$admin$2d$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/admin-auth.ts [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    const { pathname } = request.nextUrl;
    const isLoginPage = pathname === "/admin/login";
    const isLoginApi = pathname === "/api/admin/login";
    const isProtectedPage = pathname.startsWith("/admin") && !isLoginPage;
    const isProtectedApi = pathname.startsWith("/api/admin") && !isLoginApi;
    if (!isProtectedPage && !isProtectedApi) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const token = request.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$admin$2d$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ADMIN_SESSION_COOKIE"])?.value;
    const valid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$admin$2d$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSessionTokenValid"])(token);
    if (valid) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    if (isProtectedApi) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized. Please log in again."
        }, {
            status: 401
        });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
}
const config = {
    matcher: [
        "/admin/:path*",
        "/api/admin/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1ept8q0._.js.map