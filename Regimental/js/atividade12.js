import { Carrinho, produtos } from './carrinho.js';

const carrinho = new Carrinho(produtos);
const catalogElement = document.getElementById('cartCatalog');
const itemsElement = document.getElementById('cartItems');
const emptyElement = document.getElementById('cartEmpty');
const quantityElement = document.getElementById('cartQuantity');
const totalElement = document.getElementById('cartTotal');
const moduleHelpElement = document.getElementById('cartModuleHelp');
const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function renderCatalog() {
  const cards = produtos.map((product) => {
    const card = document.createElement('article');
    card.className = 'product-item';

    const name = document.createElement('strong');
    name.textContent = product.name;
    const price = document.createElement('span');
    price.textContent = formatCurrency.format(product.priceCents / 100);
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.dataset.action = 'add';
    addButton.dataset.productId = product.id;
    addButton.textContent = 'Adicionar';

    card.append(name, price, addButton);
    return card;
  });

  catalogElement.replaceChildren(...cards);
}

function renderCart() {
  const items = carrinho.getItems();
  const rows = items.map(({ product, quantity }) => {
    const item = document.createElement('li');
    item.className = 'cart-item';
    item.dataset.productId = product.id;

    const details = document.createElement('span');
    details.textContent = `${product.name} — ${formatCurrency.format(product.priceCents / 100)} × ${quantity}`;

    const actions = document.createElement('div');
    actions.className = 'activity-actions';

    const increaseButton = document.createElement('button');
    increaseButton.type = 'button';
    increaseButton.dataset.action = 'increase';
    increaseButton.textContent = '+';
    increaseButton.setAttribute('aria-label', `Aumentar quantidade de ${product.name}`);

    const decreaseButton = document.createElement('button');
    decreaseButton.type = 'button';
    decreaseButton.dataset.action = 'decrease';
    decreaseButton.textContent = '−';
    decreaseButton.setAttribute('aria-label', `Diminuir quantidade de ${product.name}`);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.dataset.action = 'remove';
    removeButton.className = 'delete-button';
    removeButton.textContent = 'Remover';

    actions.append(increaseButton, decreaseButton, removeButton);
    item.append(details, actions);
    return item;
  });

  itemsElement.replaceChildren(...rows);
  emptyElement.hidden = items.length > 0;
  quantityElement.textContent = `Unidades: ${carrinho.getTotalUnits()}`;
  totalElement.textContent = `Total: ${formatCurrency.format(carrinho.getTotalCents() / 100)}`;
}

catalogElement.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="add"]');
  if (!button || !catalogElement.contains(button)) {
    return;
  }

  carrinho.addProduct(button.dataset.productId);
  renderCart();
});

itemsElement.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  const item = button && button.closest('[data-product-id]');
  if (!button || !item || !itemsElement.contains(item)) {
    return;
  }

  const productId = item.dataset.productId;
  if (button.dataset.action === 'increase') {
    carrinho.addProduct(productId);
  } else if (button.dataset.action === 'decrease') {
    carrinho.decreaseQuantity(productId);
  } else if (button.dataset.action === 'remove') {
    carrinho.removeProduct(productId);
  }

  renderCart();
});

renderCatalog();
renderCart();
moduleHelpElement.hidden = true;
