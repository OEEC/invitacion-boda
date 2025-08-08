document.addEventListener("DOMContentLoaded", function () {
    // 🌐 Navbar toggle (versión móvil)
    const toggle = document.getElementById("navbar-toggle");
    const menu = document.getElementById("nav-menu");
    const links = menu.querySelectorAll("a");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    // Cierra el menú al hacer clic en un enlace (solo en móvil)
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                menu.classList.remove("active");
            }
        });
    });
    // 🌟 Efecto de desenfoque y aparición de contenido
    const heroImg = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');

    // Esperar 2 segundos, luego aplicar blur
    setTimeout(() => {
        heroImg.classList.add('blur');
    }, 2000);

    // Esperar un poco más y mostrar el texto
    setTimeout(() => {
        heroContent.classList.add('visible');
    }, 3000);

    // 🍁 Elementos cayendo dinámicamente
    function createFallingItems() {
        const container = document.querySelector('.falling-background');
        const symbols = ['🍁', '🍂', '💍', '🥂'];

        for (let i = 0; i < 15; i++) {
            const item = document.createElement('div');
            item.className = 'falling-item';
            item.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 15 + Math.random() * 15;

            item.style.left = `${left}%`;
            item.style.top = `-${Math.random() * 20}%`;
            item.style.animationDuration = `${duration}s`;
            item.style.animationDelay = `${delay}s`;

            container.appendChild(item);
        }
    }

    createFallingItems();

    // ⏳ Cuenta regresiva
    const weddingDate = new Date("October 31, 2025 20:00:00").getTime();
    const countdown = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "¡Hoy es el gran día!";
        }
    }, 1000);

    // 🎯 Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });

            // Actualizar estado activo
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // 📏 Sombra dinámica en scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.boxShadow = window.scrollY > 100 ? '0 5px 15px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.1)';
    });

    // ✨ Animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // 📩 Formulario de confirmación
  const form = document.getElementById('confirmationForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const companion = document.getElementById('companion').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validación básica
    if (!name || !phone) {
      alert('Por favor completa los campos obligatorios (*)');
      return;
    }

    // ✉️ Mensaje personalizado de WhatsApp
    let message = `¡Hola Oscar y Sol!\n Soy *${name}* y quiero confirmar mi asistencia a su boda.\n`;
    if (companion) {
      message += `👫 *Vendré acompañado de:* ${companion}\n`;
    } else {
      message += `🙂 *Asistiré solo(a)*\n`;
    }
    message += `📞 *Mi teléfono:* ${phone}\n`;


    message += `\n🎉 ¡Estoy muy emocionado(a) por celebrar con ustedes!`;

    // Número de WhatsApp destino (sin espacios ni signos, con código país)
    const phoneNumber = "528701692732"; // ejemplo México

    // Crear enlace
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank');

    // Limpiar formulario (opcional)
    form.reset();

    // Confirmación en pantalla
    alert('¡Gracias por confirmar! Se abrirá WhatsApp para enviar tu confirmación.');
  });

    // 🎵 Música de fondo

    // Botón de música 1
    const sound = new Howl({
        src: ['resources/sound/todo_en_mi_vida.mp3'],
        loop: true,
        volume: 0.5,
        html5: true,
        mute: false
    });

    let musicaIniciada = false;
    const musicBtn = document.querySelector('#botón1');

    musicBtn.addEventListener("click", () => {
        if (!musicaIniciada) {
            sound.play();
            musicBtn.classList.add('active');
            musicaIniciada = true;
        } else {
            const isMuted = sound.mute();
            sound.mute(!isMuted);
            // Cambia el estado visual si lo deseas:
            if (!isMuted) {
                musicBtn.classList.remove('active');
            } else {
                musicBtn.classList.add('active');
            }
        }
    });
});