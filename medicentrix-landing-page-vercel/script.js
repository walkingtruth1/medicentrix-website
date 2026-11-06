"use strict";

(() => {
  const cfg = window.MEDICENTRIX_SITE_CONFIG || {};
  const menu = document.querySelector("#header-nav");
  const menuToggle = document.querySelector("#menu-toggle");
  const downloadLinks = document.querySelectorAll("[data-download-link]");
  const fileUrl = typeof cfg.windowsInstallerUrl === "string" ? cfg.windowsInstallerUrl.trim() : "";
  const isValidInstallerUrl = /^https:\/\//i.test(fileUrl) || /^\/downloads\/[a-z0-9._-]+\.exe$/i.test(fileUrl);

  if (isValidInstallerUrl) {
    downloadLinks.forEach(link => {
      link.href = fileUrl;
      link.removeAttribute("data-pending");
      link.title = "Download the MediCentrix Windows installer";
      if (fileUrl.startsWith("https://")) link.rel = "noopener noreferrer";
    });
    document.querySelector("#release-status").textContent = `Windows Desktop v${cfg.windowsVersion || ""} — available`;
    document.querySelector("#download-help").textContent = "Download the Windows installer and follow the installation instructions. You can uninstall it through Windows Settings → Installed apps.";
  } else {
    downloadLinks.forEach(link => {
      link.setAttribute("data-pending", "true");
      link.title = "Windows installer is not yet published";
    });
    document.querySelector("#release-status").textContent = "Windows .EXE installer in preparation";
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    menu?.classList.toggle("open", !isOpen);
  });
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
  }));

  const tabs = Array.from(document.querySelectorAll("[role='tab']"));
  const selectTab = name => {
    tabs.forEach(tab => {
      const active = tab.dataset.target === name;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll("[role='tabpanel']").forEach(panel => {
      const active = panel.id === `panel-${name}`;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  };
  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => selectTab(tab.dataset.target));
    tab.addEventListener("keydown", event => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length-1 : (idx + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      selectTab(tabs[nextIndex].dataset.target);
      tabs[nextIndex].focus();
    });
  });

  async function submitSubscriberForm(event, feedbackId, channel) {
    event.preventDefault();
    const form = event.currentTarget;
    const feedback = document.getElementById(feedbackId);
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const accessKey = String(cfg.web3FormsAccessKey || "").trim();
    if (!accessKey) {
      feedback.textContent = "Sign-up is not connected yet. Please return when we launch.";
      feedback.dataset.state = "error";
      return;
    }
    const button = form.querySelector("button[type=submit]");
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Sending…";
    feedback.textContent = "";
    try {
      const data = new FormData(form);
      data.set("access_key", accessKey);
      data.set("subject", `MediCentrix: ${channel} signup`);
      data.set("from_name", "MediCentrix Website");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST", body: data, headers: { Accept: "application/json" }
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Unable to process the signup.");
      feedback.textContent = "Thank you! Your signup has been submitted.";
      feedback.dataset.state = "success";
      form.reset();
    } catch (error) {
      feedback.textContent = "We couldn't submit your signup. Please try again later.";
      feedback.dataset.state = "error";
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }

  document.querySelector("#launch-form")?.addEventListener("submit", event => submitSubscriberForm(event,"launch-feedback","Launch updates"));
  document.querySelector("#newsletter-form")?.addEventListener("submit", event => submitSubscriberForm(event,"newsletter-feedback","Newsletter"));
})();
