import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/dashboardPage';
import ProfilePage from './pages/profilesPage';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage numberOfCards={5}/>} />
          <Route path="/profiles" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      {/* <NavBarComponent></NavBarComponent> */}
    </>
  )
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

export default App;
