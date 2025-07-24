document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('attendance-form');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Crear elementos cayendo dinámicamente
    function createFallingItems() {
        const container = document.body;
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
    
    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const guestName = document.getElementById('guest-name').value;
        const companionName = document.getElementById('companion-name').value;
        
        // Validación básica
        if (!guestName.trim()) {
            alert('Por favor ingresa tu nombre');
            return;
        }
        
        // Cambiar el texto del botón
        buttonText.textContent = 'Gracias';
        submitButton.disabled = true;
        
        // Mostrar overlay de carga
        loadingOverlay.classList.add('active');
        
        // Simular procesamiento durante 2 segundos
        setTimeout(function() {
            // Codificar los nombres para la URL
            const guestParam = encodeURIComponent(guestName);
            const companionParam = encodeURIComponent(companionName || '');
            
            // Redirigir a la página de invitación con los parámetros
            window.location.href = `invitacion.html?guest=${guestParam}&companion=${companionParam}`;
        }, 2000);
    });
    
    // Contador regresivo para la boda
    function updateCounter() {
        // Fecha de la boda: 15 de octubre de 2025
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
    
    // Crear elementos cayendo
    createFallingItems();
});