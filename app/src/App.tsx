import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import MeasurePage from './pages/MeasurePage'
import RecordPage from './pages/RecordPage'
import MedicationPage from './pages/MedicationPage'
import './App.css'

function App() {
  return (
    <HashRouter>
      <div className="phone">
        <Routes>
          <Route path="/" element={<Navigate to="/measure" replace />} />
          <Route path="/measure" element={<MeasurePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/medication" element={<MedicationPage />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
