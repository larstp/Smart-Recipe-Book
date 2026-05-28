import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MealPlan from './pages/MealPlan';
import MyRecipes from './pages/MyRecipes';
import Pantry from './pages/Pantry';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="my-recipes" element={<MyRecipes />} />
        <Route path="pantry" element={<Pantry />} />
        <Route path="meal-plan" element={<MealPlan />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
