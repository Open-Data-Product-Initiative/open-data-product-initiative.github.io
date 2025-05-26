// Carousel Verification Script
// This script checks if the testimonials carousel is working properly

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(verifyCarousel, 500);
    });
    
    function verifyCarousel() {
        console.log('=== Carousel Verification Starting ===');
        
        const results = {
            dependencies: checkDependencies(),
            elements: checkElements(),
            initialization: checkInitialization(),
            navigation: checkNavigation(),
            responsive: checkResponsive()
        };
        
        displayResults(results);
    }
    
    function checkDependencies() {
        const checks = {};
        
        // Check jQuery
        checks.jquery = typeof window.jQuery !== 'undefined';
        if (checks.jquery) {
            checks.jqueryVersion = window.jQuery.fn.jquery;
        }
        
        // Check Owl Carousel
        checks.owlCarousel = typeof window.jQuery !== 'undefined' && 
                           typeof window.jQuery.fn.owlCarousel !== 'undefined';
        
        return checks;
    }
    
    function checkElements() {
        const checks = {};
        
        // Check main carousel element
        checks.carouselElement = document.querySelector('.owl-carousel') !== null;
        checks.carouselItems = document.querySelectorAll('.owl-carousel .iteam').length;
        
        // Check navigation elements
        checks.navContainer = document.querySelector('.custom-nav') !== null;
        checks.prevButton = document.querySelector('.custom-nav .prev') !== null;
        checks.nextButton = document.querySelector('.custom-nav .next') !== null;
        
        // Check images
        checks.arrowImages = {
            prev: document.querySelector('.custom-nav .prev img') !== null,
            next: document.querySelector('.custom-nav .next img') !== null
        };
        
        return checks;
    }
    
    function checkInitialization() {
        const checks = {};
        const carousel = document.querySelector('.owl-carousel');
        
        if (carousel) {
            // Check if Owl Carousel has been initialized
            checks.owlInitialized = carousel.classList.contains('owl-loaded');
            checks.owlStage = carousel.querySelector('.owl-stage') !== null;
            checks.owlItems = carousel.querySelectorAll('.owl-item').length;
            
            // Check if items are visible
            const activeItems = carousel.querySelectorAll('.owl-item.active');
            checks.activeItems = activeItems.length;
            checks.visibleItems = Array.from(activeItems).filter(item => 
                item.offsetWidth > 0 && item.offsetHeight > 0
            ).length;
        } else {
            checks.error = 'Carousel element not found';
        }
        
        return checks;
    }
    
    function checkNavigation() {
        const checks = {};
        
        const prevBtn = document.querySelector('.custom-nav .prev');
        const nextBtn = document.querySelector('.custom-nav .next');
        
        if (prevBtn && nextBtn) {
            // Check if buttons have click handlers
            checks.prevClickable = prevBtn.onclick !== null || 
                                 hasEventListener(prevBtn, 'click');
            checks.nextClickable = nextBtn.onclick !== null || 
                                 hasEventListener(nextBtn, 'click');
            
            // Check button visibility
            checks.buttonsVisible = {
                prev: isVisible(prevBtn),
                next: isVisible(nextBtn)
            };
        } else {
            checks.error = 'Navigation buttons not found';
        }
        
        return checks;
    }
    
    function checkResponsive() {
        const checks = {};
        const carousel = document.querySelector('.owl-carousel');
        
        if (carousel && window.jQuery && carousel.classList.contains('owl-loaded')) {
            const $carousel = window.jQuery(carousel);
            const settings = $carousel.data('owl.carousel').settings;
            
            checks.hasResponsiveSettings = settings.responsive !== undefined;
            checks.responsiveBreakpoints = settings.responsive ? 
                Object.keys(settings.responsive) : [];
        }
        
        return checks;
    }
    
    function hasEventListener(element, eventType) {
        // This is a simplified check - in real scenarios, 
        // event listeners might not be easily detectable
        return element.getAttribute('onclick') !== null;
    }
    
    function isVisible(element) {
        return element.offsetWidth > 0 && element.offsetHeight > 0 && 
               window.getComputedStyle(element).visibility !== 'hidden';
    }
    
    function displayResults(results) {
        console.log('=== VERIFICATION RESULTS ===');
        
        // Dependencies
        console.group('Dependencies');
        console.log('jQuery:', results.dependencies.jquery ? '✓' : '✗');
        if (results.dependencies.jqueryVersion) {
            console.log('jQuery Version:', results.dependencies.jqueryVersion);
        }
        console.log('Owl Carousel:', results.dependencies.owlCarousel ? '✓' : '✗');
        console.groupEnd();
        
        // Elements
        console.group('Elements');
        console.log('Carousel Element:', results.elements.carouselElement ? '✓' : '✗');
        console.log('Carousel Items:', results.elements.carouselItems);
        console.log('Navigation Container:', results.elements.navContainer ? '✓' : '✗');
        console.log('Prev Button:', results.elements.prevButton ? '✓' : '✗');
        console.log('Next Button:', results.elements.nextButton ? '✓' : '✗');
        console.log('Arrow Images:', results.elements.arrowImages);
        console.groupEnd();
        
        // Initialization
        console.group('Initialization');
        if (results.initialization.error) {
            console.log('Error:', results.initialization.error);
        } else {
            console.log('Owl Initialized:', results.initialization.owlInitialized ? '✓' : '✗');
            console.log('Owl Stage:', results.initialization.owlStage ? '✓' : '✗');
            console.log('Owl Items:', results.initialization.owlItems);
            console.log('Active Items:', results.initialization.activeItems);
            console.log('Visible Items:', results.initialization.visibleItems);
        }
        console.groupEnd();
        
        // Navigation
        console.group('Navigation');
        if (results.navigation.error) {
            console.log('Error:', results.navigation.error);
        } else {
            console.log('Prev Clickable:', results.navigation.prevClickable ? '✓' : '✗');
            console.log('Next Clickable:', results.navigation.nextClickable ? '✓' : '✗');
            console.log('Buttons Visible:', results.navigation.buttonsVisible);
        }
        console.groupEnd();
        
        // Responsive
        console.group('Responsive');
        console.log('Has Responsive Settings:', results.responsive.hasResponsiveSettings ? '✓' : '✗');
        console.log('Breakpoints:', results.responsive.responsiveBreakpoints);
        console.groupEnd();
        
        // Overall Status
        const isWorking = results.dependencies.jquery && 
                         results.dependencies.owlCarousel &&
                         results.elements.carouselElement &&
                         results.initialization.owlInitialized &&
                         results.initialization.visibleItems > 0;
        
        console.log('=== OVERALL STATUS:', isWorking ? '✓ WORKING' : '✗ ISSUES DETECTED', '===');
        
        // Create visual indicator on page if possible
        createStatusIndicator(isWorking, results);
    }
    
    function createStatusIndicator(isWorking, results) {
        // Create a small status indicator on the page
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: ${isWorking ? '#28a745' : '#dc3545'};
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            cursor: pointer;
        `;
        indicator.textContent = `Carousel: ${isWorking ? 'OK' : 'ERROR'}`;
        indicator.title = 'Click to view details in console';
        indicator.onclick = () => displayResults(results);
        
        document.body.appendChild(indicator);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 10000);
    }
})();