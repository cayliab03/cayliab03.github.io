/**
 * Caylia Bonnick Portfolio - Master Interaction Logic
 */

// 1. Force page to the top immediately to prevent #about skipping
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

let bootStarted = false; // Guard to prevent double-typing

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. BOOT LOADER LOGIC ---
    const bootText = '>>> print("Hello World!")';
    const bootElement = document.getElementById('boot-text');
    const loader = document.getElementById('loader');
    const mainNav = document.getElementById('main-nav');
    const homeContent = document.getElementById('home-content');
    const scrollArrow = document.getElementById('scroll-arrow');
    
    let i = 0;

    function typeWriter() {
        if (bootStarted || !bootElement) return;
        if (i < bootText.length) {
            bootElement.innerHTML += bootText.charAt(i);
            i++;
            setTimeout(typeWriter, 80); 
        } else {
            // Snap to Python Colors
            bootElement.innerHTML = `
                <span class="text-[#FF5555]">>>> </span>
                <span class="text-[#FF79C6]">print</span><span class="text-white">(</span><span class="text-[#50FA7B]">"Hello World!"</span><span class="text-white">)</span>
            `;
            
            // Add the "Output" line for realism
            const output = document.createElement('div');
            output.className = "text-white mt-2 opacity-0 transition-opacity duration-500 font-mono";
            output.innerHTML = "Hello World!";
            bootElement.parentElement.appendChild(output);
            
            setTimeout(() => output.classList.replace('opacity-0', 'opacity-100'), 300);

            bootStarted = true;
            setTimeout(revealSite, 1200);
        }
    }

    function revealSite() {
        if (loader) loader.style.opacity = '0';
        
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
            
            // Reveal Nav and Hero together
            mainNav?.classList.replace('opacity-0', 'opacity-100');
            homeContent?.classList.replace('opacity-0', 'opacity-100');
            
            // Reveal Arrow last
            setTimeout(() => {
                scrollArrow?.classList.replace('opacity-0', 'opacity-100');
            }, 800);
        }, 1000);
    }

    if (bootElement) typeWriter();

    // --- 2. NAVIGATION & MOBILE MENU ---
    const nav = document.getElementById('main-nav');
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu?.querySelectorAll('a');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('nav-glass', 'py-3');
            nav?.classList.remove('py-5');
        } else {
            nav?.classList.remove('nav-glass', 'py-3');
            nav?.classList.add('py-5');
        }
    });

    // Mobile Menu Toggle
    menuBtn?.addEventListener('click', () => {
        mobileMenu?.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu?.classList.replace('opacity-0', 'opacity-100');
        }, 10);
    });

    const hideMenu = () => {
        mobileMenu?.classList.replace('opacity-100', 'opacity-0');
        setTimeout(() => {
            mobileMenu?.classList.add('hidden');
        }, 300);
    };

    closeBtn?.addEventListener('click', hideMenu);
    menuLinks?.forEach(link => link.addEventListener('click', hideMenu));

    // --- 3. SCROLL REVEAL OBSERVER ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');

                const logo = entry.target.querySelector('.logo-icon, .scroll-reveal-logo');
                if (logo) logo.classList.remove('grayscale');

                // Profile Pic Specific Logic
                if (entry.target.id === 'profile-pic') {
                    entry.target.classList.remove('grayscale');
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.education-card, #profile-pic').forEach((el) => {
        revealObserver.observe(el);
    });

    // --- 4. SWIPER CONFIG ---
    const swiper = new Swiper(".projectSwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        coverflowEffect: {
            rotate: 20,
            stretch: -100,
            depth: 400,
            modifier: 1,
            slideShadows: true,
        },
        pagination: { el: ".swiper-pagination", clickable: true },
        keyboard: { enabled: true },
        mousewheel: { forceToAxis: true },
    });
});

/**
 * 4. CONTACT - COPY EMAIL FUNCTION
 */
function copyEmail() {
    const email = "cayliab@gmail.com";
    navigator.clipboard.writeText(email);
    const status = document.getElementById('copy-status');
    if (status) {
        status.classList.replace('opacity-0', 'opacity-100');
        setTimeout(() => {
            status.classList.replace('opacity-100', 'opacity-0');
        }, 2000);
    }
}

/**
 * 5. EXPERIENCE TABS LOGIC
 */
function showTab(tabId) {
    // Reset all Tabs
    document.querySelectorAll('.exp-tab').forEach(btn => {
        btn.classList.remove('active-tab');
        btn.querySelector('img')?.classList.add('grayscale');
        btn.querySelector('.job-title-accent')?.classList.replace('text-[#00F5FF]', 'text-white');
    });

    // Hide all Content
    document.querySelectorAll('.exp-content').forEach(content => content.classList.add('hidden'));

    // Activate selected
    const activeBtn = document.getElementById('btn-' + tabId);
    const activeContent = document.getElementById('content-' + tabId);

    if (activeBtn) {
        activeBtn.classList.add('active-tab');
        activeBtn.querySelector('img')?.classList.remove('grayscale');
        activeBtn.querySelector('.job-title-accent')?.classList.replace('text-white', 'text-[#00F5FF]');
    }
    activeContent?.classList.remove('hidden');
}