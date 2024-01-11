onLoad();
function onLoad() {
  showDisplayProduct();
  showDisplayProduct2();
  scrollBarItems();
}

function cartBtn() {
  document.querySelector("#js-cart-items-container").classList.toggle("active");
  console.log("amit");
}

function loginBtn() {
  document.querySelector("#js-login-container").classList.toggle("active");
}

function loginBackBtn() {
  document.querySelector("#js-login-container").classList.remove("active");
}
function addressBtn() {
  document.querySelector("#js-address-btn").classList.toggle("active");
}
function addressRemoveBtn() {
  document.querySelector("#js-address-btn").classList.remove("active");
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

function showDisplayProduct2() {
  let productContainer = document.querySelector("#js-product-items-container1");
  let newHtml = "";

  for (let i = 0; i < dairyProducts.length; i++) {
    let { item_name, img_src, weight, price, origanal_price } =
      dairyProducts[i];
    console.log(dairyProducts[i]);
    newHtml += `<a href="#" id="js-item"><div class="produst">
    <div class="product-body">
      <div class="product-img">
        <img src="${img_src}" alt="">
      </div>
      <div class="product-deteles">
        <div class="product-time-logo">
          <div><img src="/images/icons/15-mins-logo.avif" alt=""></div>
          <div><span>15 MINS</span></div>
        </div>
        <div class="product-title">
          <h4>${item_name}</h4>
        </div>
        <div class="product-weight">
          <p>${weight}</p>
        </div>
        <div class="product-btn-box">
          <div class="Product-amount">
            <p>₹${price} <span id="or-price"> ₹${origanal_price}</span></p>
          </div>
          <div class="product-btn">
            <button class="product-add-btn">add</button>
          </div>
        </div>
      </div>
    </div>
  </div></a>
  `;
    console.log(i);
  }
  productContainer.innerHTML = newHtml;
}


function scrollBarItems(){
  let scroolContainer = document.querySelector("#js-product-items-container1");
let backBtn = document.querySelector(".back-btn");
let nextBtn = document.querySelector(".next-btn");
scroolContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scroolContainer.scrollLeft += evt.deltaY;
});

nextBtn.addEventListener("click",() => {
    scroolContainer.style.scrollBehavior = "smooth";
    scroolContainer.scrollLeft += 600;
});

backBtn.addEventListener("click",() => {
    scroolContainer.style.scrollBehavior = "smooth";
    scroolContainer.scrollLeft -= 600;
});
}
