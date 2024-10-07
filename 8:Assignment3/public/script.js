let events = [];
let cartProducts = [];

// Fetch event data
fetch('http://localhost:4004/api/product')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    events = data; // Store fetched data in events
    displayEvents(events); // Display events initially
  });

function displayEvents(events) {
  const container = document.getElementById("container");
  container.innerHTML = ""; // Clear existing events

  events.forEach((event) => {
    const card = document.createElement("div");
    card.className = "main";
    container.appendChild(card);

    const img = document.createElement("img");
    img.src = event.imageUrl;
    card.appendChild(img);

    const info = document.createElement("div");
    info.className = "info";
    card.appendChild(info);

    const title = document.createElement("h3");
    title.textContent = event.title;
    info.appendChild(title);

    const date = document.createElement("p");
    date.textContent = event.date;
    info.appendChild(date);

    const company = document.createElement("p");
    company.textContent = event.company;
    info.appendChild(company);

    const price = document.createElement("p");
    price.textContent = `Ksh ${event.price}`;
    info.appendChild(price);

    const button = document.createElement("button");
    button.textContent = 'Add to Cart';
    button.className = 'buttons';
    info.appendChild(button);

    button.addEventListener('click', () => {
      addProductToCart(event); // Call the function to add the product to the cart
    });
  });
}

// Filtering function
document.getElementById("priceFilter").addEventListener("change", filterEvents);
function filterEvents() {
  const price = document.getElementById("priceFilter").value;
  console.log("Selected price filter:", price);

  let filteredOutput = events;

  if (price === "low") {
    filteredOutput = events.filter((event) => event.price <= 25);
  } else if (price === "high") {
    filteredOutput = events.filter((event) => event.price > 25);
  }

  displayEvents(filteredOutput);
}

// Sorting function
function sortEvents(criteria, order) {
  const sortedEvents = [...events].sort((a, b) => {
    let valA = a[criteria];
    let valB = b[criteria];

    if (criteria === 'date') {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (!valA) valA = criteria === 'price' ? 0 : new Date(0);
    if (!valB) valB = criteria === 'price' ? 0 : new Date(0);

    return order === 'asc' ? valA - valB : valB - valA; 
  });

  displayEvents(sortedEvents);
}


// Event listeners for sorting buttons
document.getElementById('sort-price-asc').addEventListener('click', () => sortEvents('price', 'asc'));
document.getElementById('sort-price-desc').addEventListener('click', () => sortEvents('price', 'desc'));
document.getElementById('sort-date-asc').addEventListener('click', () => sortEvents('date', 'asc'));
document.getElementById('sort-date-desc').addEventListener('click', () => sortEvents('date', 'desc'));

const addProductToCart = function (product) {
  const cartDiv = document.getElementById('cartDiv');

  // Find if the product is already in the cart
  const existingProductIndex = cartProducts.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
      // If product exists, increment the quantity
      cartProducts[existingProductIndex].quantity += 1;
  } else {
      // Add new product with quantity set to 1, ensure product is valid
      if (product && product.id) {
          product.quantity = 1;
          cartProducts.push(product);
      }
  }

  refreshCart(); // Refactored refresh to only update the display
};

// Function to remove the product from the cart
const removeProductFromCart = function (index) {
  cartProducts.splice(index, 1); // Remove the product at the specified index
  refreshCart(); // Refresh the cart
};

// Function to refresh the cart display
const refreshCart = function () {
  const cartDiv = document.getElementById('cartDiv');
  cartDiv.innerHTML = ''; // Clear the cart display

  cartProducts.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      const img = document.createElement('img');
      img.src = item.imageUrl;
      cartItem.appendChild(img);

      const info = document.createElement('div');
      info.className = "info-cart";
      cartItem.appendChild(info);

      const title = document.createElement('h4');
      title.textContent = item.title;
      info.appendChild(title);

      const date = document.createElement('p');
      date.textContent = item.date;
      info.appendChild(date);

      const company = document.createElement('p');
      company.textContent = item.company;
      info.appendChild(company);

      const price = document.createElement('p');
      price.textContent = `Ksh ${item.price}`;
      info.appendChild(price);

      const btnDiv = document.createElement('div');
      btnDiv.className = 'btn-div';
      info.appendChild(btnDiv);

      // Increment and Decrement buttons
      const incDec = document.createElement("div");
      incDec.className = 'incDec';
      btnDiv.appendChild(incDec);

      const sub = document.createElement("button");
      sub.textContent = '-';
      sub.className = 'btn';
      sub.addEventListener('click', () => {
          if (item.quantity > 1) {
              item.quantity -= 1;
          } else {
              removeProductFromCart(index); // Remove if quantity is 1
          }
          refreshCart(); // Update cart after decrement
      });
      incDec.appendChild(sub);

      const num = document.createElement("p");
      num.textContent = item.quantity;
      incDec.appendChild(num);

      const add = document.createElement("button");
      add.textContent = '+';
      add.className = 'btn';
      add.addEventListener('click', () => {
          item.quantity += 1;
          refreshCart(); // Update cart after increment
      });
      incDec.appendChild(add);

      // Delete button functionality
      const deleteButton = document.createElement("button");
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'buttons';
      deleteButton.addEventListener('click', () => {
          removeProductFromCart(index); // Call the remove function
      });
      btnDiv.appendChild(deleteButton);

      // Append the new cart item to the cart container
      cartDiv.appendChild(cartItem);
  });

  // Update the total price
  updateTotalPrice();
};

// Function to calculate and display the total price
const updateTotalPrice = function () {
  const totalPriceDiv = document.getElementById('totalPriceDiv'); // Div to display total price
  let totalPrice = 0;

  cartProducts.forEach(item => {
      totalPrice += item.price * item.quantity;
  });

  totalPriceDiv.textContent = `Total Price: Ksh ${totalPrice}`;
};

// Initial rendering of total price container
document.addEventListener('DOMContentLoaded', () => {
  const cartDiv = document.getElementById('cartDiv');
  const totalPriceDiv = document.createElement('div');
  totalPriceDiv.id = 'totalPriceDiv';
  totalPriceDiv.textContent = 'Total Price: Ksh 0';
  cartDiv.parentElement.appendChild(totalPriceDiv); 
});

// Show form functions
document.getElementById('showAddFormBtn').addEventListener('click', () => {
  document.getElementById('addProductForm').classList.remove('hidden');
  document.getElementById('updateProductForm').classList.add('hidden');
  document.getElementById('deleteProductForm').classList.add('hidden');
});

document.getElementById('showUpdateFormBtn').addEventListener('click', () => {
  document.getElementById('updateProductForm').classList.remove('hidden');
  document.getElementById('addProductForm').classList.add('hidden');
  document.getElementById('deleteProductForm').classList.add('hidden');
});

document.getElementById('showDeleteFormBtn').addEventListener('click', () => {
  document.getElementById('deleteProductForm').classList.remove('hidden');
  document.getElementById('addProductForm').classList.add('hidden');
  document.getElementById('updateProductForm').classList.add('hidden');
});

// Function to toggle modal visibility
document.querySelector('.admin').addEventListener('change', function (event) {
  // Hide all modals first
  document.getElementById('addProductForm').style.display = 'none';
  document.getElementById('updateProductForm').style.display = 'none';
  document.getElementById('deleteProductForm').style.display = 'none';

  // Show the modal based on the selected option
  if (event.target.value === 'view') {
      document.getElementById('addProductForm').style.display = 'block';
  } else if (event.target.value === 'edit') {
      document.getElementById('updateProductForm').style.display = 'block';
  } else if (event.target.value === 'delete') {
      document.getElementById('deleteProductForm').style.display = 'block';
  }
});


// Add Product Form Submission
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newProduct = {
      imageUrl: document.getElementById('productImageUrl').value,
      title: document.getElementById('productTitle').value,
      price: document.getElementById('productPrice').value,
      date: document.getElementById('productDate').value,
      location: document.getElementById('productLocation').value,
      company: document.getElementById('productCompany').value
  };

  try {
      await axios.post("http://127.0.0.1:4004/api/product", newProduct);
      alert('New product added!');
      displayContent();
      document.getElementById('addProductForm').reset(); // Reset the form
      document.getElementById('addProductForm').classList.add('hidden'); // Hide the form
  } catch (error) {
      console.error('Error adding product:', error.response.data);
  }
});

// Update Product Form Submission
document.getElementById('updateProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productId = document.getElementById('productIdToUpdate').value;
  const updatedProduct = {
      imageUrl: document.getElementById('updateProductImageUrl').value,
      title: document.getElementById('updateProductTitle').value,
      price: document.getElementById('updateProductPrice').value,
      date: document.getElementById('updateProductDate').value,
      location: document.getElementById('updateProductLocation').value,
      company: document.getElementById('updateProductCompany').value
  };

  try {
      await axios.put(`http://127.0.0.1:4004/api/product/${productId}`, updatedProduct);
      alert('Product updated!');
      displayContent();
      document.getElementById('updateProductForm').reset(); // Reset the form
      document.getElementById('updateProductForm').classList.add('hidden'); // Hide the form
  } catch (error) {
      console.log(error);
      console.error('Error updating product:', error.response.data);
  }
});

// Delete Product Form Submission
document.getElementById('deleteProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productId = document.getElementById('productIdToDelete').value;

  try {
      await axios.delete(`http://127.0.0.1:4004/api/product/${productId}`);
      alert('Product deleted!');
      displayContent();
      document.getElementById('deleteProductForm').reset(); // Reset the form
      document.getElementById('deleteProductForm').classList.add('hidden'); // Hide the form
  } catch (error) {
      console.error('Error deleting product:', error.response.data);
  }
});

document.getElementById('confirmAddProductBtn').addEventListener('click', () => {
  const newProduct = {
    id: Date.now(), // Unique ID for the product
    imageUrl: document.getElementById('productImageUrl').value,
    title: document.getElementById('productTitle').value,
    price: parseFloat(document.getElementById('productPrice').value),
    date: document.getElementById('productDate').value,
    location: document.getElementById('productLocation').value,
    company: document.getElementById('productCompany').value,
    quantity: 1
  };

  events.push(newProduct);
  displayEvents(events);
  document.getElementById('addProductForm').classList.add('hidden'); // Hide the form
  document.getElementById('addProductForm').reset(); // Reset form fields
});

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const addProductForm = document.getElementById('addProductForm');
  const updateProductForm = document.getElementById('updateProductForm');
  const deleteProductForm = document.getElementById('deleteProductForm');
  
  if (event.target === addProductForm) {
      addProductForm.style.display = 'none';
  } else if (event.target === updateProductForm) {
      updateProductForm.style.display = 'none';
  } else if (event.target === deleteProductForm) {
      deleteProductForm.style.display = 'none';
  }
};
