Do not place a fake or renamed ZIP at an .exe path. The Windows installer must first
be generated and tested from the separate Electron desktop application source.

Recommended: upload the .exe as a public GitHub Release asset (in a separate public
distribution repository, if the application source repo remains private), or host
it via Azure Blob Storage. Set the exact public HTTPS URL in site.config.js.

No Windows .exe has been compiled into this website archive.
