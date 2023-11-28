export const lazyMap = () => {
  const lazymaps = document.querySelectorAll(".c-lazy-map");
  const io = new IntersectionObserver(inViewport, {
    threshold: [0],
  });
  if (lazymaps) {
    Array.from(lazymaps).forEach((element) => {
      io.observe(element);
    });
  }
  function inViewport(entries, io) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        const element = entry.target;
        element.src = element.getAttribute("data-src");
        element.addEventListener("load", () => {
          element.removeAttribute("data-src");
        });
        io.unobserve(entry.target);
      }
    });
  }
}
