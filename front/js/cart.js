import { API_URL } from "../js/module.js";

let item = JSON.parse(localStorage.getItem("itemsOrdered"));

let prices = [];

for (let i = 0; i < item.length; i++){

    let apiGet = fetch (`${API_URL}/${item[i].id}`);

    apiGet
        .then (async function(response){

            let products = await response.json();

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
                image.src = products.imageUrl;
                image.alt = products.altTxt;
                divItemImage.appendChild(image);

                const divItemContent = document.createElement("div");
                divItemContent.className = "cart__item__content";
                article.appendChild(divItemContent);

                const divDescription = document.createElement("div");
                divDescription.className = "cart__item__content__description";
                divItemContent.appendChild(divDescription);

                const name = document.createElement("h2");
                name.textContent = products.name;
                divDescription.appendChild(name);

                const color = document.createElement("p");
                color.textContent = item[i].color;
                divDescription.appendChild(color);

                const price = document.createElement("p");
                price.textContent = products.price + " €";
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
                inputQuantity.className ="itemQuantity";
                inputQuantity.name = "itemQuantity";
                inputQuantity.min = "1";
                inputQuantity.max = "100";
                inputQuantity.value = item[i].quantity;
                inputQuantity.textContent = item[i].quantity;
                divSettingsQuantity.appendChild(inputQuantity);
            }

            getItems();

            let totalOrder = 0;
            function setTotalPrice(){
                let articlePrice = item[i].quantity * products.price ;
                prices.push(articlePrice);
                for (let i = 0; i < prices.length; i++){
                    totalOrder += prices[i];
                }
            }

            setTotalPrice();

            function showPricesQuantity(){
                const totalArticle = document.querySelector("#totalQuantity");
                totalArticle.textContent = item.length;
                const totalPrice = document.querySelector("#totalPrice");
                totalPrice.textContent = totalOrder;
            }

            showPricesQuantity();
        })
}