const productService = {
  async getProducts() {
    const response = await fetch(' ../data.json');
    const products = await response.json();
    return products;
  },
};

export default productService;
