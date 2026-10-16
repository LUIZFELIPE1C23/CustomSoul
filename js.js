const whatsappNumber = "5511999999999";

const products = [
	{ id: 1, name: "Caneca Meu Lugar Favorito", category: "Canecas", description: "Uma lembrança quentinha para acompanhar todos os dias.", price: "Consulte o valor", badge: "Mais vendido", image: "caneca", details: "Caneca de cerâmica personalizável com nome, frase curta ou uma data especial. Um presente para começar o dia com um sorriso." },
	{ id: 2, name: "Caneca Duo de Afeto", category: "Canecas", description: "Duas canecas, uma história que combina.", price: "Consulte o valor", badge: "Presente especial", image: "cafe", details: "Par de canecas que se completam. Escolha as frases, os nomes e as cores para criar um presente com a cara de vocês." },
	{ id: 3, name: "Camiseta Boa Vibração", category: "Camisetas", description: "Conforto e personalidade para vestir por aí.", price: "Consulte o valor", badge: "Novidade", image: "oculos", details: "Camiseta confortável com estampa exclusiva. A arte, a cor e o tamanho são combinados com você antes da produção." },
	{ id: 4, name: "Camiseta do Nosso Jeito", category: "Camisetas", description: "Uma ideia divertida que merece sair do papel.", price: "Consulte o valor", badge: "Feito pra você", image: "camiseta", details: "Transforme uma frase, ilustração ou piada interna em uma camiseta exclusiva. Produzida sob encomenda." },
	{ id: 5, name: "Garrafa Meu Ritmo", category: "Garrafas e copos", description: "Sua frase favorita vai com você pra todo lugar.", price: "Consulte o valor", badge: "Mais vendido", image: "garrafa", details: "Garrafa personalizável com nome, palavra ou arte simples. Uma companhia prática para a rotina e para os passeios." },
	{ id: 6, name: "Copo Brinde à Vida", category: "Garrafas e copos", description: "Um brinde às coisas boas, grandes e pequenas.", price: "Consulte o valor", badge: "Novidade", image: "garrafa", details: "Copo reutilizável com personalização à sua escolha. Ideal para presentear ou deixar a mesa de trabalho mais alegre." },
	{ id: 7, name: "Chaveiro Pedacinho de Casa", category: "Chaveiros e acessórios", description: "Um detalhe especial pra levar no bolso.", price: "Consulte o valor", badge: "Presente especial", image: "relogio", details: "Chaveiro personalizado com inicial, palavra ou símbolo. Pequeno no tamanho, grande no significado." },
	{ id: 8, name: "Chaveiro Nossa História", category: "Chaveiros e acessórios", description: "Uma lembrança de bolso para quem é importante.", price: "Consulte o valor", badge: "Feito pra você", image: "sapatos", details: "Um acessório leve e personalizado para celebrar amizades, datas marcantes ou aquele lugar especial." },
	{ id: 9, name: "Quadro Casa com Afeto", category: "Quadros e decoração", description: "Uma frase que deixa qualquer cantinho mais seu.", price: "Consulte o valor", badge: "Mais vendido", image: "quadros", details: "Quadro decorativo com mensagem, nomes ou data escolhidos por você. A arte é preparada para combinar com seu espaço." },
	{ id: 10, name: "Pôster Nossa Constelação", category: "Quadros e decoração", description: "Um céu especial para uma data inesquecível.", price: "Consulte o valor", badge: "Presente especial", image: "pincel", details: "Pôster personalizado para celebrar um dia importante. Escolha a data e a dedicatória que acompanham a composição." },
	{ id: 11, name: "Kit Pausa Gostosa", category: "Kits para presentear", description: "Um convite a desacelerar e aproveitar o momento.", price: "Consulte o valor", badge: "Queridinho", image: "livros", details: "Kit demonstrativo que pode reunir caneca, cartão e pequenos mimos. Consulte as opções disponíveis e personalize a mensagem." },
	{ id: 12, name: "Kit Um Dia Mais Doce", category: "Kits para presentear", description: "Uma combinação pensada para arrancar sorrisos.", price: "Consulte o valor", badge: "Novidade", image: "presente", details: "Monte um presente completo com itens personalizados e uma mensagem especial. Os componentes podem ser ajustados ao seu orçamento." }
];

const featuredIds = [1, 5, 9, 11];
const grid = document.querySelector(".product-grid");
const resultsCount = document.querySelector(".results-count");
const emptyState = document.querySelector(".empty-state");
const modal = document.querySelector(".product-modal");
const modalContent = document.querySelector(".modal-content");
const toast = document.querySelector(".toast");
let activeCategory = "Todos";
let searchTerm = "";
let featuredIndex = 0;
let toastTimer;

function imageUrl(image) {
	return `img/${image}.jpg`;
}

function whatsappUrl(product) {
	const message = `Oi! Tenho interesse no produto "${product.name}" da CustomSoul. Pode me passar mais informações?`;
	return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function showToast(message) {
	toast.textContent = message;
	toast.classList.add("is-visible");
	window.clearTimeout(toastTimer);
	toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function renderProducts() {
	const visibleProducts = products.filter((product) => {
		const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
		const matchesSearch = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("pt-BR").includes(searchTerm);
		return matchesCategory && matchesSearch;
	});

	grid.innerHTML = visibleProducts.map((product) => `
		<article class="product-card">
			<div class="product-image">
				<img src="${imageUrl(product.image)}" alt="${product.name}" loading="lazy">
				<span class="product-tag">${product.badge}</span>
			</div>
			<div class="product-card-content">
				<p class="product-category">${product.category}</p>
				<h3>${product.name}</h3>
				<p class="product-description">${product.description}</p>
				<strong class="product-price">${product.price}</strong>
				<div class="product-card-actions">
					<button class="small-button" type="button" data-details="${product.id}">Ver detalhes</button>
					<a class="small-button solid" href="${whatsappUrl(product)}" target="_blank" rel="noopener noreferrer" data-quote="${product.id}">Solicitar orçamento</a>
				</div>
			</div>
		</article>
	`).join("");

	resultsCount.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
	emptyState.hidden = visibleProducts.length > 0;
}

function setCategory(category) {
	activeCategory = category;
	document.querySelectorAll(".filter-button").forEach((button) => {
		const selected = button.dataset.filter === category;
		button.classList.toggle("is-active", selected);
		button.setAttribute("aria-pressed", String(selected));
	});
	renderProducts();
}

function renderFeatured() {
	const product = products.find((item) => item.id === featuredIds[featuredIndex]);
	const stage = document.querySelector(".featured-stage");
	stage.innerHTML = `
		<article class="featured-card">
			<div class="featured-image"><img src="${imageUrl(product.image)}" alt="${product.name}" loading="lazy"><span class="featured-badge">${product.badge}</span></div>
			<div class="featured-info"><p class="eyebrow">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p><strong class="featured-price">${product.price}</strong><div class="featured-actions"><button class="button button-dark" type="button" data-details="${product.id}">Ver detalhes <span aria-hidden="true">↗</span></button><a class="button button-outline" href="${whatsappUrl(product)}" target="_blank" rel="noopener noreferrer" data-quote="${product.id}">Tenho interesse</a></div></div>
		</article>`;
	document.querySelector(".carousel-dots").innerHTML = featuredIds.map((id, index) => `<button class="carousel-dot${index === featuredIndex ? " is-active" : ""}" type="button" data-slide="${index}" aria-label="Mostrar destaque ${index + 1}" aria-pressed="${index === featuredIndex}"></button>`).join("");
}

function showProductDetails(productId) {
	const product = products.find((item) => item.id === Number(productId));
	if (!product) return;
	modalContent.innerHTML = `<img src="${imageUrl(product.image)}" alt="${product.name}"><div class="modal-info"><p class="eyebrow">${product.category}</p><h2 id="modal-title">${product.name}</h2><p>${product.details}</p><strong>${product.price}</strong><a class="button button-dark" href="${whatsappUrl(product)}" target="_blank" rel="noopener noreferrer" data-quote="${product.id}">Solicitar orçamento <span aria-hidden="true">↗</span></a></div>`;
	modal.showModal();
}

document.querySelectorAll(".product-search").forEach((input) => {
	input.addEventListener("input", (event) => {
		searchTerm = event.currentTarget.value.trim().toLocaleLowerCase("pt-BR");
		document.querySelectorAll(".product-search").forEach((otherInput) => {
			if (otherInput !== event.currentTarget) otherInput.value = event.currentTarget.value;
		});
		renderProducts();
	});
});

document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.filter)));
document.querySelectorAll(".category-tile").forEach((button) => button.addEventListener("click", () => {
	setCategory(button.dataset.category);
	document.querySelector("#produtos").scrollIntoView({ behavior: "smooth" });
}));
document.querySelectorAll("[data-footer-filter]").forEach((link) => link.addEventListener("click", () => setCategory(link.dataset.footerFilter)));

document.querySelector(".carousel-prev").addEventListener("click", () => {
	featuredIndex = (featuredIndex - 1 + featuredIds.length) % featuredIds.length;
	renderFeatured();
});
document.querySelector(".carousel-next").addEventListener("click", () => {
	featuredIndex = (featuredIndex + 1) % featuredIds.length;
	renderFeatured();
});
document.querySelector(".carousel-dots").addEventListener("click", (event) => {
	const dot = event.target.closest("[data-slide]");
	if (!dot) return;
	featuredIndex = Number(dot.dataset.slide);
	renderFeatured();
});

document.addEventListener("click", (event) => {
	const detailsButton = event.target.closest("[data-details]");
	if (detailsButton) showProductDetails(detailsButton.dataset.details);
	const quoteLink = event.target.closest("[data-quote]");
	if (quoteLink) {
		const product = products.find((item) => item.id === Number(quoteLink.dataset.quote));
		if (product) showToast(`Abrindo o WhatsApp com seu pedido sobre “${product.name}”. Número demonstrativo: ${whatsappNumber}.`);
	}
});

document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
	if (event.target === modal) modal.close();
});

const customInput = document.querySelector("#custom-text");
customInput.addEventListener("input", () => {
	const text = customInput.value.trim();
	document.querySelector(".mug-custom-text").innerHTML = text ? text.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]) : "seu carinho<br>em cada detalhe";
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
	event.preventDefault();
	const form = event.currentTarget;
	const feedback = form.querySelector(".form-feedback");
	if (!form.reportValidity()) {
		feedback.textContent = "Confira os campos obrigatórios e tente novamente.";
		feedback.classList.add("is-error");
		return;
	}
	feedback.classList.remove("is-error");
	feedback.textContent = "Tudo certo! Esta é uma demonstração: sua mensagem não foi enviada.";
	form.reset();
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
menuToggle.addEventListener("click", () => {
	const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
	primaryNav.classList.toggle("is-open", !isOpen);
});
primaryNav.addEventListener("click", (event) => {
	if (!event.target.closest("a")) return;
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Abrir menu");
	primaryNav.classList.remove("is-open");
});
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Abrir menu");
		primaryNav.classList.remove("is-open");
	}
});

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add("is-visible");
		observer.unobserve(entry.target);
	});
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

renderProducts();
renderFeatured();
