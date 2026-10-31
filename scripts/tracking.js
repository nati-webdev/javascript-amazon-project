import { orders } from '../data/orders.js';
import { products, loadProductsFetch } from '../data/products.js';
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

const date = dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D');


//generate the html for tracking page

let trackingHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${date}
        </div>

        <div class="product-info">
          ${Product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${Product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
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

const progress = ((currentTime - placed)/(arrive - placed)) * 100;
  document.querySelector('.progress-bar').
  style.width = `${progress}`;

}