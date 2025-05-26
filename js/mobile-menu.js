// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Remove the separate close button - we'll use the toggle button itself
    
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
        body.classList.add('menu-open');
        
        // Change hamburger icon to close icon
        const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon i');
        if (togglerIcon) {
            togglerIcon.className = 'fas fa-times';
        }
    }
    
    // Close menu function
    function closeMenu() {
        navbarCollapse.classList.remove('show');
        overlay.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
        
        // Change close icon back to hamburger icon
        const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon i');
        if (togglerIcon) {
            togglerIcon.className = 'fas fa-bars';
        }
    }
    
    // Event listeners
    navbarToggler.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Close button event listener removed - using toggle button instead
    
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
}); 