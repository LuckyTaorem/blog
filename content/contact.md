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
<input type="hidden" name="access_key" value="0b342e68-dbf4-4664-9ae6-1cd233e0acb2">
<input type="hidden" name="redirect" value="https://luckytaorem.github.io/blog/thanks/">
<input type="checkbox" name="botcheck" class="d-none" style="display: none;">
<input type="hidden" name="subject" value="New Contact Message from LT Developer">
<input type="hidden" name="from_name" value="LT Developer">
<input type="hidden" name="replyto" value="luckytaorem5@gmail.com">
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

<script src="https://hcaptcha.com/1/api.js?onload=onCaptchaLoad&render=explicit" async defer></script>

<div class="mb-4 text-center">
  <div id="hcaptcha-container" class="d-inline-block"></div>
</div>

<div class="d-grid mt-5">
  <button id="submit-btn" type="submit" class="btn btn-primary py-3 rounded-pill fw-bold fs-5" disabled>
    Send Message
  </button>
</div>

<script>
let captchaWidgetId;

function renderCaptcha() {
  const htmlTheme = document.documentElement.getAttribute("data-bs-theme");
  const container = document.getElementById("hcaptcha-container");

  // Wipe the container clean for theme switches
  container.innerHTML = "";

  captchaWidgetId = hcaptcha.render(container, {
    sitekey: "355e4da0-3d78-491c-b18a-6dcc3afca796",
    theme: htmlTheme === "dark" ? "dark" : "light",
    callback: function(token) {
      document.getElementById("submit-btn").disabled = false;
    },
    "expired-callback": function() {
      document.getElementById("submit-btn").disabled = true;
    }
  });
}

// hCaptcha will call this specific function the exact millisecond it is ready
window.onCaptchaLoad = function() {
  renderCaptcha();
};

// Cleanly destroy and rebuild the CAPTCHA when the user toggles dark mode
const observer = new MutationObserver(() => {
  if (typeof hcaptcha !== "undefined") {
    renderCaptcha();
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-bs-theme"]
});
</script>

</form>
</div>
</div>
</div>
</div>