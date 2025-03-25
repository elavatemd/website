// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    if(this.getAttribute('href') === '#') return;
    
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if(window.scrollY > 100) {
    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    header.style.padding = '10px 0';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    header.style.padding = '20px 0';
  }
});

// Animate About Section on Scroll
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.about-content').classList.add('animate-slide-in');
      entry.target.querySelector('.about-image').classList.add('animate-fade-in');
    }
  });
}, {threshold: 0.2});

aboutObserver.observe(aboutSection);

// Animated Counter for Stats
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Start counters when hero section is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateValue("client-count", 0, 150, 2000);
      animateValue("growth-percent", 0, 237, 2000);
      animateValue("platforms-count", 0, 8, 2000);
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.5});

observer.observe(document.querySelector('.hero'));

// Testimonial Slider
const testimonials = [
  {
    content: "GrowthSocial transformed our social media presence. We went from 500 to 15,000 followers in 6 months and our leads have tripled!",
    author: "Sarah Johnson",
    role: "CEO, Bloom Cosmetics"
  },
  {
    content: "Their ad strategy generated $50k in sales in our first month working together. Worth every penny!",
    author: "Michael Chen",
    role: "Founder, TechGadgets"
  },
  {
    content: "Finally a social media agency that actually understands our business and delivers measurable results.",
    author: "Jessica Williams",
    role: "Marketing Director, UrbanEats"
  }
];

let currentTestimonial = 0;
const testimonialEl = document.querySelector('.testimonial');
const dotsContainer = document.querySelector('.testimonial-nav');

// Create dots for testimonial navigation
testimonials.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('testimonial-dot');
  if(index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    updateTestimonial();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.testimonial-dot');

function updateTestimonial() {
  const testimonial = testimonials[currentTestimonial];
  
  testimonialEl.innerHTML = `
    <div class="testimonial-content">${testimonial.content}</div>
    <div class="testimonial-author">${testimonial.author}</div>
    <div class="testimonial-role">${testimonial.role}</div>
  `;
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentTestimonial);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial();
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause on hover
testimonialEl.addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

testimonialEl.addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Contact Modal Functionality
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Open modal
contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  contactModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

// Close modal
closeModal.addEventListener('click', () => {
  contactModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close when clicking outside modal
window.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Form Submission
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]');
    const message = contactForm.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Simple validation
    if(!name.value.trim()) {
      name.classList.add('error');
      isValid = false;
    } else {
      name.classList.remove('error');
    }
    
    if(!message.value.trim()) {
      message.classList.add('error');
      isValid = false;
    } else {
      message.classList.remove('error');
    }
    
    if(isValid) {
      // Show success message
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      
      // Reset form after 3 seconds
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 3000);
    }
  });
}

// Animation on Scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if(elementPosition < windowHeight - 100) {
      element.classList.add('animate');
    }
  });
};

// Initialize animations
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);