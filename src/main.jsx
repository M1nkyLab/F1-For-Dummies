import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './Pages/Hero.jsx'
import F1Basics from './Pages/F1Basics.jsx';
import CarsAndTyre from './Pages/CarsAndTyre.jsx';
import TeamsAndDrivers from './Pages/TeamsAndDrivers.jsx';
import Tracks from './Pages/Tracks.jsx';
import F1Rules from './Pages/F1Rules.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Hero />
      <F1Basics />
      <CarsAndTyre />
      <TeamsAndDrivers />
      <Tracks />
      <F1Rules />
    </>
  </StrictMode>
)
