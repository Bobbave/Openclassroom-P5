import { API_URL } from "../js/module.js";

const apiGet = fetch (API_URL);

//Imported and fetched the API's URL, this means apiGet will return a promise

apiGet
    .then (async function (response){

        try{
            if (response.ok){
                
                //Getting the products informations
                let products = await response.json();

                //This function's goal is to display the products in the home page
                function getItems(){
                    for (let i = 0; i < products.length; i++) {

                        //Setting and creating the HTML tags 
                        const items = document.querySelector("#items");
            
                        const link = document.createElement("a");
                        link.href = `../html/product.html?id=${products[i]._id}`;
                        items.appendChild(link);

                        const article = document.createElement("article");
                        link.appendChild(article);

                        const itemImage = document.createElement("img");
                        itemImage.src = products[i].imageUrl;
                        itemImage.alt = products[i].altTxt;
                        article.appendChild(itemImage);

            
                        const name = document.createElement("h3");
                        name.textContent = products[i].name;
                        article.appendChild(name);

                        const description = document.createElement("p");
                        description.textContent = products[i].description;
                        article.appendChild(description);
                    }
                }

                getItems();
            }
        } catch (error) {
            console.log(error);
        }
    });