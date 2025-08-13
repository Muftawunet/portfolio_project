// Toggle mobile menu
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("show");
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]');
  
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if it's open
        const nav = document.getElementById("nav-links");
        if (nav.classList.contains("show")) {
          nav.classList.remove("show");
        }
        
        // Scroll to the element
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Add animation to skills
  const skills = document.querySelectorAll('.skills span');
  let delay = 0;
  
  skills.forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      skill.style.opacity = '1';
      skill.style.transform = 'translateY(0)';
    }, delay);
    
    delay += 100;
  });
  
  // Add animation to project cards
  const cards = document.querySelectorAll('.card');
  
  // Create intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });
  
  // Add CSS for the animation
  const style = document.createElement('style');
  style.textContent = `
    .card.animate {
      animation: fadeInUp 0.6s forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links li a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});