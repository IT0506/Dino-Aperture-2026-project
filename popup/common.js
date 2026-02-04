const app = document.getElementById("app");

async function loadPage(page) {
  const res = await fetch(`pages/${page}.html`);
  const html = await res.text();
  app.innerHTML = html;
  bindPageEvents(page);
}

function bindPageEvents(page) {
  if (page === "visuals") {
    document.getElementById("toggleTheme")?.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleTheme" });
      });
    });

    document.getElementById("highlightText")?.addEventListener("click", () => {
      chrome.tabs.sendMessage(
        chrome.tabs.query({ active: true, currentWindow: true }),
        { action: "highlight" }
      );
    });
  }

  if (page === "speech") {
    document.getElementById("readPage")?.addEventListener("click", () => {
      chrome.tabs.sendMessage(
        chrome.tabs.query({ active: true, currentWindow: true }),
        { action: "read" }
      );
    });
  }

  if (page === "translator") {
    window.location.href = "../Translator/index.html";
  }
}

// Navigation buttons
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => loadPage(btn.dataset.page));
});

// Load default page
loadPage("home");

let Preference = {};
