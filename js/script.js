document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting slider initialization...');
  
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
  const slideActionButtonIndex = document.querySelector('.slide-action-button-index');

  // Debug: Check if elements exist
  console.log('Elements found:');
  console.log('slides:', slides.length);
  console.log('indicators:', indicators.length);
  console.log('navLeft:', navLeft);
  console.log('navRight:', navRight);
  console.log('slideTitle:', slideTitle);
  console.log('slideTitleIndex:', slideTitleIndex);
  console.log('slideActionButton:', slideActionButton);
  console.log('slideActionButtonIndex:', slideActionButtonIndex);

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
    './projects/vision-street-wear.html',    // Changed from '../vision-street-wear.html'
    './projects/denim-society.html',         // Changed from '/projects/denim-society.html'
    './projects/photography.html',           // Already correct
    './projects/croyds.html'               // Already correct
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

        if (slideActionButtonIndex) {
          slideActionButtonIndex.onclick = () => {
            console.log('slideActionButtonIndex clicked, opening:', slideLinks2[index]);
            window.open(slideLinks2[index], '_self'); 
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