// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Add a slight delay to the outline for a fluid effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 150, fill: 'forwards' });
});

// Add hover effect to cursor when hovering over links/buttons/cards
const hoverElements = document.querySelectorAll('a, button, .card, select, input, textarea');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover-active');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover-active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: stop observing once animated
        }
    });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right');
animatedElements.forEach(el => observer.observe(el));

// Form Submission handling (prevent default for demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple animation to show success
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.textContent = 'We will get back to you! ✓';
            btn.style.background = '#27c93f';
            btn.style.opacity = '1';
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Interactive 3D Tilt Effect for Cards
const cards = document.querySelectorAll('.card.glass, .project-card.glass');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8deg
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${-rotateY}px ${rotateX}px 25px rgba(0, 240, 255, 0.15)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.boxShadow = 'none';
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // Instant response when mouse enters
    });
});

// Virtual Developer Typing Effect
const virtualBg = document.getElementById('virtualTypingBg');
if (virtualBg) {
    const codeSnippets = `
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database } from '@supabase/supabase-js';

export const EngineeringStudent = ({ skills }) => {
    const [isReady, setIsReady] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function buildPortfolio() {
            const data = await Database.fetch('projects');
            if (data.length >= 5 && skills.includes('React')) {
                setIsReady(true);
            }
        }
        buildPortfolio();
    }, [skills]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1>Zeredcode Launchpad Active</h1>
            {isReady ? <EnterpriseDeveloper /> : <LearningTrack />}
        </motion.div>
    );
};

// INITIALIZING SYSTEM...
// CONNECTING TO MENTOR NETWORK...
// COMPILING ASSETS...
// DEPLOYING TO PRODUCTION...
// SUCCESS: HTTP 200 OK.
`;
    
    let index = 0;
    
    function typeCode() {
        if (index < codeSnippets.length) {
            virtualBg.textContent += codeSnippets.charAt(index);
            index++;
            
            // Randomize typing speed for realism (10ms to 30ms)
            let speed = Math.random() * 20 + 10;
            
            virtualBg.scrollTop = virtualBg.scrollHeight;
            
            setTimeout(typeCode, speed);
        } else {
            // Reset and loop after a pause
            setTimeout(() => {
                virtualBg.textContent = '';
                index = 0;
                typeCode();
            }, 4000);
        }
    }

    setTimeout(typeCode, 1000);
}
