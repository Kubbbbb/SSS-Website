// Change Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = '#000000';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        header.style.background = '#1a1a1a';
        header.style.boxShadow = 'none';
    }
});

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Simple Animation on Scroll (Fade in effect)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ส่วนเดิมที่มีอยู่แล้ว ให้เพิ่ม , .product-detail-card เข้าไปในวงเล็บ
document.querySelectorAll('.service-card, .about-text, .about-img, .product-detail-card, .section-title, .prod-nav-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)'; // ปรับจาก 30 เป็น 40 เพื่อให้เห็นการเลื่อนชัดขึ้น
    el.style.transition = 'all 0.8s ease-out'; // ปรับเวลาเป็น 0.8s ให้ดูนุ่มนวลขึ้น
    observer.observe(el);
});

function scrollToProduct(id) {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 90; // Adjust based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

// --- Typewriter Effect ---
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typewriter');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        new TypeWriter(txtElement, words);
    }
}

// ค้นหาและแก้ส่วน Scroll ใน script.js
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // อัปเดต Active Link ตาม Section
    updateActiveLink();
});

// ระบบ Mobile Menu
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('is-active');
    navLinks.classList.toggle('active');
});

// คลิกที่ลิงก์แล้วปิดเมนูมือถือ (สำหรับหน้า Single Page)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});

// ฟังก์ชันระบุว่าอยู่ส่วนไหนของหน้าจอ (Active State)
function updateActiveLink() {
    let fromTop = window.scrollY + 100;
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        let section = document.querySelector(link.hash);
        
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}