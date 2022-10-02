import { API_URL } from "../js/module.js";

const apiGet = fetch (API_URL);

apiGet
    .then (async function (response){

        let products = await response.json();

        function getItems(){
            for (let i = 0; i < products.length; i++) {

                const items = document.querySelector("#items");
    
                const link = document.createElement("a");
                link.href = `../html/product.html?id=${products[i]._id}`;

                const article = document.createElement("article");
    
                const itemImage = document.createElement("img");
                itemImage.src = products[i].imageUrl;
                itemImage.alt = products[i].altTxt;
    
                const name = document.createElement("h3");
                name.textContent = products[i].name;

                const description = document.createElement("p");
                description.textContent = products[i].description;
    
                items.appendChild(link);
                link.appendChild(article);
                article.appendChild(itemImage);
                article.appendChild(name);
                article.appendChild(description);
            }
        }

        getItems();

    });