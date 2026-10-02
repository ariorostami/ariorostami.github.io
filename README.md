# Ario Rostami

Personal website for Ario Rostami, Full-Stack Software Engineer in Metro Vancouver.

GitHub Pages: https://ariorostami.github.io/
Final custom domain: https://ariorostami.com/ (connection pending).

Plain static HTML/CSS/JavaScript in `dist/`. No build command or runtime dependencies.

Local preview:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Optional public project URLs are configured in `dist/config.js`. Moneycomb is in development; its private source is not part of this repository.

Publish by manually running **Publish portfolio to GitHub Pages** on `main` in Actions. The workflow uploads only `dist/`. Custom-domain binding is configured in repository Settings → Pages; Actions publishing ignores `dist/CNAME`.
