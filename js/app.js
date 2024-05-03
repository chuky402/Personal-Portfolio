document.addEventListener('DOMContentLoaded', () => {
  const projectCarousel = document.getElementById('project-carousel');

  const GITHUB_USERNAME = 'chuky402';
  const SILLYDETAILS_FILENAME = 'Sillydetails.txt';

  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/main/${SILLYDETAILS_FILENAME}`)
          .then(response => response.ok ? response.text() : 'No description available')
          .then(description => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            projectCard.innerHTML = `
                            <h4>${repo.name}</h4>
                            <p>${description}</p>
                        `;

            projectCarousel.appendChild(projectCard);
          });
      });
    })
    .catch(error => console.error('Error fetching repositories:', error));
});
