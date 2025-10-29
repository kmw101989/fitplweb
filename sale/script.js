// 상품 데이터
const products = [
  {
    id: 1,
    brand: "나이키",
    name: "에어 포스 1 '07 화이트 / CW2288-111",
    price: 119000,
    originalPrice: 140000,
    discount: 15,
    category: "신발",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=240&fit=crop",
  },
  {
    id: 2,
    brand: "아디다스",
    name: "스탠 스미스 화이트 / FX5502",
    price: 89000,
    originalPrice: null,
    discount: 0,
    category: "신발",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=240&fit=crop",
  },
  {
    id: 3,
    brand: "유니클로",
    name: "에어리즘 UV 컷 롱 슬리브 셔츠 화이트 / 425341",
    price: 19900,
    originalPrice: 24900,
    discount: 20,
    category: "상의",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&h=240&fit=crop",
  },
  {
    id: 4,
    brand: "자라",
    name: "린넨 블렌드 쇼트 팬츠 베이지 / 123456",
    price: 39900,
    originalPrice: null,
    discount: 0,
    category: "하의",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=240&fit=crop",
  },
  {
    id: 5,
    brand: "H&M",
    name: "린넨 블렌드 쇼트 팬츠 화이트 / 789012",
    price: 24900,
    originalPrice: 35600,
    discount: 30,
    category: "하의",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=240&fit=crop",
  },
  {
    id: 6,
    brand: "무지",
    name: "코튼 린넨 블렌드 쇼트 슬리브 티셔츠 화이트 / 345678",
    price: 12900,
    originalPrice: null,
    discount: 0,
    category: "상의",
    image:
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=240&fit=crop",
  },
  {
    id: 7,
    brand: "컨버스",
    name: "척 테일러 올스타 클래식 로우 화이트 / 162050C",
    price: 58500,
    originalPrice: 65000,
    discount: 10,
    category: "신발",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=240&fit=crop",
  },
  {
    id: 8,
    brand: "에스티 로더",
    name: "더블 웨어 파운데이션 SPF10 PA++ 30ml / 1W1",
    price: 65000,
    originalPrice: null,
    discount: 0,
    category: "뷰티",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=240&fit=crop",
  },
  {
    id: 9,
    brand: "라네즈",
    name: "워터뱅크 하이드로 크림 50ml / 901234",
    price: 22500,
    originalPrice: 30000,
    discount: 25,
    category: "뷰티",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=240&fit=crop",
  },
  {
    id: 10,
    brand: "아토팜",
    name: "베이비 로션 200ml / 567890",
    price: 18900,
    originalPrice: null,
    discount: 0,
    category: "뷰티",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&h=240&fit=crop",
  },
];

// 상품 데이터를 60개로 확장
const extendedProducts = [];
for (let i = 0; i < 6; i++) {
  products.forEach((product) => {
    extendedProducts.push({
      ...product,
      id: product.id + i * 10,
      name: `${product.name} (${i + 1})`,
    });
  });
}

// 상품 렌더링 함수
function renderProducts() {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = extendedProducts
    .map(
      (product) => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
          <button class="like-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 17L8.5 15.5C3.5 10.5 0 7.5 0 5C0 2.5 2.5 0 5 0C6.5 0 8 0.5 9 1.5C10 0.5 11.5 0 13 0C15.5 0 18 2.5 18 5C18 7.5 14.5 10.5 9.5 15.5L10 17Z"
                stroke="#666"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
        <div class="product-info">
          <div class="brand">${product.brand}</div>
          <div class="product-name">${product.name}</div>
          <div class="price-info">
            ${
              product.discount > 0
                ? `<span class="discount">${product.discount}%</span>`
                : ""
            }
            <span class="price">${product.price.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  // 동적으로 생성된 상품 카드에 클릭 이벤트 추가
  addProductCardClickHandlers();
}

// 상품 카드 클릭 이벤트 핸들러 추가 함수
function addProductCardClickHandlers() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    // 좋아요 버튼 클릭 시 이벤트 전파 방지
    const likeBtn = card.querySelector(".like-btn");
    if (likeBtn) {
      likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        likeBtn.classList.toggle("liked");

        // 좋아요 상태에 따른 시각적 변화
        const svg = likeBtn.querySelector("svg path");
        if (likeBtn.classList.contains("liked")) {
          svg.style.fill = "#f31110";
          svg.style.stroke = "#f31110";
        } else {
          svg.style.fill = "none";
          svg.style.stroke = "#666";
        }
      });
    }

    // 상품 카드 클릭 시 상세 페이지로 이동
    card.addEventListener("click", (e) => {
      // 좋아요 버튼 클릭이 아닌 경우에만 상세 페이지로 이동
      if (!e.target.closest(".like-btn")) {
        const productId = card.getAttribute("data-product-id") || "1";
        navigateToDetailPage(productId);
      }
    });
  });
}

// 상세 페이지로 이동하는 함수
function navigateToDetailPage(productId) {
  // 상품 정보를 URL 파라미터로 전달
  const detailUrl = `../Detail/navigation.html?productId=${productId}`;
  window.location.href = detailUrl;
}

// 페이지 로드 시 상품 렌더링
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();

  // 정적 상품 카드에도 클릭 이벤트 추가
  addProductCardClickHandlers();
});

// DOM 요소들
const filterBtns = document.querySelectorAll(".filter-btn");
const categoryBtns = document.querySelectorAll(".category-btn");
const likeBtns = document.querySelectorAll(".like-btn");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const navLinks = document.querySelectorAll(".nav-link");
const logoutBtn = document.querySelector(".logout-btn");

// FITPL 버튼 클릭 이벤트
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    // 현재 페이지이므로 새로고침 또는 다른 동작
    window.location.reload();
  });
}

// 국가 필터 기능
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 모든 버튼에서 active 클래스 제거
    filterBtns.forEach((b) => b.classList.remove("active"));
    // 클릭된 버튼에 active 클래스 추가
    btn.classList.add("active");

    // 여기서 실제 필터링 로직을 구현할 수 있습니다
    const selectedCountry = btn.textContent;
    console.log("선택된 국가:", selectedCountry);

    // 예시: 상품 필터링
    filterProductsByCountry(selectedCountry);
  });
});

// 카테고리 필터 기능
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 모든 버튼에서 active 클래스 제거
    categoryBtns.forEach((b) => b.classList.remove("active"));
    // 클릭된 버튼에 active 클래스 추가
    btn.classList.add("active");

    const selectedCategory = btn.textContent;
    console.log("선택된 카테고리:", selectedCategory);

    // 상품 필터링
    filterProductsByCategory(selectedCategory);
  });
});

// 좋아요 버튼 기능은 addProductCardClickHandlers() 함수에서 처리됨

// 검색 기능
function performSearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    console.log("검색어:", searchTerm);
    // 실제 검색 로직 구현
    searchProducts(searchTerm);
  }
}

if (searchBtn) {
  searchBtn.addEventListener("click", performSearch);
}

if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

// 상품 필터링 함수들
function filterProductsByCountry(country) {
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    if (country === "ALL") {
      product.style.display = "block";
    } else {
      // 실제로는 상품 데이터에 국가 정보가 있어야 함
      // 여기서는 예시로 랜덤하게 숨김/보임 처리
      const shouldShow = Math.random() > 0.5;
      product.style.display = shouldShow ? "block" : "none";
    }
  });
}

function filterProductsByCategory(category) {
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    if (category === "전체") {
      product.style.display = "block";
    } else {
      // 실제로는 상품 데이터에 카테고리 정보가 있어야 함
      const shouldShow = Math.random() > 0.3;
      product.style.display = shouldShow ? "block" : "none";
    }
  });
}

function searchProducts(searchTerm) {
  const products = document.querySelectorAll(".product-card");
  const term = searchTerm.toLowerCase();

  products.forEach((product) => {
    const productName = product
      .querySelector(".product-name")
      .textContent.toLowerCase();
    const brand = product.querySelector(".brand").textContent.toLowerCase();

    if (productName.includes(term) || brand.includes(term)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// 추천 메뉴 링크 클릭 처리
const recommendLinks = document.querySelectorAll(".recommend-link");
recommendLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // 모든 추천 링크에서 active 클래스 제거
    recommendLinks.forEach((l) => l.classList.remove("active"));

    // 클릭된 링크에 active 클래스 추가
    link.classList.add("active");

    const linkText = link.textContent.trim();
    console.log(`${linkText} 메뉴 선택됨`);
  });
});

// 네비게이션 링크 클릭 처리
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // 실제 프로토타입 연결에 따른 페이지 이동
    const linkText = link.textContent.trim();

    switch (linkText) {
      case "MUSINSA":
        console.log("MUSINSA 페이지로 이동");
        // window.location.href = '/musinsa';
        break;
      case "마이":
        console.log("마이 페이지로 이동");
        // window.location.href = '/mypage';
        break;
      case "장바구니":
        console.log("장바구니 페이지로 이동");
        // window.location.href = '/cart';
        break;
      default:
        console.log(`${linkText} 페이지로 이동`);
    }
  });
});

// 스크롤 이벤트 - 헤더 고정
let lastScrollTop = 0;
const header = document.querySelector(".top-nav");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // 스크롤 다운
    header.style.transform = "translateY(-100%)";
  } else {
    // 스크롤 업
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// 상품 카드 호버 효과는 addProductCardClickHandlers() 함수에서 처리됨

// 랭킹 아이템 클릭 처리
const rankingItems = document.querySelectorAll(".ranking-item");
rankingItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    console.log(`랭킹 ${index + 1}번 아이템 클릭`);
    // 상세 페이지로 이동하거나 모달 표시
  });
});

// 무한 스크롤 기능 비활성화 (빈 상품 카드 생성 방지)
// let isLoading = false;
// let currentPage = 1;

// function loadMoreProducts() {
//   if (isLoading) return;
//   isLoading = true;
//   // 로딩 인디케이터 표시
//   const loadingIndicator = document.createElement("div");
//   loadingIndicator.className = "loading-indicator";
//   loadingIndicator.textContent = "더 많은 상품을 불러오는 중...";
//   loadingIndicator.style.textAlign = "center";
//   loadingIndicator.style.padding = "20px";
//   loadingIndicator.style.color = "#666";
//   const productsGrid = document.querySelector(".products-grid");
//   productsGrid.appendChild(loadingIndicator);
//   // 실제로는 API 호출
//   setTimeout(() => {
//     // 새로운 상품들을 추가하는 로직
//     addMoreProducts();
//     // 로딩 인디케이터 제거
//     loadingIndicator.remove();
//     isLoading = false;
//     currentPage++;
//   }, 1500);
// }

// function addMoreProducts() {
//   const productsGrid = document.querySelector(".products-grid");
//   // 예시로 몇 개의 상품 카드를 추가
//   for (let i = 0; i < 4; i++) {
//     const productCard = createProductCard();
//     productsGrid.appendChild(productCard);
//   }
// }

// function createProductCard() {
//   const card = document.createElement("div");
//   card.className = "product-card";
//   card.innerHTML = `
//         <div class="product-image">
//             <img src="https://images.unsplash.com/photo-${
//               Math.floor(Math.random() * 1000) + 1500000000000
//             }-1594633312681-425c7b97ccd1?w=260&h=312&fit=crop" alt="New Product">
//             <button class="like-btn">
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                     <path d="M10 17L8.5 15.5C3.5 10.5 0 7.5 0 5C0 2.5 2.5 0 5 0C6.5 0 8 0.5 9 1.5C10 0.5 11.5 0 13 0C15.5 0 18 2.5 18 5C18 7.5 14.5 10.5 9.5 15.5L10 17Z" stroke="#666" stroke-width="2"/>
//                 </svg>
//             </button>
//         </div>
//         <div class="product-info">
//             <div class="brand">새로운 브랜드</div>
//             <div class="product-name">새로운 상품명 - 스타일링 아이템</div>
//             <div class="price-info">
//                 <span class="discount">${
//                   Math.floor(Math.random() * 50) + 10
//                 }%</span>
//                 <span class="price">${(
//                   Math.random() * 1000000 +
//                   100000
//                 ).toLocaleString()}원</span>
//             </div>
//         </div>
//     `;
//   // 새로 추가된 좋아요 버튼에 이벤트 리스너 추가
//   const likeBtn = card.querySelector(".like-btn");
//   likeBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     likeBtn.classList.toggle("liked");
//     const svg = likeBtn.querySelector("svg path");
//     if (likeBtn.classList.contains("liked")) {
//       svg.style.fill = "#f31110";
//       svg.style.stroke = "#f31110";
//     } else {
//       svg.style.fill = "none";
//       svg.style.stroke = "#666";
//     }
//   });
//   return card;
// }

// 스크롤 이벤트로 무한 스크롤 구현 (비활성화)
// window.addEventListener("scroll", () => {
//   if (
//     window.innerHeight + window.scrollY >=
//     document.body.offsetHeight - 1000
//   ) {
//     loadMoreProducts();
//   }
// });

// 반응형 메뉴 토글
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.createElement("div");
mobileMenu.className = "mobile-menu";
mobileMenu.style.display = "none";
mobileMenu.innerHTML = `
      <div class="mobile-menu-content">
          <a href="#" class="mobile-nav-link">MUSINSA</a>
          <a href="#" class="mobile-nav-link">BEAUTY</a>
          <a href="#" class="mobile-nav-link">PLAYER</a>
          <a href="#" class="mobile-nav-link">OUTLET</a>
          <a href="#" class="mobile-nav-link">BOUTIQUE</a>
          <a href="#" class="mobile-nav-link">SHOES</a>
          <a href="#" class="mobile-nav-link">KIDS</a>
          <a href="#" class="mobile-nav-link">USED</a>
          <a href="#" class="mobile-nav-link active">FITPL</a>
      </div>
  `;

document.body.appendChild(mobileMenu);

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.style.display =
      mobileMenu.style.display === "none" ? "block" : "none";
  });
}

// 랭킹 호버 기능
const rankingRows = document.querySelectorAll(".ranking-row");
const rankingContents = document.querySelectorAll(".ranking-content");

rankingRows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    const country = row.getAttribute("data-country");

    // 모든 컨텐츠 영역 숨기기
    rankingContents.forEach((content) => {
      content.classList.remove("active");
    });

    // 해당 국가의 컨텐츠 표시
    const targetContent = document.getElementById(`${country}-content`);
    if (targetContent) {
      // 약간의 지연을 두고 컨텐츠 표시
      setTimeout(() => {
        targetContent.classList.add("active");
      }, 100);
    }
  });

  row.addEventListener("mouseleave", () => {
    // 마우스가 벗어나면 모든 컨텐츠 숨기기
    rankingContents.forEach((content) => {
      content.classList.remove("active");
    });
  });
});

// 컨텐츠 아이템들에 추가적인 인터랙션 효과
document.addEventListener("DOMContentLoaded", () => {
  const contentItems = document.querySelectorAll(".content-item");

  contentItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      // 호버된 아이템을 강조
      item.style.zIndex = "10";
    });

    item.addEventListener("mouseleave", () => {
      item.style.zIndex = "1";
    });
  });
});

// 부드러운 스크롤 함수
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 100; // 헤더 높이만큼 오프셋

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// 메인 배너 슬라이드 클릭 이벤트
document.addEventListener("DOMContentLoaded", () => {
  const firstBannerSlide = document.querySelector(".banner-slide:first-child");
  const secondBannerSlide = document.querySelector(
    ".banner-slide:nth-child(2)"
  );
  const thirdBannerSlide = document.querySelector(".banner-slide:nth-child(3)");

  if (firstBannerSlide) {
    firstBannerSlide.style.cursor = "pointer";
    firstBannerSlide.addEventListener("click", () => {
      smoothScrollTo("climate-recommendation");
    });
  }

  if (secondBannerSlide) {
    secondBannerSlide.style.cursor = "pointer";
    secondBannerSlide.addEventListener("click", () => {
      smoothScrollTo("activity-recommendation");
    });
  }

  if (thirdBannerSlide) {
    thirdBannerSlide.style.cursor = "pointer";
    thirdBannerSlide.addEventListener("click", () => {
      smoothScrollTo("snap-recommendation");
    });
  }
});

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  console.log("FitPl 웹사이트가 로드되었습니다.");

  // 좋아요 버튼 초기 상태 설정
  likeBtns.forEach((btn) => {
    const svg = btn.querySelector("svg path");
    if (svg) {
      svg.style.fill = "none";
      svg.style.stroke = "#666";
    }
  });
});

// 페이지 로드 완료 후 실행
window.addEventListener("load", () => {
  // 이미지 lazy loading
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
  });
});
