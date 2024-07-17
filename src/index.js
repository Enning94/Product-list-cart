// import _ from 'lodash';
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
  img.classList.add('thumbnail-img');
  img.src = product.image.thumbnail;
  img.alt = product.title;

  picture.appendChild(sourceDesktop);
  picture.appendChild(sourceTablet);
  picture.appendChild(sourceMobile);
  // console.log(picture.sourceDesktop);

  const btnDiv = document.createElement('div');
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('add-to-cart');
  button.textContent = 'Add to Cart';

  btnDiv.appendChild(button);

  firstInnerDiv.appendChild(picture);
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