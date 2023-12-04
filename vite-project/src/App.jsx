import './App.css'
import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/dashboardPage'
import ProfilesPage from './pages/profilesPage'
import WelcomePage from './pages/WelcomePage'
import { CardProvider } from './CardContext'

function App() {
    return (
        <CardProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route
                        path="/dashboard"
                        element={<DashboardPage page={1} />}
                    />
                    <Route
                        path="/profiles"
                        element={<ProfilesPage numberOfPeople={4} />}
                    />
                </Routes>
            </BrowserRouter>
        </CardProvider>
    )
}

export default App
