(() => {
  "use strict";
  const { location, navigator } = window;
  if (!location.pathname.endsWith("/") || location.search || location.hash ||
      navigator.globalPrivacyControl === true ||
      ["1", "yes"].includes(String(navigator.doNotTrack ?? window.doNotTrack).toLowerCase())) {
    return;
  }
  try {
    const key = "meeting-lab-runspindle-release-handoff-v1";
    let variant = window.localStorage.getItem(key);
    if (variant !== "technical" && variant !== "business") {
      variant = window.crypto.getRandomValues(new Uint8Array(1))[0] < 128
        ? "technical" : "business";
      window.localStorage.setItem(key, variant);
      if (window.localStorage.getItem(key) !== variant) return;
    }
    if (variant === "business") location.replace("business.html");
  } catch {
    // Denied storage or unavailable randomness: keep the technical landing page.
  }
})();
