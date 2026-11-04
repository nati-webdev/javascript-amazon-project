import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch  } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
  try{
    await Promise.all([
       loadProductsFetch(),
       loadCartFetch()
    ]);
    

  } catch(error) {
    console.log(error)
    console.log('inside async await: unexpected error. please try again later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();

 return 'value2'
}

loadPage();

