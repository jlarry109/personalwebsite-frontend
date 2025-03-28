<template>
  <div id="wrapper">
    <section id="intro">
      <h1>Welcome to Massively</h1>
      <p>A free responsive template adapted for Vue.js</p>
      <router-link to="/generic" class="button">Learn More</router-link>
    </section>

    <section id="main">
      <article v-for="(post, index) in posts" :key="index">
        <header>
          <span class="date">{{ post.date }}</span>
          <h2><a href="#">{{ post.title }}</a></h2>
        </header>
        <a href="#" class="image fit"><img :src="post.image" alt="" /></a>
        <p>{{ post.description }}</p>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          date: "March 28, 2025",
          title: "Vue.js and Static Templates",
          image: "/images/pic01.jpg",
          description: "Learn how to integrate an HTML template into Vue.js."
        },
        {
          date: "March 27, 2025",
          title: "Vue.js + AWS Deployment",
          image: "/images/pic02.jpg",
          description: "Deploy your Vue app to AWS Elastic Beanstalk."
        }
      ]
    };
  }
};
</script>

<style scoped>
@import "/assets/css/main.css";
</style>
