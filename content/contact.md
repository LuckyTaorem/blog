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

<form id="contact-form">

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

<!-- Google reCAPTCHA Container -->
<div class="mb-4 text-center">
  <div id="recaptcha-wrapper" class="d-inline-block">
    <div id="recaptcha-container"></div>
  </div>
</div>

<div class="d-grid mt-5">
  <button id="submit-btn" type="submit" class="btn btn-primary py-3 rounded-pill fw-bold fs-5" disabled>
    Send Message
  </button>
</div>

</form>
</div>
</div>
</div>
</div>

<!-- Load EmailJS -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

<!-- Load Google reCAPTCHA explicitly -->
<script src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit" async defer></script>

<script>
// --- 1. INITIALIZE EMAILJS ---
(function() {
    emailjs.init({
      publicKey: "rgWnJlkf_T0oMDVc7", 
    });
})();

// --- 2. RECAPTCHA THEME & TOGGLE LOGIC ---
let recaptchaWidgetId;
const submitBtn = document.getElementById("submit-btn");

function renderRecaptcha() {
  const htmlTheme = document.documentElement.getAttribute("data-bs-theme");
  const wrapper = document.getElementById("recaptcha-wrapper");

  // To prevent ghost iframes, we completely wipe and rebuild the HTML container
  wrapper.innerHTML = '<div id="recaptcha-container"></div>';
  submitBtn.disabled = true;

  recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
    'sitekey': '6LeDECYtAAAAAMUFxP8A8zQv2NhFMMtn1DSpM8-L', // Paste your Google v2 Site Key here
    'theme': htmlTheme === 'dark' ? 'dark' : 'light',
    'callback': function(token) {
      submitBtn.disabled = false;
    },
    'expired-callback': function() {
      submitBtn.disabled = true;
    }
  });
}

// Render when Google API loads
window.onRecaptchaLoad = function() {
  renderRecaptcha();
};

// Rebuild when the user toggles dark mode
const observer = new MutationObserver(() => {
  if (typeof grecaptcha !== "undefined") {
    renderRecaptcha();
  }
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bs-theme"] });

// --- 3. HANDLE FORM SUBMISSION ---
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    // Send the data through EmailJS
    emailjs.sendForm('service_s36gjmx', 'template_4d7ob54', this)
        .then(() => {
            // Success! Send them to the Thank You page
            window.location.href = "https://luckytaorem.github.io/blog/thanks/";
        }, (error) => {
            // Failed. Show error, reset the button and the CAPTCHA
            console.log('FAILED...', error);
            alert("Something went wrong. Please try again.");
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            grecaptcha.reset(recaptchaWidgetId);
        });
});
</script>