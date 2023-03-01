const loadMealsData = (searchingMeals = 'fish') => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchingMeals}`;
    fetch(url)
        .then(res => res.json())
        .then(allMeals => displayMeals(allMeals.meals))
}
const displayMeals = (allMeals) => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    allMeals.forEach(meals => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meals.strMeal}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    
                    <!-- Button trigger modal -->
                    <button onclick="mealDetails(${meals.idMeal})" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#mealsModal">
                        Meal Details
                    </button>
                </div>
            </div>
        `
        mealsContainer.appendChild(div);
    });
}

const searchCategory = ()=>{
    const searchingText = document.getElementById('search-field').value;
    loadMealsData(searchingText);
}

const mealDetails = async(idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayMealsDetails(data.meals[0]);
    }
    catch(error){
        console.log(error);
    }

}
const displayMealsDetails = (meal) =>{
    const mealTitle = document.getElementById('mealsModalLabel');
    const mealRecipe = document.getElementById('meal-recipe');
    mealTitle.innerText = meal.strMeal + '  Recipe:';
    mealRecipe.innerHTML = meal.strInstructions;
}
loadMealsData();