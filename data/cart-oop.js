function Cart(localStoragekey) {
  const cart = {
  cartItem:  undefined,

  loadFromStorage(){
   this.cartItem = JSON.parse(localStorage.getItem(localStoragekey)) || [];
  },

  saveTostorage(){
  localStorage.setItem(localStoragekey, JSON.stringify(this.cartItem));
  },

  addToCart(productId){
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectedCount = quantitySelector ? Number(quantitySelector.value) : 1;
  let matcthingItem;
  this.cartItem.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matcthingItem = cartItem;
    }
  })
  if(matcthingItem){
      matcthingItem.quantity += selectedCount;
  }else{
    this.cartItem.push({
    productId: productId,
    quantity: selectedCount,
    delivaryOptionId: '1'
    })
  }
  this.saveTostorage();
  },

  removeFromCart(productId){
  const newCart = this.cartItem.filter((cartItem) => {
    return cartItem.productId !== productId;
  });
  this.cartItem = newCart;
  this.saveTostorage();
  },

  updateCartQuantity(){
  let cartQuantity =  0;
  this.cartItem.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
   return cartQuantity;
  },

  updateDelivaryOption(productId, delivaryOptionId){
  let matcthingItem;
  this.cartItem.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matcthingItem = cartItem;
    }
  });
  if(!matcthingItem){
      return;
   }
  if(delivaryOptionId !== '1' && delivaryOptionId !== '2' && delivaryOptionId !== '3'){
    return;
   }
  matcthingItem.delivaryOptionId = delivaryOptionId;
  this.saveTostorage();
}
};

  return cart;
}

const cart = Cart('cart-oop');
const businnesCart = Cart('cart-businnes');
businnesCart.loadFromStorage();
cart.loadFromStorage();
cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
businnesCart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

console.log(cart);
console.log(businnesCart);