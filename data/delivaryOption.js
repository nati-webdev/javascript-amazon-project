import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const delivaryOptions = [{
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
  let delivaryOption;
    const delivaryOptionID = cartItem.delivaryOptionId;
    delivaryOption = delivaryOptions.find((option) => option.id === cartItem.delivaryOptionId);
    return delivaryOption || delivaryOptions[0];
}
export function calculateDelivaryDate(delivaryOption){
  let today = dayjs();
  let count = 0;
  while(count < delivaryOption.delivaryDays){
    today = today.add(1, 'day');
    const dayofweek = today.day();

    if(dayofweek !== 0 && dayofweek !== 6){
      count++
    }
    
  }
  const dateString = today.format('dddd, MMMM D');
  return dateString;

}