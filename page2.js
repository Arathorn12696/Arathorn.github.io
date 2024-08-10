// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

// Wait for the window to load
window.onload = () => {
    // Define the animation for opening the gates
    gsap.to('.left-gate', {
        x: '-100%',
        scrollTrigger: {
            trigger: '.content', // This can be any element that will trigger the scroll
            start: 'top top', // When the top of the trigger hits the top of the viewport
            end: '+=100%', // Adjust the end position based on how far you want the scroll to trigger the animation
            scrub: true, // Makes the animation progress synced with the scrollbar
            markers: true // Show markers for debugging
        },
        duration: 1,
        ease: 'power2.inOut'
    });
    
    gsap.to('.right-gate', {
        x: '100%',
        scrollTrigger: {
            trigger: '.content', // Same trigger element as above
            start: 'top top', // Adjust as needed
            end: '+=100%', // Adjust as needed
            scrub: true,
            markers: true
        },
        duration: 1,
        ease: 'power2.inOut'
    });
    
    // Optional: Fade in content as the gates open
    gsap.to('.content', {
        autoAlpha: 1,
        scrollTrigger: {
            trigger: '.content',
            start: 'top top',
            end: '+=100%',
            scrub: true,
            markers: true
        },
        duration: 0.5,
        ease: 'power2.out'
    });
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const acceptButton = document.getElementById('accept-button');
    const declineButton = document.getElementById('decline-button');
    const arrow = document.getElementById('arrow');

    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            console.log('Accept button clicked');
            window.location.href = 'accept-page.html';
        });
    } else {
        console.log('Accept button not found');
    }

    if (declineButton) {
        declineButton.addEventListener('click', () => {
            console.log('Decline button clicked');
            declineButton.style.display = 'none';
            arrow.classList.remove('hidden');
        });
    } else {
        console.log('Decline button not found');
    }
});