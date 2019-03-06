'use strict';

// Service worker setup.
let serviceWorkerRegistration;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/minimum-pwa/sw.js', { scope: '/' })
        .then(function (registration) {
            serviceWorkerRegistration = registration;
            console.log('PWA: Service Worker Registered');
        });

    navigator.serviceWorker.ready
        .then(function (registration) {
            console.log('PWA: Service Worker Ready');
        });
}

// Install PWA setup.
let pwaInstallPrompt;
const pwaInstallBtn = document.querySelector('.pwa-install-btn');
pwaInstallBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA: beforeinstallprompt event');

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    pwaInstallPrompt = e;
    // Update UI to notify the user they can install
    pwaInstallBtn.style.display = 'block';

    pwaInstallBtn.addEventListener('click', (e) => {
        // Hide our user interface that shows our install button
        pwaInstallBtn.style.display = 'none';
        // Show the prompt, then wait for the user to respond to the prompt
        pwaInstallPrompt.prompt();
        pwaInstallPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA: User accepted the install prompt');
            } else {
                console.log('PWA: User dismissed the install prompt');
            }
            pwaInstallPrompt = null;
        });
    });
});

window.addEventListener('appinstalled', (e) => {
    console.log('PWA: appinstalled event');

    // This fires after onbeforinstallprompt OR after manual add to homescreen.
    pwaInstallPrompt = null;
    pwaInstallBtn.style.display = 'none';
});
