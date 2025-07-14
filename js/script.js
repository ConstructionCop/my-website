document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting script initialization...');
  
  // Initialize slider functionality
  initSlider();
  
  // Initialize random character animation
  initRandomCharacterAnimation();
  
  // Initialize hamburger menu
  initHamburgerMenu();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  console.log('All scripts initialization complete.');
});

// Initialize hamburger menu functionality
function initHamburgerMenu() {
  console.log('Initializing hamburger menu...');
  
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const hamburgerBtnMenu = document.getElementById('hamburgerBtnMenu');
  const body = document.body;

  // Check if elements exist before adding listeners
  if (hamburgerBtn && hamburgerBtnMenu && body) {
    // Open the menu when clicking the main hamburger button
    hamburgerBtn.addEventListener('click', function() {
      body.classList.add('menu-open');
      console.log('Menu opened');
    });

    // Close the menu when clicking the menu hamburger button
    hamburgerBtnMenu.addEventListener('click', function() {
      body.classList.add('menu-closing');
      console.log('Menu closing...');
      
      setTimeout(function() {
        body.classList.remove('menu-open');
        body.classList.remove('menu-closing');
        console.log('Menu closed');
      }, 0); // Enough time for the transitions to complete
    });
    
    console.log('Hamburger menu listeners added successfully');
  } else {
    console.log('Warning: Hamburger menu elements not found');
    console.log('hamburgerBtn:', hamburgerBtn);
    console.log('hamburgerBtnMenu:', hamburgerBtnMenu);
    console.log('body:', body);
  }
}

// Initialize scroll animations functionality
function initScrollAnimations() {
  console.log('Initializing scroll animations...');
  
  // Get all elements with fade-in-up class
  const elements = document.querySelectorAll('.fade-in-up');
  
  if (elements.length > 0) {
    console.log('Found', elements.length, 'elements with fade-in-up class');
    
    // Initial check for elements in viewport on page load
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
    
    console.log('Scroll animations initialized successfully');
  } else {
    console.log('No elements with fade-in-up class found');
  }
}

// Initialize slider functionality
function initSlider() {
  console.log('Initializing slider...');
  
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
    'After Effects<br>Premiere Pro<br>Photoshop'
  ];

  const slideLinks = [
    '../projects/vision-street-wear.html', 
    '../projects/denim-society.html',
    '../projects/photography.html',
    '../projects/croyds.html'
  ];

  const slideLinks2 = [
    './projects/vision-street-wear.html',
    './projects/denim-society.html',
    './projects/photography.html',
    './projects/croyds.html'
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
}

// Define a RandomCharacterAnimation class
class RandomCharacterAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.originalText = element.innerText;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    this.iterations = options.iterations || 10;
    this.speed = options.speed || 50;
    this.isAnimating = false;
    this.animationFrames = [];
    
    // Get the parent element (either button or anchor)
    this.parentElement = this.findParent(element, ['button', 'a']);
    
    if (this.parentElement) {
      // Bind event listeners to the parent element
      this.parentElement.addEventListener('mouseenter', this.startAnimation.bind(this));
      this.parentElement.addEventListener('mouseleave', this.stopAnimation.bind(this));
      
      // Ensure Safari can click during animation by setting pointer-events explicitly
      this.parentElement.style.pointerEvents = 'auto';
      this.element.style.pointerEvents = 'none';
    }
  }
  
  // Helper function to find parent element by tag names (array)
  findParent(element, tagNames) {
    let currentElement = element;
    while (currentElement) {
      if (tagNames.includes(currentElement.tagName.toLowerCase())) {
        return currentElement;
      }
      currentElement = currentElement.parentElement;
    }
    return null;
  }
  
  getRandomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
  
  animateChar(index, iteration) {
    if (!this.isAnimating) return;
    
    const text = this.element.innerText.split('');
    
    // Replace the character at index with a random character
    if (iteration < this.iterations) {
      text[index] = this.getRandomChar();
      this.element.innerText = text.join('');
      
      // Continue animation for this character
      const timeoutId = setTimeout(() => {
        this.animateChar(index, iteration + 1);
      }, this.speed);
      
      this.animationFrames.push(timeoutId);
    } else {
      // Restore original character at this position
      text[index] = this.originalText[index];
      this.element.innerText = text.join('');
    }
  }
  
  startAnimation() {
    this.isAnimating = true;
    
    // Start animation for each character with slight delay
    for (let i = 0; i < this.originalText.length; i++) {
      const timeoutId = setTimeout(() => {
        this.animateChar(i, 0);
      }, i * 50);
      
      this.animationFrames.push(timeoutId);
    }
  }
  
  stopAnimation() {
    this.isAnimating = false;
    
    // Clear all animation frames
    this.animationFrames.forEach(id => clearTimeout(id));
    this.animationFrames = [];
    
    // Reset text immediately
    this.element.innerText = this.originalText;
  }
}

// Initialize random character animation
function initRandomCharacterAnimation() {
  console.log('Initializing random character animation...');
  
  // Process slide-action-buttons
  const actionButtons = document.querySelectorAll('.slide-action-button');
  actionButtons.forEach(button => {
    // Make sure the button always remains clickable
    button.style.position = 'relative';
    button.style.pointerEvents = 'auto';
    
    // Extract text content (first text node)
    let textNode = null;
    for (const node of button.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        textNode = node;
        break;
      }
    }
    
    if (textNode) {
      const buttonText = textNode.nodeValue.trim();
      
      // Create a new span for the text
      const textSpan = document.createElement('span');
      textSpan.className = 'button-text';
      textSpan.innerText = buttonText;
      textSpan.style.pointerEvents = 'none'; // Ensure text can't capture clicks
      
      // Replace the text node with the span
      button.replaceChild(textSpan, textNode);
      
      // Initialize the animation on the text span
      new RandomCharacterAnimation(textSpan, {
        iterations: 8,
        speed: 30
      });
    }
  });
  
  // Process slide-action-button-index elements
  const actionButtonsIndex = document.querySelectorAll('.slide-action-button-index');
  actionButtonsIndex.forEach(button => {
    // Make sure the button always remains clickable
    button.style.position = 'relative';
    button.style.pointerEvents = 'auto';
    
    // Extract text content (first text node)
    let textNode = null;
    for (const node of button.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        textNode = node;
        break;
      }
    }
    
    if (textNode) {
      const buttonText = textNode.nodeValue.trim();
      
      // Create a new span for the text
      const textSpan = document.createElement('span');
      textSpan.className = 'button-text';
      textSpan.innerText = buttonText;
      textSpan.style.pointerEvents = 'none'; // Ensure text can't capture clicks
      
      // Replace the text node with the span
      button.replaceChild(textSpan, textNode);
      
      // Initialize the animation on the text span
      new RandomCharacterAnimation(textSpan, {
        iterations: 8,
        speed: 30
      });
    }
  });
  
  // Process a.button elements
  const buttonLinks = document.querySelectorAll('a.button');
  buttonLinks.forEach(link => {
    // Ensure link always remains clickable
    link.style.position = 'relative';
    link.style.pointerEvents = 'auto';
    
    // Find the first span child
    const spans = link.querySelectorAll('span');
    if (spans.length > 0) {
      const firstSpan = spans[0];
      firstSpan.style.pointerEvents = 'none'; // Ensure text can't capture clicks
      
      // Initialize animation for the first span
      new RandomCharacterAnimation(firstSpan, {
        iterations: 8,
        speed: 30
      });
    }
  });
  
  // Process .name elements
  const nameElements = document.querySelectorAll('.name');
  nameElements.forEach(nameElement => {
    // Ensure name link always remains clickable
    nameElement.style.position = 'relative';
    nameElement.style.pointerEvents = 'auto';
    
    // Create a span wrapper for the text content to animate
    const originalText = nameElement.innerText;
    const textSpan = document.createElement('span');
    textSpan.className = 'name-text';
    textSpan.innerText = originalText;
    textSpan.style.pointerEvents = 'none'; // Ensure text can't capture clicks
    
    // Replace the text content with the span
    nameElement.innerHTML = '';
    nameElement.appendChild(textSpan);
    
    // Initialize animation for the name text
    new RandomCharacterAnimation(textSpan, {
      iterations: 10,
      speed: 40
    });
    
    console.log('Name element animation initialized for:', originalText);
  });
  
  console.log('Random character animation initialized.');
}