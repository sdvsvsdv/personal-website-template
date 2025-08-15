import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Articles from './pages/articles/Articles';
import Projects from './pages/projects/Projects.js';
import Speaking from './pages/speaking/Speaking';
import Uses from './pages/uses/Uses';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { BackgorndContext } from './contexts/BackgroundContext.js';
import { useState, useEffect } from 'react';
import DesignSystem from './pages/article details/DesignSystem.js';
import Animaginary from './pages/article details/Animaginary.js';
import CosmosRust from './pages/article details/CosmosRust.js';

function Layout() {
  return (
    <main>
      <div className='main-container'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
}

function App() {
  const [backstate, setBackstate] = useState(false);

  const handleBackground = () => {
    setBackstate(prev => !prev);
  };

  useEffect(() => {
    const container = document.querySelector('.main-container');

    if (backstate) {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      if (container) {
        container.style.backgroundColor = 'white';
        container.style.color = 'black';
      }
    } else {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      if (container) {
        container.style.backgroundColor = '';
        container.style.color = '';
      }
    }
  }, [backstate]);

  return (
    <Router>
      <BackgorndContext.Provider value={{ backstate, handleBackground }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='articles' element={<Articles />} />
            <Route path='articles/design-system' element={<DesignSystem />} />
            <Route path='articles/animaginary' element={<Animaginary />} />
            <Route path='articles/cosmos-rust' element={<CosmosRust />} />
            <Route path='projects' element={<Projects />} />
            <Route path='speaking' element={<Speaking />} />
            <Route path='uses' element={<Uses />} />
          </Route>
        </Routes>
      </BackgorndContext.Provider>
    </Router>
  );
}

export default App;
