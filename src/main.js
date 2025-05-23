import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Parallax from "./directives/parallax";
import Scrolly from "./directives/scrolly";

const app = createApp(App);

app.directive("parallax", Parallax);
app.directive("scrolly", Scrolly);

app.use(router);
app.mount("#app");
