import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/dashboardPage';
import ProfilesPage from './pages/profilesPage';
import WelcomePage from './pages/WelcomePage';

function App() {

  // const [dashboardCards, setDashboardCards] = useState([]);

  // const handleCardSave = useCallback(
  //   (data) => {
  //     console.log('handleCardSave called with data:', data);
  //     setDashboardCards((prevData) => [...prevData, data]);
  //   },
  //   [setDashboardCards]
  // );

  // // useEffect(() => {
  // //   console.log('Dashboard data updated:', dashboardCards);
  // // }, [dashboardCards]);


  // const noFirstCardArr = dashboardCards.slice(1);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        {/* <Route
            path="/"
            element={<DashboardPage page={1} handleCardSave={handleCardSave} dashboardCards={dashboardCards} noFirstCardArr={noFirstCardArr} />}
          /> */}
          <Route
            path="/dashboard"
            element={<DashboardPage page={1} />}
          />
          {/* <Route path="/profiles" element={<ProfilesPage numberOfPeople={4} handleCardSave={handleCardSave} />} /> */}
          <Route path="/profiles" element={<ProfilesPage page={2} numberOfPeople={4} />} />
        </Routes>
      </BrowserRouter>
      {/* <NavBarComponent></NavBarComponent> */}
    </>
  )
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

export default App;
