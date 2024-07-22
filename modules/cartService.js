import { populateCartItems } from './domManipulation.js';

const cartItems = [];

function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export function loadCartItems() {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  populateCartItems(storedCartItems);
}
export function updateButtonText(productName) {
  const productElement = Array.from(document.querySelectorAll('.card')).find(
    (card) => card.querySelector('.card-text').textContent === productName,
  );

  if (productElement) {
    const btnElement = productElement.querySelector('.btn-wrapper');

    const cartItem = cartItems.find((item) => item.name === productName);

    if (btnElement && cartItem) {
      btnElement.innerHTML = '';
      btnElement.classList.add(
        'active-btn',
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'px-3',
      );

      const increaseDivWrapper = document.createElement('div');
      increaseDivWrapper.classList.add('SVG-style', 'fs-5');
      const decreaseDivWrapper = document.createElement('div');
      decreaseDivWrapper.classList.add('SVG-style', 'fs-5');

      const increaseSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>';
      const decreaseSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="6" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>';
      const newBtnElement = document.createElement('p');
      newBtnElement.classList.add('pt-2', 'fs-4');

      newBtnElement.textContent = `${cartItem.quantity}`;
      increaseDivWrapper.innerHTML = increaseSVG;
      decreaseDivWrapper.innerHTML = decreaseSVG;

      increaseDivWrapper.addEventListener('click', () => {
        cartItem.quantity += 1;
        saveCartItems();
        populateCartItems(cartItems);
        newBtnElement.textContent = `${cartItem.quantity}`;
      });

      decreaseDivWrapper.addEventListener('click', () => {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          newBtnElement.textContent = `${cartItem.quantity}`;
        } else {
          const index = cartItems.indexOf(cartItem);
          if (index !== -1) {
            cartItems.splice(index, 1);
            btnElement.innerHTML = '';

            btnElement.classList.remove(
              'active-btn',
              'd-flex',
              'justify-content-between',
              'align-items-center',
              'px-3',
            );

            // Create default button content
            const cartIconDiv = document.createElement('div');
            cartIconDiv.classList.add('cart-SVG');
            const cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>';
            cartIconDiv.innerHTML = cartIcon;
            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('add-to-cart-btn');
            button.textContent = 'Add to Cart';

            btnElement.appendChild(cartIconDiv);
            btnElement.appendChild(button);
          }
        }
        saveCartItems();
        populateCartItems(cartItems);
      });

      btnElement.appendChild(increaseDivWrapper);
      btnElement.appendChild(newBtnElement);
      btnElement.appendChild(decreaseDivWrapper);
    }
  }
}

export function addToCart(product) {
  const existingItem = cartItems.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newCartItem = {
      name: product.name,
      price: product.price,
      quantity: 1,
      isActive: true,
    };
    cartItems.push(newCartItem);
  }

  // Save to local storage and update the UI
  saveCartItems();
  populateCartItems(cartItems);
  updateButtonText(product.name);
}
export { cartItems, saveCartItems };
