document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollToPlugin);

  const headerOffset = 80;

  /* --- HERO --- */
  gsap.from(".hero-name", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
  gsap.from(".hero-role", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power3.out",
  });

  setTimeout(() => {
    gsap.to(".hero-name", {
      y: -16,
      duration: 0.7,
      ease: "power2.inOut",
    });
    gsap.to(".hero-role", {
      y: 16,
      duration: 0.7,
      ease: "power2.inOut",
    });

    gsap.to(".hero-intro", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.1,
    });

    gsap.fromTo(
      ".hero-keywords .keyword",
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        delay: 0.2,
      }
    );
    gsap.to(".hero-keywords", { opacity: 1, duration: 0.1, delay: 0.2 });
  }, 3000);

  /* --- 부드러운 스크롤 --- */
  function smoothScrollTo(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    gsap.to(window, {
      duration: 0.7,
      scrollTo: { y: target, offsetY: headerOffset },
      ease: "power2.out",
    });
  }

  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) smoothScrollTo(href);
    });
  });

  /* --- 네비 active --- */
  const sections = ["about", "skills", "projects", "contact"].map((id) =>
    document.getElementById(id)
  );
  const navLinks = Array.from(
    document.querySelectorAll(".nav-link[data-scroll]")
  );

  function updateNavActive() {
    const scrollPos = window.scrollY + headerOffset + window.innerHeight * 0.15;
    let currentId = "";

    sections.forEach((sec) => {
      if (!sec) return;
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.replace("#", "") === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateNavActive);
  updateNavActive();

  /* --- 스크롤 리빌 --- */
  const revealEls = document.querySelectorAll(".reveal-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealEls.forEach((el) => observer.observe(el));

  /* --- 팀 리뷰 모달 --- */
  const teamToggle = document.getElementById("team-toggle");
  const modal = document.getElementById("generic-modal");
  const modalInner = document.getElementById("modal-inner");
  const modalClose = modal?.querySelector(".modal-close");
  const modalBackdrop = modal?.querySelector(".modal-backdrop");

  function openModal(html) {
    if (!modal || !modalInner) return;
    modalInner.innerHTML = html;
    modal.style.display = "flex";
    gsap.fromTo(
      ".modal-content",
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
    );
  }

  function closeModal() {
    if (!modal) return;
    gsap.to(".modal-content", {
      opacity: 0,
      y: 10,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none";
      },
    });
  }

  if (teamToggle) {
    teamToggle.addEventListener("click", () => {
      const html = `
        <h3>Team Reviews</h3>
        <p>함께 일한 팀원들이 남겨 준 피드백입니다.</p>
        <p><strong>A (프론트엔드 개발자)</strong> : 아주 좋아용~.</p>
        <p><strong>B (백엔드 개발자)</strong> : 이거지요~.</p>
        <p><strong>C (디자이너)</strong> : 최고입니다~~.</p>
      `;
      openModal(html);
    });
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  // 프로젝트 모달도 이 공통 모달을 같이 씀 → projects.js에서 openModal 재사용
  window.__openGenericModal = openModal;
});
