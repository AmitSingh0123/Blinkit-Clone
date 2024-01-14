let cartItems;
let cartItemObj;
onLoad();
function onLoad() {
  let cartItemstr = localStorage.getItem("cartItems");
  cartItems = cartItemstr ? JSON.parse(cartItemstr) : [];
  displaycartIcon();
  showDisplayProduct();
  scrollBarItems();
  displayItemOnHomePage();
  navBtns();
}

function scrollBarItems() {
  let scroolContainer = document.querySelector("#js-product-items-container1");
  let backBtn = document.querySelector(".back-btn");
  let nextBtn = document.querySelector(".next-btn");
  scroolContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scroolContainer.scrollLeft += evt.deltaY;
  });

  nextBtn.addEventListener("click", () => {
    scroolContainer.style.scrollBehavior = "smooth";
    scroolContainer.scrollLeft += 600;
  });

  backBtn.addEventListener("click", () => {
    scroolContainer.style.scrollBehavior = "smooth";
    scroolContainer.scrollLeft -= 600;
  });
}

function cartBtn() {
  document.querySelector("#js-cart-items-container").classList.toggle("active");
  console.log("amit");
  let CartBackBtn = document.querySelector(".js-item-back-btn");
  CartBackBtn.addEventListener("click", () => {
    document
      .querySelector("#js-cart-items-container")
      .classList.remove("active");
  });
}

function loginBtn() {
  document.querySelector("#js-login-container").classList.toggle("active");
}

function loginBackBtn() {
  document.querySelector("#js-login-container").classList.remove("active");
}

function navBtns() {
  let removeAdderssBtn = document.querySelector(".bx-x");
  let addAdderssBtn = document.querySelector(".bxs-down-arrow");
  let loginBackBtn = document.querySelector(".login-btn");

  removeAdderssBtn.addEventListener("click", () => {
    document.querySelector("#js-address-btn").classList.remove("active");
  });

  addAdderssBtn.addEventListener("click", () => {
    document.querySelector("#js-address-btn").classList.toggle("active");
  });
  loginBackBtn.addEventListener("click", () => {
    document.querySelector("#js-login-container").classList.remove("active");
  });
}

// Product section

function showDisplayProduct() {
  let productContainer1 = document.querySelector("#js-Product-section");
  let newHtml1 = "";

  for (let i = 0; i < productData.length; i++) {
    let { img_src } = productData[i];

    newHtml1 += `
    <div>
    <a href="#"><img src="${img_src}" alt=""></a>
    </div>
    `;
  }
  productContainer1.innerHTML = newHtml1;
}

function addToCart(itemId) {
  cartItems.push(itemId);
  localStorage.setItem("cartIems", JSON.stringify(cartItems));
  displaycartIcon();
}

function displaycartIcon() {
  let count = document.querySelector(".js-count-items");
  let cartItemNavElement = document.querySelector(".js-cart-nav-container");
  if (cartItems.length === 0) {
    count.innerText = `my cart`;
  } else {
    count.innerText = `${cartItems.length} items `;
  }

  if (!cartItems.length) {
    cartItemNavElement.classList.add("active");
  } else {
    let cartItemOrederBtn = document.querySelector(".order-now-btn");
    cartItemOrederBtn.innerHTML = `<div class="order-now-btn"><a href="">order now</a></div>`;
    cartItemNavElement.classList.remove("active");
  }
  displayCartItemObject();
  displayCartItems();
}
function displayCartItemObject() {
  cartItemObj = cartItems.map((itemId) => {
    for (let i = 0; i < dairyProducts.length; i++) {
      if (itemId == dairyProducts[i].id) {
        return dairyProducts[i];
      }
    }
  });
}

function displayItemOnHomePage() {
  let productContainerElement = document.querySelector(
    "#js-product-items-container1"
  );
  let innerHtml = "";

  dairyProducts.forEach((item) => {
    innerHtml += `<div class="produst">
    <div class="product-body">
      <div class="product-img">
        <img src="${item.img_src}" alt="">
      </div>
      <div class="product-deteles">
        <div class="product-time-logo">
          <div><img src="/images/icons/15-mins-logo.avif" alt=""></div>
          <div><span>15 MINS</span></div>
        </div>
        <div class="product-title">
          <h4>${item.item_name}</h4>
        </div>
        <div class="product-weight">
          <p>${item.weight}</p>
        </div>
        <div class="product-btn-box">
          <div class="Product-amount">
            <p>₹${item.price} <span id="or-price"> ₹${item.origanal_price}</span></p>
          </div>
          <div class="product-btn">
            <button class="product-add-btn" onclick="addToCart(${item.id})">add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  });

  productContainerElement.innerHTML = innerHtml;
}

function removeFromCart(itemId) {
  cartItems = cartItems.filter((cartItemId) => cartItemId != itemId);
  localStorage.setItem("cartItems", cartItems);
  displaycartIcon();
}

function displayCartItems() {
  let cartItemElement = document.querySelector("#js-cart-items");
  let newHtml = "";

  cartItemObj.forEach((cartItem) => {
    newHtml += genrateItemHtml(cartItem);
  });

  cartItemElement.innerHTML = newHtml;
}

function genrateItemHtml(item) {
  return `<div class="cart-item-body">
  <div class="cart-item-img"><img src="${item.img_src}" alt=""></div>
  <div class="cart-item-detele">
  <div class="cart-item-product-name">${item.item_name}</div>
      <div class="cart-item-product-weight">${item.weight}</div>
      <div class="cart-item-product-price">₹${item.price}</div>
  </div>
  <div class="cart-item-btn"><button class="cart-item-product-delete-btn" id="js-cart-item-product-delete-btn"><span onclick="removeFromCart(${item.id})">-</span> <span>1</span> <span>+</span></button></div>
</div>`;
}
