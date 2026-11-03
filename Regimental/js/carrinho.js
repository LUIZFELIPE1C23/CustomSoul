export const produtos = Object.freeze([
  Object.freeze({ id: 'book', name: 'Livro de JavaScript', priceCents: 5990 }),
  Object.freeze({ id: 'mug', name: 'Caneca CustomSoul', priceCents: 3500 }),
  Object.freeze({ id: 'notebook', name: 'Caderno Criativo', priceCents: 2450 }),
]);

export class Carrinho {
  #catalog;
  #items = new Map();

  constructor(catalog) {
    if (!Array.isArray(catalog)) {
      throw new TypeError('O catálogo precisa ser um array de produtos.');
    }

    this.#catalog = new Map();
    catalog.forEach((product) => {
      if (
        !product
        || typeof product.id !== 'string'
        || typeof product.name !== 'string'
        || !Number.isSafeInteger(product.priceCents)
        || product.priceCents < 0
      ) {
        throw new TypeError('O catálogo contém um produto inválido.');
      }

      this.#catalog.set(product.id, Object.freeze({ ...product }));
    });
  }

  addProduct(productId) {
    const product = this.#catalog.get(productId);
    if (!product) {
      return false;
    }

    const item = this.#items.get(productId);
    if (item) {
      item.quantity += 1;
    } else {
      this.#items.set(productId, { product, quantity: 1 });
    }

    return true;
  }

  decreaseQuantity(productId) {
    const item = this.#items.get(productId);
    if (!item) {
      return false;
    }

    if (item.quantity === 1) {
      this.#items.delete(productId);
    } else {
      item.quantity -= 1;
    }

    return true;
  }

  removeProduct(productId) {
    return this.#items.delete(productId);
  }

  getItems() {
    return Array.from(this.#items.values(), ({ product, quantity }) => ({
      product: { ...product },
      quantity,
    }));
  }

  getTotalCents() {
    return this.getItems().reduce(
      (total, { product, quantity }) => total + product.priceCents * quantity,
      0,
    );
  }

  getTotalUnits() {
    return this.getItems().reduce((total, item) => total + item.quantity, 0);
  }
}
