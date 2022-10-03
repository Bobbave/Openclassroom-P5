import { API_URL } from "../js/module.js";

const apiGet = fetch (API_URL);

//Imported and fetched the API's URL, this means apiGet will return a promise

apiGet
    .then (async function (response){

        //Getting the products informations

        let products = await response.json();

        function getItems(){
            for (let i = 0; i < products.length; i++) {

                //Setting the HTML tags 

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
                
                //Creating the HTML tags 

                items.appendChild(link);
                link.appendChild(article);
                article.appendChild(itemImage);
                article.appendChild(name);
                article.appendChild(description);
            }
        }

//This function's goal is to display the products in the home page

        getItems();

    });