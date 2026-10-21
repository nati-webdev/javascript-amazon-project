import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProduct  } from "../data/products.js";
//import '../data/cart-class.js';
//import { car } from '../data/car.js'
//import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";
Promise.all([
  new Promise((resolve) => {
  loadProduct(() => {
    resolve();
  })
}),
 new Promise((resolve) => {
   loadCart(() => {
    resolve();
   });
  })

]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProduct(() => {
    resolve();
  })

}).then(() => {
  return new Promise((resolve) => {
   loadCart(() => {
    resolve();
   })
  })

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProduct(() => {
  loadCart(() => {
  renderOrderSummary();
  renderPaymentSummary();
  })
})
  */
