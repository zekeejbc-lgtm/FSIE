(function () {
  const sections = Array.from(document.querySelectorAll('.timeline-section'));
  const labels = Array.from(document.querySelectorAll('#timeline-labels li'));
  const progressEl = document.getElementById('timeline-progress');
  const contentEl = document.getElementById('timeline-content');
  const lineEl = document.querySelector('.timeline-line');

  const getOffsets = () => {
    const rect = contentEl.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const start = rect.top + scrollTop;
    const end = start + rect.height - window.innerHeight * 0.2;
    return { start, end };
  };

  const updateProgress = () => {
    if (!progressEl || !contentEl) return;
    if (lineEl) {
      lineEl.style.height = `${contentEl.scrollHeight}px`;
    }
    const { start, end } = getOffsets();
    const scroll = window.scrollY || window.pageYOffset;
    const clamped = Math.min(Math.max(scroll - start, 0), end - start);
    const percent = (clamped / Math.max(end - start, 1)) * 100;
    progressEl.style.height = `${percent}%`;
  };

  const activateSection = (id) => {
    sections.forEach((section) => {
      section.classList.toggle('active', section.id === id);
    });
    labels.forEach((label) => {
      label.classList.toggle('active', label.dataset.target === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateSection(entry.target.id);
        }
      });
    },
    {
      threshold: 0.45,
    }
  );

  sections.forEach((section) => observer.observe(section));

  labels.forEach((label) => {
    label.addEventListener('click', () => {
      const target = document.getElementById(label.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => updateProgress(), 200);
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
  });
})();
