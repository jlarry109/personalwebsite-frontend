<template>
  <div class="cursor-trail" v-if="!isMobile">
    <div 
      v-for="(dot, index) in dots" 
      :key="index"
      class="trail-dot"
      :style="{
        left: dot.x + 'px',
        top: dot.y + 'px',
        opacity: dot.opacity,
        transform: `scale(${dot.scale})`
      }"
    ></div>
    <div 
      class="cursor-glow"
      :style="{
        left: mouseX + 'px',
        top: mouseY + 'px'
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'CursorTrail',
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      dots: [],
      maxDots: 15,
      isMobile: false
    }
  },
  mounted() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!this.isMobile) {
      document.addEventListener('mousemove', this.handleMouseMove);
      this.animateTrail();
    }
  },
  beforeUnmount() {
    if (!this.isMobile) {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      // Add new dot
      this.dots.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        scale: 1,
        life: 0
      });
      
      // Remove excess dots
      if (this.dots.length > this.maxDots) {
        this.dots.shift();
      }
    },
    
    animateTrail() {
      const animate = () => {
        this.dots.forEach((dot, index) => {
          dot.life += 0.05;
          dot.opacity = Math.max(0, 1 - dot.life);
          dot.scale = Math.max(0.1, 1 - dot.life * 0.5);
          
          if (dot.opacity <= 0) {
            this.dots.splice(index, 1);
          }
        });
        
        requestAnimationFrame(animate);
      };
      animate();
    }
  }
}
</script>

<style scoped>
.cursor-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
}

.trail-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #60a5fa, #a78bfa);
  border-radius: 50%;
  pointer-events: none;
  transform-origin: center;
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.cursor-glow {
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: all 0.1s ease;
}

/* Hide on touch devices */
@media (hover: none) and (pointer: coarse) {
  .cursor-trail {
    display: none;
  }
}
</style>