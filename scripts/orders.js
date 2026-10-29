import { cart, loadCartFetch } from '../data/cart.js';
import { loadProductsFetch, products } from '../data/products.js';
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from './utils/money.js';

async function loadOrderPage() {
  await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
  ]);
  renderOrderPage();

}
loadOrderPage();
function renderOrderPage() {
  const cartQuantity = cart.updateCartQuantity();
  document.querySelector('.js-order-cart-quantity').innerHTML = cartQuantity;
  let orderHtml = '';
  const today = dayjs();
  const datestring = today.format('MMMM D');
  orders.forEach((Order) => {
    orderHtml += `
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${datestring}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(Order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${Order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderDetail(Order)}
          </div>
        </div>
        `;
  });
document.querySelector('.js-order-container')
.innerHTML = orderHtml;

function orderDetail(Order) {
  let orderDetailHtml = '';
    Order.products.forEach((product) => {
    const delivaryDate = product.estimatedDeliveryTime;
    const Product = products.find((Product) => {
      return Product.id === product.productId;
    });

    orderDetailHtml += `
        <div class="product-image-container">
          <img src="${Product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${Product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: 
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${Product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message ">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`;
        
    });
  return orderDetailHtml;
}
  
  document.querySelectorAll(`.js-buy-again-button`)
  .forEach((button) => {
     button.addEventListener('click', () => {
      const {productId} = button.dataset;

      addtoCart(productId);
     });
    })
  
  
  function addtoCart(productId) {
    let matchingItem;
    cart.cartItem.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
      });
      if(matchingItem){
        matchingItem.quantity ++;
      }else{
      cart.cartItem.push({
            productId: productId,
            quantity: 1,
            delivaryOptionId: '1'
          });
      }
      cart.saveTostorage();
      cart.updateCartQuantity();
      renderOrderPage();
  }
}
