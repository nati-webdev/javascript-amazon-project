import { cart } from "../data/cart.js";
import { products, loadProductsFetch, SetUpSearch, mobileSetUp } from "../data/products.js";

loadProductsFetch().then(() => {
  renderProductsGrid();
});

function renderProductsGrid() {
  
  SetUpSearch();
  mobileSetUp();
  
  let productsToDisplay = products;
  const url = new URL(window.location.href);
  const searchValue = url.searchParams.get('search');
  if(searchValue){
  productsToDisplay = products.filter((product) => {
    return product.name.toLowerCase()
    .includes(searchValue.toLowerCase()) || 
    product.keywords?.some((keyword) => {
      return keyword.toLowerCase()
      .includes(searchValue.toLowerCase());
    });
  });

   if(productsToDisplay.length === 0){
    document.querySelector('.js-products-grid')
    .innerHTML = 
    `<div class="no-product-message">
         <h2>No products found</h2>
         <p>Try searching for something else.</p>
    </div>`
    return;
  }
  }
  let productsHTML = ``;
  productsToDisplay.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                $${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              ${product.extraInfoHTML()}

              <div class="product-spacer"></div>

              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary
              js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
              </button>
        </div>`;
  });
  const addedMessageTimeouts = {};
  document.querySelector('.js-products-grid').
  innerHTML = productsHTML;
  
  function showCartQuantity(){
    const cartQuantity = cart.updateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML
      = cartQuantity;
  }
  showCartQuantity();
  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
  button.addEventListener('click', ()=> {
  const { productId } = button.dataset;
  const previousTimeoutId = addedMessageTimeouts[productId];
    
    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visiblity');
    if(previousTimeoutId){
      clearTimeout(previousTimeoutId);
    }
    addedMessageTimeouts[productId] = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visiblity');
    }, 2000);
    
    
    cart.addToCart(productId);
    showCartQuantity();
    cart.saveTostorage();
  });
  });
}
