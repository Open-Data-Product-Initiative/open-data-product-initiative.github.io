$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    items: 3,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: false,
    margin: 30,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      768: {
        items: 1
      },
      992: {
        items: 3
      }
    }
  });

  $('.custom-nav .prev').click(function () {
    $('.owl-carousel').trigger('prev.owl.carousel');
  });

  $('.custom-nav .next').click(function () {
    $('.owl-carousel').trigger('next.owl.carousel');
  });

  // Animation
  new WOW().init();

  // Flag to track if odometers have been animated
  var odometersAnimated = false;
  var smartCitiesOdometer, startupsOdometer, hubsOdometer;
  var isMobile = window.innerWidth < 768;

  // Function to detect if element is in viewport with offset
  function isInViewport(element, offset = 0) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight - offset) &&
      rect.bottom >= offset &&
      rect.left <= window.innerWidth &&
      rect.right >= 0
    );
  }

  // Initialize odometers once on page load
  function initializeOdometers() {
    // Get the elements
    var smartCitiesEl = document.getElementById('smart-cities-count');
    var startupsEl = document.getElementById('startups-count');
    var hubsEl = document.getElementById('hubs-count');

    if (smartCitiesEl && startupsEl && hubsEl) {
      // First set inner text to 0
      smartCitiesEl.innerText = '0';
      startupsEl.innerText = '0';
      hubsEl.innerText = '0';

      // Create odometers with adjusted durations for mobile
      smartCitiesOdometer = new Odometer({
        el: smartCitiesEl,
        value: 0,
        theme: 'minimal',
        format: '',
        duration: isMobile ? 1200 : 1500,
        animation: 'count'
      });

      startupsOdometer = new Odometer({
        el: startupsEl,
        value: 0,
        theme: 'minimal',
        format: '',
        duration: isMobile ? 1600 : 2000,
        animation: 'count'
      });

      hubsOdometer = new Odometer({
        el: hubsEl,
        value: 0,
        theme: 'minimal',
        format: '',
        duration: isMobile ? 1000 : 1200,
        animation: 'count'
      });

      // Set up scroll handler - with debounce for better performance
      var scrollTimeout;
      window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 50);
      });

      // Check immediately in case already visible
      handleScroll();
    }
  }

  // Handle scroll event
  function handleScroll() {
    // Don't check if already animated
    if (odometersAnimated) return;

    var statsSection = document.getElementById('partnership');
    if (!statsSection) return;

    // Use a smaller offset for mobile
    var viewportOffset = isMobile ? 50 : 100;

    // If stats section is in viewport
    if (isInViewport(statsSection, viewportOffset)) {
      // Trigger animation
      animateOdometers();

      // Remove scroll listener since we only need to animate once
      window.removeEventListener('scroll', handleScroll);
    }
  }

  // Animate the odometers with final values
  function animateOdometers() {
    if (odometersAnimated) return;

    // Get the elements
    var smartCitiesEl = document.getElementById('smart-cities-count');
    var startupsEl = document.getElementById('startups-count');
    var hubsEl = document.getElementById('hubs-count');

    if (!smartCitiesEl || !startupsEl || !hubsEl) return;

    // Get target values from data attributes
    var smartCitiesTarget = parseInt(smartCitiesEl.getAttribute('data-count'), 10);
    var startupsTarget = parseInt(startupsEl.getAttribute('data-count'), 10);
    var hubsTarget = parseInt(hubsEl.getAttribute('data-count'), 10);

    // Format for startups with comma (1,000)
    var startupsFormatted = startupsEl.getAttribute('data-formatted') || startupsTarget;

    // Update odometers - with a short delay between each one
    // Use shorter delays on mobile
    var stepDelay = isMobile ? 150 : 200;
    var startDelay = isMobile ? 300 : 400;

    setTimeout(function () {
      smartCitiesOdometer.update(smartCitiesTarget);

      setTimeout(function () {
        // For startups, first update with the numeric value
        startupsOdometer.update(startupsTarget);

        // Then update the HTML directly to show the formatted value with comma
        if (startupsEl.getAttribute('data-formatted')) {
          setTimeout(function () {
            startupsEl.innerHTML = startupsEl.getAttribute('data-formatted');
          }, isMobile ? 600 : 800);
        }

        setTimeout(function () {
          hubsOdometer.update(hubsTarget);

          // Set flag to indicate animation is complete
          odometersAnimated = true;
        }, stepDelay);
      }, stepDelay);
    }, startDelay);
  }

  // Check for window resize and update mobile flag
  window.addEventListener('resize', function () {
    isMobile = window.innerWidth < 768;
  });

  // Initialize everything
  initializeOdometers();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      window.scrollTo({
        top: targetElement.offsetTop - 80, // 80px offset for header
        behavior: 'smooth'
      });
    });
  });
});