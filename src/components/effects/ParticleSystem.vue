<template>
  <div 
    ref="particleContainer"
    class="particle-system"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <canvas 
      ref="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      class="particle-canvas"
    ></canvas>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ParticleSystem',
  props: {
    particleCount: {
      type: Number,
      default: 50
    },
    particleColor: {
      type: String,
      default: '#60a5fa'
    },
    particleSize: {
      type: Number,
      default: 2
    },
    connectionDistance: {
      type: Number,
      default: 100
    },
    mouseInteraction: {
      type: Boolean,
      default: true
    },
    animationSpeed: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      particles: [],
      mouse: { x: null, y: null },
      canvasWidth: 0,
      canvasHeight: 0,
      animationId: null,
      ctx: null
    }
  },
  mounted() {
    this.initCanvas()
    this.createParticles()
    this.animate()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    initCanvas() {
      const container = this.$refs.particleContainer
      this.canvasWidth = container.offsetWidth
      this.canvasHeight = container.offsetHeight
      
      this.ctx = this.$refs.canvas.getContext('2d')
    },
    
    createParticles() {
      this.particles = []
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvasWidth,
          y: Math.random() * this.canvasHeight,
          vx: (Math.random() - 0.5) * this.animationSpeed,
          vy: (Math.random() - 0.5) * this.animationSpeed,
          size: Math.random() * this.particleSize + 1,
          opacity: Math.random() * 0.5 + 0.5
        })
      }
    },
    
    animate() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      
      // Update and draw particles
      this.particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > this.canvasWidth) {
          particle.vx *= -1
        }
        if (particle.y < 0 || particle.y > this.canvasHeight) {
          particle.vy *= -1
        }
        
        // Mouse interaction
        if (this.mouseInteraction && this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - particle.x
          const dy = this.mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.vx += (dx / distance) * force * 0.1
            particle.vy += (dy / distance) * force * 0.1
          }
        }
        
        // Draw particle
        this.ctx.beginPath()
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        this.ctx.fillStyle = this.hexToRgba(this.particleColor, particle.opacity)
        this.ctx.fill()
        
        // Draw connections
        for (let j = index + 1; j < this.particles.length; j++) {
          const other = this.particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < this.connectionDistance) {
            const opacity = (this.connectionDistance - distance) / this.connectionDistance * 0.3
            this.ctx.beginPath()
            this.ctx.moveTo(particle.x, particle.y)
            this.ctx.lineTo(other.x, other.y)
            this.ctx.strokeStyle = this.hexToRgba(this.particleColor, opacity)
            this.ctx.lineWidth = 1
            this.ctx.stroke()
          }
        }
      })
      
      this.animationId = requestAnimationFrame(this.animate)
    },
    
    handleMouseMove(event) {
      const rect = this.$refs.particleContainer.getBoundingClientRect()
      this.mouse.x = event.clientX - rect.left
      this.mouse.y = event.clientY - rect.top
    },
    
    handleMouseLeave() {
      this.mouse.x = null
      this.mouse.y = null
    },
    
    handleResize() {
      this.initCanvas()
      this.createParticles()
    },
    
    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }
}
</script>

<style scoped>
.particle-system {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Ensure content appears above particles */
.particle-system > :not(.particle-canvas) {
  position: relative;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .particle-canvas {
    display: none;
  }
}
</style>