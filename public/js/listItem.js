//Giving click event listener to plus buttons
const plusButtons = document.querySelectorAll("#plus");
for (const button of plusButtons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    plusVal(event);
  });
}

const plusVal = (event) => {
  if (event.target.hasAttribute("data-id")) {
    const value = event.target.getAttribute("data-id");
    const valueSelector = `#quantity-val${value}`;
    var quantity = parseInt(document.querySelector(`${valueSelector}`).value);
    quantity++;
    document.querySelector(`${valueSelector}`).value = quantity;
  }
};

//Giving click event listener to minus buttons
const minusButtons = document.querySelectorAll("#minus");
for (const button of minusButtons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    minusVal(event);
  });
}

const minusVal = (event) => {
  if (event.target.hasAttribute("data-id")) {
    const value = event.target.getAttribute("data-id");
    const valueSelector = `#quantity-val${value}`;
    var quantity = parseInt(document.querySelector(`${valueSelector}`).value);
    if (quantity > 0) {
      quantity--;
    }
    document.querySelector(`${valueSelector}`).value = quantity;
  }
};

//Giving click event listener to add list buttons
const addButtons = document.querySelectorAll("#add-list");
for (const button of addButtons) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    addProduct(event);
  });
}
const addProduct = async (event) => {
  const quantity_value = event.target.getAttribute("data-id");
  const product_id = parseInt(event.target.getAttribute("data-id"));
  const valueSelector = `#quantity-val${quantity_value}`;
  const quantity = parseInt(document.querySelector(`${valueSelector}`).value);

  if (product_id && quantity > 0) {
    const response = await fetch("/api/list/", {
      method: "POST",
      body: JSON.stringify({ quantity, product_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.querySelector(`${valueSelector}`).value = "1";
      $("#added").modal("show");
    } else {
      document.location.replace("/login");
    }
  } else {
      $("#failed-added").modal("show");
  }
};
