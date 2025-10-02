<template>
  <div class="birthday-wrapper">
    <div class="particles">
      <div
        v-for="(p, i) in particles"
        :key="`p-${i}`"
        class="particle"
        :style="p.style"
      ></div>
    </div>

    <div class="confetti">
      <div
        v-for="(c, i) in confetti"
        :key="`c-${i}`"
        class="confetti-item"
        :style="c.style"
      >
        {{ c.emoji }}
      </div>
    </div>

    <div class="content-area">
      <Transition name="fade" mode="out-in">
        <div v-if="step === 0" class="celebration-step">
          <h1 class="celebration-text"> Happy Birthday Zeba !</h1>
        </div>

        <div v-if="step === 3" class="zeba-grid">
          <div class="zeba-row slide-in-left">
            <img src="/pic/zeba.jpg" alt="Zeba" class="zeba-img" />
            <div class="zeba-text-box">
              <h2>Happy Birthday Zeba 👑</h2>
              <p>আজকে আপনার birthday ভাবলাম কিছু একটা করি তাই ছোট একটা try করলাম,,  ট্রিট পাইবার জন্য কত কিছু করতে হয় এখন 💤!</p>
            </div>
          </div>

          <div class="zeba-row reverse slide-in-right">
            <div class="zeba-text-box">
              <h2>Always Smiling 🌸</h2>
              <p>এভাবেই হাসতে থাকেন,  keep happy always  and আমাকে আরো বেশি বেশি ignore করেন সমস্যা নাই👍🏾!</p>
            </div>
            <img src="/pic/zeba2.png" alt="Zeba" class="zeba-img" />
          </div>
          
          <div class="zeba-row slide-in-left">
            <div class="couple-img-container">
              <img src="/pic/zeba3.jpg" alt="Zeba" class="couple-img" />
              <img src="/pic/cow.jpeg" alt="Partner" class="couple-img" />
            </div>
            <div class="zeba-text-box">
              <h2>A Perfect Match ❤️</h2>
              <p>Wishing you both a future filled with love, laughter, and endless happiness. কত ভালো matching করছে আপনাদের,,  আপনারা এভাবেই Happy থাকেন 🖤!</p>
            </div>
          </div>

          <button class="action-btn special-btn" @click="showSpecialReminder = !showSpecialReminder">
            Special Reminder <span class="bell-icon">🔔</span>
          </button>

          <div v-if="showSpecialReminder" class="zeba-row special-reminder-container slide-in-bottom">
            <div class="special-images">
              <!-- <img src="/pic/tiger.jpeg" alt="tiger" class="special-img" /> -->
               <img src="/pic/t2.jpeg" alt="tiger" class="special-img"/>
              <img src="/pic/cow.jpeg" alt="cow" class="special-img" />
              <!-- <img src="/pic/t2.jpeg" alt="tiger" class="special-img"/> -->
            </div>
            <p class="special-text">এভাবেই বাঘ কে হারিয়ে বিজয়ী আজকে গরু 💔</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- State ---
const step = ref(0); // 0 = celebration, 3 = Zeba content
const showSpecialReminder = ref(false);

// --- Particles & Confetti ---
const particles = ref([]);
const confetti = ref([]);
let confettiInterval = null;

const createParticles = () => {
  const particleArray = [];
  const colors = ['#6c4de6', '#4d73e6', '#7a5af5', '#5a67d8'];
  for (let i = 0; i < 100; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particleArray.push({
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        background: color,
        boxShadow: `0 0 15px ${color}`,
      },
    });
  }
  particles.value = particleArray;
};

const createConfetti = () => {
  const confettiArray = [];
  const emojis = ['🎊', '🎉', '🎈', '🎂',  '✨', '🌟', '💫'];
  for (let i = 0; i < 50; i++) {
    confettiArray.push({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 5 + 8}s`,
      },
    });
  }
  confetti.value = [...confetti.value, ...confettiArray].slice(-150);
};

// --- Lifecycle ---
onMounted(() => {
  createParticles();
  createConfetti();
  confettiInterval = setInterval(createConfetti, 5000);

  // Automatically move to Zeba content after 4s
  setTimeout(() => {
    step.value = 3;
  }, 4000);
});

onUnmounted(() => {
  clearInterval(confettiInterval);
});

// --- Fonts ---
useHead({
  title: 'Happy Birthday Zeba',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;700&display=swap', rel: 'stylesheet' }
  ],
  bodyAttrs: { style: 'margin:0;padding:0;box-sizing:border-box;' }
});
</script>

<style scoped>
:root {
  --primary-accent: #151316;
  --dark-bg: #000;
  --light-card-bg: #fff;
  --text-dark: #1f2937;
  --text-muted: #6b7280;
  --gradient-1: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
}

.birthday-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #3b0a7b;
  font-family: 'Inter', sans-serif;
}

.particles, .confetti { position: absolute; inset:0; pointer-events:none; overflow:hidden; z-index:1; }
.particle { position:absolute; width:3px; height:3px; border-radius:50%; opacity:0; animation: float 20s linear infinite; }
@keyframes float { 0%{transform:translateY(100vh);opacity:0;}10%,90%{opacity:1;}100%{transform:translateY(-10vh);opacity:0;} }
.confetti-item { position:absolute; font-size:22px; animation: confetti-fall 10s linear infinite; }
@keyframes confetti-fall { 0%{transform:translateY(-10vh) rotate(0deg);opacity:1;}100%{transform:translateY(100vh) rotate(720deg);opacity:0;} }

.content-area { z-index:10; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2rem; width:100%; max-width:900px; text-align:center; }
.celebration-step .celebration-text { font-family:'Playfair Display', serif; font-size:clamp(2.5rem, 8vw, 5rem); font-weight:700; color:#f3e8ff; text-shadow:0 0 30px #a855f7; animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:0.7;}50%{opacity:1;} }

/* Zeba Styles */
.zeba-grid { width:100%; display:flex; flex-direction:column; gap:2rem; }
.zeba-row { display:flex; align-items:center; gap:2rem; background:#fff; border-radius:25px; padding:2rem; box-shadow:0 10px 30px rgba(0,0,0,0.1); }
.zeba-row.reverse { flex-direction: row-reverse; }
.zeba-img { width:150px; height:150px; border-radius:50%; object-fit:cover; border:5px solid #fff; box-shadow:0 5px 15px rgba(0,0,0,0.1); }
.zeba-text-box { flex:1; color: var(--text-dark); }
.zeba-text-box h2 { font-family:'Playfair Display', serif; font-size:1.8rem; font-weight:700; margin-bottom:0.75rem; }
.zeba-text-box p { font-size:1.05rem; line-height:1.7; color: var(--text-muted); }
.couple-img-container { display:flex; align-items:center; flex-shrink:0; }
.couple-img { width:110px; height:110px; border-radius:50%; object-fit:cover; border:5px solid #fff; box-shadow:0 5px 15px rgba(0,0,0,0.1); transition: all 0.3s ease; }
.couple-img:last-child { margin-left:-30px; }
.couple-img:hover { transform: scale(1.05) translateY(-5px); z-index:5; }

/* --- MODIFIED & NEW STYLES START HERE --- */

/* Special Reminder Button */
.special-btn {
  display: inline-flex;
  align-items: center;
  align-self: center; /* Center button in the grid */
  gap: 0.75rem;
  background: linear-gradient(135deg, #f97316 0%, #f43f5e 100%);
  background-size: 200% auto;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  margin-top: 1.5rem;
  box-shadow: 0 12px 35px rgba(244, 63, 94, 0.4);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.special-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 18px 45px rgba(244, 63, 94, 0.55);
  background-position: right center; /* Animate gradient on hover */
}

.special-btn:active {
  transform: translateY(-1px) scale(1);
}

.bell-icon {
  display: inline-block;
  animation: ring 2s 1s ease-in-out infinite; /* Added a 1s delay */
}

@keyframes ring {
  0%, 100% { transform: rotate(0); }
  10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
  20%, 40%, 60%, 80% { transform: rotate(10deg); }
}


/* Special Reminder Content */
.special-reminder-container {
  margin-top: 1rem;
  flex-direction: column;
  text-align: center;
  gap: 1.5rem;
}

.special-images {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.special-img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #e5e7eb; /* Light grey border for contrast */
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  animation: zoomIn 0.6s ease forwards;
}

.special-text {
  font-size: 1.1rem;
  color: var(--text-muted); /* Changed text color for light background */
  font-weight: 500;
  text-shadow: none; /* Removed shadow */
  margin-top: 0;
}

@keyframes zoomIn { 0%{transform:scale(0);opacity:0;}50%{transform:scale(1.1);opacity:1;}100%{transform:scale(1);opacity:1;} }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: all 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity:0; transform: translateY(30px); }
.slide-in-left { animation: slideInLeft 0.8s ease-out; }
.slide-in-right { animation: slideInRight 0.8s ease-out; }
.slide-in-bottom { animation: slideInBottom 0.6s ease-out; } /* New animation */

@keyframes slideInLeft { from { opacity:0; transform:translateX(-50px);} to{opacity:1; transform:translateX(0);} }
@keyframes slideInRight { from { opacity:0; transform:translateX(50px);} to{opacity:1; transform:translateX(0);} }
@keyframes slideInBottom { from { opacity:0; transform: translateY(40px);} to {opacity:1; transform:translateY(0);} }


@media (max-width:768px) {
  .zeba-row { flex-direction: column !important; text-align:center; gap:1.5rem; padding:1.5rem; }
  .zeba-img { width:120px; height:120px; }
  .couple-img-container { justify-content:center; }
}
</style>