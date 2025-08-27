// MSN Academy Portfolio - Optimized JavaScript
// All duplicate code removed and logos properly displayed

// Accordion functionality
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

    content.classList.toggle("visible");
    if (icon) icon.classList.toggle("rotate-180");
    if (button) button.setAttribute('aria-expanded', content.classList.contains('visible'));
}

// Role-based image updates
function updateImageBasedOnRole() {
    const roleSelect = document.getElementById('role');
    const imageContainer = document.getElementById('role-image-container');
    const roleImage = document.getElementById('role-image');
    const heroImage = document.getElementById('hero-certificate-image');
    
    if (!roleSelect) return;
    
    const selectedRole = roleSelect.value;
    
    // Update role images if elements exist
    if (imageContainer && roleImage) {
        const roleImages = {
            'student': 'Images/student.png',
            'professional': 'Images/professional.png',
            'entrepreneur': 'Images/entrepreneur.png',
            'freelancer': 'Images/freelancer.png',
            'job-seeker': 'Images/job-seeker.png',
            'career-changer': 'Images/career-changer.png'
        };
        
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
    
    // Update hero certificate image if element exists
    if (heroImage) {
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
    }
}

// Mobile Navigation System - Single Implementation
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
        } else {
            setTimeout(() => this.initElements(), 100);
        }
    }
    
    setupEventListeners() {
        this.toggle.addEventListener('click', (e) => this.handleToggle(e));
        
        this.links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    handleToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.isActive = !this.isActive;
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
    }
    
    close() {
        this.isActive = false;
        this.links.classList.remove('mobile-active');
        this.toggle.classList.remove('active');
        this.icon.classList.remove('fa-times');
        this.icon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
    
    handleOutsideClick(e) {
        if (!this.isActive || !this.toggle || !this.links) return;
        
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

// Contact Modal System - Single Implementation
class ContactModal {
    constructor() {
        this.modal = null;
    }
    
    init() {
        this.modal = document.getElementById('contact-modal');
        if (this.modal) {
            window.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
        }
    }
    
    open() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    close() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
}

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

// Global instances
const mobileNav = new MobileNavigation();
const contactModal = new ContactModal();

// Global functions for HTML onclick handlers
function openContactModal() { contactModal.open(); }
function closeContactModal() { contactModal.close(); }


// Certificate verification functionality - Unified Implementation
function initCertificateVerification() {
    const form = document.getElementById('verification-form');
    const closeModal = document.getElementById('close-modal');
    const modal = document.getElementById('message-modal');

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
    
    // Initialize course-specific forms
    initCoursePageCertificateVerification();
}

// Unified API call to verify certificate
async function verifyCertificate(code, selectedRole) {
    showLoading();
    
    console.log('Verifying certificate with code:', code);
    
    try {
        const apiUrl = `https://msn-certificate-application.vercel.app/api/certificate/getbycode/${encodeURIComponent(code)}`;
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
            const certificateData = await response.json();
            console.log('Certificate data received:', certificateData);
            
            // Check if the certificate data is valid
            if (certificateData && (certificateData.recipient_name || certificateData.student_name)) {
                // Validate that selected role matches certificate role
                if (certificateData.role === selectedRole) {
                    displayCertificate(certificateData);
                } else {
                    showError(`Certificate role mismatch. This certificate is for ${certificateData.role}, but you selected ${selectedRole}. Please select the correct role.`);
                }
            } else {
                console.log('Invalid certificate data structure:', certificateData);
                showError('Certificate data is invalid. Please contact support.');
            }
        } else {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            
            if (response.status === 404) {
                showError('Certificate not found. Please check your certificate code and try again.');
            } else if (response.status === 500) {
                showError('Server error occurred. Please try again later or contact support.');
            } else if (response.status === 0) {
                showError('Network error. Please check your internet connection or try again later.');
            } else {
                showError(`An error occurred while verifying the certificate. Status: ${response.status}. Please try again or contact support.`);
            }
        }
    } catch (error) {
        console.error('Certificate verification error:', error);
        showError('Network error. Please check your internet connection and try again.');
    }
}

// Show loading state
function showLoading() {
    const elements = {
        loadingState: document.getElementById('loading-state'),
        errorState: document.getElementById('error-state'),
        certificateDisplay: document.getElementById('certificate-display'),
        stepsSection: document.getElementById('steps-section'),
        form: document.getElementById('verification-form')
    };
    
    Object.values(elements).forEach(el => {
        if (el) el.style.display = 'none';
    });
    
    if (elements.loadingState) elements.loadingState.style.display = 'block';
}

// Show error state
function showError(message) {
    const elements = {
        loadingState: document.getElementById('loading-state'),
        errorState: document.getElementById('error-state'),
        certificateDisplay: document.getElementById('certificate-display'),
        stepsSection: document.getElementById('steps-section'),
        form: document.getElementById('verification-form'),
        errorMessage: document.getElementById('error-message')
    };
    
    Object.values(elements).forEach(el => {
        if (el && el.id !== 'error-state') el.style.display = 'none';
    });
    
    if (elements.errorMessage) elements.errorMessage.textContent = message;
    if (elements.errorState) elements.errorState.style.display = 'block';
}

// Display certificate details - Unified with proper logo display
function displayCertificate(certificateData) {
    const elements = {
        loadingState: document.getElementById('loading-state'),
        errorState: document.getElementById('error-state'),
        certificateDisplay: document.getElementById('certificate-display'),
        stepsSection: document.getElementById('steps-section'),
        form: document.getElementById('verification-form'),
        certificateDetails: document.getElementById('certificate-details'),
        heroImage: document.getElementById('hero-certificate-image'),
        certificateBadge: document.getElementById('certificate-badge')
    };
    
    // Hide other states
    Object.values(elements).forEach(el => {
        if (el && el.id !== 'certificate-display' && el.id !== 'certificate-details') {
            el.style.display = 'none';
        }
    });
    
    // Format the issue date
    const issueDate = certificateData.issued_at ? new Date(certificateData.issued_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }) : 'N/A';
    
    // Hide hero image and show badge
    if (elements.heroImage) {
        elements.heroImage.style.display = 'none';
        if (elements.certificateBadge) {
            elements.certificateBadge.style.display = 'block';
        }
    }
    
    // Display dynamic certificate with proper logo paths
    if (elements.certificateDetails) {
        let certificateHTML = '';

        switch (certificateData.role) {
            case 'student':
                certificateHTML = `
                    <div class="certificate-template" style="background: #fff; position: relative; width: 100%; max-width: 100%; height: auto; min-height: 580px; margin: 0 auto; overflow: hidden; font-family: 'Arial', sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 2px solid #e5e7eb;">
                        <!-- Corner Graphics -->
                        <div style="position: absolute; top: 0; left: 0; width: 0; height: 0; border-top: 120px solid #2c3e50; border-right: 120px solid transparent; z-index: 1;"></div>
                        <div style="position: absolute; bottom: 0; right: 0; width: 0; height: 0; border-bottom: 100px solid #e74c3c; border-left: 100px solid transparent; z-index: 1;"></div>
                        <div style="position: absolute; bottom: 0; right: 0; width: 0; height: 0; border-bottom: 70px solid #2c3e50; border-left: 70px solid transparent; z-index: 2;"></div>

                        <!-- Content -->
                        <div style="position: relative; z-index: 3; padding: 10px 20px; height: calc(100% - 20px); display: flex; flex-direction: column; box-sizing: border-box;">
                            <!-- Main Content -->
                            <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; text-align: center; padding: 10px 0;">
                                <!-- Top Right Student ID -->
                                <div style="position: absolute; top: 15px; right: 20px; z-index: 10;">
                                    <div style="color: #6b7280; font-size: 0.8rem; font-weight: 600; text-align: center;">
                                        Student ID: ${certificateData.msn_id || 'MSN-CERT-001'}
                                    </div>
                                </div>
                                
                                <!-- Header Section with Logo, Title, and Badge -->
                                <div class="certificate-header-main" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; margin-top: 10px;">
                                    <!-- MSN Logo Section -->
                                    <div class="msn-logo-container" style="display: flex; flex-direction: column; align-items: center; flex: 0 0 auto;">
                                        <div style="width: 60px; height: 60px; margin-bottom: 5px;">
                                            <img src="Images/logo.png" alt="MSN Academy Logo" style="width: 60px; height: 60px; object-fit: contain;">
                                        </div>
                                        <div style="color: #2c3e50; font-size: 0.7rem; font-weight: 600; text-align: center; line-height: 1.2;">
                                            MSN ACADEMY
                                        </div>
                                    </div>
                                    
                                    <!-- Certificate Title -->
                                    <div style="text-align: center; flex: 1;">
                                        <h1 style="color: #2c3e50; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; margin: 0; letter-spacing: 2px; line-height: 1.1;">CERTIFICATE</h1>
                                        <h2 style="color: #2c3e50; font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 400; margin: 5px 0 0 0; letter-spacing: 1px;">OF COMPLETION</h2>
                                    </div>
                                    
                                    <!-- Award Badge -->
                                    <div class="award-badge-container" style="display: flex; flex-direction: column; align-items: center; flex: 0 0 auto;">
                                        <div style="width: 80px; height: 80px; margin-bottom: 5px;">
                                            <img src="Images/certificate_badge.png" alt="Certificate Badge" style="width: 80px; height: auto; object-fit: contain;">
                                        </div>
                                        <div style="color: #2c3e50; font-size: 0.7rem; font-weight: 600; text-align: center; line-height: 1.2;">
                                            OFFICIAL AWARD
                                        </div>
                                    </div>
                                </div>

                                <!-- Certificate Body -->
                                <div style="margin: 10px 0; padding: 0 20px;">
                                    <p style="color: #7f8c8d; font-size: clamp(0.8rem, 1.8vw, 1rem); margin: 0 0 10px 0; font-weight: 500;">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
                                    
                                    <div style="margin: 10px 0;">
                                        <h2 style="color: #2c3e50; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 600; margin: 0; text-transform: uppercase; word-wrap: break-word;">${certificateData.recipient_name}</h2>
                                    </div>
                                    
                                    <p style="color: #7f8c8d; font-size: clamp(0.8rem, 1.8vw, 1rem); margin: 10px 0 8px 0; font-weight: 500;">FOR SUCCESSFULLY COMPLETING</p>
                                    
                                    <h3 style="color: #e74c3c; font-size: clamp(1.2rem, 2.5vw, 1.7rem); font-weight: 700; margin: 8px 0 10px 0; text-transform: uppercase; word-wrap: break-word;">${certificateData.course_title}</h3>
                                    
                                    <div style="max-width: 600px; margin: 0 auto;">
                                        <p style="color: #7f8c8d; font-size: clamp(0.7rem, 1.2vw, 0.9rem); line-height: 1.4; margin: 0 0 15px 0;">
                                            COURSE AT MSN ACADEMY, CONSISTENTLY SHOWCASING<br class="desktop-break">
                                            DEDICATION, COMMITMENT TO LEARNING, AND A STRONG<br class="desktop-break">
                                            WILLINGNESS TO GROW.
                                        </p>
                                    </div>
                                    
                                        <!-- Footer Section -->
                                        <div class="footer-content" style="position: relative; padding-bottom: 40px; margin-bottom: 5px;">
                                            <!-- Centered content: Signatures and Badge -->
                                            <div style="display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; margin: 0 auto; width: 95%; max-width: 700px;">
                                                <!-- Left Signature -->
                                                <div style="text-align: left; flex: 1; max-width: 150px;">
                                                    <div style="border-bottom: 1px solid #2c3e50; width: 100%; margin-bottom: 2px;"></div>
                                                    <p style="color: #2c3e50; font-size: clamp(0.6rem, 1.1vw, 0.8rem); font-weight: 600; margin: 0;">Mr. Najm Ur Rehman</p>
                                                    <p style="color: #7f8c8d; font-size: clamp(0.5rem, 0.9vw, 0.7rem); margin: 0;">Head Trainer</p>
                                                </div>
                                                
                                                <!-- Center Verification Badge -->
                                                <div style="text-align: center; flex-shrink: 0;">
                                                    <div style="width: 80px; height: 80px; border: 3px solid #2c3e50; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white; margin: 0 auto 8px; margin-top: 40px;">
                                                        <i class="fas fa-certificate" style="color: #2c3e50; font-size: 22px;"></i>
                                                    </div>
                                                    <p style="color: #2c3e50; font-size: clamp(0.5rem, 0.9vw, 0.7rem); font-weight: 600; margin: 0;">VERIFIED</p>
                                                    <p style="color: #7f8c8d; font-size: clamp(0.45rem, 0.8vw, 0.6rem); margin: 0;">Certificate</p>
                                                </div>
                                                
                                                <!-- Right Signature -->
                                                <div style="text-align: right; flex: 1; max-width: 200px;">
                                                    <div style="border-bottom: 1px solid #2c3e50; width: 100%; margin-bottom: 2px;"></div>
                                                    <p style="color: #2c3e50; font-size: clamp(0.6rem, 1.1vw, 0.8rem); font-weight: 600; margin: 0;">Mr. Muhammad Suleman Nagri</p>
                                                    <p style="color: #7f8c8d; font-size: clamp(0.5rem, 0.9vw, 0.7rem); margin: 0;">CEO of MSN Academy</p>
                                                </div>
                                            </div>

                                            <!-- Absolutely positioned Verification Code -->
                                            <div style="position: absolute; margin-top: 34px;">
                                                <p style="color: #6b7280; font-size: 12px; font-weight: 600; margin: 0;">
                                                    Verification Code: ${certificateData.code}
                                                </p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        
                        <!-- Responsive Styles -->
                        <style>
                            .certificate-footer {
                                transition: all 0.3s ease;
                            }
                            @media (max-width: 768px) {
                                .desktop-break { display: none; }
                                .footer-content {
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 12px;
                                }
                                .footer-item {
                                    min-width: 100%;
                                    text-align: center;
                                }
                            }
                            @media (max-width: 480px) {
                                .certificate-header-main {
                                    flex-direction: column;
                                    gap: 15px;
                                    margin-bottom: 10px;
                                }
                                .certificate-header-main h1 {
                                    font-size: 1.5rem !important;
                                }
                                .certificate-header-main h2 {
                                    font-size: 1rem !important;
                                }
                                .award-badge-container, .msn-logo-container {
                                    transform: scale(0.85);
                                }

                                .certificate-footer {
                                    flex-direction: column;
                                    gap: 15px;
                                }
                                .footer-badge {
                                    width: 80px !important;
                                    height: 80px !important;
                                }
                                .footer-badge i {
                                    font-size: 24px !important;
                                }
                            }
                        </style>
                    </div>
                `;
                break;
            case 'interns':
                certificateHTML = `
                    <div class="certificate-template" style="background: #fff; position: relative; width: 100%; max-width: 100%; height: auto; min-height: 500px; aspect-ratio: 16/9; margin: 0 auto; overflow: hidden; font-family: 'Poppins', sans-serif; border: 10px solid #0c4b33; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                        <!-- Corner Graphics -->
                        <div style="position: absolute; top: 0; left: 0; border-top: 80px solid #d4af37; border-right: 80px solid transparent; z-index: 1;"></div>
                        <div style="position: absolute; bottom: 0; right: 0; border-bottom: 80px solid #d4af37; border-left: 80px solid transparent; z-index: 1;"></div>

                        <!-- Content -->
                        <div style="position: relative; z-index: 2; padding: 20px; display: flex; flex-direction: column; height: 100%; text-align: center;">
                            <!-- Top Right ID -->
                            <div style="position: absolute; top: 10px; right: 10px; z-index: 10;">
                                <div style="color: #6b7280; font-size: 0.85rem; font-weight: 600;">
                                    Student ID: ${certificateData.msn_id || 'MSN-INTERN-001'}
                                </div>
                            </div>
                            
                            <!-- Header -->
                            <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 15px; margin-top: 20px;">
                                <img src="Images/logo.png" alt="MSN Academy Logo" style="width: 90px; height: 90px; object-fit: contain;">
                            </div>

                            <!-- Main Body -->
                            <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                                <h1 style="color: #0c4b33; font-size: 2.8rem; font-weight: 700; margin: 0;">INTERNSHIP CERTIFICATE</h1>
                                <p style="color: #555; font-size: 1rem; margin: 15px 0;">THIS IS TO CERTIFY THAT</p>
                                <h2 style="color: #0c4b33; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 600; margin: 5px 0 10px 0; font-family: 'Poppins', sans-serif;">${certificateData.recipient_name}</h2>
                                <p style="color: #555; font-size: 1rem; margin: 10px 0;">HAS SUCCESSFULLY COMPLETED AN INTERNSHIP IN</p>
                                <h3 style="color: #d4af37; font-size: 1.8rem; font-weight: 700; margin: 10px 0;">${certificateData.course_title}</h3>
                                <p style="color: #555; font-size: 0.9rem; max-width: 550px; margin: 15px auto;">DURING WHICH THEY DEMONSTRATED EXCEPTIONAL SKILLS, DEDICATION, AND A STRONG COMMITMENT TO PROFESSIONAL GROWTH AT MSN ACADEMY.</p>
                                <p style="color: #555; font-size: 1rem; margin-top: 20px;"><strong>Date of Completion:</strong> ${issueDate}</p>
                            </div>

                            <!-- Footer -->
                            <div class="certificate-footer" style="display: flex; justify-content: space-around; align-items: center; padding-top: 20px;">
                                <div class="footer-item" style="text-align: center;">
                                    <p style="font-weight: 600; margin: 0; color: #0c4b33;">Mr. Najm Ur Rehman</p>
                                    <p style="font-size: 0.8rem; margin: 0; color: #555;">Head Trainer</p>
                                </div>
                                <div class="footer-badge" style="width: 100px; height: 100px; background: linear-gradient(45deg, #0c4b33, #d4af37); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white;"><i class="fas fa-certificate" style="color: white; font-size: 32px;"></i></div>
                                <div class="footer-item" style="text-align: center;">
                                    <p style="font-weight: 600; margin: 0; color: #0c4b33;">Mr. Muhammad Suleman Nagri</p>
                                    <p style="font-size: 0.8rem; margin: 0; color: #555;">CEO of MSN Academy</p>
                                </div>
                            </div>
                            <!-- Bottom Left Code -->
                            <div style="position: absolute; bottom: 10px; left: 10px; z-index: 10;">
                                <div style="color: #6b7280; font-size: 0.85rem; font-weight: 600;">
                                    Verification Code: ${certificateData.code}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'Achievement':
                certificateHTML = `
                    <div class="certificate-template" style="background: #fff; position: relative; width: 100%; max-width: 850px; height: 600px; margin: 0 auto; overflow: hidden; font-family: 'Poppins', sans-serif; border: 8px solid #dc2626; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                        <!-- Corner Graphics -->
                        <div style="position: absolute; top: -30px; left: -30px; width: 120px; height: 120px; background: linear-gradient(45deg, #fbbf24, #f59e0b); border-radius: 50%; z-index: 1;"></div>
                        <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: linear-gradient(45deg, #dc2626, #b91c1c); border-radius: 50%; z-index: 1;"></div>
                        <div style="position: absolute; bottom: -25px; left: -25px; width: 110px; height: 110px; background: linear-gradient(45deg, #059669, #047857); border-radius: 50%; z-index: 1;"></div>
                        <div style="position: absolute; bottom: -30px; right: -30px; width: 130px; height: 130px; background: linear-gradient(45deg, #7c3aed, #6d28d9); border-radius: 50%; z-index: 1;"></div>

                        <!-- Content -->
                        <div style="position: relative; z-index: 2; padding: 25px; display: flex; flex-direction: column; height: 100%; text-align: center;">
                            <!-- Top Right ID -->
                            <div style="position: absolute; top: 10px; right: 10px; z-index: 10;">
                                <div style="color: #6b7280; font-size: 0.85rem; font-weight: 600;">
                                    Student ID: ${certificateData.msn_id || 'MSN-ACHV-001'}
                                </div>
                            </div>
                            
                            <!-- Header -->
                            <div style="display: flex; justify-content: center; align-items: center; gap: 15px; margin-bottom: 10px; margin-top: 20px;">
                                <div style="width: 80px; height: 80px;">
                                    <img src="Images/logo.png" alt="MSN Academy Logo" style="width: 80px; height: 80px; object-fit: contain;">
                                </div>
                                <div style="width: 90px; height: 90px;">
                                    <img src="Images/certificate_badge.png" alt="Certificate Badge" style="width: 90px; height: auto; object-fit: contain;">
                                </div>
                            </div>

                            <!-- Main Body -->
                            <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                                <h1 style="color: #dc2626; font-size: 3rem; font-weight: 800; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">ACHIEVEMENT</h1>
                                <h2 style="color: #dc2626; font-size: 2rem; font-weight: 600; margin: 5px 0 15px 0;">CERTIFICATE</h2>
                                <p style="color: #555; font-size: 1rem; margin: 10px 0;">THIS CERTIFICATE IS AWARDED TO</p>
                                <h2 style="color: #1e40af; font-size: 2.8rem; font-weight: 700; margin: 15px 0; font-family: 'Great Vibes', cursive; text-decoration: underline; text-decoration-color: #fbbf24;">${certificateData.recipient_name}</h2>
                                <p style="color: #555; font-size: 1rem; margin: 10px 0;">FOR OUTSTANDING ACHIEVEMENT IN</p>
                                <h3 style="color: #059669; font-size: 2rem; font-weight: 700; margin: 15px 0; text-transform: uppercase;">${certificateData.course_title}</h3>
                                <p style="color: #555; font-size: 0.95rem; max-width: 500px; margin: 15px auto;">DEMONSTRATING EXCEPTIONAL PERFORMANCE, LEADERSHIP, AND EXCELLENCE THAT SETS A BENCHMARK FOR OTHERS AT MSN ACADEMY.</p>
                                <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
                                    <div style="width: 40px; height: 40px; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-star" style="color: white; font-size: 18px;"></i>
                                    </div>
                                    <div style="width: 40px; height: 40px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-medal" style="color: white; font-size: 18px;"></i>
                                    </div>
                                    <div style="width: 40px; height: 40px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-award" style="color: white; font-size: 18px;"></i>
                                    </div>
                                </div>
                                <p style="color: #555; font-size: 1rem; margin-top: 15px;"><strong>Date of Achievement:</strong> ${issueDate}</p>
                            </div>

                            <!-- Footer -->
                            <div class="certificate-footer" style="display: flex; justify-content: space-around; align-items: center; padding-top: 15px; border-top: 2px solid #fbbf24;">
                                <div class="footer-item" style="text-align: center;">
                                    <p style="font-weight: 600; margin: 0; color: #dc2626;">Mr. Najm Ur Rehman</p>
                                    <p style="font-size: 0.8rem; margin: 0; color: #555;">Head Trainer</p>
                                </div>
                                <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #dc2626, #fbbf24); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white;">
                                    <i class="fas fa-certificate" style="color: white; font-size: 28px;"></i>
                                </div>
                                <div style="text-align: center;">
                                    <p style="font-weight: 600; margin: 0; color: #dc2626;">Mr. Muhammad Suleman Nagri</p>
                                    <p style="font-size: 0.8rem; margin: 0; color: #555;">CEO of MSN Academy</p>
                                </div>
                            </div>
                            
                            <!-- Bottom Left Code -->
                            <div style="position: absolute; bottom: 10px; left: 10px; z-index: 10;">
                                <div style="color: #6b7280; font-size: 0.85rem; font-weight: 600;">
                                    Verification Code: ${certificateData.code}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            default:
                certificateHTML = `<p>Invalid certificate type.</p>`;
                break;
        }

        elements.certificateDetails.innerHTML = certificateHTML;
    }
    
    if (elements.certificateDisplay) {
        elements.certificateDisplay.style.display = 'block';
        // Scroll to certificate display
        elements.certificateDisplay.scrollIntoView({ behavior: 'smooth' });
    }
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

// Course-specific certificate verification functions
function initCoursePageCertificateVerification() {
    // Python Programming page
    const pythonForm = document.getElementById('python-verification-form');
    if (pythonForm) {
        pythonForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const code = document.getElementById('python-certificate-code').value.trim();
            if (code) {
                await verifyCoursePageCertificate(code);
            }
        });
    }
    
    // Frontend Development page
    const frontendForm = document.getElementById('frontend-verification-form');
    if (frontendForm) {
        frontendForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const code = document.getElementById('frontend-certificate-code').value.trim();
            if (code) {
                await verifyCoursePageCertificate(code);
            }
        });
    }
    
    // Competitive Programming page
    const competitiveForm = document.getElementById('competitive-verification-form');
    if (competitiveForm) {
        competitiveForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const code = document.getElementById('competitive-certificate-code').value.trim();
            if (code) {
                await verifyCoursePageCertificate(code);
            }
        });
    }
}

// Verify certificate for course pages - uses main verification function
async function verifyCoursePageCertificate(code) {
    await verifyCertificate(code, 'student'); // Default to student for course pages
}



// Initialize all functionality - Single consolidated initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    mobileNav.init();
    
    // Initialize other components
    contactModal.init();
    initSmoothScroll();
    initCertificateVerification();
    initContactForm();
    initScrollAnimations();
    
    // Role-based image updates
    const roleSelect = document.getElementById('role');
    if (roleSelect) {
        roleSelect.addEventListener('change', updateImageBasedOnRole);
        updateImageBasedOnRole(); // Initial call
    }
    
    // Add verify now button functionality
    const verifyNowBtn = document.querySelector('.verify-now-btn');
    if (verifyNowBtn) {
        verifyNowBtn.addEventListener('click', function() {
            const form = document.getElementById('verification-form');
            if (form) {
                form.scrollIntoView({ behavior: 'smooth' });
                const codeInput = document.getElementById('certificate-code');
                if (codeInput) codeInput.focus();
            }
        });
    }
    
    // Enforce Enroll Now buttons/links (by text) to open the enrollment form URL globally
    (function initEnrollRedirects() {
        const ENROLL_URL = 'https://forms.gle/c82S9HnVPQCKf1vE8';

        function isInteractive(el) {
            if (!el) return false;
            const tag = (el.tagName || '').toUpperCase();
            return tag === 'BUTTON' || tag === 'A' || el.hasAttribute('role') || /btn|button/i.test(el.className || '');
        }

        function isEnrollNow(el) {
            const text = (el.textContent || '').trim().toLowerCase();
            return text === 'enroll now';
        }

        function isEnrollTarget(el) {
            return isInteractive(el) && isEnrollNow(el);
        }

        function attachHandler(el) {
            if (!el || el.__enrollBound) return;
            el.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.open(ENROLL_URL, '_blank', 'noopener');
            });
            el.setAttribute('role', 'link');
            el.style.cursor = 'pointer';
            el.__enrollBound = true;
        }

        // Attach to existing elements (covering index.html cards and others)
        const initialSelector = 'button, a, .btn, [role="button"], .learn-more-button, .enroll-now-button';
        document.querySelectorAll(initialSelector).forEach(el => {
            if (isEnrollTarget(el)) attachHandler(el);
        });

        // Observe DOM for any future elements added dynamically
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                m.addedNodes && m.addedNodes.forEach(node => {
                    if (!(node instanceof HTMLElement)) return;
                    if (isEnrollTarget(node)) {
                        attachHandler(node);
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll(initialSelector).forEach(child => {
                            if (isEnrollTarget(child)) attachHandler(child);
                        });
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    })();

    
    // Ensure mobile navigation works with retry
    setTimeout(() => {
        if (!mobileNav.isInitialized) {
            mobileNav.init();
        }
    }, 500);
});
