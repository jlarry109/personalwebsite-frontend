<template>
  <div class="effects-demo">
    <div class="demo-section">
      <h2>Advanced Visual Effects Demo</h2>
      
      <!-- Parallax Demo -->
      <div class="demo-item">
        <h3>Parallax Scrolling</h3>
        <div class="parallax-demo">
          <ParallaxContainer :speed="-0.5">
            <div class="parallax-bg">Background Layer</div>
          </ParallaxContainer>
          <ParallaxContainer :speed="0.3">
            <div class="parallax-fg">Foreground Layer</div>
          </ParallaxContainer>
        </div>
      </div>
      
      <!-- Glassmorphism Demo -->
      <div class="demo-item">
        <h3>Glassmorphism Cards</h3>
        <div class="glass-demo">
          <GlassmorphismCard intensity="light" class="demo-card">
            <h4>Light Blur</h4>
            <p>Subtle glassmorphism effect with light backdrop blur.</p>
          </GlassmorphismCard>
          
          <GlassmorphismCard intensity="medium" class="demo-card">
            <h4>Medium Blur</h4>
            <p>Balanced glassmorphism with medium backdrop blur.</p>
          </GlassmorphismCard>
          
          <GlassmorphismCard intensity="heavy" class="demo-card">
            <h4>Heavy Blur</h4>
            <p>Intense glassmorphism with heavy backdrop blur.</p>
          </GlassmorphismCard>
        </div>
      </div>
      
      <!-- Particle System Demo -->
      <div class="demo-item">
        <h3>Interactive Particle System</h3>
        <div class="particle-demo">
          <ParticleSystem 
            :particle-count="30"
            particle-color="#8b5cf6"
            :connection-distance="80"
            :mouse-interaction="true"
          >
            <div class="particle-content">
              <h4>Move your mouse here!</h4>
              <p>Particles respond to mouse movement</p>
            </div>
          </ParticleSystem>
        </div>
      </div>
      
      <!-- Typewriter Demo -->
      <div class="demo-item">
        <h3>Typewriter Text Effects</h3>
        <div class="typewriter-demo">
          <TypewriterText 
            :text="['Hello World!', 'Welcome to the future.', 'Experience the magic.']"
            tag="h4"
            :speed="100"
            :loop="true"
            :pause-time="2000"
            color="#6366f1"
          />
          
          <TypewriterText 
            text="Word by word reveal animation"
            tag="p"
            :speed="150"
            :word-by-word="true"
            :delay="1000"
            color="#8b5cf6"
          />
        </div>
      </div>
      
      <!-- Smooth Reveal Demo -->
      <div class="demo-item">
        <h3>Smooth Reveal Animations</h3>
        <div class="reveal-demo">
          <SmoothReveal direction="up" :delay="0">
            <div class="reveal-box">Slide Up</div>
          </SmoothReveal>
          
          <SmoothReveal direction="left" :delay="200">
            <div class="reveal-box">Slide Left</div>
          </SmoothReveal>
          
          <SmoothReveal direction="scale" :delay="400">
            <div class="reveal-box">Scale In</div>
          </SmoothReveal>
          
          <SmoothReveal direction="rotate" :delay="600">
            <div class="reveal-box">Rotate In</div>
          </SmoothReveal>
        </div>
      </div>
      
      <!-- Advanced CSS Effects Demo -->
      <div class="demo-item">
        <h3>Advanced CSS Effects</h3>
        <div class="css-effects-demo">
          <div class="effect-box hover-lift-heavy">Hover Lift</div>
          <div class="effect-box hover-glow-intense">Hover Glow</div>
          <div class="effect-box liquid-button">Liquid Button</div>
          <div class="effect-box neon-glow">Neon Glow</div>
          <div class="effect-box gradient-shift">Gradient Shift</div>
          <div class="effect-box float-medium">Floating</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParallaxContainer from './effects/ParallaxContainer.vue'
import GlassmorphismCard from './effects/GlassmorphismCard.vue'
import ParticleSystem from './effects/ParticleSystem.vue'
import TypewriterText from './effects/TypewriterText.vue'
import SmoothReveal from './effects/SmoothReveal.vue'

export default {
  name: 'EffectsDemo',
  components: {
    ParallaxContainer,
    GlassmorphismCard,
    ParticleSystem,
    TypewriterText,
    SmoothReveal
  }
}
</script>

<style scoped>
.effects-demo {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.demo-section h2 {
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.demo-item {
  margin-bottom: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.demo-item h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.parallax-demo {
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.parallax-bg,
.parallax-fg {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 15px;
}

.parallax-bg {
  background: rgba(59, 130, 246, 0.3);
  color: white;
}

.parallax-fg {
  background: rgba(139, 92, 246, 0.3);
  color: white;
  top: 50px;
  height: calc(100% - 100px);
}

.glass-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.demo-card {
  padding: 20px;
  text-align: center;
}

.demo-card h4 {
  color: white;
  margin-bottom: 10px;
}

.demo-card p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.particle-demo {
  height: 300px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
}

.particle-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 10;
}

.particle-content h4 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.typewriter-demo {
  text-align: center;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
}

.reveal-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.reveal-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  color: white;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.css-effects-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.effect-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.effect-box:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .effects-demo {
    padding: 20px 10px;
  }
  
  .demo-item {
    padding: 20px;
  }
  
  .glass-demo,
  .reveal-demo,
  .css-effects-demo {
    grid-template-columns: 1fr;
  }
  
  .parallax-demo {
    height: 200px;
  }
  
  .particle-demo {
    height: 200px;
  }
}
</style>