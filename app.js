const spinner = document.querySelector(".loading");
const productsCenter = document.querySelector(".products-center");
const productsContainer = document.querySelector(".products-container");
const errorMessage = document.querySelector(".error");
const url = "https://www.course-api.com/javascript-store-products";

const getProducts = async () => {
  productsCenter.innerHTML = `<div class="loading"></div>`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    productsCenter.innerHTML = `<p class="error">there was an error</p>`;
  }
};

const loadProducts = (data) => {
  const products = data
    .map((item) => {
      const { id, fields } = item;
      const { name, price, image } = fields;

      return `<a href="product.html?id=${id}" class="single-product">
             <img
               src="${image[0].url}"
               alt="${name}"
               class="single-product-img img"
             />
             <footer>
               <h5 class="name">${name}</h5>
               <span class="price">$${price / 100}</span>
             </footer>
           </a>`;
    })
    .join("");
  productsContainer.innerHTML = products;
  productsCenter.innerHTML = "";
  productsCenter.appendChild(productsContainer);
};

const start = async () => {
  const data = await getProducts();
  loadProducts(data);
};

start();
