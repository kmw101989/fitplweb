// Banner Slider Functionality
class BannerSlider {
  constructor() {
    this.currentPage = 0;
    this.totalPages = 3;
    this.slider = document.querySelector(".banner-container");
    this.indicators = document.querySelectorAll(".indicator");
    this.prevBtn = document.querySelector(".banner-prev");
    this.nextBtn = document.querySelector(".banner-next");
    this.autoSlideInterval = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAutoSlide();
    this.updateSlider();
  }

  setupEventListeners() {
    // Previous button
    this.prevBtn.addEventListener("click", () => {
      this.stopAutoSlide();
      this.previousPage();
      this.startAutoSlide();
    });

    // Next button
    this.nextBtn.addEventListener("click", () => {
      this.stopAutoSlide();
      this.nextPage();
      this.startAutoSlide();
    });

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.stopAutoSlide();
        this.goToPage(index);
        this.startAutoSlide();
      });
    });

    // Pause on hover
    const bannerSection = document.querySelector(".banner-section");
    bannerSection.addEventListener("mouseenter", () => {
      this.stopAutoSlide();
    });

    bannerSection.addEventListener("mouseleave", () => {
      this.startAutoSlide();
    });
  }

  nextPage() {
    this.currentPage = (this.currentPage + 1) % this.totalPages;
    this.updateSlider();
  }

  previousPage() {
    this.currentPage =
      (this.currentPage - 1 + this.totalPages) % this.totalPages;
    this.updateSlider();
  }

  goToPage(index) {
    this.currentPage = index;
    this.updateSlider();
  }

  updateSlider() {
    const translateX = -this.currentPage * 100;
    this.slider.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentPage);
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextPage();
    }, 8000); // 8초마다 자동 슬라이드
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

// Search functionality
class SearchHandler {
  constructor() {
    this.searchInput = document.querySelector(".search-input");
    this.searchButton = document.querySelector(".search-button");

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.searchButton.addEventListener("click", () => {
      this.performSearch();
    });

    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch();
      }
    });
  }

  performSearch() {
    const searchTerm = this.searchInput.value.trim();
    if (searchTerm) {
      console.log("검색어:", searchTerm);
      // 실제 검색 기능 구현
      alert(`"${searchTerm}" 검색 결과를 보여드리겠습니다!`);
    }
  }
}

// Navigation functionality
class NavigationHandler {
  constructor() {
    this.navItems = document.querySelectorAll(".nav-item");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Navigation items
    this.navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActiveNavItem(item);
      });
    });

    // Top navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("네비게이션 클릭:", link.textContent);
      });
    });
  }

  setActiveNavItem(activeItem) {
    this.navItems.forEach((item) => {
      item.classList.remove("active");
    });
    activeItem.classList.add("active");
  }
}

// Login functionality
class LoginHandler {
  constructor() {
    this.loginButton = document.querySelector(".login-button");

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.loginButton.addEventListener("click", () => {
      // FITPL 페이지로 이동
      window.location.href = "../fitpl-website/index.html";
    });
  }

  showLoginModal() {
    alert("로그인/회원가입 페이지로 이동합니다!");
    // 실제 로그인 모달이나 페이지 이동 구현
  }
}

// Product Grid Scroller
class ProductGridScroller {
  constructor() {
    this.grid = document.getElementById("productGrid");
    this.leftBtn = document.getElementById("scrollLeft");
    this.rightBtn = document.getElementById("scrollRight");
    this.scrollAmount = 4; // 4개씩 스크롤
    this.cardWidth = 260; // 카드 너비(260px) + 간격(0px)

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateButtonVisibility();
  }

  setupEventListeners() {
    this.leftBtn.addEventListener("click", () => {
      this.scrollLeft();
    });

    this.rightBtn.addEventListener("click", () => {
      this.scrollRight();
    });

    // 스크롤 이벤트로 버튼 상태 업데이트
    this.grid.addEventListener("scroll", () => {
      this.updateButtonVisibility();
    });
  }

  scrollLeft() {
    const scrollDistance = this.scrollAmount * this.cardWidth;
    this.grid.scrollBy({
      left: -scrollDistance,
      behavior: "smooth",
    });
  }

  scrollRight() {
    const scrollDistance = this.scrollAmount * this.cardWidth;
    this.grid.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  }

  updateButtonVisibility() {
    const scrollLeft = this.grid.scrollLeft;
    const maxScrollLeft = this.grid.scrollWidth - this.grid.clientWidth;

    // 왼쪽 버튼: 스크롤이 맨 왼쪽이면 숨김
    this.leftBtn.style.opacity = scrollLeft <= 0 ? "0" : "1";
    this.leftBtn.style.pointerEvents = scrollLeft <= 0 ? "none" : "auto";

    // 오른쪽 버튼: 스크롤이 맨 오른쪽이면 숨김
    this.rightBtn.style.opacity = scrollLeft >= maxScrollLeft ? "0" : "1";
    this.rightBtn.style.pointerEvents =
      scrollLeft >= maxScrollLeft ? "none" : "auto";
  }
}

// Second Product Grid Scroller for minimal style section
class ProductGridScroller2 {
  constructor() {
    this.grid = document.getElementById("productGrid2");
    this.leftBtn = document.getElementById("scrollLeft2");
    this.rightBtn = document.getElementById("scrollRight2");
    this.scrollAmount = 4; // 4개씩 스크롤
    this.cardWidth = 260; // 카드 너비(260px) + 간격(0px)

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateButtonVisibility();
  }

  setupEventListeners() {
    this.leftBtn.addEventListener("click", () => {
      this.scrollLeft();
    });

    this.rightBtn.addEventListener("click", () => {
      this.scrollRight();
    });

    // 스크롤 이벤트로 버튼 상태 업데이트
    this.grid.addEventListener("scroll", () => {
      this.updateButtonVisibility();
    });
  }

  scrollLeft() {
    const scrollDistance = this.scrollAmount * this.cardWidth;
    this.grid.scrollBy({
      left: -scrollDistance,
      behavior: "smooth",
    });
  }

  scrollRight() {
    const scrollDistance = this.scrollAmount * this.cardWidth;
    this.grid.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  }

  updateButtonVisibility() {
    const scrollLeft = this.grid.scrollLeft;
    const maxScrollLeft = this.grid.scrollWidth - this.grid.clientWidth;

    // 왼쪽 버튼: 스크롤이 맨 왼쪽이면 숨김
    this.leftBtn.style.opacity = scrollLeft <= 0 ? "0" : "1";
    this.leftBtn.style.pointerEvents = scrollLeft <= 0 ? "none" : "auto";

    // 오른쪽 버튼: 스크롤이 맨 오른쪽이면 숨김
    this.rightBtn.style.opacity = scrollLeft >= maxScrollLeft ? "0" : "1";
    this.rightBtn.style.pointerEvents =
      scrollLeft >= maxScrollLeft ? "none" : "auto";
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BannerSlider();
  new SearchHandler();
  new NavigationHandler();
  new LoginHandler();
  new ProductGridScroller();
  new ProductGridScroller2();

  console.log("FITPL 웹사이트가 성공적으로 로드되었습니다!");
});
