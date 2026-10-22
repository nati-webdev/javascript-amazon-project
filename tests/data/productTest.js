import { products, loadProductsFetch } from '../../data/products.js';
describe('test suite: testing product', () => {
  beforeAll( (done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  
   it('testing getstarURL', ( () => {
    const product = products.find( (product) => {
     return product.id === '15b6fc6f-327a-4ec4-896f-486349e85a3d'
      
  })
    expect(product.getStarsUrl()).toContain(40);
    expect(product.getPrice()).toContain(20.95);
  }));
  
});

describe('test suite: testing clothing product', () => {
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });
  
  it('side chart working test', () => {
    const product = products.find((product) => {
    return product.id === '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
  })
    expect(product.extraInfoHTML()).toContain('Size chart');
  });

});
/*
describe('test suite: testing  Appliance', () => {
  beforeAll(() => {
    loadProductsFetch().then(() => {
      done();
    })
  })
  
  
  it('testing appliance', () => {
    const product = products.find((product) => {
    return product.id === '54e0eccd-8f36-462b-b68a-8182611d9add';
  })
    expect(product.extraInfoHTML()).toContain('Warranty');
  });
  
});
*/
