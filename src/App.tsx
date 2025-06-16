import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import StartPage from "./pages/StartPage";
import AnimalsPage from "./pages/AnimalsPage";
import AnimalDetailPage from "./pages/AnimalDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { FeedingProvider } from "./contexts/FeedingContext";


function App() {
  return (
    <FeedingProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StartPage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="animals/:animalId" element={<AnimalDetailPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </FeedingProvider>
  );  
} 
export default App;
