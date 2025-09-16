// Namyangju City Vehicle Management Department Landing Page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing functionality...');
    initializePage();
});

// Smooth scroll to section function
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// External link handlers
function openExternalLink(type) {
    console.log('Opening external link:', type);
    
    switch(type) {
        case 'licensing':
            showModal('인허가 신청 안내', 
                '화물자동차 운송사업 인허가 신청 방법:\n\n' +
                '• 온라인 신청: 정부24 (www.gov.kr)\n' +
                '• 방문 신청: 남양주시청 자동차관리과\n' +
                '• 전화 문의: 031-590-2491~5\n\n' +
                '필요서류를 준비하시고 방문해주세요.');
            break;
            
        case 'civilAffairs':
            showModal('민원 접수 안내',
                '민원 접수 방법:\n\n' +
                '• 온라인 접수: 남양주시 홈페이지\n' +
                '• 방문 접수: 남양주시청 자동차관리과\n' +
                '• 전화 접수: 031-590-2114\n' +
                '• 처리기간: 접수일로부터 20일 이내');
            break;
            
        case 'fuelSubsidy':
            showModal('유가보조금 지원 안내',
                '유가보조금 지원 정보:\n\n' +
                '• 지원대상: 사업용 화물자동차 운송사업자\n' +
                '• 신청방법: 서면신청 또는 유류구매카드 사용\n' +
                '• 문의전화: 031-590-2491~5\n\n' +
                '자세한 내용은 한국교통안전공단에서 확인 가능합니다.');
            break;
            
        case 'fraudPrevention':
            showModal('부정수급 신고',
                '부정수급 신고 방법:\n\n' +
                '• 신고 전화: 031-590-2114\n' +
                '• 신고 이메일: vehicle@nyj.go.kr\n' +
                '• 방문 신고: 남양주시청 자동차관리과\n\n' +
                '부정수급 신고는 익명으로도 가능합니다.');
            break;
            
        case 'contact':
            window.open('tel:031-590-2491', '_self');
            break;
            
        default:
            console.log('Unknown link type:', type);
    }
}

// Show modal function
function showModal(title, message) {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__backdrop"></div>
        <div class="modal__content">
            <div class="modal__header">
                <h3>${title}</h3>
                <button class="modal__close" onclick="closeModal()" aria-label="닫기">&times;</button>
            </div>
            <div class="modal__body">
                <p style="white-space: pre-line;">${message}</p>
            </div>
            <div class="modal__footer">
                <button class="btn btn--primary" onclick="closeModal()">확인</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-16);
    `;
    
    const backdrop = modal.querySelector('.modal__backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
    `;
    
    const content = modal.querySelector('.modal__content');
    content.style.cssText = `
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    `;
    
    const header = modal.querySelector('.modal__header');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-20) var(--space-24) var(--space-16);
        border-bottom: 1px solid var(--color-border);
    `;
    
    const closeBtn = modal.querySelector('.modal__close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: var(--space-4);
        line-height: 1;
    `;
    
    const body = modal.querySelector('.modal__body');
    body.style.cssText = `
        padding: var(--space-20) var(--space-24);
    `;
    
    const footer = modal.querySelector('.modal__footer');
    footer.style.cssText = `
        padding: var(--space-16) var(--space-24) var(--space-20);
        border-top: 1px solid var(--color-border);
        text-align: right;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking backdrop
    backdrop.addEventListener('click', closeModal);
    
    // Close modal with ESC key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Board link opener
function openBoardLink() {
    const boardUrl = 'https://www.nyj.go.kr/www/selectBbsNttList.do?key=2286&bbsNo=11&pageUnit=10&searchCnd=SJ&searchKrwd=%ED%99%94%EB%AC%BC';
    window.open(boardUrl, '_blank', 'noopener,noreferrer');
}

// Form download handlers
function downloadForm(formType) {
    let fileName = '';
    let message = '';
    
    switch(formType) {
        case 'permit':
            fileName = '화물자동차운송사업_허가신청서.pdf';
            message = '화물자동차운송사업 허가신청서';
            break;
        case 'garage':
            fileName = '차고지_설치확인서.pdf';
            message = '차고지 설치확인서';
            break;
        case 'fuel':
            fileName = '유가보조금_지급신청서.pdf';
            message = '유가보조금 지급신청서';
            break;
        case 'purchase':
            fileName = '유류구매_내역_명세서.pdf';
            message = '유류구매 내역 명세서';
            break;
        default:
            fileName = '서식.pdf';
            message = '서식';
    }
    
    showModal('서식 다운로드', 
        `${message}를 다운로드합니다.\n\n` +
        `실제 서비스에서는 ${fileName} 파일이 다운로드됩니다.\n\n` +
        `전체 양식은 남양주시 홈페이지 게시판에서 확인할 수 있습니다.`);
}

// Floating CTA menu toggle
function toggleCTAMenu() {
    console.log('Toggling CTA menu');
    const ctaMenu = document.getElementById('ctaMenu');
    const floatingBtn = document.querySelector('.floating-btn');
    
    if (ctaMenu && floatingBtn) {
        const isActive = ctaMenu.classList.contains('active');
        console.log('CTA menu is active:', isActive);
        
        if (isActive) {
            ctaMenu.classList.remove('active');
            floatingBtn.classList.remove('active');
        } else {
            ctaMenu.classList.add('active');
            floatingBtn.classList.add('active');
        }
    } else {
        console.error('CTA menu elements not found');
    }
}

// Close CTA menu when clicking outside
function closeCTAMenu(event) {
    const ctaMenu = document.getElementById('ctaMenu');
    const floatingBtn = document.querySelector('.floating-btn');
    const floatingCta = document.querySelector('.floating-cta');
    
    if (ctaMenu && floatingBtn && floatingCta) {
        if (!floatingCta.contains(event.target)) {
            ctaMenu.classList.remove('active');
            floatingBtn.classList.remove('active');
        }
    }
}

// Initialize page functionality
function initializePage() {
    console.log('Initializing page functionality...');
    
    // Add click event listener to document for closing CTA menu
    document.addEventListener('click', closeCTAMenu);
    
    // Add scroll event listener for header effects
    window.addEventListener('scroll', throttle(handleScroll, 100));
    
    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
    
    // Initialize phone number copying
    initializePhoneNumberCopying();
    
    console.log('Page initialization complete');
}

// Handle scroll events
function handleScroll() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to header when scrolled
    if (header) {
        if (scrollTop > 50) {
            header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            header.style.boxShadow = 'var(--shadow-md)';
        }
    }
    
    // Show/hide floating CTA based on scroll position
    const floatingCta = document.querySelector('.floating-cta');
    if (floatingCta) {
        if (scrollTop > 200) {
            floatingCta.style.opacity = '1';
            floatingCta.style.visibility = 'visible';
        } else {
            floatingCta.style.opacity = '0.7';
        }
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    // ESC key closes CTA menu
    if (event.key === 'Escape') {
        const ctaMenu = document.getElementById('ctaMenu');
        const floatingBtn = document.querySelector('.floating-btn');
        
        if (ctaMenu && floatingBtn && ctaMenu.classList.contains('active')) {
            ctaMenu.classList.remove('active');
            floatingBtn.classList.remove('active');
            floatingBtn.focus();
        }
    }
    
    // Enter key on floating button
    if (event.key === 'Enter' && event.target.classList.contains('floating-btn')) {
        toggleCTAMenu();
    }
}

// Initialize intersection observer for scroll animations
function initializeIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animation
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .form-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Add click handlers for phone numbers (copy to clipboard)
function initializePhoneNumberCopying() {
    const phoneElements = document.querySelectorAll('[href^="tel:"]');
    
    phoneElements.forEach(element => {
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const phoneNumber = element.getAttribute('href').replace('tel:', '');
            copyToClipboard(phoneNumber);
        });
    });
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('클립보드에 복사되었습니다.', 'success');
        }).catch(() => {
            showNotification('복사에 실패했습니다.', 'error');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('클립보드에 복사되었습니다.', 'success');
        } catch (err) {
            showNotification('복사에 실패했습니다.', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    const colors = {
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        color: var(--color-text);
        padding: var(--space-12) var(--space-16);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        font-size: var(--font-size-sm);
        max-width: 300px;
        border-left: 4px solid ${colors[type] || colors.info};
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Performance optimization: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// Make functions available globally
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.toggleCTAMenu = toggleCTAMenu;
window.openExternalLink = openExternalLink;
window.downloadForm = downloadForm;
window.openBoardLink = openBoardLink;
window.closeModal = closeModal;