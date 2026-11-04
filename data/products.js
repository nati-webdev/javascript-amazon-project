import { formatCurrency } from "../scripts/utils/money.js";
class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  
  constructor(data) {
  this.id = data.id;
  this.image = data.image;
  this.name = data.name;
  this.rating = data.rating;
  this.priceCents = data.priceCents;
  this.keywords = data.keywords;
  } 

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(){
    return formatCurrency(this.priceCents);
  }

  extraInfoHTML(){
    return '';
  }

}

class Clothing extends Product{
  sizeChartLink;

  constructor(data){
    super(data);
    this.sizeChartLink = data.sizeChartLink;
  }
  
  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`
  }
}
/*
class Appliance extends Product {
  instructionLink;
  warrantyLink;

  constructor(data){
    super(data);
    this.instructionLink = data.instructionLink;
    this.warrantyLink = data.warrantyLink;
  }
  extraInfoHTML() {
    return `<a href="${this.instructionLink}" target="_blank">Instruction</a>
            <a href="${this.warrantyLink}" target="_blank">Warranty.</a>`;
  }

}
  */

export let products = [];

export async function loadProductsFetch() {
  const promise = await fetch('https://supersimplebackend.dev/products')
  const product = await promise.json();
  products = product.map((productDetails) => {
    if(productDetails.type === 'clothing'){
      return new Clothing(productDetails);
    }
    return new Product(productDetails);
  })
}

export function SetUpSearch(){
  const searchButton = document.querySelector('.js-search-button');
  const searchInput = document.querySelector('.js-search-value');
  if(searchButton && searchButton){
    searchButton.
  addEventListener('click', () => {
    const value = searchInput.value;
      if(value){
      window.location.href = `index.html?search=${value}`;
      }else{
      window.location.href = `index.html`;
      }
   });
  searchInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
    const value = searchInput.value;
      if(value){
      window.location.href = `index.html?search=${value}`;
      }
    }
   });
  }
}
 export function mobileSetUp() {
  const mobileButton = document.querySelector(
    '.js-mobile-menu-button');
  const headerMenu = document.querySelector(
    '.js-header-menu');

  mobileButton.addEventListener('click', () => {
    headerMenu.classList.toggle('is-open');
    const isOpen = headerMenu.classList.contains('.is-open');
    mobileButton.setAttribute('aria-expanded', isOpen);

  });
  }
  

export function getProductItem(productId){
    let product = products.find((product) => {
      return product.id === productId.productId;
    });
    return product;
  }