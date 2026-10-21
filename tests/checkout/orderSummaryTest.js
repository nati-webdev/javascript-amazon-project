import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart.js";
import { formatCurrency } from "../../scripts/utils/money.js";
import { loadProduct } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  beforeAll((done) => {
    loadProduct(() => {
      done();
    });
  })
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const delivaryId1 = '1';
  const delivaryId2 = '2';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
     document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summery"></div>
      <div class="js-total-items"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        delivaryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        delivaryOptionId: '2'
      }]);
  });

    cart.loadFromStorage();
    renderOrderSummary();
  });
  afterEach(()=> {
  document.querySelector('.js-order-summery').innerHTML = '';
  })

  it('displays the cart', () => {
   expect(document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    expect(document.querySelector('.js-name-class').innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(document.querySelector('.js-price-class').innerText).toContain(`$${formatCurrency(1090)}`);
    

  });
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual(productId2);
    expect(document.querySelector('.js-name-class').innerText).toContain('Intermediate Size Basketball');
    expect(document.querySelector('.js-price-class').innerText).toContain(`$${formatCurrency(2095)}`);


  })
  it('updating the delivary option', () => {
    document.querySelector(`.js-testing-delivary-option-${productId1}-3`).click();
    const pressElement = document.querySelector(`.input-${productId1}-3`);
    const secondElement = document.querySelector(`.input-${productId1}-${delivaryId2}`);
    const pressValue = pressElement.value;
    expect(pressElement.checked).toEqual(true);
    expect(cart.cartItem.length).toEqual(2);
    expect(document.querySelector('.js-shiping-summary').innerText).toEqual('$14.98');
    expect(document.querySelector('.js-total-price').innerText).toEqual('$63.50');
    
  })
});