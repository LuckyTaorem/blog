---
title: "Message Sent"
description: "Thank you for contacting us."
type: "page"
url: "/thanks/"
---

<div class="text-center py-5">
  <h1 class="display-4 fw-bold text-success mb-3">Message Sent!</h1>
  <p class="lead text-body-secondary mb-5">Thank you for reaching out. Check your inbox for a confirmation email.</p>
  <a href="/blog" class="btn btn-primary px-4 py-2 rounded-pill fw-bold">Return Home</a>
</div>

<script>
  // Check for the secret ticket IMMEDIATELY before the page even loads
  if (sessionStorage.getItem('formSubmitted') !== 'true') {
      // No ticket? Kick them back to the contact page instantly
      window.location.replace("https://luckytaorem.github.io/blog/contact/");
  } else {
      // They have the ticket! Let them see the page, but destroy the ticket
      // so they can't just refresh the page forever.
      sessionStorage.removeItem('formSubmitted');
  }
</script>