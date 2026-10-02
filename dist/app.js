(() => {
  const config = window.PORTFOLIO_CONFIG || {};

  function addProjectLinks(containerId, entries) {
    const container = document.getElementById(containerId);
    const links = [];
    for (const [label, value] of entries) {
      if (!value) continue;
      try {
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.username || url.password) continue;
        const link = document.createElement('a');
        link.href = url.href;
        link.textContent = label;
        links.push(link);
      } catch { /* Leave unconfirmed or invalid links out of the public page. */ }
    }
    if (links.length) {
      container.replaceChildren(...links);
      container.hidden = false;
    }
  }

  addProjectLinks('moneycomb-links', [['View demo', config.moneycomb?.demoUrl]]);
  addProjectLinks('gerrymander-links', [
    ['View demo', config.gerrymander?.demoUrl],
    ['Source code', config.gerrymander?.repositoryUrl],
  ]);
  addProjectLinks('reddit-links', [
    ['Chrome Web Store', config.reddit?.chromeUrl],
    ['Firefox Add-ons', config.reddit?.firefoxUrl],
    ['Source code', config.reddit?.repositoryUrl],
  ]);

})();
