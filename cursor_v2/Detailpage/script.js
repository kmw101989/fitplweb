// DOM 요소 선택
const tabButtons = document.querySelectorAll(".tab-btn");
const weatherTags = document.querySelectorAll(".weather-tag");
const activityTags = document.querySelectorAll(".activity-tag");
const snapTags = document.querySelectorAll(".snap-tag");
const locationTags = document.querySelectorAll(".location-tag");
const likeButtons = document.querySelectorAll(".like-btn");
const moreButtons = document.querySelectorAll(".more-btn");
const logoutBtn = document.querySelector(".logout-btn");

// FITPL 버튼 클릭 이벤트
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    // fitpl-website로 이동
    window.location.href = "../fitpl-website/index.html";
  });
}

// 탭 전환 기능
function switchTab(clickedTab, allTabs) {
  allTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  clickedTab.classList.add("active");
}

// 탭 버튼 이벤트 리스너
tabButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const section = e.target.closest("section");
    const sectionTabs = section.querySelectorAll(".tab-btn");
    switchTab(e.target, sectionTabs);
  });
});

// 날씨 태그 전환 기능
weatherTags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    const section = e.target.closest("section");
    const sectionWeatherTags = section.querySelectorAll(".weather-tag");
    switchTab(e.target, sectionWeatherTags);
  });
});

// 액티비티 태그 전환 기능
activityTags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    const section = e.target.closest("section");
    const sectionActivityTags = section.querySelectorAll(".activity-tag");
    switchTab(e.target, sectionActivityTags);
  });
});

// 스냅 태그 전환 기능
snapTags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    const section = e.target.closest("section");
    const sectionSnapTags = section.querySelectorAll(".snap-tag");
    switchTab(e.target, sectionSnapTags);
  });
});

// 위치 태그 전환 기능
locationTags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    const section = e.target.closest("section");
    const sectionLocationTags = section.querySelectorAll(".location-tag");
    switchTab(e.target, sectionLocationTags);
  });
});

// 좋아요 버튼 토글 기능
likeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const heartIcon = button.querySelector("svg path");

    if (heartIcon.style.fill === "red") {
      heartIcon.style.fill = "none";
      heartIcon.style.stroke = "#000";
    } else {
      heartIcon.style.fill = "red";
      heartIcon.style.stroke = "red";
    }

    // 애니메이션 효과
    button.style.transform = "scale(1.2)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 200);
  });
});

// 더보기 버튼 기능
moreButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    // 더보기 버튼 애니메이션
    button.style.transform = "translateY(-2px)";
    button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";

    setTimeout(() => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    }, 200);

    // 실제로는 더 많은 상품을 로드하는 API 호출이 들어갈 수 있습니다
    console.log("더보기 버튼 클릭됨");
  });
});

// 상품 카드 클릭 이벤트
const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card) => {
  // 클릭 이벤트 - Detail 페이지로 이동
  card.addEventListener("click", (e) => {
    // 좋아요 버튼 클릭 시에는 페이지 이동하지 않음
    if (e.target.closest(".like-btn")) {
      return;
    }

    // Detail 페이지로 이동
    window.location.href = "../Detail/navigation.html";
  });
});

// 새로고침 버튼 기능
const refreshButtons = document.querySelectorAll(".refresh-btn");
refreshButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    // 회전 애니메이션
    const icon = button.querySelector("svg");
    icon.style.transform = "rotate(360deg)";
    icon.style.transition = "transform 0.5s ease";

    setTimeout(() => {
      icon.style.transform = "rotate(0deg)";
    }, 500);

    // 실제로는 날씨 정보를 새로고침하는 API 호출이 들어갈 수 있습니다
    console.log("날씨 정보 새로고침");
  });
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener("scroll", () => {
  const topNav = document.querySelector(".top-nav");
  if (window.scrollY > 50) {
    topNav.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  } else {
    topNav.style.boxShadow = "none";
  }
});

// 상품 이미지 로딩 시 플레이스홀더 효과
const productImages = document.querySelectorAll(".product-image");
productImages.forEach((image) => {
  image.addEventListener("load", () => {
    // 이미지 로딩 완료 처리
  });
});

// 키보드 네비게이션 지원
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    // 포커스 가능한 요소들에 대한 키보드 네비게이션
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element) => {
      element.addEventListener("focus", () => {
        element.style.outline = "2px solid #245eff";
        element.style.outlineOffset = "2px";
      });

      element.addEventListener("blur", () => {
        element.style.outline = "none";
      });
    });
  }
});

// 모바일 터치 이벤트 지원
if ("ontouchstart" in window) {
  // 모바일 터치 이벤트는 제거됨
}

// 로딩 상태 표시 함수
function showLoading(element) {
  element.style.opacity = "0.5";
  element.style.pointerEvents = "none";

  // 로딩 스피너 생성
  const spinner = document.createElement("div");
  spinner.className = "loading-spinner";
  spinner.innerHTML = `
        <div style="
            width: 20px;
            height: 20px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #245eff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        "></div>
    `;

  element.appendChild(spinner);
}

function hideLoading(element) {
  element.style.opacity = "1";
  element.style.pointerEvents = "auto";

  const spinner = element.querySelector(".loading-spinner");
  if (spinner) {
    spinner.remove();
  }
}

// CSS 애니메이션 추가
const style = document.createElement("style");
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
`;
document.head.appendChild(style);

// 현재 스크롤 위치 추적 변수
let isScrolledToSections = false;

// 섹션을 보여주는 함수 (첫 번째 섹션에서만 스크롤)
function scrollToSection(sectionId) {
  // 모든 섹션 숨기기
  const allSections = document.querySelectorAll('section[id$="-section"]');
  allSections.forEach((section) => {
    section.style.display = "none";
  });

  // 선택된 섹션 보이기
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";

    // 첫 번째 섹션(날씨별 추천)에서만 스크롤
    if (!isScrolledToSections) {
      // 히어로 섹션 다음으로 스크롤 (네비게이션 바가 보이도록 조정)
      const heroSection = document.querySelector(".hero-section");
      const topNav = document.querySelector(".top-nav");
      if (heroSection && topNav) {
        // 히어로 섹션 끝에서 네비게이션 바 높이만큼 빼서 스크롤
        const scrollPosition =
          heroSection.offsetTop +
          heroSection.offsetHeight -
          topNav.offsetHeight -
          20;
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
        isScrolledToSections = true;
      }
    }
  }

  // 모든 탭의 활성 상태 업데이트
  updateAllTabStates(sectionId);
}

// 모든 탭의 활성 상태 업데이트
function updateAllTabStates(sectionId) {
  // 모든 섹션의 탭 버튼들 찾기
  const allSectionTabs = document.querySelectorAll(".section-tabs");

  allSectionTabs.forEach((sectionTabs) => {
    const tabButtons = sectionTabs.querySelectorAll(".tab-btn");

    tabButtons.forEach((button) => {
      button.classList.remove("active");

      // 클릭된 섹션에 해당하는 버튼에 active 클래스 추가
      const onclickAttr = button.getAttribute("onclick");
      if (onclickAttr && onclickAttr.includes(sectionId)) {
        button.classList.add("active");
      }
    });
  });
}

// 각 섹션의 네비게이터 바 활성 상태 초기화
function initializeSectionNavBars() {
  // 활동별 추천 섹션의 네비게이터 바
  const activitySection = document.getElementById("activity-section");
  if (activitySection) {
    const activityNavTabs = activitySection.querySelector(".section-tabs");
    if (activityNavTabs) {
      const tabButtons = activityNavTabs.querySelectorAll(".tab-btn");
      tabButtons.forEach((button) => {
        button.classList.remove("active");
        if (button.textContent.trim() === "활동별 추천") {
          button.classList.add("active");
        }
      });
    }
  }

  // 사진용 추천 섹션의 네비게이터 바
  const photoSection = document.getElementById("photo-section");
  if (photoSection) {
    const photoNavTabs = photoSection.querySelector(".section-tabs");
    if (photoNavTabs) {
      const tabButtons = photoNavTabs.querySelectorAll(".tab-btn");
      tabButtons.forEach((button) => {
        button.classList.remove("active");
        if (button.textContent.trim() === "사진용 추천") {
          button.classList.add("active");
        }
      });
    }
  }

  // 스냅 코디 섹션의 네비게이터 바
  const snapSection = document.getElementById("snap-section");
  if (snapSection) {
    const snapNavTabs = snapSection.querySelector(".section-tabs");
    if (snapNavTabs) {
      const tabButtons = snapNavTabs.querySelectorAll(".tab-btn");
      tabButtons.forEach((button) => {
        button.classList.remove("active");
        if (button.textContent.trim() === "스냅 코디") {
          button.classList.add("active");
        }
      });
    }
  }
}

// 스크롤 후에도 각 섹션의 네비게이터 바 상태 유지
function maintainSectionNavBarStates() {
  // 활동별 추천 섹션의 네비게이터 바 상태 유지
  const activitySection = document.getElementById("activity-section");
  if (activitySection) {
    const activityNavTabs = activitySection.querySelector(".section-tabs");
    if (activityNavTabs) {
      const tabButtons = activityNavTabs.querySelectorAll(".tab-btn");
      tabButtons.forEach((button) => {
        if (button.textContent.trim() === "활동별 추천") {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }

  // 사진용 추천 섹션의 네비게이터 바 상태 유지
  const photoSection = document.getElementById("photo-section");
  if (photoSection) {
    const photoNavTabs = photoSection.querySelector(".section-tabs");
    if (photoNavTabs) {
      const tabButtons = photoNavTabs.querySelectorAll(".tab-btn");
      tabButtons.forEach((button) => {
        if (button.textContent.trim() === "사진용 추천") {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }

  // 스냅 코디 섹션의 네비게이터 바 상태 유지
  const snapSection = document.getElementById("snap-section");
  if (snapSection) {
    const snapNavTabs = snapSection.querySelector(".section-tabs");
    if (snapNavTabs) {
      const tabButtons = snapNavTabs.querySelectorAll(".tab-btn");
      tabButtons.forEach((button) => {
        if (button.textContent.trim() === "스냅 코디") {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }
}

// 페이지 로드 완료 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  console.log("페이지 로드 완료");

  // 스크롤 상태 초기화
  isScrolledToSections = false;

  // 각 섹션의 네비게이터 바 초기화
  initializeSectionNavBars();

  // 초기 활성 상태 설정
  const activeTabs = document.querySelectorAll(".tab-btn.active");
  const activeWeatherTags = document.querySelectorAll(".weather-tag.active");
  const activeActivityTags = document.querySelectorAll(".activity-tag.active");
  const activeSnapTags = document.querySelectorAll(".snap-tag.active");
  const activeLocationTags = document.querySelectorAll(".location-tag.active");

  console.log(`활성 탭: ${activeTabs.length}개`);
  console.log(`활성 날씨 태그: ${activeWeatherTags.length}개`);
  console.log(`활성 액티비티 태그: ${activeActivityTags.length}개`);
  console.log(`활성 스냅 태그: ${activeSnapTags.length}개`);
  console.log(`활성 위치 태그: ${activeLocationTags.length}개`);
});

// 에러 처리
window.addEventListener("error", (e) => {
  console.error("JavaScript 에러:", e.error);
});

// 성능 모니터링
window.addEventListener("load", () => {
  const loadTime = performance.now();
  console.log(`페이지 로드 시간: ${loadTime.toFixed(2)}ms`);
});
