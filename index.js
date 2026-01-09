/**Cards/**
 * 
 */

 /*** Liste des projets*/
export const cards = [
  {
    titre: "Booki",
    description: "Intégration de la page d'accueil d'une agence de voyage conformément à la maquette et aux spécifications techniques.",
    technologies: ["HTML", "CSS", "Figma"],
    type:"frontend"
  },
  {
    titre: "Sophie Bluel architecte",
    description: "Réalisation d'une page web dynamique avec JavaScript pour le portfolio d'un architecte d'intérieur.",
    technologies: ["Node.js", "JavaScript"],
    type:"frontend"
  },
  {
    titre: "Kasa",
    description: "Création d'un site web dynamique et responsive avec la bibliothèque React pour une agence immobilière sur le principe du SPA",
    technologies: ["React", "Vite", "Sass"],
    type:"frontend"
  },
  {
    titre: "Mon Vieux Grimoire",
    description: "Création du backend sécurisé d'un site de notation de livres.",
    technologies: ["API REST", "BDD NoSQL", "Express pour Node.js"],
    type:"backend"
  }
];

/** Petit utilitaire pour créer des éléments */
function el(tag, { className = "", text = "" } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/** Construit une card à partir d'un item { titre, description, technologies[] } */
function renderCard({ titre, description, technologies = [] }) {
  const article = el("article", { className: "card" });

  // (Option) Placeholder pour une image ou un visuel
  const header = el("div", { className: "card__header" });

  const body = el("div", { className: "card__body" });
  const h3 = el("h3", { className: "card__title", text: titre });
  const p = el("p", { className: "card__desc", text: description });

  const chips = el("div", { className: "card__chips" });
  technologies.forEach(tech => {
    chips.appendChild(el("span", { className: "chip", text: tech }));
  });

  body.append(h3, p, chips);
  article.append(header, body);
  return article;
}

/** Injecte toutes les cards dans la grille #projets .grid */
function renderGrid(items) {
  const grid = document.querySelector("#projets .grid");
  if (!grid) return;
  grid.innerHTML = ""; // nettoyage

  const frag = document.createDocumentFragment();
  items.forEach(item => frag.appendChild(renderCard(item)));
  grid.appendChild(frag);
}

// --- Rendu initial ---
renderGrid(cards);

/** Gestion des filtres */
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // gestion du bouton actif
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "all") {
      renderGrid(cards);
    } else {
      const filteredCards = cards.filter(card => card.type === filter);
      renderGrid(filteredCards);
    }
  });
});


/**
 * Formulaire
 */
const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // empêche l'envoi réel

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validation simple
    if (!name || !email || !message) {
      status.textContent = "❌ Merci de remplir tous les champs.";
      status.style.color = "red";
      return;
    }

    // Simulation d'envoi
    status.textContent = "📨 Message envoyé (simulation).";
    status.style.color = "green";

    // Réinitialisation du formulaire
    form.reset();
  });
}
