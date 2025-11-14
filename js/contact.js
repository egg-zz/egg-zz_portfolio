document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const contactSubmit = document.getElementById("contact-submit");
  const contactSuccess = document.getElementById("contact-success");

  function createParticles(anchorEl) {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const count = 24;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = centerX + "px";
      particle.style.top = centerY + "px";
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 60;
      const duration = 0.7 + Math.random() * 0.3;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        },
      });
    }
  }

  function showSuccessMessage() {
    if (!contactSuccess) return;
    contactSuccess.classList.add("visible");
    gsap.fromTo(
      contactSuccess,
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    setTimeout(() => {
      gsap.to(contactSuccess, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          contactSuccess.classList.remove("visible");
          contactSuccess.style.opacity = "";
        },
      });
    }, 4000);
  }

  if (contactForm && contactSubmit) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      contactSubmit.disabled = true;
      const originalText = contactSubmit.textContent;
      contactSubmit.textContent = "Sending...";

      setTimeout(() => {
        contactSubmit.disabled = false;
        contactSubmit.textContent = originalText;
        contactForm.reset();
        showSuccessMessage();
        createParticles(contactSubmit);
      }, 900);
    });
  }
});
