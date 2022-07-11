import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import Recipe from "./Recipe";
import RecipeNew from "./RecipeNew";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="recipes" element={<RecipeList />}/>
        <Route exact path='recipe/edit/:id' element={<RecipeEdit />}/>
        <Route exact path='recipe/:id' element={<Recipe />} />
        <Route exact path='recipe/new' element={<RecipeNew />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
