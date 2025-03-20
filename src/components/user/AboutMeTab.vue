<template>
  <div class="about-me">
    <div class="header">
      <h1>Jones Larry</h1>
      <div class="divider"></div>
    </div>

    <div class="content">
      <div class="profile-pic"></div>
      <div class="bio">
        <h2>Welcome to My Academic Journey</h2>
        <p>
          Greetings! I am <strong>Jones Larry</strong>, a passionate graduate student dedicated to 
          exploring the intersections of <strong>[Your Field of Study]</strong>. This digital space 
          serves as a window into my academic pursuits, research endeavors, and my evolving scholarly journey.
        </p>
        <p>
          My curiosity drives me to understand and contribute to <strong>[Your Research Areas]</strong>. 
          Here, you'll find insights into my projects, publications, and the collaborative discussions that 
          shape my academic path.
        </p>
        <p>Best regards,</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.about-me {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  max-width: 900px;
  margin: auto;
  padding: 40px 20px;
}

.header h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
}

.divider {
  height: 4px;
  background-color: aquamarine;
  width: 60%;
  margin: auto;
  border-radius: 2px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.profile-pic {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: url("@/assets/cat.jpeg") center/cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.bio {
  max-width: 700px;
  text-align: justify;
}

.bio h2 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 15px;
}

.bio p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 15px;
}
</style>
