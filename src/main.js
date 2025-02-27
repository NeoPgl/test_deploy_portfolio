import './style.css'
import './about.css'
import './contact.css'
import './projets.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
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

                // Réinitialiser l'animation et appliquer la nouvelle animation
                contentContainer.style.animation = "fadeInUp 0.8s ease-out";
                contentContainer.style.opacity = "1";
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

    // Gérer le bouton retour du navigateur
    window.addEventListener('popstate', () => {
        loadPageContent(window.location.pathname);
    });
});

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