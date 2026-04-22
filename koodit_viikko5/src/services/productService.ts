export async function fetchRandomProduct() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const products = data.products;
  const random = products[Math.floor(Math.random() * products.length)];

  return {
    id: random.id,
    name: random.title,
    price: random.price
  };
}
