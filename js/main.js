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

  // Initialize odometers once on page load
  function initializeOdometers() {
    // Get the elements
    var smartCitiesEl = document.getElementById('smart-cities-count');
    var startupsEl = document.getElementById('startups-count');
    var hubsEl = document.getElementById('hubs-count');

    if (smartCitiesEl && startupsEl && hubsEl) {
      // Create odometers with their final values to avoid flickering
      var smartCitiesTarget = parseInt(smartCitiesEl.getAttribute('data-count'), 10);
      var startupsTarget = parseInt(startupsEl.getAttribute('data-count'), 10);
      var hubsTarget = parseInt(hubsEl.getAttribute('data-count'), 10);

      // First set inner text to 0
      smartCitiesEl.innerText = '0';
      startupsEl.innerText = '0';
      hubsEl.innerText = '0';

      // Create odometers
      smartCitiesOdometer = new Odometer({
        el: smartCitiesEl,
        value: 0,
        theme: 'minimal',
        format: '',
        duration: 1500,
        animation: 'count'
      });

      startupsOdometer = new Odometer({
        el: startupsEl,
        value: 0,
        theme: 'minimal',
        format: '',
        duration: 2000,
        animation: 'count'
      });

      hubsOdometer = new Odometer({
        el: hubsEl,
        value: 0,
        theme: 'minimal',
        format: '',
        duration: 1200,
        animation: 'count'
      });

      // Set up scroll handler
      window.addEventListener('scroll', handleScroll);

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

    var rect = statsSection.getBoundingClientRect();

    // If stats section is in viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
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
    setTimeout(function () {
      smartCitiesOdometer.update(smartCitiesTarget);

      setTimeout(function () {
        // For startups, first update with the numeric value
        startupsOdometer.update(startupsTarget);

        // Then update the HTML directly to show the formatted value with comma
        if (startupsEl.getAttribute('data-formatted')) {
          setTimeout(function () {
            startupsEl.innerHTML = startupsEl.getAttribute('data-formatted');
          }, 800);
        }

        setTimeout(function () {
          hubsOdometer.update(hubsTarget);

          // Set flag to indicate animation is complete
          odometersAnimated = true;
        }, 200);
      }, 200);
    }, 400);
  }

  // Initialize everything
  initializeOdometers();
});