import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch  } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import { car } from '../data/car.js'
//import '../data/backend-practice.js';

async function loadPage() {
  try{
    //throw 'error1';

    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      //throw 'error2';
    loadCart(() => {
      //reject('error3')
      resolve();
    });
    });

  } catch(error) {
    console.log('inside async await: unexpected error. please try again later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();

 return 'value2'
}

loadPage();
/*
Promise.all([
  loadProductsFetch(),

 new Promise((resolve) => {
   loadCart(() => {
    resolve();
   });
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/
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
