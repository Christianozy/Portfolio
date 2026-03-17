/**
 * InnovationPortfolio - Advanced Core v2.0
 * Unified Frontend Controller
 */
class InnovationPortfolio {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;

    this.init();
  }

  init() {
    console.log(
      "%c PORTFOLIO 2.0 ADVANCED CORE INITIALIZED ",
      "background: #7000ff; color: #fff; padding: 5px; border-radius: 5px;",
    );

    this.initReveal();
    this.initParallax();
    this.initMagnetic();
    this.init3DTilt();
    this.initParticles();
    this.initDecipher();
    this.initStats();
    this.initContactForm();
    this.initNavigation();
    this.initSystemClock();
  }

  // --- 1. HUD Decipher Sequence ---
  initDecipher() {
    const targets = document.querySelectorAll("[data-decipher]");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>-_/[]{}*^!#%";

    targets.forEach((target) => {
      const originalText = target.innerText;
      let iteration = 0;
      let interval = null;

      const scramble = () => {
        target.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
          target.classList.remove("deciphering");
        }

        iteration += 1 / 3;
      };

      // Trigger after a short delay for dramatic effect
      setTimeout(() => {
        target.classList.add("deciphering");
        interval = setInterval(scramble, 30);
      }, 500);
    });
  }

  // --- 2. Ambient Data Particle Engine ---
  initParticles() {
    const container = document.getElementById("particles-container");
    if (!container) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    container.appendChild(canvas);

    let particles = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }

  // --- 2. Animation Logic --- (Cursors removed)
  initReveal() {
    const revealOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Trigger nested animations (like counting numbers)
          const statNum = entry.target.querySelector("[data-target]");
          if (statNum) this.animateNumber(statNum);
        }
      });
    }, revealOptions);

    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
  }

  // --- 3. Optimized Parallax Engine ---
  initParallax() {
    const heroBg = document.querySelector(".hero-bg-animated");
    const root = document.documentElement;

    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener("scroll", () => {
      lastScrollY = window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroBg) {
            root.style.setProperty("--parallax-val", `${lastScrollY * 0.4}px`);
          }
          // Header scroll state
          document
            .querySelector("header")
            ?.classList.toggle("scrolled", lastScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- 4. Magnetic Element Logic ---
  initMagnetic() {
    const magnetics = document.querySelectorAll(
      ".btn-primary, .btn-secondary, .logo",
    );
    magnetics.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) translateZ(15px)`;
        el.style.zIndex = "10";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = `translate(0, 0) translateZ(0)`;
        el.style.zIndex = "";
      });
    });
  }

  // --- 5. Realistic 3D Tilt Engine ---
  init3DTilt() {
    const cards = document.querySelectorAll(".glass-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Tilt Calculation (Pitch & Yaw)
        const rotateX = -(mouseY / (rect.height / 2)) * 12;
        const rotateY = (mouseX / (rect.width / 2)) * 12;

        card.style.transform = `
                    perspective(2000px) 
                    translateY(-20px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    translateZ(20px)
                `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `
                    perspective(2000px) 
                    translateY(0) 
                    rotateX(0deg) 
                    rotateY(0deg)
                    translateZ(0)
                `;
      });
    });
  }

  // --- 6. Dynamic Content & Stats ---
  async initStats() {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      const container = document.querySelector(".stats-grid");
      if (!container) return;

      const items = [
        {
          label: "Strategic Deployments",
          val: data.projectsCompleted,
          suffix: "+",
        },
        { label: "Global Clients", val: data.globalClients, suffix: "" },
        { label: "Recognitions Earned", val: data.awardsWon, suffix: "" },
        { label: "Uptime Integrity", val: "99.9", suffix: "%" },
      ];

      container.innerHTML = items
        .map(
          (item) => `
                <div class="stat-item reveal">
                    <h2 class="gradient-text" data-target="${item.val}">${item.val}${item.suffix}</h2>
                    <p>${item.label}</p>
                </div>
            `,
        )
        .join("");

      // Observer needs to know about new elements
      container.querySelectorAll(".reveal").forEach((el) => this.initReveal());
    } catch (err) {
      console.warn("Telemetry feed inactive.");
    }
  }

  animateNumber(el) {
    const target = parseFloat(el.dataset.target);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const val = progress * target;

      el.innerText =
        (target % 1 === 0 ? Math.floor(val) : val.toFixed(1)) +
        (el.innerText.includes("%")
          ? "%"
          : el.innerText.includes("+")
            ? "+"
            : "");

      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // --- 6. Form Handling ---
  initContactForm() {
    const form = document.getElementById("contact-form");
    const formMsg = document.getElementById("form-message");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<span class="status-check"></span> SYNCHRONIZING...';

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
          }),
        });

        const data = await res.json();
        formMsg.className = res.ok ? "success" : "error";
        formMsg.innerHTML = `<strong>${res.ok ? "✓" : "✕"}</strong> ${data.message || data.error}`;
        formMsg.classList.remove("hidden");
        if (res.ok) form.reset();
      } catch (err) {
        formMsg.className = "error";
        formMsg.innerText = "System congestion: Interface offline.";
        formMsg.classList.remove("hidden");
      } finally {
        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      }
    });
  }

  // --- 7. UX & Navigation ---
  initNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        nav.classList.toggle("active");
        document.body.style.overflow = nav.classList.contains("active")
          ? "hidden"
          : "";
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          if (nav?.classList.contains("active")) menuToggle?.click();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // --- 10. System Polish ---
  initSystemClock() {
    // Subtle innovation clock in footer/header if target exists
    const clockEl = document.getElementById("system-clock");
    if (!clockEl) return;

    setInterval(() => {
      const now = new Date();
      clockEl.innerText = now.toLocaleTimeString("en-US", { hour12: false });
    }, 1000);
  }
}

// Spark the ignition
document.addEventListener("DOMContentLoaded", () => new InnovationPortfolio());
