// Detect the system appearance before styles load; the control toggles a saved override.
(() => {
  const storageKey = 'ario-portfolio-appearance';
  let system;
  try {
    if (typeof window.matchMedia === 'function') {
      system = window.matchMedia('(prefers-color-scheme: dark)');
    }
  } catch { /* Dark is the fallback when system appearance cannot be read. */ }

  let preference = null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') preference = stored;
    // A previous "system" preference means automatic detection, so it remains compatible.
  } catch { /* Appearance works even when browser storage is disabled. */ }

  const systemTheme = () => system && typeof system.matches === 'boolean'
    ? (system.matches ? 'dark' : 'light')
    : 'dark';

  const apply = () => {
    const theme = preference || systemTheme();
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const toggle = document.getElementById('appearance-toggle');
    if (toggle) {
      const target = theme === 'dark' ? 'light' : 'dark';
      const label = `Switch to ${target} mode`;
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
      toggle.dataset.theme = theme;
    }
  };

  apply();
  const handleSystemChange = () => { if (!preference) apply(); };
  if (system?.addEventListener) system.addEventListener('change', handleSystemChange);
  else if (system?.addListener) system.addListener(handleSystemChange);

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('appearance-toggle');
    toggle.closest('.appearance-control').hidden = false;
    apply();
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme || systemTheme();
      preference = currentTheme === 'dark' ? 'light' : 'dark';
      apply();
      try { localStorage.setItem(storageKey, preference); } catch { /* Optional preference. */ }
    });
  });
})();
