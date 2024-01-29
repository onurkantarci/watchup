import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import MyList from "./pages/MyList";
import MovieDetails from "./components/MovieDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MainPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="mylist" element={<MyList />} />
      <Route path="movies/:id" element={<MovieDetails />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
