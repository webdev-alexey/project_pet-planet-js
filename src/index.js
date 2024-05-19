const buttons = document.querySelectorAll(".store__category-button");

const changeActiveBtn = (event) => {
  const target = event.target;

  buttons.forEach((button) => {
    button.classList.remove("store__category-button_active");
  });

  target.classList.add("store__category-button_active");
};

buttons.forEach((button) => {
  button.addEventListener("click", changeActiveBtn);
});

const API_URL = "https://arrow-solid-water.glitch.me";

const productList = document.querySelector(".store__list");

const createProductCard = (product) => {
  const productCard = document.createElement("li");
  productCard.classList.add("store__item");
  productCard.innerHTML = `
    <article class="store__product product">
      <img
        class="product__img"
        src="${API_URL}/${product.photoUrl}"
        alt="${product.name}"
        width="388"
        height="261"
      />

      <h3 class="product__title">${product.name}</h3>

      <p class="product__price">${product.price}&nbsp;₽</p>

      <button class="product__btn-add-cart">Заказать</button>
    </article>
  `;

  return productCard;
};

const renderProducts = (products) => {
  productList.textContent = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);

    productList.append(productCard);
  });
};

const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/category/${category}`
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error(`Ошибка запроса товаров: ${error}`);
  }
};

fetchProductByCategory("Домики");
