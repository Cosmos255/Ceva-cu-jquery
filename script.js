let productsGrid = document.getElementById("products-grid");
let productsArray = [];


//I like fetch
async function fetchDatabase(){

    let url="https://my-json-server.typicode.com/Cosmos255/Ceva-cu-jquery/products";

    try{
        
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("couldnt fetch data");
        }

        const data = await response.json()
        productsGrid.innerHTML = null;
        data.forEach(p =>{
            productsArray.push(p);
            let pElem = document.createElement('div');
            pElem.classList.add('product');
            pElem.innerHTML = `
                                <h2 class="product-name">${p.name}</h2>
                                <img src="${p.photo_url}"class="products-img"></img>
                                <p class="product-price"><b>Price: </b>${p.price} €</p>
                                <p class="product-description"><b>Description: </b>${p.description}</p>
                                <button class="add_to_cart" onclick="addProductToCart(${p.id})">Add</button>
                                `;
                    productsGrid.append(pElem);
        });



    }
    catch(error){
        console.error(error);
        fetchDatabase();
    }
}

fetchDatabase();


let cartProd = document.getElementById("cart-products");

let cart = [];

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCart();
}

function openCart(){
    cartProd.classList.toggle('hide');
}

function addProductToCart(id){
    let product = productsArray.find(function(p){
        return p.id == id;
    })
    if (product) {
        cart.push(product);  
        localStorage.setItem("cart", JSON.stringify(cart));  
        drawCart();  
    }
}

function drawCart() {
    if(cart.length === 0){
         return cartProd.innerHTML = "Cart is empty";
    }
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function(p) {
        cartProd.innerHTML += `
            <div class="ProductCart">
                <p><img src="${p.photo_url}" alt="${p.name}" class="cart-product-img">
                <b>${p.name}</b> | <p>${p.price} €</p></p>
                <hr>
            </div>
        `;
        sum += parseFloat(p.price); 
        document.getElementById('price').innerHTML = sum + "€";
    });

    cartProd.innerHTML += `
        <p class="total">Total Price: <b>${sum} €</b></p>
        <button class="add_to_cart buy_all clear_all" onclick="clear_all()">Clear</button>
        <button class="add_to_cart buy_all" onclick="buy_all()">Buy</button>
    `;
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName('close')[0];
let orderElem = document.getElementById("order-block");

span.onclick = function closespan(){
    modal.style.display = "none";
}

window.onclick = function(){
    if(event.target == modal){
        modal.style.display = "none";
    }
}



function buy_all(){
    
    modal.style.display = "block";
    orderElem.innerHTML = null;
    cart.forEach(function(p){
        orderElem.innerHTML +=`
                        <div class="item">
                            <img src="${p.photo_url}" width="70px">
                            <h2>${p.name} | ${p.price} €</h2>
                        </div>    
        
        `;
    })
}

function clear_all(){
    localStorage.setItem("cart", "[]");
    cart = [];
    drawCart();
}


