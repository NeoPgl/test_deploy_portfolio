import './style.css'
import './about.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

AOS.init();


document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé !");

    const links = document.querySelectorAll(".navbar a"); // Sélectionne les liens de la navbar
    const contentDiv = document.getElementById("content-all");

    if (!links.length || !contentDiv) {
        console.error("Les éléments de navigation ou le contenu ne sont pas trouvés !");
        return;
    }

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Empêche le rechargement

            const page = this.getAttribute("href");

            fetch(page)
                .then((response) => {
                    if (!response.ok) throw new Error("Erreur de chargement");
                    return response.text();
                })
                .then((html) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const newContent = doc.getElementById("content");

                    if (!newContent) throw new Error("Pas d'élément #content trouvé !");
                    
                    contentDiv.innerHTML = newContent.innerHTML; // Remplace le contenu
                    history.pushState(null, "", page); // Change l'URL
                })
                .catch((error) => console.error("Erreur :", error));
        });
    });

    // Gérer le retour avec les boutons "Précédent" et "Suivant"
    window.addEventListener("popstate", () => {
        location.reload();
    });
});
