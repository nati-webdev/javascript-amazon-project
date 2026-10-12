import { cart , removeFromCart, updateCartQuantity , saveTostorage, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOption.js";
export function renderOrderSummary(){
  let checkouthtml = '';
  cart.forEach((cartItem) => {
    let product = products.find((product) => {
      return product.id === cartItem.productId;
    });
    
    let deliveryOption;
    const deliveryOptionID = cartItem.deliveryOptionId;
    deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionID){
          deliveryOption = option;
        }
        });
      const today = dayjs();
      const deliveryDate = today.add(
          deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
      
    checkouthtml += 
          `<div class="cart-item-container js-cart-item-container-${product.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
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
              ${deliveryOptionsHTML(product, cartItem)}
            </div>
          </div>
        </div>
    `;
  });
  function deliveryOptionsHTML(product,cartItem){
    let HTML = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE '  
      : `$${formatCurrency(deliveryOption.priceCents)} `;
      const ischecked = cartItem.deliveryOptionId === deliveryOption.id;

      HTML += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${product.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
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
      cartItemContainer.querySelector('.js-update-link').innerHTML = ``;
      saveArea.innerHTML = `<input type="number" value= "${cuurentQuantity.quantity}" class="input-quantity-button link-primary js-update-quantity-input" > <span class="link-primary js-update-quantity-button">Save</span>`;
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
      cartItemContainer.querySelector('.js-update-link').innerHTML = `Update`;

        
      });
      });
      });
    });
    document.querySelectorAll('.js-delivery-option').
    forEach((element) => {
      element.addEventListener('click', () => {
        const {deliveryOptionId, productId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();

      })
    });
}