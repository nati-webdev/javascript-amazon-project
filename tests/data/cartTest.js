import { addToCart, cart, loadFromStorage, removeFromCart, updateDelivaryOption} from "../../data/cart.js";

describe('Test suite: add to cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        delivaryOptionId: '1'
      }]);
    });
    loadFromStorage();
  })

  it('adds an existing product to the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(2);
     
  });
  it('adds a new product to the new cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(2);

  })

})
 describe('test suite: removeFromCart', () => {
  beforeEach(()=> {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        delivaryOptionId: '1'
      }]);
    })
  })
   it('remove a productId that is in the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
   })
   it('remove a productId that is not in the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
   })
 });
  describe('test suite: updatedelivaryoption', () => {
    beforeEach(()=> {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        delivaryOptionId: '1'
      }]);
    })
  });
  it('update the delivary option of a product', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   
  });
  it('update the delivary option of a productId that is not in the cart', () => {
    updateDelivaryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', 2 );
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
  it('use a delivaryOptionId that does not exist', () => {
    updateDelivaryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 4);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })
  });
