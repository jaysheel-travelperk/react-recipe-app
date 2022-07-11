import React, {useEffect, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditButton } from "./Components/Button.style";

const RECIPE_URL = "http://localhost:8000/recipe/recipes/";

function RecipeEdit() {
    let { id } = useParams();
    const currState = useLocation().state;
    const currRecipeId = id;
    const[recipe, setRecipe] = useState();
    const [isLoading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        if(currState) {
            var recipeToEdit = currState.recipe;
            setRecipe(recipeToEdit);
            setLoading(false);
        } else {
            async function getRecipeInfo() {
                var url = `${RECIPE_URL}${currRecipeId}/`;
                const response = await (axios.get(url));
                setRecipe(response.data);
                setLoading(false);
            };
            getRecipeInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let handleSubmit = (event) => {
        event.preventDefault();

        let id = event.target.recipeId.value;
        let description = event.target.description.value;
        let ingredients = [];
        for(let index = 3; index <= event.target.length - 2; index++) {
            let name = event.target[index].value;
            let ingName = {name};
            ingredients.push(ingName);
        }
        let name = event.target.name.value;

        let body = {name, description, ingredients};

        let url = `${RECIPE_URL}${id}/`;

        async function editRecipe() {
            axios.patch(url, body, {headers: {'content-type': 'application/json'},});
        };
        editRecipe();

        navigate('/recipe/' + id);
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Edit recipe: {currRecipeId}</h1>
                </div>
                
                <label>Id: </label><input readOnly name='recipeId' defaultValue={currRecipeId} />
                <br/>

                <label>Name: </label>
                <input type='text' name='name' defaultValue={recipe.name} />
                <br/>

                <label>Description: </label>
                <input type='text' name='description' defaultValue={recipe.description} />
                <br/>
                
                <label>Ingredients: </label>
                {recipe.ingredients.map((item, index) => (
                    <input type='text' name={'ingredient-'+index} key={'ingredient-'+index} defaultValue={item.name} />
                ))}
                <br/>

                <br/>
                <EditButton type="submit">
                    Submit
                </EditButton>
            </form>
        </div>
    );
}

export default RecipeEdit;