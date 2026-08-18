import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import './index.css'
import App from './App.jsx'

/**
 * main.jsx — application root.
 *
 * Provider order (inside → out):
 *   CartProvider  — can read auth state if ever needed
 *   AuthProvider  — provides auth to entire tree
 *   BrowserRouter — must wrap everything that uses React Router
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
