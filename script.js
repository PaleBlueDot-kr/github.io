// 블로그에 표시할 포스트 목록 배열
const posts = [
  {
    title: "첫 번째 게시글",
    date: "2025.05.01",
    tags: ["#HTML", "#CSS"],
    content: "이것은 첫 번째 게시글의 내용입니다.",
    category: "개발"
  },
  {
    title: "두 번째 게시글",
    date: "2025.05.02",
    tags: ["#JavaScript"],
    content: "두 번째 글 내용이 들어갑니다.",
    category: "일상"
  },
  // 계속 포스트 추가 가능
];

// 한 페이지에 보여줄 포스트 수
const postsPerPage = 5;

// 현재 페이지 번호를 저장하는 변수 (처음엔 1페이지)
let currentPage = 1;

// 포스트를 화면에 그려주는 함수
function renderPosts() {
  const container = document.getElementById("post-container"); // 포스트를 넣을 영역 선택
  container.innerHTML = ""; // 기존 내용 초기화

  // 현재 페이지에 해당하는 포스트 범위 계산
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end).reverse(); // 해당 범위의 포스트만 추출 + 역순

  // 각 포스트 HTML로 만들어서 화면에 추가
  pagePosts.forEach((post, index) => {
    const postHTML = `
      <article class="post" data-category="${post.category}">
        <h2 class="post-title">${post.title}</h2>
        <div class="post-date">${post.date}</div>

        <div class="post-content" style="display: ${index === 0 ? "block" : "none"};">
          <div class="post-tags">${post.tags.map(tag => `<span>${tag}</span>`).join("")}
          </div>
          <p>${post.content}</p>
        </div>

        <button class="toggle-btn">${index === 0 ? "접기" : "펼치기"}</button>
      </article>
    `;
    container.insertAdjacentHTML("beforeend", postHTML); // HTML을 컨테이너에 추가
  });

  attachToggleListeners(); // 펼치기/접기 버튼 이벤트 연결
}

// 페이지 버튼을 화면에 그리는 함수
function renderPagination() {
  const pageCount = Math.ceil(posts.length / postsPerPage); // 전체 페이지 수 계산
  const pagination = document.getElementById("pagination"); // 페이지 버튼 영역

  let buttons = '';

  // 이전 버튼 생성
  if (currentPage > 1) {
    buttons += `<button onclick="changePage(${currentPage - 1})">이전</button>`;
  }

  // 숫자 페이지 버튼 생성
  for (let i = 1; i <= pageCount; i++) {
    buttons += `<button onclick="changePage(${i})" ${i === currentPage ? 'disabled' : ''}>${i}</button>`;
  }

  // 다음 버튼 생성
  if (currentPage < pageCount) {
    buttons += `<button onclick="changePage(${currentPage + 1})">다음</button>`;
  }

  pagination.innerHTML = buttons; // 버튼을 페이지에 출력
}

// 페이지를 바꿀 때 호출되는 함수
function changePage(page) {
  currentPage = page; // 현재 페이지를 바꾸고
  renderPosts(); // 새 페이지의 포스트를 다시 그림
  renderPagination(); // 페이지 버튼도 다시 그림
  setupCategoryFilter(); // 카테고리 필터 이벤트 다시 연결
}

// 펼치기/접기 버튼을 작동시키는 함수
function attachToggleListeners() {
  const toggleButtons = document.querySelectorAll(".toggle-btn"); // 모든 버튼 선택

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.previousElementSibling; // 버튼 바로 앞 요소 (내용 영역)
      const isHidden = content.style.display === "none"; // 현재 상태 확인
      content.style.display = isHidden ? "block" : "none"; // 상태 토글
      btn.textContent = isHidden ? "접기" : "펼치기"; // 버튼 텍스트 바꿈
    });
  });
}

// 카테고리 필터링을 설정하는 함수
function setupCategoryFilter() {
  const categoryButtons = document.querySelectorAll(".category-btn"); // 카테고리 버튼들 선택

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-category"); // 어떤 카테고리를 눌렀는지

      const postElements = document.querySelectorAll(".post"); // 모든 포스트 선택

      postElements.forEach((post) => {
        const category = post.getAttribute("data-category"); // 각 포스트의 카테고리

        // 선택된 카테고리와 일치하는 포스트만 보이게 함
        if (selected === "all" || selected === category) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  });
}

// 페이지 처음 로딩될 때 실행되는 함수들
renderPosts();         // 포스트 출력
renderPagination();    // 페이지 버튼 출력
setupCategoryFilter(); // 카테고리 필터링 설정