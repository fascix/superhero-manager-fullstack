import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { AddHero } from './pages/AddHero';
import { EditHero } from './pages/EditHero';
import { HeroDetails } from './pages/HeroDetails';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/add-hero"
            element={
              <ProtectedRoute>
                <AddHero />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/edit-hero/:id"
            element={
              <ProtectedRoute>
                <EditHero />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/hero/:id"
            element={
              <ProtectedRoute>
                <HeroDetails />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;