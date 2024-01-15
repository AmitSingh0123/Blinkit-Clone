let cartItems;
let cartItemObj;
localStorage.clear();

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
    cartItemNavElement.classList.remove("active");
  }
  displayCartItemObject();
  cartSummry();
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
          <div><img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/eta-icons/15-mins.png" alt=""></div>
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
function cartSummry() {
  let cartSummry = document.querySelector(".cart-summary-container");
  let totalItem = cartItems.length;
  let totalMRP = 0;
  let totalDicount = 0;
  let finalPayment = 0;
  let deliveryCharge = 15;

  cartItemObj.forEach((cartItems) => {
    totalMRP += cartItems.origanal_price;
    totalDicount += cartItems.origanal_price - cartItems.price;
    finalPayment += cartItems.price;
  });
  finalPayment += deliveryCharge;
  cartSummry.innerHTML = `<div class="cart-summary">
  <div class="bill-details">
    <span>Bill Details</span>
  </div>
  <div class="total-items flex-container">
    <div>
      <span><span><i class='bx bxs-food-menu'></i></span>
      (<span>total items <span>${totalItem}</span>)</span></span>
    </div>
    <div>
      
    </div>

  </div>

  <div class="total-items flex-container">
    <div>
      <span>total dicount</span>
    </div>
    <div>
      <span>₹${totalDicount}</span>
    </div>
  </div>

  <div class="flex-container">
    <div>
      <span> <span><i class='bx bx-cycling'></i></span>
      <span>Delivery charge</span>
      <span><i class='bx bxs-info-circle'></i></span></span>
     
    </div>
    <div>
      <span>₹${deliveryCharge}</span>
    </div>
  </div>

  <div class="flex-container">
  <div>
    <span>totalMRP</span>
  </div>
  <div>
    <span>₹${totalMRP}</span>
  </div>
</div>

  <div class="flex-container">
    <div>
      <span>Grand total</span>
    </div>
    <div>
      <span>₹${finalPayment}</span>
    </div>
  </div>
  <div class="cart-summary-footer wave"><span>Shop for ₹16 more to save ₹16 on delivery charge</span></div>
  <div class="order-now-btn" onclick = "oredrCompleat()"><a href="index.html">oreder now!</a></div>
  `;
}
function oredrCompleat(){
  alert(' 🤝 Thanks so much for your order! I hope you enjoy your new purchase! ...')
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
