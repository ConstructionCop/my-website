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
  
  //=========PROJECT SLIDER=========
  
  
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');
  const slideTitle = document.querySelector('.slide-title');
  const slideTitleIndex = document.querySelector('.slide-title-index');
  const slideNumber = document.querySelector('.slide-number');
  const yearDescription = document.querySelector('.year-description');
  const clientDescription = document.querySelector('.client-description');
  const dutyDescription = document.querySelector('.duty-description');
  const toolsDescription = document.querySelector('.tools-description');
  const slideActionButton = document.querySelector('.slide-action-button');

  // Debug: Check if elements exist
  console.log('Elements found:');
  console.log('slides:', slides.length);
  console.log('indicators:', indicators.length);
  console.log('navLeft:', navLeft);
  console.log('navRight:', navRight);
  console.log('slideTitle:', slideTitle);
  console.log('slideTitleIndex:', slideTitleIndex);
  console.log('slideActionButton:', slideActionButton);

  // Array of titles corresponding to each slide
  const slideTitles = [
    'Vision Street Wear<br>E-Commerce',
    'Denim Society<br>E-Commerce',
    'Photography',
    'Croyds Videography'
  ];

  // Corresponding slide numbers
  const slideNumbers = [
    '01',
    '02',
    '03',
    '04'
  ];

  const yearDescriptions = [
    '2022 - 2023',
    '2022 - 2023',
    'n/a',
    '2025'
  ];

  const clientDescriptions = [
    'Vision Street Wear',
    'Denim Society',
    'Various',
    'Croyds'
  ];

  const dutyDescriptions = [
    'GRAPHIC DESIGN<br>WEB DESIGN<br>MOTION DESIGN',
    'GRAPHIC DESIGN<br>WEB DESIGN',
    'Photoshoots<br>choreography<br>editing',
    'Videoshoots<br>Planning<br>editing'
  ];

  const toolsDescriptions = [
    'PHOTOSHOP SHOPIFY<br>HTML<br>CSS',
    'PHOTOSHOP SHOPIFY<br>HTML<br>CSS',
    'Lightroom<br>Photoshop',
    'After Effects<br>Premiere Pro<br>Photoshop'  ];

  const slideLinks = [
    '../projects/vision-street-wear.html', 
    '../projects/denim-society.html',
    '../projects/photography.html',
    '../projects/croyds.html'
  ];

  const slideLinks2 = [
    '../projects/vision-street-wear.html',    
    '../projects/denim-society.html',         
    '../projects/photography.html',           
    '/projects/croyds.html'               
  ];
  
  // Determine initial slide based on current page
  function getInitialSlideIndex() {
    const currentPath = window.location.pathname;
    const currentHref = window.location.href;
    const currentFilename = currentPath.split('/').pop();
    
    console.log('=== PAGE DETECTION DEBUG ===');
    console.log('Full URL:', currentHref);
    console.log('Current path:', currentPath);
    console.log('Current filename:', currentFilename);
    
    // Check multiple ways to detect the vision-street-wear page
    if (currentPath.includes('vision-street-wear.html') || 
        currentHref.includes('vision-street-wear.html') || 
        currentFilename === 'vision-street-wear.html') {
      console.log('✅ DETECTED: On vision-street-wear page, starting with slide 2 (index 1)');
      return 1; // Second slide (Denim Society)
    }
    
    // Default to first slide for all other pages
    console.log('❌ NOT DETECTED: Default page, starting with slide 1 (index 0)');
    return 0;
  }
  
  let currentIndex = getInitialSlideIndex();
  console.log('Initial currentIndex set to:', currentIndex);
 
  // Reset slides
  function resetSlides() {
    console.log('resetSlides called, currentIndex:', currentIndex);
    
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === currentIndex) {
        slide.classList.add('active');
        console.log('Setting slide', index, 'as active');
        
        // Update the first title and make it clickable
        if (slideTitle) {
          slideTitle.innerHTML = slideTitles[index];
          slideTitle.style.cursor = 'pointer';
          slideTitle.onclick = () => {
            console.log('slideTitle clicked, opening:', slideLinks[index]);
            window.open(slideLinks[index], '_self');
          };
        }

        // Update the second title and make it clickable
        if (slideTitleIndex) {
          slideTitleIndex.innerHTML = slideTitles[index];
          slideTitleIndex.style.cursor = 'pointer';
          slideTitleIndex.onclick = () => {
            console.log('slideTitleIndex clicked, opening:', slideLinks2[index]);
            window.open(slideLinks2[index], '_self');
          };
        }
        
        // Update other elements
        if (slideNumber) slideNumber.innerHTML = slideNumbers[index];
        if (yearDescription) yearDescription.innerHTML = yearDescriptions[index];
        if (clientDescription) clientDescription.innerHTML = clientDescriptions[index];
        if (dutyDescription) dutyDescription.innerHTML = dutyDescriptions[index];
        if (toolsDescription) toolsDescription.innerHTML = toolsDescriptions[index];
        
        // Set action button links
        if (slideActionButton) {
          slideActionButton.onclick = () => {
            console.log('slideActionButton clicked, opening:', slideLinks[index]);
            window.open(slideLinks[index], '_self');
          };
        }
      }
    });
  }
 
  // Update progress indicators
  function updateIndicators() {
    console.log('updateIndicators called');
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
    console.log('nextSlide called, current index:', currentIndex);
    currentIndex = (currentIndex + 1) % slides.length;
    console.log('new index:', currentIndex);
    resetSlides();
    updateIndicators();
  }
 
  // Previous slide functionality
  function prevSlide() {
    console.log('prevSlide called, current index:', currentIndex);
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    console.log('new index:', currentIndex);
    resetSlides();
    updateIndicators();
  }
 
  // Initial setup
  console.log('Running initial setup...');
  resetSlides();
  updateIndicators();
 
  // Add click listeners to navigation buttons
  if (navRight) {
    navRight.addEventListener('click', nextSlide);
    console.log('navRight click listener added');
  } else {
    console.log('ERROR: navRight element not found!');
  }
  
  if (navLeft) {
    navLeft.addEventListener('click', prevSlide);
    console.log('navLeft click listener added');
  } else {
    console.log('ERROR: navLeft element not found!');
  }
 
  // Add click listeners to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      console.log('Indicator', index, 'clicked');
      currentIndex = index;
      resetSlides();
      updateIndicators();
    });
  });
  
  console.log('Slider initialization complete');
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










        