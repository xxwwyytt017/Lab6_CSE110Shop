// Script.js
window.addEventListener('DOMContentLoaded', () => {
  localStorage = window.localStorage;
  console.log(localStorage);
  // if items is not already in localStorage
  if(localStorage.getItem('items') == null) {
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
                console.log(data);
                localStorage.setItem('items', JSON.stringify(data));
                // custom component
                for(let i = 0; i < data.length; i++) {
                        let new_item = new ProductItem(data[i].id, data[i].image, data[i].description, data[i].title, data[i].price);
                        document.getElementById("product-list").appendChild(new_item);
                }
        
  })
  }
  else {
        const items = JSON.parse(localStorage.getItem('items'));
        // custom component
        for(let i = 0; i < items.length; i++) {
                let new_item = new ProductItem(items[i].id, items[i].image, items[i].description, items[i].title, items[i].price);
                document.getElementById("product-list").appendChild(new_item);
        }
}
document.getElementById('cart-count').innerHTML = Number(localStorage.length) - 1;
});

