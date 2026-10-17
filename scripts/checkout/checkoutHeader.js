import { cart } from "../../data/cart.js";
export function updateCheckout(){
    const cartQuantity = cart.updateCartQuantity();
    document.querySelector('.js-total-items').innerHTML
        = `${cartQuantity} items` || `0 items`;
  }