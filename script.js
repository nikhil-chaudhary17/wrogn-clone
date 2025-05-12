const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click",() => cart.classList.add("active"));
cartClose.addEventListener("click",() => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".quick-view2");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productbox = event.target.closest(".card2");
        addToCart(productbox);
    });
});
const cartContent = document.querySelector(".cart-content");
const addToCart = productbox => {
const productImgSrc = productbox.querySelector("img").src;
const productTitle  = productbox.querySelector(".card-title2").textContent;
const productPrice = productbox.querySelector(".product-price").textContent;

const cartItems = cartContent.querySelectorAll(".cart-product-title");
for (let item of cartItems) {
    if (item.textContent.trim() === productTitle) {
        alert("This item is already in the cart");
        return;
    }
}

const cartBox = document.createElement("div");
cartBox.classList.add("cart-box");
cartBox.innerHTML= `
        <img src="${productImgSrc}" class="cart-image">
                <div class="cart-details">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <p class="price">${productPrice}</span></p>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="fa-solid fa-trash-can cart-remove"></i>
            </div> 
`;
cartContent.appendChild(cartBox);

cartBox.querySelector(".cart-remove").addEventListener("click", () =>{
    cartBox.remove();
    updateCartCount(-1);
    updateTotalPrice();
});

cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
    const decrementbtn = cartBox.querySelector("#decrement");
    const numberElement = cartBox.querySelector(".number");
    let quantity = numberElement.textContent;

    if(event.target.id === "decrement" && quantity > 1){
        quantity--; 
        if(quantity === 1){
            decrementbtn.style.color = "#999";
        }
    }
    else if(event.target.id === "increment" ){
        quantity++;
        decrementbtn.style.color = "#333";
    }
    numberElement.textContent = quantity;
    updateTotalPrice();
});
updateCartCount(1);
updateTotalPrice();
};
document.querySelectorAll('.quick-view2 ,.products').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevents page reload
    });
});


const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("₹","");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `${total}`;
}

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if(cartItemCount > 0){
        cartItemBadge.style.visibility = "visible";
        cartItemBadge.textContent = cartItemCount;
    }
    else{
        cartItemBadge.style.visibility = "hidden";
        cartItemBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length === 0){
        alert("your cart is empty. Please add items to your cart before buying");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;  

    updateCartCount(0);

    updateTotalPrice();

    alert("Thank You  for your purchase");
})