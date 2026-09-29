import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import MeasurePage from './pages/MeasurePage'
import RecordPage from './pages/RecordPage'
import MedicationPage from './pages/MedicationPage'
import FastPage from './pages/FastPage'
import './App.css'

function App() {
  return (
    <HashRouter>
      <div className="phone">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/measure" element={<MeasurePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/medication" element={<MedicationPage />} />
          <Route path="/fast" element={<FastPage />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
