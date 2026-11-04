import { cart } from "../../data/cart.js";
import { getProductItem } from "../../data/products.js";
import { calculateDelivaryDate, deliveryOptions, getDelivaryObject } from "../../data/delivaryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { updateCheckout } from "./checkoutHeader.js";
import { formatCurrency } from "../utils/money.js";
export function renderOrderSummary(){

  let checkouthtml = '';

  cart.cartItem.forEach((cartItem) => {

    let product = getProductItem(cartItem);
    
    const deliveryOption = getDelivaryObject(cartItem);
    const dateString = calculateDelivaryDate(deliveryOption);
      
    checkouthtml += 
          `<div class="cart-item-container js-cart-item-container js-cart-item-container-${product.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>
          <div class="cart-item-details-grid">
            <img class="product-image"
          src="${product.image}">
            <div class="cart-item-details">
              <div class="product-name js-name-class">
                ${product.name}
              </div>
              <div class="product-price js-price-class">
                $${product.getPrice()}
              </div>
              <div class="product-quantity js-product-quantity-${product.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-span">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id = "${product.id}">
                  Update 
                </span>
                <span class="js-save-button"></span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${product.id}" data-product-id="${product.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(product, cartItem)}
            </div>
          </div>
        </div>
    `;
  });
  function deliveryOptionsHTML(product,cartItem){
    let HTML = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDelivaryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE '  
      : `$${formatCurrency(deliveryOption.priceCents)} `;
      const ischecked = cartItem.deliveryOptionId === deliveryOption.id;

      HTML += `
        <div class="delivery-option js-delivery-option js-testing-delivary-option-${product.id}-${deliveryOption.id}"
          data-product-id="${product.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input class="delivary-option-input input-${product.id}-${deliveryOption.id}" type="radio"
              ${ischecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
          </div>`;
    });
    return HTML;
  }
  updateCheckout(); 
  if(cart.cartItem.length === 0){
      document.querySelector('.js-order-summery').
      innerHTML = `
        <div>
        <p>Your cart is empty</p>
        <button class="js-view-products button-primary view-products">
        View products
        </button>
        </div>`;
  document.querySelector('.js-view-products').
  addEventListener('click', () => {
     window.location.href = 'index.html';
  });
  }else{
      document.querySelector('.js-order-summery').innerHTML = checkouthtml;
    }

  const updateHTML = document.querySelectorAll('.js-save-button');

    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        cart.removeFromCart(productId);
        cart.saveTostorage();
        updateCheckout();
        renderOrderSummary();
        renderPaymentSummary();
      })
    });

    document.querySelectorAll(`.js-update-link`)
    .forEach((link) => {
      link.addEventListener('click', () => {
        console.log('clicked');
      const {productId} = link.dataset;
      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      const saveArea = cartItemContainer.querySelector('.js-save-button');
      const cuurentQuantity = cart.cartItem.find((cartItem) => {
        return cartItem.productId === productId;
        });
      cartItemContainer.querySelector('.js-update-link').innerHTML = ``;
      saveArea.innerHTML = `<input type="number" value= "${cuurentQuantity.quantity}" class="input-quantity-button link-primary js-update-quantity-input" > <span class="link-primary js-update-quantity-button">Save</span>`;
      const quantityInput = saveArea.querySelector('.js-update-quantity-input');
      const saveButton = saveArea.querySelector('.js-update-quantity-button');
    
      saveArea.querySelectorAll('.js-update-quantity-button').forEach((button) => {
      button.addEventListener('click', () => {
      const updateValue = Number(quantityInput.value);
        if(updateValue > 0 && updateValue < 100){
        cart.cartItem.forEach((cartItem) => {
          if(cartItem.productId === productId){
          cartItem.quantity = updateValue;
          }
          cart.saveTostorage();
          updateCheckout();
          cartItemContainer.querySelector('.js-quantity-span').innerHTML = `${cuurentQuantity.quantity}`;
          renderPaymentSummary();
        });
        }else if (updateValue === 0){
          cart.removeFromCart(productId);
          cartItemContainer.remove();
          updateCheckout();
          renderPaymentSummary();
        }else{
          alert('Not a valid input');
        }
        saveArea.innerHTML = ``;
      cartItemContainer.querySelector('.js-update-link').innerHTML = `Update`;

        
      });
      });
      });
    });
    document.querySelectorAll('.js-delivery-option').
    forEach((element) => {
      element.addEventListener('click', () => {
        const {deliveryOptionId, productId} = element.dataset;
      cart.updateDelivaryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
     const those = cart.cartItem.find((cartItem) => {
       return cartItem.productId === productId;
      })
      })
    });
}