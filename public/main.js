document.getElementById('refreshPage').addEventListener('click', () => {
  window.location.reload();
})

document.getElementById("filterButton").addEventListener("click", () => {
  const selectedPrice = document.querySelector(
    'input[name="price"]:checked'
  )?.value;
  const selectedFood = document.querySelector(
    'input[name="food"]:checked'
  )?.value;
  const selectedStyle = document.querySelector(
    'input[name="style"]:checked'
  )?.value;

  if (!selectedPrice || !selectedFood || !selectedStyle) {
    alert("Please select a value for each category!");
    return;
  }

  const allRestaurants = Array.from(document.querySelectorAll(".places"));

  const filteredList = document.getElementById("restaurants-list");
  filteredList.innerHTML = "";

  allRestaurants.forEach((restaurant) => {
    const restaurantData = JSON.parse(
      restaurant.querySelector(".fa-heart").dataset.place
    );

    console.log("Restaurant Data:", restaurantData);

    const matchesPrice =
      restaurantData.price.trim().toUpperCase() === selectedPrice.toUpperCase();
    const matchesFood =
      restaurantData.category.trim().toUpperCase() ===
      selectedFood.toUpperCase();
    const matchesStyle =
      restaurantData.style.trim().toUpperCase() === selectedStyle.toUpperCase();

    if (matchesPrice && matchesFood && matchesStyle) {
      const clonedRestaurant = restaurant.cloneNode(true);
      filteredList.appendChild(clonedRestaurant);
    }
  });

  // If no matches, display a message
  if (filteredList.children.length === 0) {
    const noResultsMessage = document.createElement("li");
    noResultsMessage.textContent = "No restaurants match your selection.";
    filteredList.appendChild(noResultsMessage);
  }

  // Re-apply event listeners only to new buttons
  attachHeartClickListeners();
});

// Define this once and call it as needed
const attachHeartClickListeners = () => {
  document.querySelectorAll(".fa-heart").forEach((button) => {
    button.removeEventListener("click", handleHeartClick); // Ensure no duplicate listeners
    button.addEventListener("click", handleHeartClick);
  });
};

// Handle the heart click functionality
const handleHeartClick = (e) => {
  const parent = e.target.closest("li");

  fetch("/city/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: parent.querySelector(".restaurantName").innerText,
      price: parent.querySelector("#price").innerText,
      category: parent.querySelector("#category").innerText,
      style: parent.querySelector("#style").innerText,
      description: parent.querySelector("#description").innerText,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Saved to favorites:");
      window.location.reload();
    })
    .catch((error) => console.error("Fetch Error:", error));
};

// Initialize the heart button listeners on DOM load
document.addEventListener("DOMContentLoaded", () => {
  attachHeartClickListeners();
});
