// script.js

document.addEventListener('DOMContentLoaded', function () {
    const characterContainer = document.getElementById('characterContainer');
    const searchInput = document.getElementById('searchInput');
    const houseFilter = document.getElementById('houseFilter');

    fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                characterContainer.innerHTML += createCharacterCard(character);
            });

            searchInput.addEventListener('input', filterCharacters);
            houseFilter.addEventListener('change', filterCharacters);

            function filterCharacters() {
                const searchText = searchInput.value.toLowerCase();
                const selectedHouse = houseFilter.value.toLowerCase();

                const filteredCharacters = data.filter(character => {
                    const nameMatches = character.name.toLowerCase().includes(searchText);
                    const houseMatches = selectedHouse === '' || character.house.toLowerCase() === selectedHouse;
                    return nameMatches && houseMatches;
                });

                characterContainer.innerHTML = '';
                filteredCharacters.forEach(character => {
                    characterContainer.innerHTML += createCharacterCard(character);
                });
            }
        });

    function createCharacterCard(character) {
        return `
            <div class="character-card">
                <img src="${character.image || 'default-image.jpg'}" alt="${character.name}" style="max-width: 100%;">
                <h3>${character.name}</h3>
                <p>${character.house}</p>
            </div>
        `;
    }
});
