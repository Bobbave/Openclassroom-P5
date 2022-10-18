import { API_URL } from "../js/module.js";

//Getting the local storage
let item = JSON.parse(localStorage.getItem("itemsOrdered"));

//Cart array to check if empty at the end when ordering
const cart = [];
cart.push(item);

//Creating array to stock the prices of cart items
let prices = [];

//Array to send product to the API
let products = [];

//----------------------------------------------------------------------------Cart----------------------------------------------------------------------------//
//Parsing items in localstorage to create the cart summary
for (let i = 0; i < item.length; i++){

    let apiGet = fetch (`${API_URL}/${item[i].id}`);

    apiGet
        .then (async function(response){

            let content = await response.json();

            //
            function setItemsCart(){
                //Function creating HTML tags of cart items and filling them
                function getItems(){

                    const cartItem = document.querySelector("#cart__items");

                    const article = document.createElement("article");
                    article.className = "cart__item";
                    article.dataset.id = item[i].id;
                    article.dataset.color = item[i].color;
                    cartItem.appendChild(article);

                    const divItemImage = document.createElement("div");
                    divItemImage.className = "cart__item__img";
                    article.appendChild(divItemImage);

                    const image = document.createElement("img");
                    image.src = content.imageUrl;
                    image.alt = content.altTxt;
                    divItemImage.appendChild(image);

                    const divItemContent = document.createElement("div");
                    divItemContent.className = "cart__item__content";
                    article.appendChild(divItemContent);

                    const divDescription = document.createElement("div");
                    divDescription.className = "cart__item__content__description";
                    divItemContent.appendChild(divDescription);

                    const name = document.createElement("h2");
                    name.textContent = content.name;
                    divDescription.appendChild(name);

                    const color = document.createElement("p");
                    color.textContent = item[i].color;
                    divDescription.appendChild(color);

                    const price = document.createElement("p");
                    price.textContent = content.price + " €";
                    divDescription.appendChild(price);

                    const divSettings = document.createElement("div");
                    divSettings.className = "cart__item__content__settings";
                    divItemContent.appendChild(divSettings);

                    const divSettingsQuantity = document.createElement("div");
                    divSettingsQuantity.className = "cart__item__content__settings__quantity";
                    divSettings.appendChild(divSettingsQuantity);

                    const quantity = document.createElement("p");
                    quantity.textContent = "Qté : ";
                    divSettingsQuantity.appendChild(quantity);

                    const inputQuantity = document.createElement("input");
                    inputQuantity.type = "number";
                    inputQuantity.name = "itemQuantity";
                    inputQuantity.className ="itemQuantity";
                    inputQuantity.min = "1";
                    inputQuantity.max = "100";
                    inputQuantity.textContent = item[i].quantity;
                    inputQuantity.value = item[i].quantity;
                    divSettingsQuantity.appendChild(inputQuantity);

                    const deleteDiv = document.createElement("div");
                    deleteDiv.className = "cart__item__content__settings__delete";
                    divSettings.appendChild(deleteDiv);

                    const deleteItem = document.createElement("p");
                    deleteItem.textContent = "Supprimer";
                    deleteItem.className = "deleteItem";
                    deleteDiv.appendChild(deleteItem);
                }

                getItems();

                let totalOrder = 0;
                //Function to calculate total price of cart
                function setTotalPrice(){
                    let articlePrice = item[i].quantity * content.price ;
                    prices.push(articlePrice);
                    for (let i = 0; i < prices.length; i++){
                        totalOrder += prices[i];
                    }
                }

                setTotalPrice();

                //Function to show total price and number of items
                function showPricesQuantity(){
                    const totalArticle = document.querySelector("#totalQuantity");
                    totalArticle.textContent = item.length;
                    const totalPrice = document.querySelector("#totalPrice");
                    totalPrice.textContent = totalOrder;
                }

                showPricesQuantity();

                //Function to suppress items of the cart
                function deleteProduct(){
                    let deleteList = document.querySelectorAll(".deleteItem");
                    Array.from(deleteList);
                    deleteList[i].addEventListener("click", function(){
                        item.splice(i, 1);
                        localStorage.setItem("itemsOrdered", JSON.stringify(item));
                        window.location.reload();
                    });
                }

                deleteProduct();

                //Function to change the number of an item in cart
                function modifyProduct(){
                    let quantityList = document.querySelectorAll(".itemQuantity");
                    Array.from(quantityList);
                    quantityList[i].addEventListener("change", function () {
                        item[i].quantity = parseInt(this.value);
                        localStorage.setItem("itemsOrdered", JSON.stringify(item));
                        window.location.reload();
                    });
                }

                modifyProduct();
            }
            setItemsCart();

            //Adding products ordered to the array, to be sent to the api
            products.push(item[i].id);
        });
}

//----------------------------------------------------------------------------Form----------------------------------------------------------------------------//

//Getting HTML tags
let firstName = document.querySelector("#firstName");
let firstNameMessage = document.querySelector("#firstNameErrorMsg");

let lastName = document.querySelector("#lastName");
let lastNameMessage = document.querySelector("#lastNameErrorMsg");

let adress = document.querySelector("#address");
let adressMessage = document.querySelector("#addressErrorMsg");

let city = document.querySelector("#city");
let cityMessage = document.querySelector("#cityErrorMsg");

let email = document.querySelector("#email");
let emailMessage = document.querySelector("#emailErrorMsg");

//Form messages if error
let fieldError = "Le champ contient une erreure"
let fieldValid = "";

//Setting regexs
let textRegex = new RegExp("^[A-Za-z\é\è\ê\-]+$");
let adressRegex = new RegExp("([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5})+$");
let cityRegex = new RegExp("^[A-Z][A-Za-zéèê' -]{1,30}$");
let emailRegex = new RegExp("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");

//Big function to set form elements
function setFormElements(){

    //First name
    function setFirstName(){
        firstName.addEventListener("input", function(){
            if (textRegex.test(firstName.value)){
                firstNameMessage.textContent = fieldValid;
            }
            else{
                firstNameMessage.textContent = fieldError;
            }
        });
    }

    setFirstName();

    //Last name
    function setLastName(){
        lastName.addEventListener("input", function(){
            if (textRegex.test(lastName.value)){
                lastNameMessage.textContent = fieldValid;
            }
            else{
                lastNameMessage.textContent = fieldError;
            }
        });
    }

    setLastName();

    //Adress
    function setAdress(){
        adress.addEventListener("input", function(){
            if (adressRegex.test(adress.value)){
                adressMessage.textContent = fieldValid;
            }
            else{
                adressMessage.textContent = fieldError;
            }
        });
    }

    setAdress();

    function setCity(){
        city.addEventListener("input", function(){
            if (cityRegex.test(city.value)){
                cityMessage.textContent = fieldValid;
            }
            else{
                cityMessage.textContent = fieldError;
            }
        });
    }

    setCity();

    //E-mail
    function setEmail(){
        email.addEventListener("input", function(){
            if (emailRegex.test(email.value)){
                emailMessage.textContent = fieldValid;
            }
            else{
                emailMessage.textContent = fieldError;
            }
        });
    }

    setEmail();

}

setFormElements();

//----------------------------------------------------------------------------Comfirm----------------------------------------------------------------------------//

let oneFieldError = "Au moins un champ présente une erreure";
let emptyOrder = "Le panier est vide";

function confirmCart (){
    const order = document.querySelector("#order");

    //Eventlistener to check if everything is ok
    order.addEventListener("click", function(onClick){

        if (
            textRegex.test(firstName.value) == false ||
            textRegex.test(lastName.value) == false ||
            adressRegex.test(adress.value) == false ||
            cityRegex.test(city.value) == false ||
            emailRegex.test(email.value) == false
        ){
            onClick.preventDefault();
            alert(oneFieldError);
            return;
        }

        else if (cart == "" || cart == null){
            onClick.preventDefault();
            alert(emptyOrder);
            return;
        }

        //If everything is ok
        else{

            onClick.preventDefault();

            let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: adress.value,
                city: city.value,
                email: email.value,
            };
            const apiPost = fetch(`${ API_URL }/order`, {
                method: "POST",
                body: JSON.stringify({ contact, products}),
                headers: {
                    "Content-Type": "application/json",
                  },
            });

            apiPost
                .then (async function (response){
                    try{
                        const apiContent = await response.json();
                        window.location =`../html/confirmation.html?id=${apiContent.orderId}`;
                    } catch (error) {
                        console.log(error);
                    }
                   });
        }
    });
}

confirmCart();