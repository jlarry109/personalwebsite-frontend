<template>
  <footer id="footer">
    <section>
      <form @submit.prevent="submitForm">
        <div class="fields">
          <div class="field">
            <label for="name">Name</label>
            <input type="text" v-model="form.name" id="name" required />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" v-model="form.email" id="email" required />
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea v-model="form.message" id="message" rows="3" required></textarea>
          </div>
        </div>
        <ul class="actions">
          <li><input type="submit" value="Send Message" /></li>
        </ul>

        <p v-if="messageSent" class="success">Message sent successfully!</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </section>

    <section class="split contact">
      <section class="alt">
        <h3>Address</h3>
        <p>1234 Somewhere Road #87257<br />Nashville, TN 00000-0000</p>
      </section>
      <section>
        <h3>Phone</h3>
        <p><a href="#">(000) 000-0000</a></p>
      </section>
      <section>
        <h3>Email</h3>
        <p><a href="#">info@joneslarry.com</a></p>
      </section>
      <section>
        <h3>Social</h3>
        <ul class="icons alt">
          <li>
            <a href="#" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a>
          </li>
          <li>
            <a href="#" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a>
          </li>
          <li>
            <a href="#" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a>
          </li>
          <li>
            <a href="#" class="icon brands alt fa-github"><span class="label">GitHub</span></a>
          </li>
        </ul>
      </section>
    </section>
  </footer>
</template>

<script>
import emailjs from "@emailjs/browser";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      messageSent: false,
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceID || !templateID || !publicKey) {
          throw new Error("EmailJS environment variables are missing.");
        }

        await emailjs.send(serviceID, templateID, this.form, publicKey);
        this.messageSent = true;
        this.errorMessage = "";
        this.form = { name: "", email: "", message: "" }; // Clear form after success
      } catch (error) {
        console.error("EmailJS Error:", error);
        this.errorMessage = "Failed to send message. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/main.css";

#footer {
  width: 100%;
  text-align: center;
  background: #f8f9fa;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success {
  color: green;
}

.error {
  color: red;
}

.split.contact {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.icons.alt {
  list-style: none;
  padding: 0;
}

.icons.alt li {
  display: inline-block;
  margin: 0 10px;
}

.icons.alt a {
  font-size: 24px;
  text-decoration: none;
}
</style>
