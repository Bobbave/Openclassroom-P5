import {API_URL} from "../js/module.js";

//----------------------------------------------------------------Product----------------------------------------------------------------
//Retrieve the product's ID in the URL
let parameter = new URLSearchParams(window.location.search);
let idProduct = parameter.get("id");

let apiGet = fetch (`${API_URL}/${idProduct}`);

apiGet
    .then (async function (response){
        
        // Getting the product's informations from the promise (apiGet)
        let product = await response.json();
         
        function getItem(){

            // Setting up the different information of the product
            const imageDiv = document.querySelector(".item__img");
            const image = document.createElement("img");
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            imageDiv.appendChild(image);

            const name = document.querySelector("#title");
            name.textContent = product.name

            const price = document.querySelector("#price");
            price.textContent = product.price;

            const description = document.querySelector("#description");
            description.textContent = product.description;

            const colorDiv = document.querySelector("#colors");

            for (let i = 0; i < product.colors.length; i++){
                let color = document.createElement("option");
                color.value = product.colors[i];
                color.textContent = product.colors[i]
                colorDiv.appendChild(color);
            }
        }

        getItem();
        
    });

//----------------------------------------------------------------Adding to cart----------------------------------------------------------------
//Function to add selected item to the localstorage
function setUpLocalStorage(){

    const button = document.querySelector("#addToCart");

    //Action to do when the user click on "Ajouter au panier"
    button.addEventListener("click", function(){

        const quantity = document.querySelector("#quantity").value;
        const color = document.querySelector("#colors").value;

        //Creating JS object to stock the quantity and color
        const addItem = {
            id: idProduct,
            quantity: Number(quantity),
            color: color,
        };

        //Retrieving the cart 
        let productOrdered = JSON.parse(localStorage.getItem("itemsOrdered"));

        let alertQuantity = "La quantité ne peut pas dépasser 100";
        let alertAdded = "Le produit a été ajouté au panier";

        if (quantity > 100){
            alert("Vous ne pouvez pas commander plus de 100 fois le même produit")
            return;
        }
        if (quantity === "" || color ===""){
            alert("Il faut choisir une quantité et uné couleure");
            return;
        }

        //If cart empty
        if (productOrdered == null){
            productOrdered = [];
            productOrdered.push(addItem);
            localStorage.setItem("itemsOrdered", JSON.stringify(productOrdered));
        }
        
        //If there is already this product with the same color
        else {
            let findItem = productOrdered.find (
                (p) => p.color == addItem.color && p.id == addItem.id
            );

            if (findItem != undefined){
                findItem.quantity = parseFloat(findItem.quantity) + addItem.quantity;
                if(findItem.quantity <= 100){
                    alert(alertAdded);
                    localStorage.setItem("itemsOrdered", JSON.stringify(productOrdered));
                }
                else {
                    alert(alertQuantity);
                }
            }

            //Other situation => add the new item to cart
            else {
                productOrdered.push(addItem);
                localStorage.setItem("itemsOrdered", JSON.stringify(productOrdered));
            }
        }
    });
}

setUpLocalStorage();