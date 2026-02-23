// Inicializa AOS
AOS.init({ 
    duration: 1000, 
    once: false, 
    mirror: true, 
    offset: 150, 
    easing: 'ease-out-back' 
});

// 1. Partículas da Sidebar
function createSidebarParticles() {
    const sidebar = document.getElementById('sidebar-particles');
    if(!sidebar) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 3 + 'px';
        p.style.width = size; p.style.height = size;
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = Math.random() * 8 + 7 + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        sidebar.appendChild(p);
    }
}

// 2. Ícones Flutuantes
function createFloatingIcons() {
    const techs = [
        { icon: "fa-js", name: "JavaScript" }, { icon: "fa-node-js", name: "Node.js" },
        { icon: "fa-database", name: "MySQL" }, { icon: "fa-html5", name: "HTML5" },
        { icon: "fa-css3-alt", name: "CSS3" }, { icon: "fa-git-alt", name: "Git" },
        { icon: "fa-php", name: "PHP" }, { icon: "fa-react", name: "React" }
    ];

    const iconsCount = 12;
    const placedIcons = [];
    const minDistance = 120;

    for (let i = 0; i < iconsCount; i++) {
        const item = techs[Math.floor(Math.random() * techs.length)];
        const icon = document.createElement('i');
        icon.className = `${item.icon === "fa-database" ? "fas" : "fab"} ${item.icon} floating-tech-icon`;
        
        let x, y, collision, attempts = 0;
        do {
            collision = false;
            x = Math.random() * (window.innerWidth - 200) + 100;
            y = Math.random() * (window.innerHeight - 200) + 100;
            for (let placed of placedIcons) {
                const dist = Math.sqrt(Math.pow(x - placed.x, 2) + Math.pow(y - placed.y, 2));
                if (dist < minDistance) { collision = true; break; }
            }
            attempts++;
        } while (collision && attempts < 50);

        placedIcons.push({ x, y });
        icon.style.left = x + 'px';
        icon.style.top = y + 'px';
        icon.style.fontSize = Math.random() * 40 + 40 + 'px';
        icon.style.animationDuration = Math.random() * 15 + 15 + 's';
        document.body.appendChild(icon);
    }

    document.addEventListener('mousemove', (e) => {
        const icons = document.querySelectorAll('.floating-tech-icon');
        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const iconX = rect.left + rect.width / 2;
            const iconY = rect.top + rect.height / 2;
            const distX = e.clientX - iconX;
            const distY = e.clientY - iconY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            if (distance < 150) {
                const moveX = (distX / distance) * -10;
                const moveY = (distY / distance) * -10;
                icon.style.marginLeft = moveX + 'px';
                icon.style.marginTop = moveY + 'px';
            } else {
                icon.style.marginLeft = '0px';
                icon.style.marginTop = '0px';
            }
        });
    });
}

// 3. Tema Dark/Light (Lógica para Switch Checkbox)
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Verifica tema salvo ao carregar a página
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.checked = false;
}

// 4. Idiomas
function setLanguage(lang) {
    document.querySelectorAll('[data-pt]').forEach(el => {
        const translation = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-pt');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translation.replace(/<[^>]*>?/gm, '');
        } else {
            el.innerHTML = translation;
        }
    });
    document.documentElement.lang = (lang === 'en') ? "en" : "pt-br";
}

// 5. Scroll e Navbar
window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach(s => {
        if (window.pageYOffset >= s.offsetTop - 300) current = s.getAttribute("id");
    });
    document.querySelectorAll(".nav-links a").forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) a.classList.add("active");
    });
});

document.querySelectorAll('.nav-links a').forEach(a => {
    a.onclick = (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
});

// 6. Modal
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("full-image");
function openCert(src) { modal.style.display = "flex"; modalImg.src = src; }
document.getElementById("profile-trigger").onclick = () => openCert(document.getElementById("profile-trigger").src);
document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Inicialização
createSidebarParticles();
createFloatingIcons();


// =================================================
document.querySelectorAll('.nav-links a').forEach(a => {
    a.onclick = (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            // No mobile (window.innerWidth < 768), compensamos o scroll
            const offset = window.innerWidth < 768 ? 20 : 0; 
            window.scrollTo({ 
                top: target.offsetTop - offset, 
                behavior: 'smooth' 
            });
        }
    }
});