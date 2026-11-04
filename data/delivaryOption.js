import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [{
  id: '1',
  delivaryDays: 7,
  priceCents : 0
},{
  id: '2',
  delivaryDays: 3,
  priceCents: 499
},{
  id: '3',
  delivaryDays: 1,
  priceCents: 999
}];
export function getDelivaryObject(cartItem){
  let deliveryOption;
    deliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);
    return deliveryOption || deliveryOptions[0];
}
export function calculateDelivaryDate(delivaryOption){
  let today = dayjs();

  const deliveryDate = today.add(delivaryOption.delivaryDays, 'day');

  return deliveryDate.format('dddd, MMMM D');

}