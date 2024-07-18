// import _ from 'lodash';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
import '../styles.css';
import productService from '../modules/productService.js';

function createProductElement(product) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const firstInnerDiv = document.createElement('div');

  const picture = document.createElement('picture');

  const sourceDesktop = document.createElement('source');
  sourceDesktop.srcset = product.image.desktop;
  sourceDesktop.media = '(min-width:1024px)';

  const sourceTablet = document.createElement('source');
  sourceTablet.srcset = product.image.tablet;
  sourceTablet.media = '(min-width:768px)';

  const sourceMobile = document.createElement('source');
  sourceMobile.srcset = product.image.mobile;
  sourceMobile.media = '(max-width:767px)';

  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.src = product.image.mobile;
  img.alt = product.title;

  picture.appendChild(sourceDesktop);
  picture.appendChild(sourceTablet);
  picture.appendChild(sourceMobile);
  picture.appendChild(img)
  firstInnerDiv.appendChild(picture);
  // console.log(picture.sourceDesktop);

  const btnDiv = document.createElement('div');
  btnDiv.classList.add('btn-primary','btn-wrapper')
  const cartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>`;
  // cartIcon.classList.add('cartIcon-wrapper');

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('add-to-cart-btn');
  button.textContent = 'Add to Cart';

  btnDiv.innerHTML= cartIcon;
  btnDiv.appendChild(button);

  
  firstInnerDiv.appendChild(btnDiv);

  const secondInnerDiv = document.createElement('div');
  secondInnerDiv.classList.add('card-body');

  const productCategory = document.createElement('h5');
  productCategory.classList.add('card-title');
  productCategory.textContent = product.category;

  const productName = document.createElement('p');
  productName.classList.add('card-text');
  productName.textContent = product.name;

  const productPrice = document.createElement('p');
  productPrice.classList.add('price-text');
  productPrice.textContent = `$${product.price}`;

  secondInnerDiv.appendChild(productCategory);
  secondInnerDiv.appendChild(productName);
  secondInnerDiv.appendChild(productPrice);

  cardDiv.appendChild(firstInnerDiv);
  cardDiv.appendChild(secondInnerDiv);

  return cardDiv;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const products = await productService.getProducts();
    const productContainer = document.getElementById('card-container');
    products.forEach((product) => {
      const productElement = createProductElement(product);

      productContainer.appendChild(productElement);
    });
  } catch (error) {
    // console.error('Error in DOMContentLoaded:', error);
  }
});