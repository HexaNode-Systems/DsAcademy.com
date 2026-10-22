/**
 * Lightweight client-side analytics and click tracking utility.
 * Safe for production. In development, logs to console.
 * Can be hooked up to Google Analytics 4 (gtag), Meta Pixel, or any custom endpoint.
 */

export type TrackingEvent =
  | 'cta_click'
  | 'form_start'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'whatsapp_click'
  | 'popup_open'
  | 'popup_close'
  | 'course_filter_change'
  | 'course_details_view'
  | 'announcement_click'
  | 'announcement_dismiss';

export function track(event: TrackingEvent, data?: Record<string, unknown>): void {
  try {
    if (typeof window === 'undefined') return;

    const payload = {
      event,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...data,
    };

    // If Google Tag Manager / gtag is available on the window
    if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', event, data);
    }

    // Console logging in development or demo mode
    if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
      console.log(`📊 [Analytics] ${event}`, payload);
    }
  } catch (err) {
    // Fail silently so tracking never breaks user experience
    console.debug('Tracking error', err);
  }
}

/**
 * Parses UTM parameters from URL search query string.
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const val = params.get(key);
      if (val) utms[key] = val;
    });
    return utms;
  } catch {
    return {};
  }
}
