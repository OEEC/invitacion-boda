document.addEventListener('DOMContentLoaded', function() {

    setTimeout(function() {
        document.querySelector('.background-image').classList.add('blurred');
        document.getElementById('overlayText').classList.add('visible');
    }, 3000);
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


        // Crear elementos cayendo
    createFallingItems();

});

