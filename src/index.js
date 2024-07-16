// The main entry point, initializes and connects the other modules.
import _ from 'lodash';
// modules/index.js
// import productService from '../modules/productService.js';

// document.addEventListener('DOMContentLoaded', async () => {
//   try {
//     const products = await productService.getProducts();
//     console.log('Products received in index.js:', products);
//   } catch (error) {
//     console.error('Error in DOMContentLoaded:', error);
//   }
// });

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());