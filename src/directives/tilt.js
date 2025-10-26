// 3D tilt effect directive
export default {
  mounted(el, binding) {
    const maxTilt = binding.value || 15;
    
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const tiltX = deltaY * maxTilt;
      const tiltY = -deltaX * maxTilt;
      
      el.style.setProperty('--tilt-x', `${tiltX}deg`);
      el.style.setProperty('--tilt-y', `${tiltY}deg`);
    };
    
    const handleMouseLeave = () => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    };
    
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    
    // Store handlers for cleanup
    el._tiltHandlers = { handleMouseMove, handleMouseLeave };
  },
  
  unmounted(el) {
    if (el._tiltHandlers) {
      el.removeEventListener('mousemove', el._tiltHandlers.handleMouseMove);
      el.removeEventListener('mouseleave', el._tiltHandlers.handleMouseLeave);
      delete el._tiltHandlers;
    }
  }
};