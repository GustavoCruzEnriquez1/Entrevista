
document.addEventListener('DOMContentLoaded',function(){
const charactersDiv = document.getElementById('characters');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');


let character =[];

function displayCharacters(charactersToDisplay){
    charactersDiv.innerHTML ='';

    charactersToDisplay.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.classList.add('character');

        const name= document.createElement('h2');
        name.textContent = character.name;

        const image = document.createElement('img');
        image.src = character.image;

        characterElement.append(name);
        characterElement.appendChild(image);
        charactersDiv.appendChild(characterElement);
        
    });
}


fetch('https://hp-api.onrender.com/api/characters')
.then(response => response.json())
.then(data => {
    character = data;
    
    data.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.classList.add('character');

        const name = document.createElement('h2');
        name.textContent = character.name;
        
        characterElement.appendChild(name);
        charactersDiv.appendChild(characterElement);

        const image= document.createElement('img');
        //image.src = character.name;//
        image.src = character.image.replace(/^http:/,'https:');
        characterElement.appendChild(name);
        characterElement.appendChild(image);
        charactersDiv.appendChild(characterElement);
    });
})
.catch(error =>{
    console.error('Error fetching data:',error);
});

searchButton.addEventListener('click',function(){
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCharacters = character.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
        );
        displayCharacters(filteredCharacters);
})



});