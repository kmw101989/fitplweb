// Main JavaScript functionality for FITPL website

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initBannerSlider();
  initBannerSetNavigation();
  initNavigation();
  initSearch();
  initMobileMenu();
  initScrollEffects();
  initPromotionCards();
});

// Banner Slider Functionality
function initBannerSlider() {
  // Disabled - using banner set navigation instead
  return;

  // Auto-slide functionality
  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function updateSlider() {
    const translateX = -currentSlide * 100;
    bannerContainer.style.transform = `translateX(${translateX}%)`;

    // Update active indicators if they exist
    updateBannerIndicators();
  }

  function updateBannerIndicators() {
    // Remove existing indicators
    const existingIndicators = document.querySelectorAll(".banner-indicator");
    existingIndicators.forEach((indicator) => indicator.remove());

    // Create new indicators
    const indicatorsContainer = document.createElement("div");
    indicatorsContainer.className = "banner-indicators";
    indicatorsContainer.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 10;
        `;

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.className = "banner-indicator";
      indicator.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                border: none;
                background-color: ${
                  i === currentSlide ? "#ffffff" : "rgba(255, 255, 255, 0.5)"
                };
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;

      indicator.addEventListener("click", () => {
        currentSlide = i;
        updateSlider();
      });

      indicatorsContainer.appendChild(indicator);
    }

    document.querySelector(".banner-section").appendChild(indicatorsContainer);
  }

  // Event listeners
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto-slide
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto-slide
    });
  }

  // Pause auto-slide on hover
  const bannerSection = document.querySelector(".banner-section");
  if (bannerSection) {
    bannerSection.addEventListener("mouseenter", stopAutoSlide);
    bannerSection.addEventListener("mouseleave", startAutoSlide);
  }

  // Initialize
  updateBannerIndicators();
  startAutoSlide();
}

// Banner Set Navigation Functionality
function initBannerSetNavigation() {
  const bannerSets = document.querySelectorAll(".banner-set");
  const indicators = document.querySelectorAll(".banner-set-indicator");
  const prevBtn = document.querySelector(".banner-set-prev");
  const nextBtn = document.querySelector(".banner-set-next");

  let currentSet = 1;
  const totalSets = bannerSets.length;

  // Show specific banner set
  function showBannerSet(setNumber) {
    // Hide all banner sets
    bannerSets.forEach((set) => {
      set.classList.remove("active");
    });

    // Show selected banner set
    const targetSet = document.querySelector(`[data-set="${setNumber}"]`);
    if (targetSet) {
      targetSet.classList.add("active");
    }

    // Update indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    const targetIndicator = document.querySelector(`[data-set="${setNumber}"]`);
    if (targetIndicator) {
      targetIndicator.classList.add("active");
    }

    currentSet = setNumber;
  }

  // Previous banner set
  function prevBannerSet() {
    currentSet = currentSet > 1 ? currentSet - 1 : totalSets;
    showBannerSet(currentSet);
  }

  // Next banner set
  function nextBannerSet() {
    currentSet = currentSet < totalSets ? currentSet + 1 : 1;
    showBannerSet(currentSet);
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", prevBannerSet);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextBannerSet);
  }

  // Indicator click events
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const setNumber = parseInt(this.getAttribute("data-set"));
      showBannerSet(setNumber);
    });
  });

  // Auto-rotate banner sets every 10 seconds
  setInterval(nextBannerSet, 10000);
}

// Navigation Functionality
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const topbarLinks = document.querySelectorAll(".topbar-link");

  // Handle navigation item clicks
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all items
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Add smooth scroll effect
      const targetSection = this.getAttribute("href");
      if (targetSection && targetSection !== "#") {
        scrollToSection(targetSection);
      }
    });
  });

  // Handle topbar link clicks
  topbarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // Handle specific link actions
      const linkText = this.textContent.trim();
      handleTopbarLinkClick(linkText);
    });
  });
}

// Search Functionality
function initSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");

  if (searchInput) {
    // Handle search input focus
    searchInput.addEventListener("focus", function () {
      this.style.borderColor = "#007bff";
      this.style.boxShadow = "0 0 0 2px rgba(0, 123, 255, 0.25)";
    });

    searchInput.addEventListener("blur", function () {
      this.style.borderColor = "transparent";
      this.style.boxShadow = "none";
    });

    // Handle search input
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value);
      }
    });

    // Handle search button click
    if (searchButton) {
      searchButton.addEventListener("click", function () {
        performSearch(searchInput.value);
      });
    }
  }
}

// Mobile Menu Functionality
function initMobileMenu() {
  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      navLinks.classList.toggle("mobile-open");
      this.classList.toggle("active");
    });
  }
}

// Scroll Effects
function initScrollEffects() {
  let lastScrollTop = 0;
  const topbar = document.querySelector(".topbar");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show topbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      topbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      topbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function performSearch(query) {
  if (query.trim()) {
    console.log("Searching for:", query);
    // Implement actual search functionality here
    // For now, just show an alert
    alert(
      `검색어: "${query}"\n\n실제 검색 기능은 백엔드와 연동하여 구현됩니다.`
    );
  }
}

function handleTopbarLinkClick(linkText) {
  console.log("Clicked:", linkText);

  // Handle specific link actions
  switch (linkText) {
    case "검색":
      document.querySelector(".search-input").focus();
      break;
    case "좋아요":
      // Show liked items or redirect to favorites
      console.log("Navigate to favorites");
      break;
    case "마이":
      // Show user menu or redirect to profile
      console.log("Navigate to profile");
      break;
    case "장바구니":
      // Show cart or redirect to cart
      console.log("Navigate to cart");
      break;
    case "오프라인 스토어":
      // Show store locations
      console.log("Navigate to stores");
      break;
    default:
      // Handle other navigation links
      console.log("Navigate to:", linkText);
  }
}

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 56px;
            left: 0;
            right: 0;
            background-color: #222222;
            flex-direction: column;
            padding: 20px;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .nav-links.mobile-open {
            transform: translateY(0);
        }
        
        .menu-button.active {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;

// Inject mobile menu CSS
const style = document.createElement("style");
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Add smooth transitions to topbar
const topbarCSS = `
    .topbar {
        transition: transform 0.3s ease;
    }
`;

const topbarStyle = document.createElement("style");
topbarStyle.textContent = topbarCSS;
document.head.appendChild(topbarStyle);

// Add loading animation for banner images
function loadBannerImages() {
  const bannerImages = document.querySelectorAll(".banner-image");

  bannerImages.forEach((image, index) => {
    // Simulate image loading
    setTimeout(() => {
      image.classList.add("loaded");
    }, index * 500);
  });
}

// Initialize banner image loading
loadBannerImages();

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Arrow key navigation for banner
  if (e.key === "ArrowLeft") {
    document.querySelector(".banner-prev")?.click();
  } else if (e.key === "ArrowRight") {
    document.querySelector(".banner-next")?.click();
  }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document
  .querySelector(".banner-section")
  ?.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

document
  .querySelector(".banner-section")
  ?.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      document.querySelector(".banner-next")?.click();
    } else {
      // Swipe right - previous slide
      document.querySelector(".banner-prev")?.click();
    }
  }
}

// Add performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll event
const optimizedScrollHandler = debounce(function () {
  // Scroll-based animations or effects can be added here
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Promotion Cards Functionality
function initPromotionCards() {
  const promotionCards = document.querySelectorAll(".promotion-card");

  promotionCards.forEach((card) => {
    // Add click animation
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Handle card click
      const cardTitle =
        this.querySelector("h3")?.textContent ||
        this.querySelector(".card-text")?.textContent;
      handlePromotionCardClick(cardTitle);
    });

    // Add keyboard navigation
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    // Make cards focusable
    card.setAttribute("tabindex", "0");
  });
}

function handlePromotionCardClick(cardTitle) {
  console.log("Clicked promotion card:", cardTitle);

  // Handle specific card actions
  switch (cardTitle) {
    case "매일신상 유즈드":
      console.log("Navigate to used items");
      break;
    case "최대 8% 적립":
      console.log("Navigate to points system");
      break;
    case "무퀴즈 with 학교대항전":
      console.log("Navigate to quiz section");
      break;
    case "최저가 보상제":
      console.log("Navigate to price guarantee");
      break;
    case "체험단":
      console.log("Navigate to experience group");
      break;
    case "타임세일":
      console.log("Navigate to time sale");
      break;
    case "라이브":
      console.log("Navigate to live section");
      break;
    default:
      // Handle brand collaborations and special offers
      if (
        cardTitle.includes("×") ||
        cardTitle.includes("컬렉션") ||
        cardTitle.includes("특가")
      ) {
        console.log("Navigate to special offer:", cardTitle);
      } else {
        console.log("Navigate to promotion:", cardTitle);
      }
  }
}
