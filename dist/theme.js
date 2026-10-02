// Apply appearance before styles load, then attach the accessible native control.
(() => {
  const storageKey = 'ario-portfolio-appearance';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = 'light';
  try {
    const stored = localStorage.getItem(storageKey);
    if (['system', 'light', 'dark'].includes(stored)) preference = stored;
  } catch { /* Appearance works even when browser storage is disabled. */ }

  const apply = () => {
    const theme = preference === 'system'
      ? (system.matches ? 'dark' : 'light')
      : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  };
  apply();
  system.addEventListener('change', () => { if (preference === 'system') apply(); });

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
