
//=========HAMBURGER MENU TOGGLE=========

const hamburgerBtn = document.getElementById('hamburgerBtn');
const hamburgerBtnMenu = document.getElementById('hamburgerBtnMenu');
const body = document.body;

// Open the menu when clicking the main hamburger button
hamburgerBtn.addEventListener('click', function() {
  body.classList.add('menu-open');
});

hamburgerBtnMenu.addEventListener('click', function() {
  body.classList.add('menu-closing');
  
  setTimeout(function() {
    body.classList.remove('menu-open');
    body.classList.remove('menu-closing');
  }, 0); // Enough time for the transitions to complete
});






//=========CONSOLIDATED DOM CONTENT LOADED=========

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing components...');






  //=========FADE ANIMATIONS=========
  
  // Initial check for elements in viewport on page load
  const elements = document.querySelectorAll('.fade-in-up');
  checkVisibility(elements);
  
  // Check again when scrolling
  window.addEventListener('scroll', function() {
    checkVisibility(elements);
  });
  
  function checkVisibility(elements) {
    elements.forEach(element => {
      // Get element position relative to viewport
      const position = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If element is in viewport (with some buffer)
      if (position.top < windowHeight * 0.9) {
        element.classList.add('visible');
      }
    });
  }
  




  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');
  const slideTitle = document.querySelector('.slide-title');
  const slideNumber = document.querySelector('.slide-number');
  const yearDescription = document.querySelector('.year-description');
  const clientDescription = document.querySelector('.client-description');
  const dutyDescription = document.querySelector('.duty-description');
  const toolsDescription = document.querySelector('.tools-description');
  const slideActionButton = document.querySelector('.slide-action-button');
 
  // Array of titles corresponding to each slide
  const slideTitles = [
    'Vision Street Wear Graphic/Web Design',
    'Denim Society Graphic/Web Design',
    'Photography',
    'Croyds Videography',
    'Title for Slide 5'
  ];

  // Corresponding slide numbers
  const slideNumbers = [
    '01',
    '02',
    '03',
    '04',
    '05'
  ];

  const yearDescriptions = [
    '2022 - 2023',
    '2022 - 2023',
    'n/a',
    '2025',
    '2024'
  ];

  const clientDescriptions = [
    'Vision Street Wear',
    'Denim Society',
    'Various',
    'Croyds',
    '2024'
  ];

  const dutyDescriptions = [
    'GRAPHIC DESIGN<br>WEB DESIGN<br>MOTION DESIGN',
    'GRAPHIC DESIGN<br>WEB DESIGN',
    'Photoshoots<br>choreography<br>editing',
    'Videoshoots<br>Planning<br>editing',
    '2024'
  ];

  const toolsDescriptions = [
    'PHOTOSHOP SHOPIFY<br>HTML<br>CSS',
    'PHOTOSHOP SHOPIFY<br>HTML<br>CSS',
    'Lightroom<br>Photoshop',
    'After Effects<br>Premiere Pro<br>Photoshop',
    '2024'
  ];

  const slideLinks = [
    '/projects/vision-street-wear.html',
    '/projects/denim-society.html',
    '/projects/photography.html',
    '/projects/croyds.html',
    'https://link-for-slide-5.com'
  ];
 
  let currentIndex = 0;
 
  // Reset slides
  function resetSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === currentIndex) {
        slide.classList.add('active');
        
        // Update the title and make it clickable
        slideTitle.innerHTML = slideTitles[index];
        slideTitle.style.cursor = 'pointer'; // Change cursor to indicate it's clickable
        
        // Set up click handler for the slide title
        slideTitle.onclick = () => {
          window.open(slideLinks[index], '_self');        };
        
        // Update other elements
        slideNumber.innerHTML = slideNumbers[index];
        yearDescription.innerHTML = yearDescriptions[index];
        clientDescription.innerHTML = clientDescriptions[index];
        dutyDescription.innerHTML = dutyDescriptions[index];
        toolsDescription.innerHTML = toolsDescriptions[index];
        
        // Set action button link
        slideActionButton.onclick = () => {
          window.open(slideLinks[index], '_self');        };
      }
    });
  }
 
  // Update progress indicators
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
 
  // Next slide functionality
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    resetSlides();
    updateIndicators();
  }
 
  // Previous slide functionality
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    resetSlides();
    updateIndicators();
  }
 
  // Initial setup
  resetSlides();
  updateIndicators(); // Added this to ensure indicators are properly set on page load
 
  // Add click listeners to navigation buttons
  navRight.addEventListener('click', nextSlide);
  navLeft.addEventListener('click', prevSlide);
 
  // Add click listeners to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      resetSlides();
      updateIndicators();
    });
  });
});













//=========COMPARISON SLIDER=========

let isDragging = false;
        let container = document.getElementById('comparisonWrapper');
        let sliderLine = document.getElementById('dividerLine');
        let sliderButton = document.getElementById('dragHandle');
        let afterImage = document.getElementById('imageAfter');

        function updateSlider(percentage) {
            // Clamp percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            // Update slider line position
            sliderLine.style.left = percentage + '%';
            sliderButton.style.left = percentage + '%';
            
            // Update after image clip path
            afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
        }

        function getPercentageFromEvent(e) {
            let rect = container.getBoundingClientRect();
            let x = (e.clientX || e.touches[0].clientX) - rect.left;
            return (x / rect.width) * 100;
        }

        // Mouse events
        sliderButton.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(getPercentageFromEvent(e));
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSlider(getPercentageFromEvent(e));
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events for mobile
        sliderButton.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(getPercentageFromEvent(e));
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSlider(getPercentageFromEvent(e));
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Prevent image dragging
        container.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        // Initialize slider at 50%
        updateSlider(50);