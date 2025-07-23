 document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('attendance-form');
            const submitButton = document.getElementById('submit-button');
            const buttonText = document.getElementById('button-text');
            const loadingOverlay = document.getElementById('loading-overlay');
            
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
            
            // Contador regresivo para el evento
            function updateCounter() {
                const eventDate = new Date('2025-08-15T19:00:00');
                const now = new Date();
                const diff = eventDate - now;
                
                if (diff <= 0) {
                    document.querySelector('.counter').innerHTML = '<p>¡El evento ha comenzado!</p>';
                    return;
                }
                
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            }
            
            // Actualizar el contador cada segundo
            updateCounter();
            setInterval(updateCounter, 1000);
        });