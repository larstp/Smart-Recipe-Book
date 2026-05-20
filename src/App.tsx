import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Pantry from './pages/Pantry';
import MealPlan from './pages/MealPlan';
import MyRecipes from './pages/my-recipes/MyRecipes';
import { RecipeDetails } from './pages/my-recipes/[id]';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="my-recipes">
          <Route index element={<MyRecipes />} />
          <Route path=":id" element={<RecipeDetails id={1} />} />
        </Route>

        <Route path="pantry" element={<Pantry />} />
        <Route path="meal-plan" element={<MealPlan />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
