// 이미지 갤러리 기능
document.addEventListener("DOMContentLoaded", function () {
  // 네비게이션 링크들
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // FITPL 링크인 경우 fitpl-website로 이동
      if (this.textContent.trim() === "FITPL") {
        window.location.href = "../fitpl-website/index.html";
      } else {
        alert(`${this.textContent} 페이지로 이동합니다.`);
      }
    });
  });

  // 상단 메뉴 버튼들
  const topMenuBtns = document.querySelectorAll(
    ".search-btn, .like-link, .my-link, .store-link"
  );

  topMenuBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const text = this.querySelector("span").textContent;
      alert(`${text} 페이지로 이동합니다.`);
    });
  });

  // 장바구니 링크 (네비게이션 바)
  const cartLink = document.querySelector(".cart-link");
  if (cartLink) {
    cartLink.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("네비게이션 장바구니 링크 클릭 - cart 페이지로 이동");
      window.location.href = "../cart/index.html";
    });
  }

  // SNAP 링크
  const snapLink = document.querySelector(".snap-link");

  if (snapLink) {
    snapLink.addEventListener("click", function (e) {
      e.preventDefault();
      alert("SNAP 페이지로 이동합니다.");
    });
  }

  // 카테고리 메뉴 버튼
  const categoryMenuBtn = document.querySelector(".category-menu-btn");

  if (categoryMenuBtn) {
    categoryMenuBtn.addEventListener("click", function () {
      alert("카테고리 메뉴를 엽니다.");
    });
  }

  // FITPL 버튼 (기존 logout-btn)
  const fitplBtn = document.querySelector(".logout-btn");

  if (fitplBtn) {
    fitplBtn.addEventListener("click", function () {
      // fitpl-website로 이동
      window.location.href = "../fitpl-website/index.html";
    });
  }

  // 썸네일 클릭 이벤트
  const thumbnailItems = document.querySelectorAll(
    ".thumbnail-grid .thumbnail-item"
  );
  const mainImage = document.querySelector(".main-image");
  const imageCounter = document.querySelector(".image-counter");

  thumbnailItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      // 모든 썸네일에서 active 클래스 제거
      thumbnailItems.forEach((thumb) => thumb.classList.remove("active"));

      // 클릭된 썸네일에 active 클래스 추가
      this.classList.add("active");

      // 메인 이미지 변경 (실제 구현에서는 다른 이미지 URL 사용)
      const thumbnailImg = this.querySelector("img");
      if (thumbnailImg) {
        mainImage.src = thumbnailImg.src.replace("100&h=120", "974&h=1299");
      }

      // 이미지 카운터 업데이트
      if (imageCounter) {
        imageCounter.textContent = `${index + 1}/18`;
      }
    });
  });

  // 줌 버튼 클릭 이벤트
  const zoomButton = document.querySelector(".zoom-button");
  if (zoomButton) {
    zoomButton.addEventListener("click", function () {
      // 실제 구현에서는 모달이나 확대 기능 구현
      alert("이미지 확대 기능이 구현될 예정입니다.");
    });
  }

  // 사이즈 선택 드롭다운
  const sizeDropdown = document.querySelector(".size-dropdown");
  if (sizeDropdown) {
    sizeDropdown.addEventListener("change", function () {
      const selectedSize = this.value;
      if (selectedSize) {
        console.log("선택된 사이즈:", selectedSize);
        // 실제 구현에서는 선택된 사이즈를 상태에 저장
      }
    });
  }

  // 좋아요 버튼
  const likeButton = document.querySelector(".like-button");
  if (likeButton) {
    likeButton.addEventListener("click", function () {
      const heartIcon = this.querySelector("svg path");
      const likeCount = this.querySelector(".like-count");

      if (heartIcon.style.fill === "red") {
        heartIcon.style.fill = "none";
        heartIcon.style.stroke = "currentColor";
        likeCount.textContent = "798";
      } else {
        heartIcon.style.fill = "red";
        heartIcon.style.stroke = "red";
        likeCount.textContent = "799";
      }
    });
  }

  // 장바구니 버튼
  const cartButton = document.querySelector(".cart-button");
  console.log("cart-button 요소 찾기:", cartButton);
  if (cartButton) {
    cartButton.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("장바구니 버튼 클릭 - cart 페이지로 이동");
      window.location.href = "../cart/index.html";
    });
  } else {
    console.log("cart-button 요소를 찾을 수 없습니다!");
  }

  // 네비게이션 장바구니 링크 (새로운 구조)
  const cartNavLinks = document.querySelectorAll(".nav-link");
  console.log("nav-link 요소들:", cartNavLinks.length);
  cartNavLinks.forEach((link, index) => {
    console.log(`nav-link ${index}:`, link.textContent.trim());
    if (link.textContent.includes("장바구니")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("네비게이션 장바구니 링크 클릭 - cart 페이지로 이동");
        window.location.href = "../cart/index.html";
      });
    }
  });

  // 구매하기 버튼
  const buyButton = document.querySelector(".buy-button");
  if (buyButton) {
    buyButton.addEventListener("click", function () {
      alert("구매 페이지로 이동합니다.");
    });
  }

  // 쿠폰 링크
  const couponLink = document.querySelector(".coupon-link");
  if (couponLink) {
    couponLink.addEventListener("click", function (e) {
      e.preventDefault();
      alert("쿠폰 받기 페이지로 이동합니다.");
    });
  }

  // 최대혜택가 계산 (쿠폰 20% 적용)
  const couponCheckbox = document.querySelector(".coupon-checkbox");
  const bestPriceEl = document.getElementById("best-price");
  const bestPriceAmountEl = document.getElementById("best-price-amount");
  const salePriceEl = document.querySelector(".sale-price");
  const originalPriceEl = document.querySelector(".original-price");

  // 원래 가격 저장 (복원용) - HTML에서 읽어온 원본 가격
  let originalSalePrice = "180,900원"; // HTML의 원본 가격

  function parseCurrency(text) {
    const digits = (text || "").replace(/[^0-9]/g, "");
    return digits ? Number(digits) : 0;
  }

  function formatCurrency(num) {
    return num.toLocaleString("ko-KR");
  }

  function updateBestPrice() {
    if (!salePriceEl || !bestPriceEl || !couponCheckbox) return;

    const originalPrice = parseCurrency(originalSalePrice); // 원본 가격 180,900원

    if (!couponCheckbox.checked) {
      // 쿠폰 체크 해제 시 최대혜택가 숨김
      bestPriceEl.style.display = "none";
      console.log("쿠폰 해제 - 최대혜택가 숨김");
      return;
    }

    // 쿠폰 체크 시 sale-price는 그대로 유지하고 최대혜택가만 표시
    const discounted = Math.round(originalPrice * 0.8); // 180,900 * 0.8 = 144,720

    // 최대혜택가만 업데이트 (sale-price는 변경하지 않음)
    bestPriceAmountEl.textContent = `${formatCurrency(discounted)}원`;
    bestPriceEl.style.display = "flex";

    console.log(
      "쿠폰 적용 - 최대혜택가 표시:",
      `${formatCurrency(discounted)}원`
    );
  }

  if (couponCheckbox) {
    couponCheckbox.addEventListener("change", updateBestPrice);
  }

  // 초기 표시
  updateBestPrice();

  // 메인 탭 네비게이션 (새로 추가)
  const mainTabButtons = document.querySelectorAll(".main-tab-button");
  const infoTabContent = document.querySelector(".lfjQXD");
  const sizeTabContent = document.querySelector(".jdvpEA.size-tab-content");

  mainTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 모든 메인 탭에서 active 클래스 제거
      mainTabButtons.forEach((tab) => tab.classList.remove("active"));

      // 클릭된 탭에 active 클래스 추가
      this.classList.add("active");

      // 탭 콘텐츠 표시/숨김 처리
      const tabText = this.querySelector("span").textContent.trim();

      if (tabText === "정보") {
        if (infoTabContent) {
          infoTabContent.style.display = "flex";
          // 정보 탭에서도 사이즈표는 보이도록 유지
          if (sizeTabContent) sizeTabContent.style.display = "flex";
          // 네비게이션바가 보이도록 탭 네비게이션 영역으로 스크롤
          const mainTabNavigation = document.querySelector(
            ".main-tab-navigation"
          );
          if (mainTabNavigation) {
            mainTabNavigation.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            // 탭 네비게이션이 없으면 정보 탭으로 스크롤
            infoTabContent.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      } else if (tabText === "사이즈") {
        console.log("사이즈 탭 클릭됨");
        console.log("sizeTabContent 요소:", sizeTabContent);

        if (sizeTabContent) {
          // 정보 섹션은 유지하고 사이즈표만 보여주기
          if (infoTabContent) infoTabContent.style.display = "flex";
          sizeTabContent.style.display = "flex";

          console.log("사이즈 탭 콘텐츠 표시됨, 스크롤 시작");

          // 약간의 지연 후 스크롤 (DOM 업데이트 후)
          setTimeout(() => {
            sizeTabContent.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            console.log("스크롤 완료");
          }, 100);
        } else {
          console.log("sizeTabContent 요소를 찾을 수 없습니다!");
        }
      }

      console.log("메인 탭 변경:", tabText);
    });
  });

  // 팔로우 버튼
  const followButton = document.querySelector(".follow-button");
  if (followButton) {
    followButton.addEventListener("click", function () {
      const buttonText = this.textContent.trim();
      if (buttonText === "12만") {
        this.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M2 8H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          13만
        `;
      } else {
        this.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M2 8H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          12만
        `;
      }
    });
  }

  // 연관 태그 클릭
  const tagItems = document.querySelectorAll(".tag-item");
  tagItems.forEach((tag) => {
    tag.addEventListener("click", function () {
      console.log("태그 클릭:", this.textContent);
      // 실제 구현에서는 해당 태그로 검색 페이지로 이동
    });
  });

  // 결제 혜택 더보기
  const moreBenefits = document.querySelector(".more-benefits");
  if (moreBenefits) {
    moreBenefits.addEventListener("click", function () {
      alert("더 많은 결제 혜택을 확인하세요.");
    });
  }

  // 전체보기 링크
  const viewAll = document.querySelector(".view-all");
  if (viewAll) {
    viewAll.addEventListener("click", function (e) {
      e.preventDefault();
      alert("전체 결제 혜택 페이지로 이동합니다.");
    });
  }
});

// 반응형 네비게이션 (모바일)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.classList.toggle("mobile-active");
  }
}

// 스크롤 시 네비게이션 고정 효과
window.addEventListener("scroll", function () {
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    if (window.scrollY > 50) {
      topbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      topbar.style.boxShadow = "none";
    }
  }
});

console.log("Detail 페이지 JavaScript 로드 완료");
