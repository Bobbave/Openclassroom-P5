import { API_URL } from "../js/module.js";

let parameter = new URLSearchParams(window.location.search);
let idProduct = parameter.get("id");

let apiGet = fetch (`${API_URL}/${idProduct}`);
apiGet
    .then (async function (res) {
        
        let product = await res.json();
         
        function getItem(){

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

