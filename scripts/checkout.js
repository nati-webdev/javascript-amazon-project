import { cart , removeFromCart, updateCartQuantity , saveTostorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let checkouthtml = ``;
cart.forEach((cartItem) => {
  let product = products.find((product) => {
    return product.id === cartItem.productId;
  });
  checkouthtml += 
            `<div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-span">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = "${product.id}">
                    Update 
                  </span>
                  <span class="js-save-button"></span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
   `;
});
function updateCheckout(){
  const cartQuantity = updateCartQuantity();
  document.querySelector('.js-total-items').innerHTML
      = `${cartQuantity} items` || `0 items`;
}
updateCheckout();
  
  document.querySelector('.js-order-summery').innerHTML = checkouthtml;
  const updateHTML = document.querySelectorAll('.js-save-button');

  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      saveTostorage();
      updateCheckout();
    })
  });

  document.querySelectorAll(`.js-update-link`)
  .forEach((link) => {
    link.addEventListener('click', () => {
      console.log('clicked');
    const {productId} = link.dataset;
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    const saveArea = cartItemContainer.querySelector('.js-save-button');
    const cuurentQuantity = cart.find((cartItem) => {
      return cartItem.productId === productId;
      });
    
    saveArea.innerHTML = `<input type="number" value= "${cuurentQuantity.quantity}" class="input-quantity-button link-primary js-update-quantity-input" > <button class="link-primary js-update-quantity-button">Save</button>`;
    const quantityInput = saveArea.querySelector('.js-update-quantity-input');
    const saveButton = saveArea.querySelector('.js-update-quantity-button');

    saveArea.querySelectorAll('.js-update-quantity-button').forEach((button) => {
    button.addEventListener('click', () => {
    const updateValue = Number(quantityInput.value);
      if(updateValue > 0 && updateValue < 100){
      cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
        cartItem.quantity = updateValue;
        }
        saveTostorage();
        updateCheckout();
        cartItemContainer.querySelector('.js-quantity-span').innerHTML = `${cuurentQuantity.quantity}`;
      });
      }else if (updateValue === 0){
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateCheckout();
      }else{
        alert('Not a valid input');
      }
      saveArea.innerHTML = ``;
      
    });
    });
    });
  });

  

          