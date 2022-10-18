//Getting the order number from the URL
let parameter = new URLSearchParams(window.location.search);
let orderNumber = parameter.get("id");

//Setting the order number in the HTML
let orderId = document.querySelector("#orderId");
orderId.textContent = orderNumber;