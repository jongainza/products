const spinner = document.querySelector(".loading");
const productsCenter = document.querySelector(".products-center");
const productsContainer = document.querySelector(".products-container");
const errorMessage = document.querySelector(".error");
const url = "https://www.course-api.com/javascript-store-products";

const getProducts = async () => {
  productsCenter.innerHTML = `<div class="loading"></div>`;

  try {
    const response = await fetch(url);
    console.log(response);

    const data = await response.json();

    loadProducts(data);
  } catch (error) {
    productsCenter.innerHTML = `<p class="error">there was an error</p>`;
  }
};
getProducts();

const loadProducts = (data) => {
  const products = data
    .map((item) => {
      const description = item.fields;
      return `<a href="product.html" class="single-product">
             <img
               src="${description.image[0].url}"
               alt="${description.name}"
               class="single-product-img img"
             />
             <footer>
               <h5 class="name">${description.name}</h5>
               <span class="price">$${description.price}</span>
             </footer>
           </a>`;
    })
    .join("");
  productsContainer.innerHTML = products;
  console.log(productsContainer);

  productsCenter.innerHTML = "";
  productsCenter.appendChild(productsContainer);
};
