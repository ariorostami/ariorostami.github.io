// Apply appearance before styles load, then attach the accessible native control.
(() => {
  const storageKey = 'ario-portfolio-appearance';
  let system;
  try {
    if (typeof window.matchMedia === 'function') {
      system = window.matchMedia('(prefers-color-scheme: dark)');
    }
  } catch { /* Dark is the fallback when system appearance cannot be read. */ }
  let preference = 'system';
  try {
    const stored = localStorage.getItem(storageKey);
    if (['system', 'light', 'dark'].includes(stored)) preference = stored;
  } catch { /* Appearance works even when browser storage is disabled. */ }

  const apply = () => {
    const theme = preference === 'system'
      ? (system && typeof system.matches === 'boolean' ? (system.matches ? 'dark' : 'light') : 'dark')
      : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  };
  apply();
  if (system?.addEventListener) {
    system.addEventListener('change', () => { if (preference === 'system') apply(); });
  } else if (system?.addListener) {
    system.addListener(() => { if (preference === 'system') apply(); });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('appearance');
    select.value = preference;
    select.closest('.appearance-control').hidden = false;
    select.addEventListener('change', () => {
      preference = select.value;
      apply();
      try { localStorage.setItem(storageKey, preference); } catch { /* Optional preference. */ }
    });
  });
})();
