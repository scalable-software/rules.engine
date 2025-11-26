// Web Dev Server Configuration
// Enable SharedArrayBuffer support with Cross-Origin Isolation headers

export default {
  port: 8000,
  watch: true,
  nodeResolve: true,
  open: "/demo/index.html",
  // Enable SharedArrayBuffer with Cross-Origin Isolation
  middleware: [
    function sharedArrayBufferHeaders(context, next) {
      // Set COOP and COEP headers for SharedArrayBuffer support
      context.set("Cross-Origin-Opener-Policy", "same-origin");
      context.set("Cross-Origin-Embedder-Policy", "require-corp");
      return next();
    },
  ],
  cors: true,
  logStartup: true,
};
