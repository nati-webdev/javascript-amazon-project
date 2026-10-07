export const cart = [];

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
  }
}