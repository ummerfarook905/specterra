
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/mainLayout";
import Home from "./pages/home";
import Services from "./pages/services";
import About from "./pages/about";
import Contact from "./pages/contact";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
