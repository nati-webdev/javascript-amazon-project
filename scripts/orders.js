import { cart, loadCartFetch } from '../data/cart.js';
import { loadProductsFetch, mobileSetUp, products, SetUpSearch } from '../data/products.js';
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
const addTimeouts = {};

function renderOrderPage() {
  
  mobileSetUp();

  SetUpSearch();
  const cartQuantity = cart.updateCartQuantity();
  document.querySelector('.js-order-cart-quantity').innerHTML = cartQuantity;
  let orderHtml = '';
  const today = dayjs();
  orders.forEach((Order) => {
    const orderDate = Order.orderTime;
    const date = dayjs(orderDate).format('MMMM D');
    orderHtml += `
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${date}</div>
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
    const deliveryDate = dayjs(product.estimatedDeliveryTime);
    const Product = products.find((Product) => {
      return Product.id === product.productId;
    });
    let date;
    if(dayjs().isAfter(deliveryDate, 'day') ||
     dayjs().isSame(deliveryDate, 'day')){
      date = `Delivered on: ${deliveryDate.format('MMMM D')}`;
    }else{
     date = `Arriving on: ${deliveryDate.format('MMMM D')}`;
    }


    orderDetailHtml += `
        <div class="product-image-container">
          <img src="${Product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${Product.name}
          </div>
          <div class="product-delivery-date">
            ${date}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${Product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="css-buy-message">Buy it again</span>
            <span class="css-buy-success" style="display: none; ">&#10003 Added</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${Order.id}&productId=${Product.id}">
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
      const previousTimeout= addTimeouts[productId];

      
      addtoCart(productId);
      const imageBuy = button.querySelector('.buy-again-icon');
      const successButton = button.querySelector('.css-buy-success');
      const buyagainButton = button.querySelector('.css-buy-message');
      if(successButton && buyagainButton) {
        successButton.style.display = 'inline';
        buyagainButton.style.display ='none';
        imageBuy.style.display = 'none';
        if(previousTimeout !== undefined){
          clearTimeout(previousTimeout);
        }
      const timeOutId = setTimeout(() => {
          successButton.style.display = 'none';
          buyagainButton.style.display = 'inline';
          imageBuy.style.display = 'inline';
          delete addTimeouts[productId];
          }, 2000);
      addTimeouts[productId] = timeOutId;
      }
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
            deliveryOptionId: '1'
          });
      }
      cart.saveTostorage();
      cart.updateCartQuantity();
      document.querySelector('.js-order-cart-quantity').innerHTML = cart.updateCartQuantity();


  }
}
