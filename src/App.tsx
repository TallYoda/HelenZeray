import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'

const sectionRedirects = [
  { path: '/works', hash: 'works' },
  { path: '/about', hash: 'about' },
  { path: '/cv', hash: 'cv' },
  { path: '/press', hash: 'press' },
  { path: '/contact', hash: 'contact' },
] as const

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {sectionRedirects.map(({ path, hash }) => (
            <Route
              key={path}
              path={path}
              element={<Navigate to={`/#${hash}`} replace />}
            />
          ))}
        </Routes>
        <Analytics />
      </div>
    </BrowserRouter>
  )
}
