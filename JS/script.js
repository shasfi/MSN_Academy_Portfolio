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

// Enhanced Mobile Navigation System
class MobileNavigation {
    constructor() {
        this.toggle = null;
        this.links = null;
        this.icon = null;
        this.isInitialized = false;
        this.isActive = false;
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initElements());
        } else {
            this.initElements();
        }
    }
    
    initElements() {
        this.toggle = document.querySelector('.msn-mobile-menu-toggle');
        this.links = document.querySelector('.msn-nav-links');
        this.icon = this.toggle?.querySelector('i');
        
        if (this.toggle && this.links && this.icon) {
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('Mobile navigation initialized successfully');
        } else {
            console.warn('Mobile navigation elements not found - retrying in 100ms');
            setTimeout(() => this.initElements(), 100);
        }
    }
    
    setupEventListeners() {
        // Toggle button click
        this.toggle.addEventListener('click', (e) => this.handleToggle(e));
        
        // Close on nav link clicks
        this.links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Close on outside clicks
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Close on window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    handleToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.isActive = !this.isActive;
        
        // Add active class to toggle button
        this.toggle.classList.toggle('active', this.isActive);
        
        if (this.isActive) {
            this.open();
        } else {
            this.close();
        }
    }
    
    open() {
        this.links.classList.add('mobile-active');
        this.toggle.classList.add('active');
        this.icon.classList.remove('fa-bars');
        this.icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
        console.log('Mobile menu opened');
    }
    
    close() {
        this.isActive = false;
        this.links.classList.remove('mobile-active');
        this.toggle.classList.remove('active');
        this.icon.classList.remove('fa-times');
        this.icon.classList.add('fa-bars');
        document.body.style.overflow = '';
        console.log('Mobile menu closed');
    }
    
    updateIcon(isActive) {
        if (!this.icon) return;
        
        this.icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    }
    
    
    handleOutsideClick(e) {
        if (!this.isActive || !this.toggle || !this.links) return;
        
        // Only close if clicking outside both toggle and nav links
        if (!this.toggle.contains(e.target) && !this.links.contains(e.target)) {
            this.close();
        }
    }
    
    handleResize() {
        if (window.innerWidth > 768 && this.isActive) {
            this.close();
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'Escape' && this.isActive) {
            this.close();
        }
    }
}

// Create global instance
const mobileNav = new MobileNavigation();

// Simple mobile navigation fallback
function initSimpleMobileNav() {
    console.log('Attempting to initialize mobile nav...');
    
    // Wait a bit for DOM to be ready
    setTimeout(() => {
        const toggle = document.querySelector('.msn-mobile-menu-toggle');
        const navLinks = document.querySelector('.msn-nav-links');
        
        console.log('Toggle found:', !!toggle);
        console.log('NavLinks found:', !!navLinks);
        
        if (!toggle || !navLinks) {
            console.error('Mobile nav elements not found!');
            return;
        }
        
        console.log('Adding click listener to toggle...');
        
        // Remove any existing listeners
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        newToggle.addEventListener('click', function(e) {
            console.log('Toggle clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navLinks.classList.contains('mobile-active');
            const icon = newToggle.querySelector('i');
            
            console.log('Current state - isActive:', isActive);
            
            if (isActive) {
                navLinks.classList.remove('mobile-active');
                newToggle.classList.remove('active');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
                console.log('Menu CLOSED');
            } else {
                navLinks.classList.add('mobile-active');
                newToggle.classList.add('active');
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
                document.body.style.overflow = 'hidden';
                console.log('Menu OPENED');
            }
        });
        
        // Close on nav link clicks
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked - closing menu');
                navLinks.classList.remove('mobile-active');
                newToggle.classList.remove('active');
                const icon = newToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            });
        });
        
        console.log('Mobile nav setup complete!');
    }, 100);
}

// Contact Modal System
class ContactModal {
    constructor() {
        this.modal = null;
        this.openBtn = null;
        this.closeBtn = null;
        this.overlay = null;
    }
    
    init() {
        this.modal = document.getElementById('contact-modal');
        this.openBtn = document.getElementById('contact-btn');
        this.closeBtn = document.querySelector('.close-modal');
        this.overlay = document.querySelector('.modal-overlay');
        
        if (this.modal && this.openBtn) {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        this.openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Create global instances
const contactModalInstance = new ContactModal();

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
                           'Network error. Please check your connection.' : 'An error occurred. Please try again.';
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
const contactModalSimple = {
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
            document.body.style.overflow = '';
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
function openContactModal() { contactModalSimple.open(); }
function closeContactModal() { contactModalSimple.close(); }

// Initialize on DOM load - Enhanced for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation with retry mechanism
    mobileNav.init();
    
    // Initialize other components
    contactModalSimple.init();
    initSmoothScroll();
    updateImageBasedOnRole();
    
    const roleSelect = document.getElementById('role');
    if (roleSelect) {
        roleSelect.addEventListener('change', updateImageBasedOnRole);
    }
    
    // Ensure mobile navigation works on all pages
    setTimeout(() => {
        if (!mobileNav.isInitialized) {
            console.log('Retrying mobile navigation initialization...');
            mobileNav.init();
        }
    }, 500);
    
    // Debug log
    console.log('All components initialized');
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
    
    // Initialize mobile navigation (handled by mobileNav object above)
    // This section is now handled by the enhanced mobileNav object
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
    
    // Determine certificate image based on role or certificate type from API
    let certificateImageSrc = '';
    
    // Check if API provides certificate image URL
    if (certificateData.certificateImageUrl) {
        certificateImageSrc = certificateData.certificateImageUrl;
    } else {
        // Fallback to role-based images
        if (role === 'student') {
            certificateImageSrc = 'Certificates Designs/Student Course Completion Certificate Example.png';
        } else if (role === 'interns') {
            certificateImageSrc = 'Certificates Designs/Internship Completion Example.png';
        } else if (role === 'Achievement') {
            certificateImageSrc = 'Certificates Designs/MSN Competition Certificate example for app and web.png';
        }
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
    
    // Display certificate information from API
    if (certificateDetails) {
        certificateDetails.innerHTML = `
            <div class="certificate-image-container">
                <img id="verified-certificate-image" class="verified-certificate" src="${certificateImageSrc}" alt="Verified Certificate" style="width: 100%; max-width: 800px; height: auto;"/>
            </div>
            <div class="certificate-info-section">
                <div class="certificate-data">
                    <h4>Certificate Information:</h4>
                    <div class="certificate-data-grid">
                        ${certificateData.studentName ? `<div class="data-item"><strong>Student Name:</strong> ${certificateData.studentName}</div>` : ''}
                        ${certificateData.courseName ? `<div class="data-item"><strong>Course:</strong> ${certificateData.courseName}</div>` : ''}
                        ${certificateData.certificateId ? `<div class="data-item"><strong>Certificate ID:</strong> ${certificateData.certificateId}</div>` : ''}
                        ${certificateData.issueDate ? `<div class="data-item"><strong>Issue Date:</strong> ${new Date(certificateData.issueDate).toLocaleDateString()}</div>` : ''}
                        ${certificateData.completionDate ? `<div class="data-item"><strong>Completion Date:</strong> ${new Date(certificateData.completionDate).toLocaleDateString()}</div>` : ''}
                        ${certificateData.grade ? `<div class="data-item"><strong>Grade:</strong> ${certificateData.grade}</div>` : ''}
                        ${certificateData.instructor ? `<div class="data-item"><strong>Instructor:</strong> ${certificateData.instructor}</div>` : ''}
                        ${certificateData.duration ? `<div class="data-item"><strong>Duration:</strong> ${certificateData.duration}</div>` : ''}
                        ${certificateData.skills ? `<div class="data-item"><strong>Skills Covered:</strong> ${Array.isArray(certificateData.skills) ? certificateData.skills.join(', ') : certificateData.skills}</div>` : ''}
                        ${certificateData.status ? `<div class="data-item"><strong>Status:</strong> <span class="status-badge ${certificateData.status.toLowerCase()}">${certificateData.status}</span></div>` : ''}
                    </div>
                </div>
            </div>
        `;
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

// Simplified Mobile Navigation - WORKING VERSION
function initMobileNavigation() {
    const toggle = document.querySelector('.msn-mobile-menu-toggle');
    const navLinks = document.querySelector('.msn-nav-links');
    
    if (!toggle || !navLinks) {
        console.log('Mobile nav elements not found');
        return;
    }
    
    console.log('Mobile nav elements found - setting up...');
    
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navLinks.classList.contains('mobile-active');
        const icon = toggle.querySelector('i');
        
        if (isActive) {
            // Close menu
            navLinks.classList.remove('mobile-active');
            toggle.classList.remove('active', 'menu-open');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        } else {
            // Open menu
            navLinks.classList.add('mobile-active');
            toggle.classList.add('active', 'menu-open');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            toggle.classList.remove('active', 'menu-open');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                toggle.classList.remove('active', 'menu-open');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        }
    });
    
    console.log('Mobile navigation initialized successfully!');
}

// Initialize all functionality - Consolidated initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize other components
    contactModalSimple.init();
    initSmoothScroll();
    updateImageBasedOnRole();
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
