//Giving click event listener to delete item buttons
const delButtons = document.querySelectorAll("#delete-item");

for (const button of delButtons) {
  button.addEventListener("click", async function (event) {
    const quantity_value = event.target.getAttribute("name");
    const product_id = parseInt(event.target.getAttribute("name"));

    valueSelector = `#quantity-val${quantity_value}`;

    if (product_id) {
      const response = await fetch(`/api/list/${product_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      }
    } else {
      alert("Failed to delete product from list");
    }
  });
}

//Giving click event listener to update buttons
const updateButtons = document.querySelectorAll("#update");

for (const button of updateButtons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    updateProduct(event);
  });
}

const updateProduct = async (event) => {
  const quantity_value = event.target.getAttribute("name");
  var id = parseInt(event.target.getAttribute("name"));
  var valueSelector = `#quantity-val${quantity_value}`;
  var quantity = parseInt(document.querySelector(`${valueSelector}`).value);

  if (id && quantity > 0) {
    const response = await fetch(`/api/list/${id}`, {
      method: "PUT",
      body: JSON.stringify({ quantity, id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.reload();
    }
  } else {
      $("#failed-edit").modal("show");
    return;
  }
};

//Button to clear list at bottom of page
const deleteList = async () => {
  // if (confirm("Cick okay to clear your list.") == true) {
  const response = await fetch("/api/list/", {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/list");
  }
  // }
};

let showClearModal = () => {
  $("#clear-list-modal").modal("show");
}

// Function for calculating total price
const productArr = [];

const items = document.querySelectorAll("#price");
for (const item of items) {
  productArr.push(parseInt(item.innerHTML));
}

console.log(productArr);

const totalPrice = () => {
  const sum = productArr.reduce((partialSum, a) => partialSum + a, 0);
  document.querySelector("#total-list-price").innerHTML = sum;
};

totalPrice();

document.querySelector("#delete-list-modal-show").addEventListener("click", showClearModal);
document.querySelector("#delete-list").addEventListener("click", deleteList);
