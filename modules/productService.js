// Handles fetching and managing product data.
// productService.js
const productService = {
  async getProducts() {
    const response = await fetch(' ../data.json');
    const products = await response.json();
    console.log(products);
    return products;
  },
};

export default productService;
