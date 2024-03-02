import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import PageNotFound from "../pages/PageNotFound";
import SignupPage from "../pages/SignupPage";
import RecipeInspirationPage from "../pages/RecipeInspirationPage";
import MealDetailPage from "../pages/MealDetails";
import AboutPage from "../pages/AboutPage";
import CreatePostPage from "../pages/CreatePostPage";
import ProtectedRoute from "./ProtectedRoutes";
import ProfilePage from "../pages/ProfilePage";
import MainFeedPage from "../pages/MainFeedPage";
import DetailedPostPage from "../pages/DetailedPostPage";
import FavoriteRecipesPage from "../pages/FavoriteRecipesPage";

//component to define all application routes
function AppRoutes(props) {
  return (
    <Routes>
      <Route index element={<Homepage {...props} />} />
      <Route path="signup" element={<SignupPage {...props} />} />
      <Route path="about" element={<AboutPage {...props} />} />
      <Route path="profile" element={<ProtectedRoute><ProfilePage {...props} /></ProtectedRoute>} />
      <Route path="main" element={<ProtectedRoute><MainFeedPage {...props} /></ProtectedRoute>} />
      <Route path="recipe-inspiration" element={<ProtectedRoute><RecipeInspirationPage {...props} /></ProtectedRoute>} />
      <Route path="meal/:mealId" element={<ProtectedRoute><MealDetailPage {...props} /></ProtectedRoute>} />
      <Route path="create-post" element={<ProtectedRoute><CreatePostPage {...props} /></ProtectedRoute>} />
      <Route path="posts/:postId" element={<ProtectedRoute><DetailedPostPage {...props} /></ProtectedRoute>} />
      <Route path="favorite-recipes" element={<ProtectedRoute><FavoriteRecipesPage {...props} /></ProtectedRoute>} />
      {/* special route to handle if none of the above match */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
