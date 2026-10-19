class Cart {

  cartItem;

  #localStorageKey;

  constructor(localStorageKey) {
   this.#localStorageKey = localStorageKey;
   this.loadFromStorage();
  }

  loadFromStorage(){
   this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveTostorage(){
  localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

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
  }

  updateCartQuantity(){
  let cartQuantity =  0;
  this.cartItem.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
    return cartQuantity;
  }

  removeFromCart(productId){
  const newCart = this.cartItem.filter((cartItem) => {
    return cartItem.productId !== productId;
  });
  this.cartItem = newCart;
  this.saveTostorage();
  }

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
}
export const cart = new Cart('cart');