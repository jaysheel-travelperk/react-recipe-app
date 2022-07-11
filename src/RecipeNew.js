import React, {useEffect, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { SaveButton } from "./Components/Button.style";


const RECIPE_URL = "http://localhost:8000/recipe/recipes/";

function RecipeNew() {
    let navigate = useNavigate();

    let handleSubmit = (event) => {
        event.preventDefault();

        let description = event.target.description.value;
        let ingredients = [];
        for(let index = 3; index <= event.target.length-2; index++) {
            let name = event.target[index].value;
            let ingName = {name};
            ingredients.push(ingName);
        }
        let name = event.target.name.value;
        let body = {name, description, ingredients};

        var newRecipeId;
        async function newRecipe() {
            const response = await axios.post(
                RECIPE_URL, body,
                {headers: {'content-type': 'application/json'},}
            );
            newRecipeId = response.data.id;
            console.log(response.data);
            console.log(newRecipeId);
            navigate('/recipe/'+newRecipeId);
        }
        newRecipe();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>New Recipe</h1>
                </div>

                <label>Name: </label>
                <input type='text' name='name'/>
                <br/>

                <label>Description: </label>
                <input type='text' name='description'/>
                <br/>

                <label>Ingredients: </label>
                {_.times(3, (index) => (
                    <input type='text' name={'ingredient-'+index} key={'ingredient-'+index} />
                ))}
                <br/>

                <br/>
                <SaveButton className="button submit" type="submit">
                    Submit
                </SaveButton>
            </form>
        </div>
    );
}

export default RecipeNew;