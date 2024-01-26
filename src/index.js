const API_KEY = "live_hERv5iu0qrcV4fxbhLLIylPHuCMXOkJv1eXUoUmVn2DhnbrTeoyfJM5hRegHk84P";
const BASE_URL = "https://api.thecatapi.com/v1";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");


function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }

        return resp.json()
    })
}

fetchBreeds().then((data) => {
    createMarkupOption(data)

}).catch(err => console.log(err))

function createMarkupOption(breeds) {
    const option = breeds.map(breed => 
        `<option value="${breed.id}">${breed.name}</option>`)
        .join('')
    breedSelect.innerHTML = option;
}

function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }

        return resp.json()
    })
}




breedSelect.addEventListener('change', () => {
    const idElement = breedSelect.options[breedSelect.selectedIndex].value;

    fetchCatByBreed(idElement).then((data) => {
        createMarkupBreedInformation(data);
    
    }).catch(err => console.log(err))
})


function createMarkupBreedInformation(breeds) {
    const markup = breeds.map( breed => 
        `<img class ="img" src="${breed.url}" alt="${breed.name}">
        <ul class = "item">
        <li class= "item-breed"><span class = "span">Name:</span> ${breed.breeds[0].name}</li>
        <li class= "item-breed"><span class = "span">Description:</span> ${breed.breeds[0].description}</li>
        <li class= "item-breed"><span class = "span">Temperament:</span>${breed.breeds[0].temperament}</li>
        </ul>`).join('');

        catInfo.innerHTML = markup;
}