import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DelButton, EditButton } from "./Components/Button.style";

const RECIPE_URL = "http://localhost:8000/recipe/recipes/";

function Recipe(params) {
    let { id } = useParams(); 
    const currRecipeId = id;
    const[recipe, setRecipe] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        async function getRecipeInfo() {
            var url = `${RECIPE_URL}${currRecipeId}/`;
            const response = await (axios.get(url));
            setRecipe(response.data);
        };
        getRecipeInfo();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function goToEditPage(recipe) {
        navigate('/recipe/edit/'+ recipe.id, {state: {recipe: recipe}})
    }

    let handleDelete = (recipe) => {
        let url = `${RECIPE_URL}${recipe.id}`;
        
        async function deleteRecipe() {
            await axios.delete(url);
            navigate('/recipes/');
        }
        deleteRecipe();
    }

    return(
        <div>
            <h1>Recipe: {currRecipeId}</h1>
            <pre label='recipe_info'>
                {JSON.stringify(recipe, null, 4)}
            </pre>
            <div>
                <EditButton onClick={() => goToEditPage(recipe)}>
                    <Link to={'/recipe/edit/' + currRecipeId} >Edit</Link>
                </EditButton>

                <DelButton onClick={() => handleDelete(recipe)}>
                    Delete
                </DelButton>
            </div>
        </div>
    );
}

export default Recipe;
