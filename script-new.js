
// Hamburger menu toggle (pure JS)

function toggleMenu() {
	const nav = document.getElementById('main-nav');
	if (nav) {
		nav.classList.toggle('active');
		console.log('toggleMenu: nav.active =', nav.classList.contains('active'));
	} else {
		console.log('toggleMenu: nav not found');
	}
}

// Close menu after clicking a link

function closeMenu() {
	const nav = document.getElementById('main-nav');
	if (nav) nav.classList.remove('active');
}

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
	const navToggleLabel = document.querySelector('.nav-toggle-label');
	const nav = document.getElementById('main-nav');
	if (navToggleLabel && nav) {
		console.log('Hamburger and nav found, attaching event listeners');
		navToggleLabel.addEventListener('click', function(e) {
			console.log('Hamburger clicked');
			e.stopPropagation();
			toggleMenu();
			// Update aria-expanded for accessibility
			navToggleLabel.setAttribute('aria-expanded', nav.classList.contains('active'));
		});
		navToggleLabel.addEventListener('keydown', function(e) {
			if (e.key === 'Enter' || e.key === ' ') {
				console.log('Hamburger keydown');
				e.preventDefault();
				toggleMenu();
				navToggleLabel.setAttribute('aria-expanded', nav.classList.contains('active'));
			}
		});
	} else {
		console.log('Hamburger or nav not found:', navToggleLabel, nav);
	}
	// Close menu if clicking outside nav when open (mobile UX)
	document.addEventListener('click', function(e) {
		const nav = document.getElementById('main-nav');
		if (nav && nav.classList.contains('active') && !nav.contains(e.target) && !navToggleLabel.contains(e.target)) {
			closeMenu();
		}
	});
	// Add smooth scrolling and menu closing to navigation links
	const navLinks = document.querySelectorAll('nav a[href^="#"]');
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
				closeMenu();
			}
		});
	});
	// Initialize project filter functionality
	initializeProjectFilters();
	// Initialize form validation
	initializeFormValidation();
});

// Function to filter projects by category
function filterProjects(category) {
	const projectCards = document.querySelectorAll('.project-card');
    
	projectCards.forEach(card => {
		if (category === 'all' || card.dataset.category === category) {
			card.classList.add('visible');
			card.classList.remove('hidden');
		} else {
			card.classList.remove('visible');
			card.classList.add('hidden');
		}
	});
}

// Function to initialize filter button listeners
function initializeProjectFilters() {
	const filterButtons = document.querySelectorAll('.filter-btn');
    
	filterButtons.forEach(button => {
		button.addEventListener('click', function() {
			// Remove active class from all buttons
			filterButtons.forEach(btn => btn.classList.remove('active'));
            
			// Add active class to clicked button
			this.classList.add('active');
            
			// Filter projects by category
			const category = this.dataset.category;
			filterProjects(category);
		});
	});
    
	// Show all projects by default
	filterProjects('all');
    
	// Initialize lightbox functionality
	initializeLightbox();
}

// Function to open the lightbox
function openLightbox(imageSrc, caption) {
	const lightbox = document.getElementById('lightbox');
	const lightboxImage = document.querySelector('.lightbox-image');
	const lightboxCaption = document.querySelector('.lightbox-caption');
    
	lightboxImage.src = imageSrc;
	lightboxCaption.textContent = caption;
	lightbox.classList.add('active');
	document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close the lightbox
function closeLightbox() {
	const lightbox = document.getElementById('lightbox');
	lightbox.classList.remove('active');
	document.body.style.overflow = 'auto'; // Restore scrolling
}

// Function to initialize lightbox listeners
function initializeLightbox() {
	const projectImages = document.querySelectorAll('#projects img');
	const lightboxClose = document.querySelector('.lightbox-close');
	const lightbox = document.getElementById('lightbox');
    
	// Add click event to all project images
	projectImages.forEach(img => {
		img.addEventListener('click', function() {
			const src = this.src;
			const caption = this.alt;
			openLightbox(src, caption);
		});
        
		// Add cursor pointer to indicate clickability
		img.style.cursor = 'pointer';
	});
    
	// Close lightbox when clicking the X button
	if (lightboxClose) {
		lightboxClose.addEventListener('click', closeLightbox);
	}
    
	// Close lightbox when clicking outside the image
	lightbox.addEventListener('click', function(e) {
		if (e.target === lightbox) {
			closeLightbox();
		}
	});
    
	// Close lightbox on Escape key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			closeLightbox();
		}
	});
}

// Form Validation Functions

// Validate name field
function validateName(name) {
	const trimmedName = name.trim();
	if (trimmedName === '') {
		return { valid: false, message: 'Name is required' };
	}
	if (trimmedName.length < 2) {
		return { valid: false, message: 'Name must be at least 2 characters' };
	}
	if (trimmedName.length > 50) {
		return { valid: false, message: 'Name must not exceed 50 characters' };
	}
	return { valid: true, message: '' };
}

// Validate email field
function validateEmail(email) {
	const trimmedEmail = email.trim();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
	if (trimmedEmail === '') {
		return { valid: false, message: 'Email is required' };
	}
	if (!emailRegex.test(trimmedEmail)) {
		return { valid: false, message: 'Please enter a valid email address' };
	}
	return { valid: true, message: '' };
}

// Validate message field
function validateMessage(message) {
	const trimmedMessage = message.trim();
	if (trimmedMessage === '') {
		return { valid: false, message: 'Message is required' };
	}
	if (trimmedMessage.length < 10) {
		return { valid: false, message: 'Message must be at least 10 characters' };
	}
	if (trimmedMessage.length > 1000) {
		return { valid: false, message: 'Message must not exceed 1000 characters' };
	}
	return { valid: true, message: '' };
}

// Display error message for a field
function showError(fieldId, errorMessage) {
	const field = document.getElementById(fieldId);
	const errorElement = document.getElementById(fieldId + '-error');
    
	field.classList.add('error');
	if (errorElement) {
		errorElement.textContent = errorMessage;
		errorElement.style.display = 'block';
	}
}

// Clear error message for a field
function clearError(fieldId) {
	const field = document.getElementById(fieldId);
	const errorElement = document.getElementById(fieldId + '-error');
    
	field.classList.remove('error');
	if (errorElement) {
		errorElement.textContent = '';
		errorElement.style.display = 'none';
	}
}

// Display form feedback message
function showFormFeedback(message, type) {
	const feedbackElement = document.getElementById('form-feedback');
	feedbackElement.textContent = message;
	feedbackElement.className = 'form-feedback ' + type;
	feedbackElement.style.display = 'block';
}

// Clear form feedback message
function clearFormFeedback() {
	const feedbackElement = document.getElementById('form-feedback');
	feedbackElement.textContent = '';
	feedbackElement.className = 'form-feedback';
	feedbackElement.style.display = 'none';
}

// Initialize form validation
function initializeFormValidation() {
	const contactForm = document.getElementById('contact-form');
	const nameField = document.getElementById('name');
	const emailField = document.getElementById('email');
	const messageField = document.getElementById('message');
    
	// Real-time validation on blur
	nameField.addEventListener('blur', function() {
		const validation = validateName(this.value);
		if (!validation.valid) {
			showError('name', validation.message);
		} else {
			clearError('name');
		}
	});
    
	emailField.addEventListener('blur', function() {
		const validation = validateEmail(this.value);
		if (!validation.valid) {
			showError('email', validation.message);
		} else {
			clearError('email');
		}
	});
    
	messageField.addEventListener('blur', function() {
		const validation = validateMessage(this.value);
		if (!validation.valid) {
			showError('message', validation.message);
		} else {
			clearError('message');
		}
	});
    
	// Real-time validation on input for better UX
	nameField.addEventListener('input', function() {
		const validation = validateName(this.value);
		if (this.classList.contains('error') && validation.valid) {
			clearError('name');
		}
	});
    
	emailField.addEventListener('input', function() {
		const validation = validateEmail(this.value);
		if (this.classList.contains('error') && validation.valid) {
			clearError('email');
		}
	});
    
	messageField.addEventListener('input', function() {
		const validation = validateMessage(this.value);
		if (this.classList.contains('error') && validation.valid) {
			clearError('message');
		}
	});
    
	// Form submission
	contactForm.addEventListener('submit', function(e) {
		e.preventDefault();
        
		// Validate all fields
		const nameValidation = validateName(nameField.value);
		const emailValidation = validateEmail(emailField.value);
		const messageValidation = validateMessage(messageField.value);
        
		// Clear previous feedback
		clearFormFeedback();
        
		// Show errors if any
		if (!nameValidation.valid) {
			showError('name', nameValidation.message);
		} else {
			clearError('name');
		}
        
		if (!emailValidation.valid) {
			showError('email', emailValidation.message);
		} else {
			clearError('email');
		}
        
		if (!messageValidation.valid) {
			showError('message', messageValidation.message);
		} else {
			clearError('message');
		}
        
		// If all valid, submit the form
		if (nameValidation.valid && emailValidation.valid && messageValidation.valid) {
			showFormFeedback('Thank you! Your message has been sent successfully.', 'success');
            
			// Reset form after 2 seconds
			setTimeout(function() {
				contactForm.reset();
				clearFormFeedback();
			}, 2000);
		} else {
			showFormFeedback('Please fix the errors above before submitting.', 'error');
		}
	});
}
