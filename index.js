
onLoad();
function onLoad(){

};

function cartBtn(){
  document.querySelector('#js-cart-items-container').classList.toggle('active');
  console.log('amit');
};

function loginBtn(){
  document.querySelector('#js-login-container').classList.toggle('active');
};


function loginBackBtn(){
  document.querySelector('#js-login-container').classList.remove('active');
};
function addressBtn(){
  document.querySelector('#js-address-btn').classList.toggle('active');

};
function addressRemoveBtn(){
  document.querySelector('#js-address-btn').classList.remove('active')
};

// Product section

// function genrateProductDataHtml(){
//   for (let i = 0; i < productData.length; i++){
//     let Product = document.querySelector('#js-Product-section');
    
//     Product.innerHtml =  
//   };

// };
function showDisplayProduct(){
  let productContainer = document.querySelector("#js-Product-section");
  let newHtml = "";
  for (let i = 0; i < productData.length; i++) {
    let {img_src} = productData[i]
    


    newHtml += `
    <div>
    <a href="#"><img src="${img_src}" alt=""></a>
    
    </div>
    
    `;
  }
  productContainer.innerHTML = newHtml;
}

showDisplayProduct();

console.log(productData);