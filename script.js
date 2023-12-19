// Applying search functionality on Table-Card

const searchBox = document.getElementById("search-box");
const tableCards = document.querySelectorAll(".table-card");

searchBox.addEventListener("input", updateTable);

// Define the update-Table function
function updateTable() {
  const query = searchBox.value.toLowerCase();

  tableCards.forEach((item) => {
    const name = item.querySelector("h3").textContent.toLowerCase();
    if (name.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Applying search functionality on Items

const searchInput = document.querySelector(".menu-search input");
const menuItems = document.querySelectorAll(".item-card");

searchInput.addEventListener("input", updateMenu);

// Define the updateMenu function
function updateMenu() {
  const query = searchInput.value.toLowerCase();

  // Loop through all menu items and filter/sort as needed
  menuItems.forEach((item) => {
    const name = item.querySelector("h3").textContent.toLowerCase();
    if (name.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

//--------- Applying Drag and Drop

menuItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

tableCards.forEach((card) => {
  card.addEventListener("dragover", dragOver);
  card.addEventListener("drop", drop);
  // card.addEventListener("click", openModel);
});

function dragStart(event) {
  // Set the data being dragged
  event.dataTransfer.setData("text/plain", event.target.id);
}

// Define the dragOver function
function dragOver(event) {
  // Allow dropping of items
  event.preventDefault();
}

function drop(event) {
  // Get the ID of the dragged item and the target table
  const itemId = event.dataTransfer.getData("text/plain");
  const tableCard = event.target.closest(".table-card");

  // Get the item name and price
  const itemName = document.querySelector(`#${itemId} h3`).textContent;
  const itemPrice = parseFloat(
    document.querySelector(`#${itemId} p`).textContent.slice(1)
  );

  console.log("item price is " + itemPrice);

  // Update the table card item count and total
  const itemCount = parseInt(
    tableCard.querySelector(".item-count").textContent
  );
  const total = parseInt(tableCard.querySelector(".total-price").textContent);
  console.log("Total is " + total);
  tableCard.querySelector(".item-count").textContent = `${
    itemCount + 1
  } items |`;
  console.log("item count is : " + itemCount);
  tableCard.querySelector(".total-price").textContent = ` ${total + itemPrice}`;
}

// Adding functionality of Modal

//const mainModelClass = document.querySelector(".modal");
const closeButton = document.querySelector(".close");

// function openModel() {

//Get all table cards

//const tableCards = document.querySelectorAll(".table-card");

//Loop through each table card and add click event listener
tableCards.forEach((tableCard) => {
  tableCard.addEventListener("click", () => {
    //Get table number from the ID of the table card

    const tableNumber = tableCard.id.split("table")[1];

    console.log("Open model clicked");

    // Get the modal element
    const modal = document.querySelector(".modal");
    console.log("model :- " + modal);
    modal.classList.add("active");

    // Get the close button
    //const closeButton = document.querySelector(".close");

    // Get the modal body element
    const modalBody = document
      .getElementById("modal-body")
      .getElementsByTagName("h5")[0];
    //console.log("modal body :- "+ modalBody.innerHTML);

    // Get the modal total element
    const modalTotal = document.getElementById("modal-total");

    // Clear the modal body
    modalBody.innerHTML = "";

    // Set the initial total to 0
    let total = 0;

    // Loop through each item in the menu
    menuItems.forEach((menuItem) => {
      // Create a new row for the item in the modal body
      const newRow = document.createElement("tr");

      // Create cells for the item name, price, and quantity
      const nameCell = document.createElement("td");
      const priceCell = document.createElement("td");
      const quantityCell = document.createElement("td");

      // Set the content of the cells
      nameCell.textContent = menuItem.name;
      priceCell.textContent = `$${menuItem.price.toFixed(2)}`;
      quantityCell.innerHTML = `
        <button class="quantity-button minus-button">-</button>
        <span class="quantity">0</span>
        <button class="quantity-button plus-button">+</button>
      `;

      // Add event listeners to the quantity buttons
      const minusButton = quantityCell.querySelector(".minus-button");
      const plusButton = quantityCell.querySelector(".plus-button");
      const quantitySpan = quantityCell.querySelector(".quantity");

      minusButton.addEventListener("click", () => {
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 0) {
          quantity--;
          quantitySpan.textContent = quantity;
          total -= menuItem.price;
          modalTotal.textContent = `$${total.toFixed(2)}`;
        }
      });

      plusButton.addEventListener("click", () => {
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity;
        total += menuItem.price;
        modalTotal.textContent = `$${total.toFixed(2)}`;
      });

      // Add the cells to the row
      newRow.appendChild(nameCell);
      newRow.appendChild(priceCell);
      newRow.appendChild(quantityCell);

      // Add the row to the modal body
      modalBody.appendChild(newRow);
    });

    // Set the total in the modal
    modalTotal.textContent = `$${total.toFixed(2)}`;

    // Show the modal
    modal.style.display = "block";

    // When the user clicks on the close button, close the modal
    // closeButton.addEventListener("click", () => {
    //     modal.style.display = "none";
      
   // });
  });
});

closeButton.addEventListener("click", function () {
  modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
  if (e.target !== modal) {
    return;
  }
  modal.classList.remove("active");
});
