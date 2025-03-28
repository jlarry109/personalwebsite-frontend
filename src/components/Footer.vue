<template>
  <footer id="footer">
    <section>
      <form @submit.prevent="submitForm">
        <div class="fields">
          <div class="field">
            <label for="name">Name</label>
            <input type="text" v-model="name" id="name" />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" />
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea v-model="message" id="message" rows="3"></textarea>
          </div>
        </div>
        <ul class="actions">
          <li><input type="submit" value="Send Message" /></li>
        </ul>
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
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    submitForm() {
      alert(`Message from ${this.name} sent!`);
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
