export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveTostorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectedCount = Number(quantitySelector.value);
  let matcthingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matcthingItem = cartItem;
    }
  })
  if(matcthingItem){
      matcthingItem.quantity += selectedCount;
  }else{
    cart.push({
    productId: productId,
    quantity: selectedCount
    })
    saveTostorage();
  }

}

export function updateCartQuantity(){
let cartQuantity =  0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
}
 export function removeFromCart(productId){
  const newCart = cart.filter((cartItem) => {
    return cartItem.productId !== productId;
  });
  cart = newCart;
  saveTostorage();
};