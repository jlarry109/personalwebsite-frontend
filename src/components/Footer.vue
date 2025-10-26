<template>
  <footer id="footer">
    <section class="form-section">
      <div class="form-container">
        <h2 class="form-title">Get In Touch</h2>
        <form @submit.prevent="submitForm" class="contact-form" :class="{ submitting: isSubmitting }">
          <div class="fields">
            <div class="field-group">
              <div class="floating-field" :class="{ focused: focusedField === 'name' || form.name, error: errors.name }">
                <input 
                  type="text" 
                  v-model="form.name" 
                  id="name" 
                  @focus="focusedField = 'name'" 
                  @blur="focusedField = null"
                  @input="validateField('name')"
                  :class="{ invalid: errors.name }"
                />
                <label for="name">Name</label>
                <div class="field-line"></div>
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
            </div>
            
            <div class="field-group">
              <div class="floating-field" :class="{ focused: focusedField === 'email' || form.email, error: errors.email }">
                <input 
                  type="email" 
                  v-model="form.email" 
                  id="email" 
                  @focus="focusedField = 'email'" 
                  @blur="focusedField = null"
                  @input="validateField('email')"
                  :class="{ invalid: errors.email }"
                />
                <label for="email">Email</label>
                <div class="field-line"></div>
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
            </div>
            
            <div class="field-group full-width">
              <div class="floating-field" :class="{ focused: focusedField === 'message' || form.message, error: errors.message }">
                <textarea 
                  v-model="form.message" 
                  id="message" 
                  rows="4"
                  @focus="focusedField = 'message'" 
                  @blur="focusedField = null"
                  @input="validateField('message')"
                  :class="{ invalid: errors.message }"
                ></textarea>
                <label for="message">Message</label>
                <div class="field-line"></div>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="submit-btn btn-press btn-ripple" :disabled="isSubmitting || !isFormValid">
              <div class="btn-content">
                <div v-if="isSubmitting" class="spinner"></div>
                <i v-else-if="messageSent" class="fas fa-check"></i>
                <i v-else class="fas fa-envelope"></i>
                <span>{{ buttonText }}</span>
              </div>
            </button>
          </div>

          <!-- Status Messages -->
          <transition name="message-fade">
            <div v-if="messageSent" class="status-message success">
              <i class="fas fa-check-circle"></i>
              <span>Message sent successfully!</span>
            </div>
          </transition>
          
          <transition name="message-fade">
            <div v-if="errorMessage" class="status-message error">
              <i class="fas fa-exclamation-circle"></i>
              <span>{{ errorMessage }}</span>
            </div>
          </transition>
        </form>
      </div>
    </section>

    <section class="contact-info">
      <div class="contact-grid">
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="contact-details">
            <h3>Address</h3>
            <p>1234 Somewhere Road #87257<br />Nashville, TN 00000-0000</p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-phone"></i>
          </div>
          <div class="contact-details">
            <h3>Phone</h3>
            <p><a href="tel:+1234567890">(123) 456-7890</a></p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="contact-details">
            <h3>Email</h3>
            <p><a href="mailto:info@joneslarry.com">info@joneslarry.com</a></p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-share-alt"></i>
          </div>
          <div class="contact-details">
            <h3>Social</h3>
            <div class="social-icons">
              <a href="#" class="social-icon twitter btn-bounce" title="Twitter">
                <i class="fab fa-twitter icon-bounce"></i>
              </a>
              <a href="#" class="social-icon linkedin btn-bounce" title="LinkedIn">
                <i class="fab fa-linkedin-in icon-glow"></i>
              </a>
              <a href="#" class="social-icon github btn-bounce" title="GitHub">
                <i class="fab fa-github icon-rotate"></i>
              </a>
              <a href="#" class="social-icon instagram btn-bounce" title="Instagram">
                <i class="fab fa-instagram icon-pulse"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
import emailjs from "@emailjs/browser";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      errors: {
        name: null,
        email: null,
        message: null,
      },
      focusedField: null,
      messageSent: false,
      errorMessage: "",
      isSubmitting: false,
    };
  },
  computed: {
    isFormValid() {
      return this.form.name && 
             this.form.email && 
             this.form.message && 
             !this.errors.name && 
             !this.errors.email && 
             !this.errors.message;
    },
    buttonText() {
      if (this.isSubmitting) return 'Sending...';
      if (this.messageSent) return 'Sent!';
      return 'Send Message';
    }
  },
  methods: {
    validateField(field) {
      this.errors[field] = null;
      
      switch (field) {
        case 'name':
          if (!this.form.name.trim()) {
            this.errors.name = 'Name is required';
          } else if (this.form.name.trim().length < 2) {
            this.errors.name = 'Name must be at least 2 characters';
          }
          break;
          
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!this.form.email.trim()) {
            this.errors.email = 'Email is required';
          } else if (!emailRegex.test(this.form.email)) {
            this.errors.email = 'Please enter a valid email address';
          }
          break;
          
        case 'message':
          if (!this.form.message.trim()) {
            this.errors.message = 'Message is required';
          } else if (this.form.message.trim().length < 10) {
            this.errors.message = 'Message must be at least 10 characters';
          }
          break;
      }
    },
    
    validateForm() {
      this.validateField('name');
      this.validateField('email');
      this.validateField('message');
    },
    
    async submitForm() {
      this.validateForm();
      
      if (!this.isFormValid) {
        return;
      }
      
      this.isSubmitting = true;
      this.messageSent = false;
      this.errorMessage = "";
      
      try {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceID || !templateID || !publicKey) {
          throw new Error("EmailJS environment variables are missing.");
        }

        await emailjs.send(serviceID, templateID, this.form, publicKey);
        
        this.messageSent = true;
        this.form = { name: "", email: "", message: "" };
        this.errors = { name: null, email: null, message: null };
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.messageSent = false;
        }, 5000);
        
      } catch (error) {
        console.error("EmailJS Error:", error);
        this.errorMessage = "Failed to send message. Please try again.";
        
        // Reset error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
#footer {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: #e2e8f0;
  padding: 3rem 1rem 2rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

#footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

/* Form Section */
.form-section {
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.contact-form:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.field-group.full-width {
  grid-column: 1 / -1;
}

/* Floating Labels */
.floating-field {
  position: relative;
  margin-bottom: 1rem;
}

.floating-field input,
.floating-field textarea {
  width: 100%;
  padding: 1rem 0 0.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: vertical;
}

.floating-field input:focus,
.floating-field textarea:focus {
  outline: none;
  border-bottom-color: #60a5fa;
}

.floating-field input.invalid,
.floating-field textarea.invalid {
  border-bottom-color: #ef4444;
}

.floating-field label {
  position: absolute;
  left: 0;
  top: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  transform-origin: left;
}

.floating-field.focused label,
.floating-field.error label {
  top: 0;
  font-size: 0.75rem;
  color: #60a5fa;
  transform: translateY(-0.5rem);
}

.floating-field.error label {
  color: #ef4444;
}

.field-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  transition: width 0.3s ease;
}

.floating-field.focused .field-line {
  width: 100%;
}

.floating-field.error .field-line {
  background: #ef4444;
  width: 100%;
}

.error-message {
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  color: #ef4444;
  font-size: 0.75rem;
  opacity: 0;
  transform: translateY(-10px);
  animation: errorSlideIn 0.3s ease forwards;
}

@keyframes errorSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Submit Button */
.form-actions {
  text-align: center;
  margin-bottom: 1rem;
}

.submit-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-width: 160px;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Status Messages */
.status-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 500;
  margin-top: 1rem;
}

.status-message.success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Contact Info Section */
.contact-info {
  position: relative;
  z-index: 1;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 90vw;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 1200px) {
  .contact-grid {
    max-width: 800px;
  }
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  flex-shrink: 0;
}

.contact-details {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.contact-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #f1f5f9;
}

.contact-details p {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.contact-details a {
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.3s ease;
  word-break: break-all;
  display: inline-block;
  max-width: 100%;
}

.contact-details a:hover {
  color: #93c5fd;
  text-decoration: underline;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.social-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-icon:hover::before {
  opacity: 0.1;
}

.social-icon.twitter {
  background: #1da1f2;
  color: white;
}

.social-icon.twitter:hover {
  background: #0d8bd9;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 10px 20px rgba(29, 161, 242, 0.3);
}

.social-icon.linkedin {
  background: #0077b5;
  color: white;
}

.social-icon.linkedin:hover {
  background: #005885;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 119, 181, 0.3);
}

.social-icon.github {
  background: #333;
  color: white;
}

.social-icon.github:hover {
  background: #24292e;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 10px 20px rgba(51, 51, 51, 0.3);
}

.social-icon.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

.social-icon.instagram:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 10px 20px rgba(225, 48, 108, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  #footer {
    padding: 2rem 1rem;
  }
  
  .form-title {
    font-size: 2rem;
  }
  
  .fields {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .contact-item {
    min-height: auto;
  }
  
  .contact-item {
    padding: 1rem;
  }
}

/* Dark mode adjustments */
.dark #footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}
</style>