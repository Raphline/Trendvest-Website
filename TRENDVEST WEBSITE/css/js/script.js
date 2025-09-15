document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");

    // Optional: change ☰ to X when open
    if (navbar.classList.contains("active")) {
      toggle.textContent = "✖";
    } else {
      toggle.textContent = "☰";
    }
  });
});
