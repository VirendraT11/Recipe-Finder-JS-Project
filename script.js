const apiKey = 'afcc8da7359f45b08d4196ece8a8bde1';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes-container');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    fetchRecipes(query);
});

async function fetchRecipes(query) {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&addRecipeInformation=true`);
    const data = await response.json();
    displayRecipes(data.results);
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="content">
                <h2>${recipe.title}</h2>
                <button onclick="saveRecipe('${recipe.id}')">Save</button>
                <button onclick="viewRecipe(${recipe.id})">View</button>
            </div>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

function saveRecipe(recipeId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Recipe saved!');
    } else {
        alert('Recipe is already saved.');
    }
}

async function viewRecipe(recipeId) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
    const recipe = await response.json();
    alert(`Title: ${recipe.title}\n\nInstructions:\n${recipe.instructions}`);
}
