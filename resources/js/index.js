document.addEventListener('DOMContentLoaded', function() {
    //Timer de 3 segundos para mostrar el overlay de la imagen de cabecera
    setTimeout(function() {
        document.querySelector('.background-image').classList.add('blurred');
        document.getElementById('overlayText').classList.add('visible');
    }, 3000);
        // Crear elementos cayendo dinámicamente
    function createFallingItems() {
        const container = document.querySelector('.falling-background');
        const symbols = ['🍁', '🍂', '💍', '🥂'];
        
        for (let i = 0; i < 15; i++) {
            const item = document.createElement('div');
            item.className = 'falling-item';
            item.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            
            // Posición aleatoria
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
     // Crear elementos cayendo
    createFallingItems();

    //Selectores para los elementos de texto de las tarjetas
    const cards = document.querySelectorAll('.card-overlay');
    if (!cards.length) return;

    // inicializa el fade-up effect con IntersectionObserver para cada tarjeta
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));

        // Contador regresivo para la boda
    function updateCounter() {
        // Fecha de la boda: 31 de octubre de 2025
        const eventDate = new Date('2025-10-31T16:00:00');
        const now = new Date();
        const diff = eventDate - now;
        
        // Si el evento ya ha comenzado
        if (diff <= 0) {
            document.querySelector('.counter').innerHTML = '<p class="h5">¡Nuestra boda ha comenzado!</p>';
            return;
        }
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Actualizar los valores en el DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }
    
    // Inicializar el contador y actualizarlo cada segundo
    updateCounter();
    setInterval(updateCounter, 1000);
});

