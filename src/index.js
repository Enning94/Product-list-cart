import '../styles.css';
import productService from '../modules/productService.js';
import { createProductElement } from '../modules/domManipulation.js';
import {
  loadCartItems,
  addToCart,
  updateButtonText,
} from '../modules/cartService.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const products = await productService.getProducts();
    const productContainer = document.getElementById('card-container');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (!productContainer.hasAttribute('data-listener-added')) {
      productContainer.setAttribute('data-listener-added', 'true');

      productContainer.addEventListener('click', (event) => {
        const { target } = event;

        const isButton = target.classList.contains('add-to-cart-btn');
        const buttonWrapper = target.closest('.btn-wrapper');
        const isButtonWrapper = buttonWrapper && buttonWrapper.classList.contains('btn-wrapper');
        // const cartButton = target.closest('.cart-SVG');
        // const isCartButton = cartButton && cartButton.classList.contains('cart-SVG');

        let button = null;
        if (isButton) {
          button = target;
        } else if (isButtonWrapper) {
          button = buttonWrapper.querySelector('.add-to-cart-btn');
        }

        if (button) {
          const productElement = button.closest('.card');
          if (productElement) {
            const pictureElement = productElement.querySelector('.img-wrapper');
            if (pictureElement) {
              pictureElement.classList.remove('img-wrapper');
              pictureElement.classList.add('active-card');
            }

            const productName = productElement.dataset.name;
            const productPrice = parseFloat(productElement.dataset.price);

            addToCart({ name: productName, price: productPrice });
          }
        }
      });
    }

    products.forEach((product) => {
      const productElement = createProductElement(product, addToCart);
      productContainer.appendChild(productElement);
    });

    cartItems.forEach((item) => {
      updateButtonText(item.name);
    });

    loadCartItems();
  } catch (error) {
    // console.error('Error in DOMContentLoaded:', error);
  }
});
