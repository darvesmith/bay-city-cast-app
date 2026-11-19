# Bay City CAST App — GitHub Pages hosting

This repository hosts the Bay City CAST public web app via GitHub Pages.
Custom domain: **app.baycitycast.com**

## What is in this repo

- `index.html` — the complete app as a single self-contained file. It is the
  exact file served live from the previous host (downloaded from
  https://app.baycitycast.com/ when the site was moved here), with all images
  inlined. There are no other files to deploy.

## How updates work

Do NOT edit `index.html` here by hand. The app is built and maintained as a
web artifact (source in the builder's workspace); when a new version is
published, the new live file replaces this one. Replacing this file is the
whole deploy — nothing else needs building or configuring.

## Hosting notes

- GitHub Pages, free plan, public repository. Deploy from the `main` branch,
  `/(root)`.
- The `CNAME` file holds the custom domain (`app.baycitycast.com`); GitHub
  created it when the domain was set in Pages settings. Do not delete it.
- The previous host (Netlify site `bay-city-cast-app`) is kept as a fallback
  until the GitHub Pages version is verified live, then it can be retired.
