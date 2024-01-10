

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