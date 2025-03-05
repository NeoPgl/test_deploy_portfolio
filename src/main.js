import './style.css'
import './about.css'
import './contact.css'
import './projets.css'
import './gsb.css'
import './resto.css'
import './steto.css'
import './godot_game.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const projectCards = document.querySelectorAll('.projects-container a');
    const contentContainer = document.getElementById('content-all') || document.querySelector('.content-all');

    // Fonction pour charger le contenu et appliquer l'animation
    async function loadPageContent(url) {
        try {
            const response = await fetch(url);
            const htmlText = await response.text();
            
            // Créer un élément temporaire pour extraire le contenu
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlText;
            
            // Extraire la nouvelle section de contenu
            const newContent = tempDiv.querySelector('#content-all') || tempDiv.querySelector('.content-all');
            
            if (newContent) {
                // Réinitialiser le container avant de l'injecter à nouveau
                contentContainer.style.opacity = "0";  // Masquer le contenu
                contentContainer.style.animation = "none";  // Supprimer l'animation existante
                contentContainer.innerHTML = '';  // Vider le contenu actuel

                // Forcer un reflow pour réinitialiser l'animation
                void contentContainer.offsetWidth;

                // Ajouter le nouveau contenu
                contentContainer.innerHTML = newContent.innerHTML;

                // Réinitialiser l'animation et appliquer la nouvelle animation avec un léger délai pour s'assurer que le reflow est pris en compte
                setTimeout(() => {
                    contentContainer.style.animation = "fadeInUp 0.8s ease-out";
                    contentContainer.style.opacity = "1";
                }, 10);  // Délai court pour forcer un reflow
            }
        } catch (error) {
            console.error('Erreur lors du chargement du contenu :', error);
        }
    }

    // Gérer les clics sur la navigation
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            
            // Modifier l'URL sans recharger la page
            history.pushState(null, '', url);
            
            // Charger le contenu de la page avec animation
            await loadPageContent(url);
        });
    });

    // Gérer les clics sur les cartes de projet
    projectCards.forEach(card => {
        card.addEventListener('click', async (e) => {
            e.preventDefault();
            const url = card.getAttribute('href'); // L'URL est maintenant sur la carte elle-même
            
            // Modifier l'URL sans recharger la page
            history.pushState(null, '', url);
            
            // Charger le contenu de la page avec animation
            await loadPageContent(url);
        });
    });

    // Gérer le bouton retour du navigateur
    window.addEventListener('popstate', () => {
        loadPageContent(window.location.pathname);
    });
});





// Page Contact ci dessous
document.querySelectorAll('.input-field input, .input-field textarea').forEach(input => {
    if (input.value) {
        input.parentElement.classList.add('has-content');
    }

    input.addEventListener('input', () => {
        if (input.value) {
            input.parentElement.classList.add('has-content');
        } else {
            input.parentElement.classList.remove('has-content');
        }
    });
});


// Switch Mode Dark & Light

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("themeToggle");
    const iconPath = toggleButton.querySelector("path");
    const body = document.body;
    const logoImage = document.querySelector(".logo-left img");
    let isDarkMode = true;

    const sunPath = "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z";
    const moonPath = "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z";

    function toggleTheme() {
        body.classList.toggle("light-mode");
        isDarkMode = !isDarkMode;

        // Save theme preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Toggle logo
        logoImage.src = isDarkMode 
            ? "public/logo_principal.svg" 
            : "public/logo_principal-modified.svg";

        // Reset and animate icon
        iconPath.style.animation = "none";
        setTimeout(() => {
            // Change icon
            iconPath.setAttribute("d", isDarkMode ? sunPath : moonPath);

            // Calculate path length and apply
            let pathLength = iconPath.getTotalLength();
            iconPath.style.setProperty("--dash-length", pathLength);

            // Restart animation
            iconPath.style.animation = "draw 1.2s ease-in-out forwards";
        }, 50);
    }

    toggleButton.addEventListener("click", toggleTheme);

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        logoImage.src = "public/logo_principal-modified.svg";
        isDarkMode = false;
    }
});
