document.addEventListener("DOMContentLoaded", () => {
  const filterType = document.getElementById("filterType");
  const filterLocation = document.getElementById("filterLocation");
  const filterPrice = document.getElementById("filterPrice");
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const propertyList = document.getElementById("propertyList");

  let properties = [];

  // Load properties from JSON
  async function loadProperties() {
    try {
      const response = await fetch("../property.json"); // Adjust if needed
      if (!response.ok) throw new Error("Failed to fetch property data");
      properties = await response.json();
      displayProperties(properties.filter(p => p.status === "vacant")); // show vacant only
    } catch (error) {
      console.error("Error loading properties:", error);
      propertyList.innerHTML = "<p>Error loading properties.</p>";
    }
  }

  // Display properties
  function displayProperties(list) {
    propertyList.innerHTML = "";

    if (list.length === 0) {
      propertyList.innerHTML = "<p>No houses available with the selected filters.</p>";
      return;
    }

    list.forEach(p => {
      if (p.status === "vacant") {
        const card = document.createElement("div");
        card.classList.add("property-card");
        card.innerHTML = `
          <img src="${p.image}" alt="${p.type}">
          <h3>${p.type}</h3>
          <p><strong>Location:</strong> ${p.location}</p>
          <p><strong>Price:</strong> Ksh ${p.price}</p>
          <p><strong>Status:</strong> ${p.status}</p>
        `;
        propertyList.appendChild(card);
      }
    });
  }

  // Filter properties
  function filterProperties() {
    const type = filterType.value;
    const location = filterLocation.value;
    const price = filterPrice.value;

    const filtered = properties.filter(p => {
      return (
        (type === "" || p.type === type) &&
        (location === "" || p.location === location) &&
        (price === "" || parseInt(p.price) <= parseInt(price)) &&
        p.status === "vacant"
      );
    });

    displayProperties(filtered);
  }

  // Event Listeners
  searchBtn.addEventListener("click", filterProperties);

  resetBtn.addEventListener("click", () => {
    filterType.value = "";
    filterLocation.value = "";
    filterPrice.value = "";
    displayProperties(properties.filter(p => p.status === "vacant"));
  });

  // Initial load
  loadProperties();
});
