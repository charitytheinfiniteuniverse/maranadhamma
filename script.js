// အစ - Theme Management
function setTheme(theme) {
    document.body.classList.remove('dark-mode', 'light-mode', 'reading-mode');
    document.body.classList.add(theme + '-mode');
    localStorage.setItem('user-theme', theme);
}

// LocalStorage မှ Theme ပြန်ခေါ်ခြင်း
const savedTheme = localStorage.getItem('user-theme') || 'reading';
setTheme(savedTheme);
// အဆုံး

// အစ - Dynamic Greeting & Dhamma Quotes
const quotes = [
    "ခန္ဓာကိုယ်သည် အိုမင်းခြင်းသဘောရှိ၏၊ မမေ့မလျော့သော သတိဖြင့် နေထိုင်ပါ။",
    "စိတ်ကို ယဉ်ကျေးအောင် ဆုံးမခြင်းသည် ချမ်းသာခြင်းကို ဆောင်၏။",
    "ယနေ့ ပြုလုပ်သော ကုသိုလ်သည် နောင်ဘဝအတွက် ရိက္ခာဖြစ်သည်။"
];

function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    const quoteEl = document.getElementById('dhammaQuote');
    
    let msg = hour < 12 ? "မင်္ဂလာနံနက်ခင်းပါ" : hour < 17 ? "မင်္ဂလာနေ့လည်ခင်းပါ" : "မင်္ဂလာညချမ်းပါ";
    greetingEl.innerText = msg;
    quoteEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}
updateGreeting();
// အဆုံး

// အစ - Lazy Loading Images
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const dataSave = localStorage.getItem('data-save') === 'true';
            if (!dataSave) {
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
            } else {
                img.alt = "Data Saving Mode On";
            }
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img.lazy').forEach(img => observer.observe(img));
// အဆုံး

// အစ - Infinite Auto-scroll Logic
function initInfiniteScroll(elementId) {
    const track = document.querySelector(`#${elementId} .carousel-track`);
    let isDown = false;
    let startX;
    let scrollLeft;

    // Auto scroll logic
    let scrollInterval = setInterval(() => {
        if(!isDown) track.scrollLeft += 1;
        if (track.scrollLeft >= (track.scrollWidth - track.clientWidth)) {
            track.scrollLeft = 0;
        }
    }, 30);

    track.addEventListener('mousedown', () => { isDown = true; clearInterval(scrollInterval); });
    track.addEventListener('touchstart', () => { isDown = true; clearInterval(scrollInterval); });
    track.addEventListener('mouseup', () => { isDown = false; });
    track.addEventListener('touchend', () => { isDown = false; });
}

['carousel-samu', 'carousel-satan', 'carousel-social', 'carousel-info'].forEach(initInfiniteScroll);
// အဆုံး

// အစ - Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
// အဆုံး

// အစ - Navigation Functions
function scrollToTop() { window.scrollTo({top: 0, behavior: 'smooth'}); }
function scrollToBottom() { window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}); }

function scrollFirst(id) { document.querySelector(`#${id} .carousel-track`).scrollLeft = 0; }
function scrollLast(id) { 
    const t = document.querySelector(`#${id} .carousel-track`);
    t.scrollLeft = t.scrollWidth;
}
// အဆုံး

// အစ - Pull to Refresh
let touchStart = 0;
window.addEventListener('touchstart', e => { touchStart = e.touches[0].pageY; });
window.addEventListener('touchmove', e => {
    const touchY = e.touches[0].pageY;
    if (window.scrollY === 0 && touchY > touchStart + 100) {
        document.getElementById('pull-to-refresh').style.top = '20px';
        setTimeout(() => location.reload(), 1000);
    }
});
// အဆုံး
