import { sendRedirect } from "h3";

export default function useExternalRedirect(
  url: string,
  code: number = 302
): Promise<void> {
  // Check if the url is a valid url
  if (/^(https?:\/\/)/.test(url)) {
    // Check if it is inside server
    if (process.server) {
      const nuxtApp = useNuxtApp();

      if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
        return nuxtApp.callHook("app:redirected").then(() => {
          if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            return sendRedirect(nuxtApp.ssrContext.event, url, code);
          }
        });
      }
    } else {
      // If client than direct using window.location
      window.location.href = url;
    }
  }

  throw new Error("Invalid url");
}
