const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');
const randomBtn = document.querySelector('.random-meal');
const mealData = document.querySelector('.meal-data');
const meals = document.querySelector('.meals');

async function getMealById(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    showMealInfo(data);
}

async function randomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    showMealInfo(data);
}

async function searchMealByIngredient() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value}`);
    const data = await response.json();
    showMealsByIngredient(data);
}

function showMealsByIngredient(data) {
    meals.innerHTML = '';
    mealData.innerHTML = '';
    data.meals.forEach(meal => {
        meals.innerHTML += `<div class="meal">
        <p class="meal-information" data-id="${meal.idMeal}">${meal.strMeal}</p><img src="${meal.strMealThumb}" alt="meal-photo"">
        </div>
        `
    });
}

function showMealInfo(data) {
    const meal = data.meals[0];
    const ingredients = [];
    // Massaging data from API to get an array with ingredients combined with their measures
    for (let i = 1; i <= 20; i++) {
        if (data.meals[0][`strIngredient${i}`]) ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`);
    }
    meals.innerHTML = '';
    mealData.innerHTML = `<div class="meal-info">
    <h3>${meal.strMeal}</h3>
    <img src="${meal.strMealThumb}" alt="meal-photo">
    <p>${meal.strInstructions}</p>
    <div class="ingredients">
    ${ingredients.map(ing => `<div class="ingredient">${ing}</div>`).join('')}
    </div>
    </div>
    `
}

randomBtn.addEventListener('click', randomMeal);
searchBtn.addEventListener('click', searchMealByIngredient);
window.addEventListener('click', function (e) {
    if (e.target.dataset.id) {
        getMealById(e.target.dataset.id);
    }
})