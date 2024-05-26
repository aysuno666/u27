const form = document.querySelector("#form");
const FORM_2 = document.querySelector('#formId');
const submitBtn = document.querySelector(".btn-order");
var btnloader = document.querySelectorAll(".btn-loader");
const toaster = document.querySelector(".toaster");
var btn = document.querySelectorAll('.btn');

const toasterErr = document.querySelector('.toasterErr');

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
      document.body.removeChild("loader");
    });
  });
});


