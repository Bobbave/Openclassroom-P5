import { API_URL } from "../js/module.js";

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
            for (let i = 0; i < product.colors.length; i++)
            {
                let color = document.createElement("option");
                color.value = product.colors[i];
                color.textContent = product.colors[i]
                colorDiv.appendChild(color);
            }
        }

        getItem();
        
    });

//----------------------------------------------------------------Adding to cart----------------------------------------------------------------
function setUpLocalStorage(){

    const button = document.querySelector("#addToCart");

    button.addEventListener("click", function(){

        const quantity = document.querySelector("#quantity").value;
        const color = document.querySelector("#colors").value;

        const addItem = {
            id: idProduct,
            quantity: Number(quantity),
            color: color,
        };

        let productOrdered = JSON.parse(localStorage.getItem("itemsOrdered"));

        if (productOrdered == null){
            productOrdered = [];
            productOrdered.push(addItem);
            localStorage.setItem("itemsOrdered", JSON.stringify(productOrdered));
        }
        
        else {
            let findItem = productOrdered.find (
                (p) => p.color == addItem.color && p.id == addItem.id
            );

            if (findItem != undefined)
            {
                findItem.quantity = parseFloat(findItem.quantity) + addItem.quantity;
                localStorage.setItem("itemsOrdered", JSON.stringify(productOrdered));
            }

            else {
                productOrdered.push(addItem);
                localStorage.setItem("itemsOrdered", JSON.stringify(productOrdered));
            }
        }
    });
}

setUpLocalStorage();
