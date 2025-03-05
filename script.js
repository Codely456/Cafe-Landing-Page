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
const menuItems = document.querySelectorAll('.menu-item-content');

menuItems.forEach(item => {
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

// Navigation Active State and Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Burger Menu Toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            nav.classList.remove('active');
            burger.classList.remove('active');

            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active Navigation State
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Navbar Background Change on Scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove background class based on scroll position
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 45, 149, 0.3)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}); 