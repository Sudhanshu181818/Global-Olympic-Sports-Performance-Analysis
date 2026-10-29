const urls = {
  dashboard: {
    page: "https://public.tableau.com/app/profile/sudhanshu.dwivedi4562/viz/Book1_17931641802290/Dashboard1?publish=yes",
    embed: "https://public.tableau.com/views/Book1_17931641802290/Dashboard1?:showVizHome=no&:embed=true&:toolbar=yes&:tabs=no",
    title: "LIVE DASHBOARD",
    frameTitle: "Olympics Analytics Tableau Dashboard"
  },
  story: {
    page: "https://public.tableau.com/app/profile/sudhanshu.dwivedi4562/viz/Book1_17931641802290/Story1?publish=yes",
    embed: "https://public.tableau.com/views/Book1_17931641802290/Story1?:showVizHome=no&:embed=true&:toolbar=yes&:tabs=no",
    title: "LIVE DATA STORY",
    frameTitle: "Olympics Analytics Tableau Story"
  }
};

const frame = document.getElementById("tableauFrame");
const viewLabel = document.getElementById("viewLabel");
const openTableau = document.getElementById("openTableau");
const viewButtons = [...document.querySelectorAll(".view-button")];

function setView(view) {
  const selected = urls[view] || urls.dashboard;
  frame.src = selected.embed;
  frame.title = selected.frameTitle;
  viewLabel.textContent = selected.title;
  openTableau.href = selected.page;
  viewButtons.forEach(button => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

viewButtons.forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
document.getElementById("openStoryButton").addEventListener("click", () => {
  setView("story");
  document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
});

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}));

window.addEventListener("scroll", () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("scrollProgress").style.width = `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`;
});
document.getElementById("year").textContent = new Date().getFullYear();
