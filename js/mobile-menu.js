// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(function() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const body = document.body;
        
        if (!navbarToggler || !navbarCollapse) {
            console.log('Mobile menu elements not found');
            return;
        }
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    body.appendChild(overlay);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'mobile-menu-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    navbarCollapse.appendChild(closeButton);
    
    // Toggle menu function
    function toggleMenu() {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Open menu function
    function openMenu() {
        navbarCollapse.classList.add('show');
        overlay.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open'); // Prevent body scroll
    }
    
    // Close menu function
    function closeMenu() {
        navbarCollapse.classList.remove('show');
        overlay.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open'); // Restore body scroll
    }
    
    // Event listeners
    navbarToggler.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
    });
    
    overlay.addEventListener('click', function() {
        closeMenu();
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMenu();
        }
    });
    }, 100); // End setTimeout
}); 