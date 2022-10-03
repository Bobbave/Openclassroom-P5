import { API_URL } from "../js/module.js";

//----------------------------------------------------------------Product----------------------------------------------------------------
//Retrieve the product's ID in the URL

let parameter = new URLSearchParams(window.location.search);
let idProduct = parameter.get("id");

let apiGet = fetch (`${API_URL}/${idProduct}`);

apiGet
    .then (async function (res){
        
        // Getting the product's informations from the promise (apiGet)

        let product = await res.json();
         
        function getItem(){

            // Setting up the different information of the product

            const imgDiv = document.querySelector(".item__img");
            const image = document.createElement("img");
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            imgDiv.appendChild(image);

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

const button = document.querySelector("#addToCart");

button.addEventListener("click", function(){

    const quantity = document.querySelector("#quantity").value;
    const color = document.querySelector("#colors").value;

    const addItem = {
        id: idProduct,
        quantity: Number(quantity),
        color: color,
    };

    let product = JSON.parse(localStorage.getItem("itemsOrdered"));
    if (product == null){
        product = [];
        product.push(addItem);
        localStorage.setItem("itemsOrdered", JSON.stringify(product));
    }
    else {
        let findItem = product.find (
            (p) => p.color == addItem.color && p.id == addItem.id
        );
        if (findItem != undefined)
        {
            findItem.quantity = parseFloat(findItem.quantity) + addItem.quantity;
            localStorage.setItem("itemsOrdered", JSON.stringify(product));
        }
        else {
            product.push(addItem);
            localStorage.setItem("itemsOrdered", JSON.stringify(product));
        }
}});

