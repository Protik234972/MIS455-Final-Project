const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

let fullMealData = [];

function searchMeals() {
    console.log("searchMeals function is called");
    const searchText = document.getElementById('searchInput').value;
    console.log("Search text:", searchText);
    fetch(apiUrl + searchText)
        .then(response => response.json())
        .then(data => {
            console.log("Data received:", data);
            fullMealData = data.meals || [];
            if (fullMealData.length > 0) {
                displayMeals(fullMealData.slice(0, 5));
                document.getElementById('showAllButton').style.display = fullMealData.length > 5 ? 'block' : 'none';
            } else {
                displayNoResults();
            }
        }).catch(error => {
            console.error("API fetch error:", error);
            displayNoResults();
        });
}

function displayNoResults() {
    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerHTML = '<p class="text-center">No results found.</p>';
    document.getElementById('showAllButton').style.display = 'none'; // Hide SHOW ALL button if no results
}


    function displayMeals(meals) {
        const mealContainer = document.getElementById('mealContainer');
        mealContainer.innerHTML = ''; 
        meals.forEach((meal, index) => {
            const mealElement = document.createElement('div');
            mealElement.className = 'card mb-3'; 
            mealElement.innerHTML = `
                <div class="card-body">
                <div class="row g-0 align-items-center">   
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded" alt="${meal.strMeal}" style="width: 300px; height: 300px;">
                    </div>
                    <div class="col-md-8">
                        <div>
                            <h5 class="meal-title">${meal.strMeal}</h5>
                            <span class="meal-id">ID: ${meal.idMeal}</span>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <ul class="ingredients-grid">
                            ${getIngredients(meal)}
                        </ul>
                    </div>
                    <div class="col-12 mt-2">
                        <div id="instructions-${index}" class="instructions" style="display: none;">
                            <strong>Instructions:</strong>
                            <p>${meal.strInstructions}</p>
                        </div>
                        <button class="btn btn-success mt-2" onclick="toggleInstructions(${index})">Full Details</button>
                    </div>
                </div>

            
            `;
            mealContainer.appendChild(mealElement);
        });
    }
    
    function getIngredients(meal) {
        let ingredients = '';
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
                ingredients += `<li class="ingredient-item">${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
            }
        }
        return ingredients;
    }
    
    
    function toggleInstructions(index) {
        const instructionsElement = document.getElementById(`instructions-${index}`);
        if (instructionsElement.style.display === "none") {
            instructionsElement.style.display = "block";
        } else {
            instructionsElement.style.display = "none";
        }
    }
    
    

document.getElementById('showAllButton').addEventListener('click', () => {
    displayMeals(fullMealData);
    document.getElementById('showAllButton').style.display = 'none';
});