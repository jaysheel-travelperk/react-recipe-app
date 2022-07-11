import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { NewButton } from "./Components/Button.style";

const API_URL = "http://localhost:8000/recipe/recipes/";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const response = await (axios.get(API_URL));

            var listOfRecipes = response.data;
            setRecipes(listOfRecipes);
        };
        getData();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function goToNewPage() {
        navigate('/recipe/new/')
    }

    return(
        <div>
            <h1>Recipes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(recipe => (
                        <tr key={recipe.id}>
                            <td><Link to={'/recipe/' + recipe.id} >{recipe.id}</Link></td>
                            <td>{recipe.name}</td>
                            <td>{recipe.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br/>
            <NewButton onClick={() => goToNewPage()}>
                    Create New Recipe
            </NewButton>
        </div>
    );
}

export default RecipeList;