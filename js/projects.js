document.addEventListener("DOMContentLoaded", () => {
  const filterChips = document.querySelectorAll(".filter-chip");
  const projectCards = document.querySelectorAll(".project-card");
  const projectSearch = document.getElementById("project-search");
  const projectSearchMessage = document.getElementById("project-search-message");

  let currentFilter = "all";

  function cardMatches(card, filter, term) {
    const rawTags = (card.getAttribute("data-tags") || "").toLowerCase();
    const tags = rawTags.split(" ").filter(Boolean);

    const filterOK =
      filter === "all" ||
      (filter === "team" && tags.includes("team")) ||
      (filter === "solo" && tags.includes("solo"));

    const termOK = !term || rawTags.includes(term);
    return filterOK && termOK;
  }

  function applyFilterAndSearch() {
    const term = (projectSearch?.value || "").trim().toLowerCase();
    let anyVisible = false;

    projectCards.forEach((card) => {
      const match = cardMatches(card, currentFilter, term);
      if (match) {
        anyVisible = true;
        card.style.pointerEvents = "auto";
        gsap.to(card, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        card.style.pointerEvents = "none";
        gsap.to(card, {
          autoAlpha: 0,
          scale: 0.95,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        });
      }
    });

    if (projectSearchMessage) {
      if (!anyVisible && term) {
        projectSearchMessage.textContent = `아직 "${term}" 기술로 만든 프로젝트는 없어요. 대신 열심히 공부 중입니다. 조금만 기다려 주세요 :)`;
      } else {
        projectSearchMessage.textContent = "";
      }
    }
  }

  // 필터 버튼
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter") || "all";
      currentFilter = filter;
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      applyFilterAndSearch();
    });
  });

  // 검색
  if (projectSearch) {
    projectSearch.addEventListener("keyup", () => {
      applyFilterAndSearch();
    });
  }

  applyFilterAndSearch();

  /* --- 프로젝트 모달 (공통 모달 사용) --- */
  function openProjectModal(card) {
    const data = card.querySelector(".project-modal-data");
    if (!data) return;
    if (window.__openGenericModal) {
      window.__openGenericModal(data.innerHTML);
    }
  }

  // 카드 "클릭"했을 때만 모달 오픈
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      openProjectModal(card);
    });
  });
});
