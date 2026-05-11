document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.format-date').forEach(el => {
    const d = new Date(el.textContent);
    if (!isNaN(d)) {
      el.textContent = d.toLocaleDateString();
    }
  });
});