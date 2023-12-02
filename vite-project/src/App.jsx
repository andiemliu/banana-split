import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/dashboardPage';
import ProfilesPage from './pages/profilesPage';
import WelcomePage from './pages/WelcomePage';
import { CardProvider } from './CardContext';

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
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<WelcomePage />} />
    //       <Route
    //         path="/dashboard"
    //         element={<DashboardPage page={1} />}
    //       />
    //       <Route path="/profiles" element={<ProfilesPage page={2} numberOfPeople={4} />} />
    //     </Routes>
    //   </BrowserRouter>
    // </>
      <CardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/dashboard" element={<DashboardPage page={1} />} />
            <Route path="/profiles" element={<ProfilesPage numberOfPeople={4} />} />
          </Routes>
        </BrowserRouter>
      </CardProvider>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

export default App;
