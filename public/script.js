const form_con = document.querySelector("#form_con");
const form_modal = document.querySelector('#form_modal')

var type;
const btns = document.querySelectorAll('.btn-send')

const FORM_2 = document.querySelector('#formId');
const submitBtn = document.querySelector(".btn-order");
var btnloader = document.querySelectorAll(".btn-loader");
const toaster = document.querySelector(".toaster");
var btn = document.querySelectorAll('.btn');

const toasterErr = document.querySelector('.toasterErr');


btns.forEach(button => {
  button.addEventListener('click', ()=> {
    type = parseInt(button.getAttribute('data-type'));
  })
})

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
      document.body.removeChild("loader");
    });
  });
});


form_con.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  const type = 1; // Assuming type is a constant here
  data.type = type; // Adding the type to the data
  sendformData(data);
  e.target.reset();
});
form_modal.addEventListener("submit", (e) => {
  e.preventDefault();
    
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  data.type = type; 

  sendformData(data);
  e.target.reset();
})

function sendformData(data) {
  fetch('/api/send', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("formData sent successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function zayavka(e) {
   e.target.reset();
  setTimeout(hideToaster, 1100);
  setTimeout(() => sendFeedback(feedback), 1100);
}