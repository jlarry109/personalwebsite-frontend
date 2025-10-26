// Magnetic hover effect directive
export default {
  mounted(el, binding) {
    const strength = binding.value || 0.3;
    
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      el.style.setProperty('--mouse-x', `${deltaX}px`);
      el.style.setProperty('--mouse-y', `${deltaY}px`);
    };
    
    const handleMouseLeave = () => {
      el.style.setProperty('--mouse-x', '0px');
      el.style.setProperty('--mouse-y', '0px');
    };
    
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    
    // Store handlers for cleanup
    el._magneticHandlers = { handleMouseMove, handleMouseLeave };
  },
  
  unmounted(el) {
    if (el._magneticHandlers) {
      el.removeEventListener('mousemove', el._magneticHandlers.handleMouseMove);
      el.removeEventListener('mouseleave', el._magneticHandlers.handleMouseLeave);
      delete el._magneticHandlers;
    }
  }
};