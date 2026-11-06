# MediCentrix marketing landing page — Vercel-ready

This is a **standalone marketing WEBSITE**, recreated from the public-facing
medicentrix.com sections visible on November 6, 2026. It is **not** an installable
browser app, PWA, or desktop program. No service worker or web-app manifest is
included. It is intentionally separate from the Electron/NSIS Windows installer.

## What is here

- `index.html`, `styles.css`, `script.js`: responsive one-page marketing site.
- `assets/medicentrix-wordmark.svg`, `assets/medicentrix-icon.png`: derived from
  the two original brand SVG files supplied by the owner.
- `site.config.js`: set the real **public HTTPS .exe download URL** here when it
  has actually been compiled, installed/uninstalled on Windows, and tested.
- `vercel.json`: static Vercel deployment settings.
- `DNS-ROLLBACK.md`: screenshot-derived GoDaddy DNS values to preserve.
- `scripts/archive-remote-images.mjs`: optional image preservation utility.

## One-click-ish deployment: GitHub + Vercel

1. Extract ZIP. Upload the CONTENTS of this folder to a new private GitHub repository
   (e.g. `medicentrix-website`). The repository root must contain `index.html`.
2. In Vercel, choose Add New > Project > Import Git Repository. Select the repo.
3. Framework Preset: `Other`; leave build command blank, and Output Directory blank.
4. Deploy to the temporary `*.vercel.app` URL first. Open it on desktop and mobile.
5. Check photos, nav, form integration, and the download button BEFORE changing DNS.
6. Only after verified, attach medicentrix.com / www.medicentrix.com to Vercel
   and follow Vercel's **live** DNS instructions in GoDaddy. Preserve MX/TXT records.

Do NOT remove the existing GoHighLevel DNS records before verifying the Vercel site.

## Connect the downloadable Windows EXE

There is **NO .exe** in this website ZIP. A Windows installer is a different artifact.
The Electron desktop source ZIP from the previous step can build a real Windows `.exe`
with Windows uninstall support using GitHub Actions. The completed and tested file
should be hosted at a PUBLIC, direct HTTPS URL. Then edit `site.config.js`:

    windowsInstallerUrl: "https://github.com/ACCOUNT/PUBLIC-DOWNLOADS/releases/download/v0.1.0/MediCentrix-Desktop-Setup-0.1.0.exe",

That example is a FORMAT EXAMPLE, not a live download URL; replace it with the
real URL. If this value is blank, the header visibly says Download for Windows
but scrolls to the download section, where it clearly says that the installer
is being prepared. It does NOT serve a non-downloadable website as the app.

A GitHub Actions *artifact* from a private repo is usually NOT a public download
link. Publish an EXE as a release asset in a public distributions repository or
host it through an appropriate external storage provider. Unsigned installers
may show Microsoft SmartScreen warnings; code-signing is recommended before
wider distribution.

## Reconnect forms before DNS cutover

The original landing site appears to use GoHighLevel forms. Its private form
backend cannot be retrieved just from the public site. Both recreated forms
are intentionally NOT connected, and display an honest failure message rather
than pretending a lead was recorded. If you choose Web3Forms, add the public
form access key to `site.config.js`, test a real submission, and verify delivery.
This website never asks visitors for health records.

## Source image independence / original images

The page currently uses public-facing images served from LeadConnector CDN and
Google Cloud Storage. These references were visible on the live owner website.
Their availability may change if the original GoHighLevel account is closed.
Run `node scripts/archive-remote-images.mjs` on an internet-connected computer
while the original site is still live to save photos into `assets/photos/` and
rewrite `index.html` to reference the saved copies. Commit those files. Confirm
your usage rights for all stock photography before reusing it elsewhere.

## Accuracy and trademark note

The marketing page preserves much of the original public site's text. Some text
refers to a product *vision*, not features confirmed present in Desktop v1.
Desktop v1 is described separately as a simple medication organizer. A marketing
page by itself does NOT prove downloadable Class 9 goods exist or are in commerce;
consult trademark counsel about genuine use, exact filing basis, and specimen.
