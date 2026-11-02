import { orders } from '../data/orders.js';
import { products, loadProductsFetch, SetUpSearch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';
import { cart } from '../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function loadTrackingPage() {
  await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
  ]);
  renderTrackingPage();

}
loadTrackingPage();

function renderTrackingPage() {

SetUpSearch();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
const Product = products.find((product) => {
      return product.id === productId;
    });
const Order = orders.find((order) => {
  return order.id === orderId;
});
console.log(Order)
const orderProduct = Order.products.find((product) => {
  return product.productId === productId;
});
const deliverydate = dayjs(orderProduct.estimatedDeliveryTime);
let date;

if(dayjs().isAfter(deliverydate, 'day') || dayjs().isSame(deliverydate, 'day')){
  date = `Delivered on ${deliverydate.format('dddd, MMMM D')}`;
}else{
  date = `Arriving on ${deliverydate.format('dddd, MMMM, D')}`;
}


//generate the html for tracking page

let trackingHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${date}
        </div>

        <div class="product-info">
          ${Product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${Product.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-preparing">
            Preparing
          </div>
          <div class="progress-label js-shipped">
            Shipped
          </div>
          <div class="progress-label js-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
        `;
document.querySelector('.order-tracking-container')
.innerHTML = trackingHtml;

document.querySelector('.js-cart-quantity')
.innerHTML = cart.updateCartQuantity();

const placed = new Date(Order.orderTime).getTime();
const arrive = new Date(orderProduct.estimatedDeliveryTime).getTime();
const currentTime = new Date().getTime();

let progress = ((currentTime - placed)/(arrive - placed)) * 100 ;
if(progress < 5){
  progress = 5;
}
  document.querySelector('.progress-bar').
  style.width = `${progress}%`;
  if(progress <= 49){
  document.querySelector('.js-preparing').classList.add('current-status');

  }
  else if(progress >=50 && progress <=99  ){
  document.querySelector('.js-shipped').classList.add('current-status');
  }
  else if(progress === 100){
  document.querySelector('.js-delivered').classList.add('current-status');
  }

}