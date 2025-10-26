<template>
  <div class="typewriter-container">
    <component 
      :is="tag"
      :class="[
        'typewriter-text',
        { 'cursor-visible': showCursor && isTyping }
      ]"
      :style="textStyle"
    >
      {{ displayedText }}<span v-if="showCursor" class="cursor">{{ cursorChar }}</span>
    </component>
  </div>
</template>

<script>
export default {
  name: 'TypewriterText',
  props: {
    text: {
      type: [String, Array],
      required: true
    },
    tag: {
      type: String,
      default: 'p'
    },
    speed: {
      type: Number,
      default: 100
    },
    delay: {
      type: Number,
      default: 0
    },
    showCursor: {
      type: Boolean,
      default: true
    },
    cursorChar: {
      type: String,
      default: '|'
    },
    loop: {
      type: Boolean,
      default: false
    },
    pauseTime: {
      type: Number,
      default: 2000
    },
    deleteSpeed: {
      type: Number,
      default: 50
    },
    wordByWord: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'inherit'
    }
  },
  data() {
    return {
      displayedText: '',
      currentIndex: 0,
      currentTextIndex: 0,
      isTyping: false,
      isDeleting: false,
      timeoutId: null
    }
  },
  computed: {
    textArray() {
      return Array.isArray(this.text) ? this.text : [this.text]
    },
    currentText() {
      return this.textArray[this.currentTextIndex] || ''
    },
    textStyle() {
      return {
        color: this.color
      }
    }
  },
  mounted() {
    this.startTyping()
  },
  beforeUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  },
  methods: {
    startTyping() {
      this.timeoutId = setTimeout(() => {
        this.isTyping = true
        this.typeText()
      }, this.delay)
    },
    
    typeText() {
      if (this.isDeleting) {
        this.deleteText()
        return
      }
      
      if (this.currentIndex < this.currentText.length) {
        if (this.wordByWord) {
          // Type word by word
          const words = this.currentText.split(' ')
          let wordIndex = 0
          let charCount = 0
          
          for (let i = 0; i < words.length; i++) {
            if (charCount + words[i].length >= this.currentIndex) {
              wordIndex = i
              break
            }
            charCount += words[i].length + 1 // +1 for space
          }
          
          const wordsToShow = words.slice(0, wordIndex + 1).join(' ')
          this.displayedText = wordsToShow
          this.currentIndex = wordsToShow.length
        } else {
          // Type character by character
          this.displayedText = this.currentText.substring(0, this.currentIndex + 1)
          this.currentIndex++
        }
        
        this.timeoutId = setTimeout(this.typeText, this.speed)
      } else {
        // Finished typing current text
        this.isTyping = false
        
        if (this.loop && this.textArray.length > 1) {
          // Start deleting after pause
          this.timeoutId = setTimeout(() => {
            this.isDeleting = true
            this.isTyping = true
            this.deleteText()
          }, this.pauseTime)
        } else if (this.loop && this.textArray.length === 1) {
          // Single text loop - restart
          this.timeoutId = setTimeout(() => {
            this.currentIndex = 0
            this.displayedText = ''
            this.isTyping = true
            this.typeText()
          }, this.pauseTime)
        }
      }
    },
    
    deleteText() {
      if (this.currentIndex > 0) {
        this.displayedText = this.currentText.substring(0, this.currentIndex - 1)
        this.currentIndex--
        this.timeoutId = setTimeout(this.deleteText, this.deleteSpeed)
      } else {
        // Finished deleting
        this.isDeleting = false
        this.currentTextIndex = (this.currentTextIndex + 1) % this.textArray.length
        
        // Start typing next text
        this.timeoutId = setTimeout(() => {
          this.typeText()
        }, this.speed)
      }
    }
  }
}
</script>

<style scoped>
.typewriter-container {
  display: inline-block;
}

.typewriter-text {
  display: inline-block;
  margin: 0;
}

.cursor {
  display: inline-block;
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { 
    opacity: 1; 
  }
  51%, 100% { 
    opacity: 0; 
  }
}

.cursor-visible .cursor {
  animation: blink 1s infinite;
}

/* Smooth text reveal animation */
.typewriter-text {
  overflow: hidden;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-text {
    white-space: normal;
  }
  
  .cursor {
    animation: none;
    opacity: 1;
  }
}
</style>