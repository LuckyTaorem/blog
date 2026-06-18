---
title: "Contact Us"
description: "Get in touch with the team."
type: "page"
---

<div class="row mt-4">
<div class="col-md-8 offset-md-2">
<div class="card border-0 shadow-sm bg-body-tertiary">
<div class="card-body p-5">
<h2 id="drop-us-a-line" class="fw-bold mb-4 text-body text-center">Drop us a line</h2>
<p class="text-center text-body-secondary mb-5">Have a question about our AI setup, or want to collaborate? Send us a message.</p>

<form id="contact-form" action="https://api.web3forms.com/submit" method="POST">
<input type="hidden" name="access_key" value="c8c0dcd0-b544-46a8-a217-8720aa943c44">
<input type="hidden" name="redirect" value="https://luckytaorem.github.io/blog/thanks/">
<input type="checkbox" name="botcheck" class="d-none" style="display: none;">
<input type="hidden" name="subject" value="New Contact Message from LT Developer">
<input type="hidden" name="from_name" value="LT Developer">
<input type="hidden" name="replyto" value="YOUR_ACTUAL_EMAIL@gmail.com">
<input type="hidden" name="autoresponse" value="Thank you for reaching out to the LT Developer! We have received your message and will get back to you shortly.">

<div class="mb-4">
<label for="name" class="form-label text-body-secondary fw-semibold">Your Name</label>
<input type="text" class="form-control bg-body text-body border-secondary-subtle py-2" id="name" name="name" required>
</div>

<div class="mb-4">
<label for="email" class="form-label text-body-secondary fw-semibold">Email Address</label>
<input type="email" class="form-control bg-body text-body border-secondary-subtle py-2" id="email" name="email" required>
</div>

<div class="mb-4">
<label for="message" class="form-label text-body-secondary fw-semibold">Message</label>
<textarea class="form-control bg-body text-body border-secondary-subtle" id="message" name="message" rows="6" required></textarea>
</div>

<div class="mb-4 p-4 border border-secondary-subtle rounded bg-body">
<label for="captcha-answer" class="form-label text-body-secondary fw-bold mb-3">
  Security Check: What is <span id="num1" class="text-primary fs-5"></span> + <span id="num2" class="text-primary fs-5"></span>?
</label>
<input type="number" class="form-control bg-body text-body border-secondary-subtle py-2" id="captcha-answer" placeholder="Enter the sum..." required>
<div class="invalid-feedback fw-semibold mt-2">
  Incorrect answer. Please try again to prove you are human.
</div>
</div>

<div class="d-grid mt-5">
<button type="submit" class="btn btn-primary py-3 rounded-pill fw-bold fs-5">Send Message</button>
</div>
</form>

</div>
</div>
</div>
</div>

<!-- CAPTCHA LOGIC SCRIPT -->
<script>
document.addEventListener("DOMContentLoaded", function() {
  let expectedAnswer = 0;
  const num1El = document.getElementById("num1");
  const num2El = document.getElementById("num2");
  const form = document.getElementById("contact-form");
  const captchaInput = document.getElementById("captcha-answer");

  // Wrap the math generator in a function so we can reuse it
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    expectedAnswer = num1 + num2;
    
    num1El.innerText = num1;
    num2El.innerText = num2;
    captchaInput.value = ""; // Clear the wrong answer from the box
  }

  // Generate the first math problem when the page loads
  generateCaptcha();

  form.addEventListener("submit", function(event) {
    if (parseInt(captchaInput.value) !== expectedAnswer) {
      // Stop the form from submitting
      event.preventDefault();
      
      // Show the red error styling
      captchaInput.classList.add("is-invalid");
      
      // Generate a brand new math question
      generateCaptcha();
    } else {
      captchaInput.classList.remove("is-invalid");
    }
  });

  // Remove the red error state when the user starts typing again
  captchaInput.addEventListener("input", function() {
    captchaInput.classList.remove("is-invalid");
  });
});
</script>