const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);

const product = document.querySelector(".product");

const url = "https://www.course-api.com/javascript-store-single-product";

const fetchProduct = async () => {
  product.innerHTML = `<div class="product-loading loading"></div>`;
  try {
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    product.innerHTML = `<p class="error">there was an error</p>`;
  }
};
const loadProduct = (data) => {
  console.log(data);

  const {
    name: title,
    company,
    colors,
    image,
    description,
    price,
  } = data.fields;
  const { url: img } = image[0];
  document.title = title;
  let colorsDisplay = colors
    .map((color) => {
      return `<span class="product-color" style="background:${color}"></span>`;
    })
    .join("");
  return (product.innerHTML = `<div class="product-wrapper">
        <img src="${img}" alt="" class="img" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>${price / 100}</span>
          <div class="colors">
            ${colorsDisplay}
          </div>
            <p>
              ${description}
            </p>
            <button class="btn">add to cart</button>
          </div>
        </div>
      </div>`);
};
const start = async () => {
  const data = await fetchProduct();
  loadProduct(data);
};
start();
