// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Submission Animation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Sending...';
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent!';
        form.reset();
        setTimeout(() => {
            submitBtn.innerHTML = 'Send Message';
        }, 2000);
    }, 1500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add hover effect to menu cards
const menuCards = document.querySelectorAll('.menu-card');
menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Advanced Menu Item Effects
const menuItemContents = document.querySelectorAll('.menu-item-content');

menuItemContents.forEach(item => {
    let bounds = item.getBoundingClientRect();
    let mouseLeaveDelay;

    const mouseEnter = (e) => {
        clearTimeout(mouseLeaveDelay);
        bounds = item.getBoundingClientRect();
        mouseMoveHandler(e);
    };

    const mouseMove = (e) => {
        mouseMoveHandler(e);
    };

    const mouseLeave = () => {
        mouseLeaveDelay = setTimeout(() => {
            item.style.transform = 'rotateY(0deg) rotateX(0deg)';
            const image = item.querySelector('.menu-item-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        }, 100);
    };

    const mouseMoveHandler = (e) => {
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPct = mouseX / bounds.width - 0.5;
        const yPct = mouseY / bounds.height - 0.5;
        const xRotation = yPct * 20; // Maximum rotation of 20 degrees
        const yRotation = xPct * -20;
        const image = item.querySelector('.menu-item-image img');

        item.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.05, 1.05, 1.05)`;
        
        if (image) {
            // Parallax effect for the image
            image.style.transform = `scale(1.1) translateX(${xPct * 10}px) translateY(${yPct * 10}px)`;
        }

        // Dynamic shadow based on rotation
        const intensity = Math.sqrt(xPct * xPct + yPct * yPct) * 50;
        item.style.boxShadow = `
            ${-yRotation}px ${-xRotation}px 30px rgba(255, 45, 149, ${0.2 + intensity * 0.01}),
            ${yRotation}px ${xRotation}px 30px rgba(45, 126, 255, ${0.2 + intensity * 0.01})
        `;
    };

    item.addEventListener('mouseenter', mouseEnter);
    item.addEventListener('mousemove', mouseMove);
    item.addEventListener('mouseleave', mouseLeave);
});

// Menu Category Animation
const menuCategories = document.querySelectorAll('.menu-category');
menuCategories.forEach(category => {
    category.addEventListener('mouseover', () => {
        if (!category.classList.contains('active')) {
            category.style.transform = 'translateY(-5px)';
        }
    });

    category.addEventListener('mouseout', () => {
        if (!category.classList.contains('active')) {
            category.style.transform = 'translateY(0)';
        }
    });
});

// Menu List Transition
const menuLists = document.querySelectorAll('.menu-list');

function switchMenuList(targetCategory) {
    menuLists.forEach(list => {
        if (list.getAttribute('data-category') === targetCategory) {
            list.style.display = 'grid';
            setTimeout(() => {
                list.style.opacity = '1';
                list.style.transform = 'translateY(0)';
            }, 50);
        } else {
            list.style.opacity = '0';
            list.style.transform = 'translateY(20px)';
            setTimeout(() => {
                list.style.display = 'none';
            }, 300);
        }
    });
}

menuCategories.forEach(category => {
    category.addEventListener('click', () => {
        const targetCategory = category.getAttribute('data-category');
        menuCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        switchMenuList(targetCategory);
    });
});

// Initialize first menu list
document.querySelector('.menu-list.active').style.opacity = '1';
document.querySelector('.menu-list.active').style.transform = 'translateY(0)';

// Logo Interaction
document.addEventListener('DOMContentLoaded', function() {
    const navBrand = document.querySelector('.nav-brand');
    const logo = document.querySelector('.logo');
    const maxTilt = 15; // Maximum tilt angle in degrees
    const maxShift = 5; // Maximum shift in pixels

    // Handle mouse movement over the logo
    navBrand.addEventListener('mousemove', (e) => {
        const rect = navBrand.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse position relative to logo
        const y = e.clientY - rect.top;
        
        // Calculate tilt angles
        const tiltX = ((y / rect.height) * maxTilt - maxTilt/2) * -1;
        const tiltY = (x / rect.width) * maxTilt - maxTilt/2;
        
        // Calculate shift for parallax effect
        const shiftX = (x / rect.width * maxShift - maxShift/2);
        const shiftY = (y / rect.height * maxShift - maxShift/2);

        // Apply transformations
        logo.style.transform = `
            perspective(1000px)
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            translateX(${shiftX}px)
            translateY(${shiftY}px)
        `;

        // Update glow effect based on mouse position
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        
        const outerRing = document.querySelector('.logo-outer');
        const innerRing = document.querySelector('.logo-inner');
        
        outerRing.style.boxShadow = `
            0 0 15px var(--neon-pink),
            ${glowX/5}px ${glowY/5}px 20px var(--neon-pink)
        `;
        
        innerRing.style.boxShadow = `
            0 0 15px var(--neon-blue),
            ${-glowX/5}px ${-glowY/5}px 20px var(--neon-blue)
        `;
    });

    // Reset transformations when mouse leaves
    navBrand.addEventListener('mouseleave', () => {
        logo.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateX(0) translateY(0)';
        
        const outerRing = document.querySelector('.logo-outer');
        const innerRing = document.querySelector('.logo-inner');
        
        outerRing.style.boxShadow = '0 0 15px var(--neon-pink)';
        innerRing.style.boxShadow = '0 0 15px var(--neon-blue)';
    });
});

// Menu Category Switching
document.addEventListener('DOMContentLoaded', function() {
    // Menu category functionality
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuLists = document.querySelectorAll('.menu-list');

    menuCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories and lists
            menuCategories.forEach(cat => cat.classList.remove('active'));
            menuLists.forEach(list => list.classList.remove('active'));

            // Add active class to clicked category
            category.classList.add('active');

            // Show corresponding menu list
            const targetCategory = category.getAttribute('data-category');
            const targetList = document.querySelector(`.menu-list[data-category="${targetCategory}"]`);
            if (targetList) {
                targetList.classList.add('active');
            }

            // Add cyberpunk effect on click
            category.style.transform = 'scale(0.95)';
            category.style.boxShadow = '0 0 30px var(--neon-blue)';
            setTimeout(() => {
                category.style.transform = '';
                category.style.boxShadow = '';
            }, 200);
        });
    });

    // Menu item hover effects
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    allMenuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 0 30px var(--neon-pink)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });
});

// Logo Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const navBrand = document.querySelector('.nav-brand');
    let rect = logo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Add floating animation
    logo.style.animation = 'logoFloat 3s ease-in-out infinite';
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes logoFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(2deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(5px) rotate(-2deg); }
        }
        .logo {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-brand:hover .logo {
            animation: logoGlitch 0.3s ease-in-out infinite;
        }
        @keyframes logoGlitch {
            0% { 
                transform: translate(0) scale(1) skew(0deg);
                filter: hue-rotate(0deg);
            }
            20% { 
                transform: translate(-2px, 2px) scale(1.05) skew(2deg);
                filter: hue-rotate(70deg);
            }
            40% { 
                transform: translate(2px, -2px) scale(0.95) skew(-2deg);
                filter: hue-rotate(140deg);
            }
            60% { 
                transform: translate(-2px, -2px) scale(1.05) skew(2deg);
                filter: hue-rotate(210deg);
            }
            80% { 
                transform: translate(2px, 2px) scale(0.95) skew(-2deg);
                filter: hue-rotate(280deg);
            }
            100% { 
                transform: translate(0) scale(1) skew(0deg);
                filter: hue-rotate(360deg);
            }
        }
    `;
    document.head.appendChild(floatStyle);

    navBrand.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const deltaX = (mouseX - centerX) / 15;
        const deltaY = (mouseY - centerY) / 15;

        // Enhanced 3D transform with more dramatic perspective
        logo.style.transform = `
            perspective(1000px) 
            rotateY(${deltaX}deg) 
            rotateX(${-deltaY}deg) 
            translateZ(20px)
            scale3d(1.1, 1.1, 1.1)
        `;

        // Dynamic shadow and glow effect
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const intensity = Math.min(distance / 50, 1);
        
        logo.style.filter = `
            drop-shadow(${deltaX}px ${deltaY}px 10px rgba(255, 45, 149, ${0.5 + intensity * 0.5}))
            drop-shadow(${-deltaX}px ${-deltaY}px 10px rgba(45, 126, 255, ${0.5 + intensity * 0.5}))
            brightness(${1 + intensity * 0.2})
        `;

        // Update glow effect based on mouse position
        const glowX = (mouseX - rect.left) / rect.width * 100;
        const glowY = (mouseY - rect.top) / rect.height * 100;
        
        const outerRing = document.querySelector('.logo-outer');
        const innerRing = document.querySelector('.logo-inner');
        
        if (outerRing && innerRing) {
            outerRing.style.boxShadow = `
                0 0 20px var(--neon-pink),
                ${glowX/4}px ${glowY/4}px 30px var(--neon-pink),
                ${-glowX/6}px ${-glowY/6}px 40px rgba(255, 45, 149, 0.5)
            `;
            
            innerRing.style.boxShadow = `
                0 0 20px var(--neon-blue),
                ${-glowX/4}px ${-glowY/4}px 30px var(--neon-blue),
                ${glowX/6}px ${glowY/6}px 40px rgba(45, 126, 255, 0.5)
            `;
        }
    });

    navBrand.addEventListener('mouseenter', () => {
        logo.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        logo.style.transform = 'perspective(1000px) scale3d(1.1, 1.1, 1.1) translateZ(50px)';
    });

    navBrand.addEventListener('mouseleave', () => {
        logo.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        logo.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0) scale3d(1, 1, 1)';
        logo.style.filter = 'none';
        
        const outerRing = document.querySelector('.logo-outer');
        const innerRing = document.querySelector('.logo-inner');
        
        if (outerRing && innerRing) {
            outerRing.style.boxShadow = '0 0 15px var(--neon-pink)';
            innerRing.style.boxShadow = '0 0 15px var(--neon-blue)';
        }
    });

    // Add magnetic effect
    let magneticPullStrength = 0.4;
    let magneticRange = 100;

    function getMagneticPull(mouseX, mouseY, targetX, targetY) {
        const dx = mouseX - targetX;
        const dy = mouseY - targetY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < magneticRange) {
            const pull = (magneticRange - distance) / magneticRange * magneticPullStrength;
            return {
                x: dx * pull,
                y: dy * pull
            };
        }
        return { x: 0, y: 0 };
    }

    document.addEventListener('mousemove', (e) => {
        const logoRect = logo.getBoundingClientRect();
        const logoX = logoRect.left + logoRect.width / 2;
        const logoY = logoRect.top + logoRect.height / 2;
        
        const pull = getMagneticPull(e.clientX, e.clientY, logoX, logoY);
        
        if (pull.x !== 0 || pull.y !== 0) {
            logo.style.transform = `
                perspective(1000px)
                translate(${pull.x}px, ${pull.y}px)
                scale3d(1.05, 1.05, 1.05)
            `;
        }
    });
});

// Glitch Text Effect
const glitchTexts = document.querySelectorAll('.glitch-text');
glitchTexts.forEach(text => {
    setInterval(() => {
        text.style.textShadow = `
            ${Math.random() * 3}px ${Math.random() * 3}px ${Math.random() * 3}px rgba(255,45,149,0.5),
            ${-Math.random() * 3}px ${-Math.random() * 3}px ${Math.random() * 3}px rgba(45,126,255,0.5)
        `;
    }, 50);
});

// Menu Item Hover Effects
const menuItemCards = document.querySelectorAll('.menu-item');
menuItemCards.forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 20;
        const angleY = (x - centerX) / 20;

        this.style.transform = `perspective(1000px) rotateX(${-angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        this.querySelector('.menu-item-image').style.transform = `translateZ(50px)`;
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        this.querySelector('.menu-item-image').style.transform = 'translateZ(0)';
    });
});

// Typewriter Effect for Developer Section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const typewriterTexts = document.querySelectorAll('.typewriter-text');
typewriterTexts.forEach(text => {
    const originalText = text.textContent;
    typeWriter(text, originalText);
});

// Tech Badge Hover Effects
const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach(badge => {
    badge.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
    });

    badge.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeMenuSystem();
    initializeHoverEffects();
    createMatrixRain();
    createCyberCursor();
    addGlitchEffect();
    createNeonTrail();
    addUniqueNavButtonEffects();
});

// Menu system initialization
function initializeMenuSystem() {
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuLists = document.querySelectorAll('.menu-list');

    menuCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories and lists
            menuCategories.forEach(cat => cat.classList.remove('active'));
            menuLists.forEach(list => list.classList.remove('active'));

            // Add active class to clicked category
            category.classList.add('active');

            // Show corresponding menu list with animation
            const targetCategory = category.getAttribute('data-category');
            const targetList = document.querySelector(`.menu-list[data-category="${targetCategory}"]`);
            if (targetList) {
                targetList.classList.add('active');
                targetList.style.display = 'grid';
                
                // Add fade-in effect
                targetList.style.opacity = '0';
                targetList.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    targetList.style.opacity = '1';
                    targetList.style.transform = 'translateY(0)';
                }, 50);
            }

            // Hide other lists
            menuLists.forEach(list => {
                if (list !== targetList) {
                    list.style.display = 'none';
                }
            });

            // Add cyberpunk effect on click
            category.style.transform = 'scale(0.95)';
            category.style.boxShadow = '0 0 30px var(--neon-blue)';
            setTimeout(() => {
                category.style.transform = '';
                category.style.boxShadow = '';
            }, 200);
        });
    });

    // Show initial active menu
    const activeList = document.querySelector('.menu-list.active');
    if (activeList) {
        activeList.style.display = 'grid';
        activeList.style.opacity = '1';
        activeList.style.transform = 'translateY(0)';
    }
}

// Initialize hover effects
function initializeHoverEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 0 30px var(--neon-pink)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });
}

// Matrix Rain Effect for Hero Section
function createMatrixRain() {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    
    hero.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const drops = [];
    const fontSize = 16;
    const columns = canvas.width/fontSize;

    for(let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;
            
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Cyber Cursor Effect
function createCyberCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
        .cyber-cursor {
            width: 40px;
            height: 40px;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
        }
        .cyber-cursor::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid var(--neon-blue);
            border-radius: 50%;
            transform: rotate(0deg);
            animation: cursorRotate 3s linear infinite;
            opacity: 0.5;
            box-shadow: 
                0 0 15px var(--neon-blue),
                0 0 30px var(--neon-blue),
                0 0 45px var(--neon-blue);
        }
        .cyber-cursor::after {
            content: '';
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--neon-pink);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 
                0 0 10px var(--neon-pink),
                0 0 20px var(--neon-pink),
                0 0 30px var(--neon-pink);
            animation: centerPulse 1.5s ease-in-out infinite;
        }
        @keyframes cursorRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes centerPulse {
            0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.5) rotate(180deg); }
            100% { transform: translate(-50%, -50%) scale(1) rotate(360deg); }
        }
        /* Hide default cursor */
        * {
            cursor: none !important;
        }
        /* Interactive states */
        a:hover ~ .cyber-cursor::before,
        button:hover ~ .cyber-cursor::before {
            border-color: var(--neon-pink);
            animation: cursorRotate 1s linear infinite;
            box-shadow: 
                0 0 15px var(--neon-pink),
                0 0 30px var(--neon-pink),
                0 0 45px var(--neon-pink);
        }
        a:hover ~ .cyber-cursor::after,
        button:hover ~ .cyber-cursor::after {
            background: var(--neon-blue);
            box-shadow: 
                0 0 10px var(--neon-blue),
                0 0 20px var(--neon-blue),
                0 0 30px var(--neon-blue);
            animation: centerPulse 0.8s ease-in-out infinite;
        }
        /* Click animation */
        .cyber-cursor.clicking::before {
            animation: clickPulse 0.5s ease-out;
        }
        @keyframes clickPulse {
            0% { transform: scale(1) rotate(0deg); }
            50% { 
                transform: scale(0.8) rotate(180deg);
                opacity: 1;
            }
            100% { 
                transform: scale(1.2) rotate(360deg);
                opacity: 0.5;
            }
        }
        /* Click ripple effect */
        .click-rings {
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
        }
        .click-rings::before,
        .click-rings::after {
            content: '';
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid var(--neon-pink);
            animation: rippleHex 1s ease-out;
            opacity: 0;
        }
        .click-rings::after {
            animation-delay: 0.2s;
            transform: rotate(30deg);
        }
        @keyframes rippleHex {
            0% {
                transform: scale(0.5) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(2) rotate(90deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    let isClicking = false;
    let clickTimeout;

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        isClicking = true;
        if (clickTimeout) clearTimeout(clickTimeout);
        
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        const rings = document.createElement('div');
        rings.className = 'click-rings';
        rings.style.left = cursor.style.left;
        rings.style.top = cursor.style.top;
        document.body.appendChild(rings);
        setTimeout(() => rings.remove(), 1000);
    });

    document.addEventListener('mouseup', () => {
        isClicking = false;
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        clickTimeout = setTimeout(() => {
            cursor.classList.remove('clicking');
        }, 500);
    });
}

// Glitch Image Effect on Hover
function addGlitchEffect() {
    const images = document.querySelectorAll('.menu-item-image img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            const glitchInterval = setInterval(() => {
                const x = Math.random() * 10 - 5;
                const y = Math.random() * 10 - 5;
                const skewX = Math.random() * 10 - 5;
                const filters = [
                    'hue-rotate(${Math.random() * 360}deg)',
                    'saturate(${Math.random() * 5 + 1})',
                ];
                
                this.style.transform = `translate(${x}px, ${y}px) skew(${skewX}deg)`;
                this.style.filter = filters[Math.floor(Math.random() * filters.length)];
            }, 50);
            
            img.addEventListener('mouseleave', () => {
                clearInterval(glitchInterval);
                img.style.transform = '';
                img.style.filter = '';
            });
        });
    });
}

// Neon Trail Effect
function createNeonTrail() {
    const trail = [];
    const trailLength = 10;
    
    for(let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        document.body.appendChild(dot);
        trail.push(dot);
    }

    const style = document.createElement('style');
    style.textContent = `
        .trail-dot {
            position: fixed;
            width: 5px;
            height: 5px;
            background: var(--neon-pink);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
            transition: opacity 0.2s ease;
        }
    `;
    document.head.appendChild(style);

    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateTrail() {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
                dot.style.opacity = 1 - (index / trailLength);
            }, index * 50);
        });
        requestAnimationFrame(updateTrail);
    }
    updateTrail();
}

// Add unique nav button effects
function addUniqueNavButtonEffects() {
    const navButtons = document.querySelectorAll('.nav-links a');
    
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        .nav-links a {
            position: relative;
            padding: 8px 20px;
            margin: 0 5px;
            color: rgba(255, 255, 255, 0.8);
            font-family: 'Inter', sans-serif;
            font-size: 0.95em;
            text-decoration: none;
            letter-spacing: 1px;
            transition: all 0.25s ease;
            background: transparent;
            border: none;
            overflow: hidden;
            z-index: 1;
        }

        .nav-links a::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                #ff1b6b,
                #ff71a9,
                #45caff,
                #00ffff,
                #45caff,
                #ff71a9
            );
            background-size: 300% 100%;
            transform: translateX(-50%);
            transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 
                0 0 20px var(--neon-pink),
                0 0 40px var(--neon-blue),
                0 0 60px rgba(255, 255, 255, 0.4),
                0 0 80px rgba(255, 255, 255, 0.2),
                0 0 100px rgba(255, 71, 169, 0.3);
            animation: gradientMove 2s linear infinite;
        }

        @keyframes gradientMove {
            0% { background-position: 0% 0%; }
            100% { background-position: 150% 0%; }
        }

        .nav-links a:hover {
            color: #fff;
            text-shadow: 
                0 0 20px var(--neon-pink),
                0 0 40px var(--neon-blue),
                0 0 60px rgba(255, 255, 255, 0.6),
                0 0 80px rgba(255, 255, 255, 0.4),
                0 0 100px rgba(255, 255, 255, 0.2),
                0 0 120px rgba(255, 71, 169, 0.3),
                0 0 140px rgba(69, 202, 255, 0.2);
        }

        .nav-links a:hover::before {
            width: 100%;
            box-shadow: 
                0 0 25px var(--neon-pink),
                0 0 50px var(--neon-blue),
                0 0 75px rgba(255, 255, 255, 0.4),
                0 0 100px rgba(255, 255, 255, 0.2),
                0 0 125px rgba(255, 71, 169, 0.3),
                0 0 150px rgba(69, 202, 255, 0.2);
        }

        .nav-links a:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(navStyle);

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => button.style.transform = '', 150);
        });
    });
} 