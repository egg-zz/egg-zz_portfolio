document.addEventListener("DOMContentLoaded", () => {
  const skillTabs = document.querySelectorAll(".skill-tab");
  const skillGrids = document.querySelectorAll(".skill-grid");
  const tooltip = document.getElementById("skill-tooltip");

  function setSkillCategory(category) {
    skillGrids.forEach((grid) => {
      const gridCategory = grid.getAttribute("data-category");
      if (gridCategory === category) {
        grid.setAttribute("data-active", "true");
        gsap.fromTo(
          grid,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      } else {
        grid.setAttribute("data-active", "false");
      }
    });
  }

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category");
      if (!category) return;
      skillTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      setSkillCategory(category);
    });
  });

  function showTooltip(el) {
    if (!tooltip) return;
    const label = el.getAttribute("data-label") || "Skill";
    const level = el.getAttribute("data-level") || "0";
    tooltip.textContent = `${label} — ${level}%`;

    const rect = el.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + "px";
    tooltip.style.top = rect.top + "px";

    gsap.to(tooltip, {
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  }

  function hideTooltip() {
    if (!tooltip) return;
    gsap.to(tooltip, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
    });
  }

  document.querySelectorAll(".skill-item").forEach((item) => {
    item.addEventListener("mouseenter", () => showTooltip(item));
  });

  skillGrids.forEach((grid) => {
    grid.addEventListener("mouseleave", hideTooltip);
  });
});
