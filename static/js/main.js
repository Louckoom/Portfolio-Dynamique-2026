const projectCards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Si l'élément est dans le champ de vision, on ajoute la classe 'is-visible'
      entry.target.classList.add('is-visible');
    } else {
      // Si l'élément quitte le champ de vision, on retire la classe 'is-visible'
      entry.target.classList.remove('is-visible');
    }
  });
}, {
  // Gardons le même rootMargin pour un déclenchement fluide
  rootMargin: '0px 0px -100px 0px'
});

// Observe chaque carte de projet
projectCards.forEach(card => {
  observer.observe(card);
});

// moodboard

// static/js/main.js
const moodButtons = document.querySelectorAll('.mood-btn');
const resultsContainer = document.querySelector('.moodboard-results');

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.dataset.mood;
        fetchMoodboard(mood);
    });
});

async function fetchMoodboard(mood) {
    try {
        const response = await fetch(`/api/moodboard/${mood}`);
        const data = await response.json();
        displayMoodboard(data);
    } catch (error) {
        console.error('Erreur lors de la récupération du moodboard:', error);
        resultsContainer.innerHTML = '<p>Erreur lors du chargement. Veuillez réessayer.</p>';
    }
}

function displayMoodboard(data) {
    resultsContainer.innerHTML = ''; // Vide le conteneur avant d'afficher les nouveaux résultats

    data.forEach(item => {
        if (item.type === 'color') {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'moodboard-item color-item';
            colorDiv.style.backgroundColor = item.value;
            resultsContainer.appendChild(colorDiv);
        } else if (item.type === 'image') {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'moodboard-item image-item';
            const image = document.createElement('img');
            image.src = `/static/img/${item.value}`;
            imageDiv.appendChild(image);
            resultsContainer.appendChild(imageDiv);
        }
    });
}