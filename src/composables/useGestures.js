import { ref, onMounted, onUnmounted } from 'vue'

export function useGestures(element, options = {}) {
  const {
    threshold = 50,
    restraint = 100,
    allowedTime = 300
  } = options

  const startX = ref(0)
  const startY = ref(0)
  const startTime = ref(0)
  const isTracking = ref(false)

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    startX.value = touch.clientX
    startY.value = touch.clientY
    startTime.value = Date.now()
    isTracking.value = true
  }

  const handleTouchEnd = (e) => {
    if (!isTracking.value) return

    const touch = e.changedTouches[0]
    const distX = touch.clientX - startX.value
    const distY = touch.clientY - startY.value
    const elapsedTime = Date.now() - startTime.value

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        const direction = distX < 0 ? 'left' : 'right'
        element.value?.dispatchEvent(new CustomEvent('swipe', { 
          detail: { direction, distance: Math.abs(distX) }
        }))
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        const direction = distY < 0 ? 'up' : 'down'
        element.value?.dispatchEvent(new CustomEvent('swipe', { 
          detail: { direction, distance: Math.abs(distY) }
        }))
      }
    }

    isTracking.value = false
  }

  onMounted(() => {
    if (element.value) {
      element.value.addEventListener('touchstart', handleTouchStart, { passive: true })
      element.value.addEventListener('touchend', handleTouchEnd, { passive: true })
    }
  })

  onUnmounted(() => {
    if (element.value) {
      element.value.removeEventListener('touchstart', handleTouchStart)
      element.value.removeEventListener('touchend', handleTouchEnd)
    }
  })

  return {
    isTracking
  }
}