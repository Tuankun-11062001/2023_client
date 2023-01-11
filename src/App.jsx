import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

const Winners = lazy(() => import("./screens/Winners"));
const Game = lazy(() => import("./screens/Game"));
const Infomation = lazy(() => import("./screens/Infomation"));
const FireWork = lazy(() => import("./screens/FireWork"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<FireWork />} />
        <Route path="winner" element={<Winners />} />
        <Route path="game" element={<Game />} />
        <Route path="infomation" element={<Infomation />} />
      </Route>
    </Routes>
  );
}

export default App;
