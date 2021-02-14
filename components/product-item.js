// product-item.js

class ProductItem extends HTMLElement {
  constructor(id,imgsrc, alt, title, price) {
    super();
    this.attachShadow({mode: 'open'});

    const li = document.createElement('li');
    li.setAttribute('class','product');
    li.setAttribute('id', id);
    const img = li.appendChild(document.createElement('img'));
    img.setAttribute('src', imgsrc);
    img.alt = alt;
    img.width = 200;
    const parag_one = li.appendChild(document.createElement('p'));
    parag_one.setAttribute('class', 'title');
    parag_one.innerHTML = title;
    const parag_two = li.appendChild(document.createElement('p'));
    parag_two.setAttribute('class', 'price');
    parag_two.innerHTML = price;
    const butt = li.appendChild(document.createElement('button'));
    if(localStorage.getItem(id) == null) {
      butt.setAttribute('incart', '');
      butt.innerHTML = 'Add to Cart';
    }
    else {
      butt.setAttribute('incart', 'true');
      butt.innerHTML = 'Remove from Cart';
    }
    butt.addEventListener("click", clicking);
    
    // onclick
    function clicking() {
      if(!butt.getAttribute('incart')) {
        alert('Added to Cart!');
      }
      // adding item to cart
      if(butt.getAttribute('incart') === "") {
        butt.setAttribute('incart', "true");
        let currCount = document.getElementById('cart-count').innerHTML;
        document.getElementById('cart-count').innerHTML = Number(currCount) + 1;
        localStorage.setItem(id, 'in');
      }
      // removing item from cart
      else {
        butt.setAttribute('incart', "");
        let currCount = document.getElementById('cart-count').innerHTML;
        document.getElementById('cart-count').innerHTML = Number(currCount) - 1;
        localStorage.removeItem(id);
      }
      if(butt.getAttribute('incart') === "true") {
        butt.innerHTML = 'Remove from Cart';
      }
      else {
        butt.innerHTML = 'Add to Cart';
      }
    }
    // styles
    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    this.shadowRoot.append(style,li);
  }

}

customElements.define('product-item', ProductItem);