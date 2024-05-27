import { fetchProductByCategory } from "./js/api";
import { addToCart } from "./js/cart";
import { renderProducts } from "./js/dom";

const init = () => {
  const buttons = document.querySelectorAll(".store__category-button");
  const productList = document.querySelector(".store__list");

  const changeCategory = async ({ target }) => {
    const category = target.textContent.trim();

    buttons.forEach((button) => {
      button.classList.remove("store__category-button_active");
    });

    target.classList.add("store__category-button_active");
    const products = await fetchProductByCategory(category);
    renderProducts(products, productList);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", changeCategory);

    if (button.classList.contains("store__category-button_active")) {
      changeCategory({ target: button });
    }
  });

  productList.addEventListener("click", ({ target }) => {
    if (target.closest(".product__btn-add-cart")) {
      const productId = target.dataset.id;
      addToCart(productId);
    }
  });
};

init();
