/* ============================================================
   script.js — Triple S+ Website (Fixed Version)
   ============================================================ */

/* 1. HEADER — Scroll Effect & Active Nav Link */
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    updateActiveLink();
});

function updateActiveLink() {
    const fromTop = window.scrollY + 100;
    document.querySelectorAll('.nav-links a').forEach(link => {
        // ตรวจสอบว่ามี hash (#) และมี element นั้นจริงๆ ในหน้าเพจ
        if (link.hash && link.hash !== "#") {
            const section = document.querySelector(link.hash);
            if (section) {
                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        }
    });
}

/* 2. SMOOTH SCROLLING */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== "#") {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

function scrollToProduct(id) {
    // 1. เลื่อนหน้าจอไปยังส่วนที่เลือก
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 90;
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }

    // 2. เปลี่ยนปุ่มที่เป็น active (เพื่อความสวยงาม)
    document.querySelectorAll('.prod-nav-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    // หาปุ่มที่กดโดยอาศัย onclick ที่ส่งค่า id มา
    event.currentTarget.classList.add('active');
}

/* 3. MOBILE MENU (Fixed: Added check to prevent error) */
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu'); // หา id นี้
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) { // ถ้ามีปุ่ม mobile menu ถึงจะทำงาน
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }
});

/* 4. SCROLL ANIMATION */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .about-text, .about-img, .product-detail-card, .section-title, .prod-nav-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
});

/* 5. TYPEWRITER EFFECT */
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;
        if (this.isDeleting) { typeSpeed /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter
document.addEventListener('DOMContentLoaded', function () {
    const txtElement = document.querySelector('.typewriter');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        new TypeWriter(txtElement, words);
    }
});

/* 6. ENHANCED STAGGERED REVEAL */
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // หาลูกๆ เช่น .acc-box หรือ .brand-logo-item
            const children = entry.target.querySelectorAll('.acc-box, .brand-logo-item, .net-card-item, .soft-list-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0) scale(1)';
                }, index * 50); // ดีเลย์ตัวละ 0.05 วินาที
            });
        }
    });
}, { threshold: 0.1 });

// สั่งให้เริ่มสังเกต Card แต่ละใบ
document.querySelectorAll('.product-detail-card').forEach(card => {
    // เซ็ตค่าเริ่มต้นให้ลูกๆ ก่อนเริ่ม animation
    const items = card.querySelectorAll('.acc-box, .net-card-item, .soft-list-item');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.transition = 'all 0.5s ease-out';
    });
    staggerObserver.observe(card);
});