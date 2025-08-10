    /* --------------------------------- */
    /* --- JAVASCRIPT & GSAP LOGIC --- */
    /* --------------------------------- */
    
    document.addEventListener('DOMContentLoaded', () => {

        // --- Register GSAP Plugins ---
        gsap.registerPlugin(ScrollTrigger);
        
        // --- Header Scroll Effect ---
        const header = document.getElementById('main-header');
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top -100px',
            end: 'bottom top',
            onUpdate: self => {
                if (self.direction === 1) { // Scrolling down
                    header.classList.add('scrolled');
                } else { // Scrolling up
                    if (window.scrollY <= 100) {
                        header.classList.remove('scrolled');
                    }
                }
            }
        });

        // --- Mobile Menu Toggle ---
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // ===================================
        // --- GSAP ANIMATIONS ---
        // ===================================

        // --- 1. Hero Section Animation ---
        // Animate hero elements on page load
        gsap.from('.anim-hero', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5
        });

        // Hero Parallax effect for the content on scroll
        gsap.to('.hero-content', {
            yPercent: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // --- 2. Section Title Animation ---
        // Animate all section titles when they scroll into view
        const sectionTitles = gsap.utils.toArray('.anim-title');
        sectionTitles.forEach(title => {
            gsap.from(title, {
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        });

        // --- 3. Destination Cards Animation ---
        // Staggered fade-in and slide-up animation for destination cards
        gsap.from('.anim-card', {
            duration: 0.8,
            y: 100,
            opacity: 0,
            scale: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#destinations .destinations-grid',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        // --- 4. Packages Section - 3D Flip on Hover ---
        const packageCards = document.querySelectorAll('.package-card');
        packageCards.forEach(card => {
            // We use GSAP for a smoother, physics-based animation
            const flip = gsap.to(card, {
                rotationY: 180,
                duration: 0.7,
                ease: 'power2.inOut',
                paused: true // Start paused
            });

            card.addEventListener('mouseenter', () => flip.play());
            card.addEventListener('mouseleave', () => flip.reverse());
        });

        // --- 5. "Why Us" Features Animation ---
        // Staggered scale-in animation for feature icons
        gsap.from('.anim-feature', {
            duration: 0.6,
            scale: 0.5,
            opacity: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#why-us .why-us-grid',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        // --- 6. Testimonials Animation ---
        // Slide-in effect for testimonial cards, alternating direction
        const testimonials = gsap.utils.toArray('.anim-testimonial');
        testimonials.forEach((card, index) => {
            gsap.from(card, {
                duration: 0.9,
                x: (index % 2 === 0) ? -100 : 100, // Slide from left for even, right for odd
                opacity: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        });

        // --- 7. Contact Form Animation ---
        // Staggered fade-in for form elements
        gsap.from('.anim-form', {
            duration: 0.7,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        });

    });

	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
