/**
 * Configuration for this marketing site (not a desktop/browser app).
 * Do not set a fake EXE link. Provide a PUBLIC direct Windows installer URL
 * only AFTER the standalone installer has been compiled and tested.
 * Recommended: HTTPS URL to a public GitHub Release asset or Azure Blob.
 * The installer is produced from the separate medicentrix-windows-source project.
 */
window.MEDICENTRIX_SITE_CONFIG = {
  windowsInstallerUrl: "",
  windowsVersion: "0.1.0",
  // Optional public Web3Forms access key; do not configure until the owner
  // has established the intended subscriber destination and verified delivery.
  web3FormsAccessKey: ""
};
