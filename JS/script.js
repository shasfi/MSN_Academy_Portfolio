function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + "-icon");
    const button = content.previousElementSibling;
    document.querySelectorAll('.accordion-content.visible').forEach(item => {
        if (item.id !== id) {
            item.classList.remove('visible');
            item.previousElementSibling.querySelector('.accordion-icon').classList.remove('rotate-180');
        }
    });

    // Toggle current accordion
    content.classList.toggle("visible");
    if (icon) icon.classList.toggle("rotate-180");
    if (button) button.setAttribute('aria-expanded', content.classList.contains('visible'));
}

// Role-based image updates
function updateImageBasedOnRole() {
    const roleSelect = document.getElementById('role');
    const imageContainer = document.getElementById('role-image-container');
    const roleImage = document.getElementById('role-image');
    
    if (!roleSelect || !imageContainer || !roleImage) return;
    
    const roleImages = {
        'student': 'Images/student.png',
        'professional': 'Images/professional.png',
        'entrepreneur': 'Images/entrepreneur.png',
        'freelancer': 'Images/freelancer.png',
        'job-seeker': 'Images/job-seeker.png',
        'career-changer': 'Images/career-changer.png'
    };
    
    const selectedRole = roleSelect.value;
    if (selectedRole && roleImages[selectedRole]) {
        roleImage.src = roleImages[selectedRole];
        roleImage.alt = `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} illustration`;
        imageContainer.style.display = 'block';
        roleImage.style.opacity = '0';
        setTimeout(() => roleImage.style.opacity = '1', 50);
    } else {
        imageContainer.style.display = 'none';
    }
}

// Mobile navigation
const mobileNav = {
    toggle: document.querySelector('.msn-mobile-menu-toggle'),
    links: document.querySelector('.msn-nav-links'),
    icon: null,
    
    init() {
        this.icon = this.toggle?.querySelector('i');
        if (this.toggle && this.links) {
            this.toggle.addEventListener('click', this.handleToggle.bind(this));
            this.setupCloseEvents();
        }
    },
    
    handleToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        this.links.classList.toggle('mobile-active');
        this.updateIcon();
    },
    
    updateIcon() {
        if (!this.icon) return;
        const isActive = this.links.classList.contains('mobile-active');
        this.icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    },
    
    close() {
        this.links.classList.remove('mobile-active');
        this.updateIcon();
    },
    
    setupCloseEvents() {
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.toggle.contains(e.target) && 
                !this.links.contains(e.target) &&
                this.links.classList.contains('mobile-active')) {
                this.close();
            }
        });
        
        // Close on nav link click
        this.links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.links.classList.contains('mobile-active')) {
                    this.close();
                }
            });
        });
        
        // Close on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.links.classList.contains('mobile-active')) {
                this.close();
            }
        });
    }
};

// Certificate verification
const certificateVerifier = {
    async verify() {
        const certificateId = document.getElementById('certificate-id').value.trim();
        const elements = {
            result: document.getElementById('verification-result'),
            loading: document.getElementById('loading'),
            error: document.getElementById('error')
        };
        
        this.resetDisplay(elements);
        
        if (!certificateId) {
            this.showError('Please enter a certificate ID', elements.error);
            return;
        }
        
        elements.loading.style.display = 'block';
        
        try {
            const response = await fetch(`/api/certificates/${certificateId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            elements.loading.style.display = 'none';
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            data.valid ? this.displayResult(data, elements.result) : 
                        this.showError('Certificate not found or invalid', elements.error);
                        
        } catch (error) {
            elements.loading.style.display = 'none';
            const message = error.message.includes('fetch') ? 
                           'Network error. Please check your connection.' :
                           'An error occurred. Please try again.';
            this.showError(message, elements.error);
        }
    },
    
    resetDisplay(elements) {
        Object.values(elements).forEach(el => el.style.display = 'none');
    },
    
    showError(message, errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    },
    
    displayResult(data, resultElement) {
        resultElement.innerHTML = `
            <div class="certificate-info">
                <div class="certificate-header">
                    <i class="fas fa-certificate certificate-icon"></i>
                    <h3>Certificate Verified</h3>
                </div>
                <div class="certificate-details">
                    <p><strong>Student:</strong> ${data.studentName}</p>
                    <p><strong>Course:</strong> ${data.courseName}</p>
                    <p><strong>Issue Date:</strong> ${new Date(data.issueDate).toLocaleDateString()}</p>
                    <p><strong>ID:</strong> ${data.certificateId}</p>
                    ${data.grade ? `<p><strong>Grade:</strong> ${data.grade}</p>` : ''}
                </div>
            </div>
        `;
        resultElement.style.display = 'block';
    },
    
    reset() {
        document.getElementById('certificate-id').value = '';
        ['verification-result', 'error', 'loading'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
    }
};

// Contact modal
const contactModal = {
    modal: null,
    
    init() {
        this.modal = document.getElementById('contact-modal');
        if (this.modal) {
            window.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
        }
    },
    
    open() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },
    
    close() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
};

// Smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Global functions for HTML onclick handlers
function verifyCertificate() { certificateVerifier.verify(); }
function resetForm() { certificateVerifier.reset(); }
function openContactModal() { contactModal.open(); }
function closeContactModal() { contactModal.close(); }

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    mobileNav.init();
    contactModal.init();
    initSmoothScroll();
    updateImageBasedOnRole();
    
    const roleSelect = document.getElementById('role');
    if (roleSelect) {
        roleSelect.addEventListener('change', updateImageBasedOnRole);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Role-based image update functionality
    const roleSelect = document.getElementById('role');
    const heroImage = document.getElementById('hero-certificate-image');
    
    if (roleSelect && heroImage) {
        roleSelect.addEventListener('change', function() {
            const selectedRole = this.value;
            let imageSrc = '';
            
            if (selectedRole === 'student') {
                imageSrc = 'Certificates Designs/Student Course Completion Certificate.png';
            } else if (selectedRole === 'interns') {
                imageSrc = 'Certificates Designs/Intern Certificate.png';
            } else if (selectedRole === 'Achievement') {
                imageSrc = 'Certificates Designs/MSN Competition Certificate for app and web.png';
            } else {
                imageSrc = 'Certificates Designs/Student Course Completion Certificate.png';
            }
            
            heroImage.src = imageSrc;
        });
    }
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.msn-mobile-menu-toggle');
    const navLinks = document.querySelector('.msn-nav-links');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle menu
            navLinks.classList.toggle('mobile-active');
            
            // Toggle icon
            if (menuIcon) {
                if (navLinks.classList.contains('mobile-active')) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu when clicking on nav links
    const navLinkItems = document.querySelectorAll('.msn-nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (menuToggle && navLinks && 
            !menuToggle.contains(event.target) && 
            !navLinks.contains(event.target) &&
            navLinks.classList.contains('mobile-active')) {
            
            navLinks.classList.remove('mobile-active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
});

// Certificate verification functionality
function initCertificateVerification() {
    const form = document.getElementById('verification-form');
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const certificateDisplay = document.getElementById('certificate-display');
    const stepsSection = document.getElementById('steps-section');
    const modal = document.getElementById('message-modal');
    const closeModal = document.getElementById('close-modal');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const role = document.getElementById('role').value;
            const certificateCode = document.getElementById('certificate-code').value;
            
            if (!role || !certificateCode.trim()) {
                showError('Please select your role and enter a certificate code.');
                return;
            }
            
            await verifyCertificate(certificateCode.trim(), role);
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
}

// API call to verify certificate
async function verifyCertificate(code, role) {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const certificateDisplay = document.getElementById('certificate-display');
    const stepsSection = document.getElementById('steps-section');
    const form = document.getElementById('verification-form');
    
    // Show loading state
    showLoading();
    
    try {
        const response = await fetch(`https://msn-certificate-application.vercel.app/api/certificate/getbycode/${code}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const certificateData = await response.json();
            displayCertificate(certificateData, role);
        } else if (response.status === 404) {
            showError('Certificate not found. Please check your certificate code and try again.');
        } else if (response.status === 500) {
            showError('Server error occurred. Please try again later or contact support.');
        } else {
            showError('An error occurred while verifying the certificate. Please try again.');
        }
    } catch (error) {
        console.error('Certificate verification error:', error);
        showError('Network error. Please check your internet connection and try again.');
    }
}

// Show loading state
function showLoading() {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const certificateDisplay = document.getElementById('certificate-display');
    const stepsSection = document.getElementById('steps-section');
    const form = document.getElementById('verification-form');
    
    form.style.display = 'none';
    errorState.style.display = 'none';
    certificateDisplay.style.display = 'none';
    stepsSection.style.display = 'none';
    loadingState.style.display = 'block';
}

// Show error state
function showError(message) {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const certificateDisplay = document.getElementById('certificate-display');
    const stepsSection = document.getElementById('steps-section');
    const form = document.getElementById('verification-form');
    const errorMessage = document.getElementById('error-message');
    
    loadingState.style.display = 'none';
    form.style.display = 'none';
    certificateDisplay.style.display = 'none';
    stepsSection.style.display = 'none';
    
    errorMessage.textContent = message;
    errorState.style.display = 'block';
}

// Display certificate details
function displayCertificate(certificateData, role) {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const certificateDisplay = document.getElementById('certificate-display');
    const stepsSection = document.getElementById('steps-section');
    const form = document.getElementById('verification-form');
    const certificateDetails = document.getElementById('certificate-details');
    const heroImage = document.getElementById('hero-certificate-image');
    const certificateBadge = document.getElementById('certificate-badge');
    const verifiedCertificateImage = document.getElementById('verified-certificate-image');
    
    // Hide other states
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    form.style.display = 'none';
    stepsSection.style.display = 'none';
    
    // Determine certificate image based on role
    let certificateImageSrc = '';
    if (role === 'student') {
        certificateImageSrc = 'Certificates Designs/Student Course Completion Certificate Example.png';
    } else if (role === 'interns') {
        certificateImageSrc = 'Certificates Designs/Internship Completion Example.png';
    } else if (role === 'Achievement') {
        certificateImageSrc = 'Certificates Designs/MSN Competition Certificate example for app and web.png';
    }
    
    // Update hero section image
    if (heroImage) {
        heroImage.src = certificateImageSrc;
        heroImage.alt = 'Verified Certificate';
        if (certificateBadge) {
            certificateBadge.style.display = 'block';
        }
    }
    
    // Update verified certificate image in details section
    if (verifiedCertificateImage) {
        verifiedCertificateImage.src = certificateImageSrc;
        verifiedCertificateImage.alt = 'Verified Certificate';
    }
    
    certificateDisplay.style.display = 'block';
    
    // Scroll to certificate display
    certificateDisplay.scrollIntoView({ behavior: 'smooth' });
}

// Reset form to initial state
function resetForm() {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const certificateDisplay = document.getElementById('certificate-display');
    const stepsSection = document.getElementById('steps-section');
    const form = document.getElementById('verification-form');
    const heroImage = document.getElementById('hero-certificate-image');
    const certificateBadge = document.getElementById('certificate-badge');
    
    // Hide all states except form and steps
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    certificateDisplay.style.display = 'none';
    
    // Show form and steps
    form.style.display = 'block';
    stepsSection.style.display = 'block';
    
    // Reset hero image to default
    if (heroImage) {
        heroImage.src = 'Certificates Designs/Student Course Completion Certificate.png';
        heroImage.alt = 'MSN Academy certificate sample';
    }
    if (certificateBadge) {
        certificateBadge.style.display = 'none';
    }
    
    // Reset form fields
    document.getElementById('role').value = '';
    document.getElementById('certificate-code').value = '';
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}


// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('message-modal');
    const closeModal = document.getElementById('close-modal');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = { 
        root: null, 
        rootMargin: '0px', 
        threshold: 0.2 
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.msn-card, .course-card, .trainer-card, .team-member, .animate-fadeIn');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initCertificateVerification();
    initContactForm();
    initScrollAnimations();
    
    // Add verify now button functionality
    const verifyNowBtn = document.querySelector('.verify-now-btn');
    if (verifyNowBtn) {
        verifyNowBtn.addEventListener('click', function() {
            const form = document.getElementById('verification-form');
            if (form) {
                form.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('certificate-code').focus();
            }
        });
    }
});
