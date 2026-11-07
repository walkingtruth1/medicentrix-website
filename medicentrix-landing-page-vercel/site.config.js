/**
 * Configuration for this marketing site (not a desktop/browser app).
 * Do not set a fake EXE link. Provide a PUBLIC direct Windows installer URL
 * only AFTER the standalone installer has been compiled and tested.
 * Recommended: HTTPS URL to a public GitHub Release asset or Azure Blob.
 * The installer is produced from the separate medicentrix-windows-source project.
 */
window.MEDICENTRIX_SITE_CONFIG = {
  windowsInstallerUrl: "https://github.com/walkingtruth1/medicentrix-desktop/releases/download/v0.1.0/MediCentrix-Desktop-Setup-0.1.0.exe",
  windowsVersion: "0.1.0",
  web3FormsAccessKey: ""
};
