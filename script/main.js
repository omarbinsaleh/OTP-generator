// global variables:
let generatedOTP;

// when the DOM is fully loaded:
document.addEventListener("DOMContentLoaded", function() {
   // render the application:
   init();
})

// init() function defination:
function init() {
   generateOTP();
   handleUserInput();

}

// helper function: for generating OTP.
function generateOTP() {
   const optLength = 4;
   let otp = "";

   // generate new OTP:
   for (let i = 0; i < optLength; i++) {
      otp += Math.ceil(Math.random() * optLength);
   }

   // save the newly generated OTP:
   generatedOTP = parseInt(otp);

   // clear out the input box:
   document.querySelectorAll(".otp-box").forEach((box) => {
      box.value = "";
   })

   // display the New OTP to the screen:
   setTimeout(() => {
      document.querySelector(".generated-otp").textContent = `Your OTP: ${otp}`;
   }, 2000)
}

// helper function: for handling the user input
function handleUserInput() {
   /* const boxes = document.querySelector(".otp-boxes");
   boxes.addEventListener("input", (e) => {
      const targetElement = e.target;
      const value = targetElement.value;
      const nextEelement = targetElement.nextElementSibling;
      
      // when user enter anyting outher than number:
      if(isNaN(value)) {
         targetElement.value = "";
         return;
      }

      // set the focus on the next input box:
      if (nextEelement) {
         nextEelement.focus();
      }
   }) */

   const otpBoxes = document.querySelectorAll(".otp-box");

   // add "keyup" event listener to every single OTP input box
   otpBoxes.forEach((box) => {
      box.addEventListener("keyup", (e) => {
         const targetElement = e.target;
         const value = targetElement.value;
         const nextElement = targetElement.nextElementSibling;
         const lastElement = targetElement.parentElement.lastElementChild;
         const firstElement = targetElement.parentElement.firstElementChild;

         if (isNaN(value)) {
            targetElement.value = "";
            return;
         }

         if(nextElement) {
            nextElement.focus();
         }

         // validte the OTP:
         validateOTP();

         /* if (targetElement === lastElement) {
            setTimeout(() => {
               generateOTP();
               document.querySelector(".otp-validation-message").textContent = "";
               document.querySelector(".otp-validation-message").classList.remove("fail");
               document.querySelector(".otp-validation-message").classList.remove("success");
            }, 1000);
         } */

      })
   })
}

// helper function: for validating the OTP
function validateOTP() {
   let userInput = "";
   const message = document.querySelector(".otp-validation-message");

   document.querySelectorAll(".otp-box").forEach((box) => {
      userInput += box.value;
   })

   if (generatedOTP === parseInt(userInput)) {
      message.textContent = "OTP is valided successfully!";
      message.classList.remove("fail");
      message.classList.add("success")
   } else {
      message.textContent = "Invalid OTP"
      message.classList.remove("success");
      message.classList.add("fail");
   }
}