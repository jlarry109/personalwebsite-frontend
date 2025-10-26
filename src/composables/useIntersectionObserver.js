import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(options = {}) {
  const isVisible = ref(false)
  const targetRef = ref(null)
  let observer = null

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }

  onMounted(() => {
    if (targetRef.value) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible.value = entry.isIntersecting
        },
        defaultOptions
      )
      observer.observe(targetRef.value)
    }
  })

  onUnmounted(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
    }
  })

  return {
    isVisible,
    targetRef
  }
}

export function useStaggeredAnimation(elements, delay = 100) {
  const animatedElements = ref([])
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(elements.value).indexOf(entry.target)
            setTimeout(() => {
              entry.target.classList.add('animate-in')
              animatedElements.value.push(entry.target)
            }, index * delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (elements.value) {
      elements.value.forEach(el => {
        if (el) observer.observe(el)
      })
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    animatedElements
  }
}