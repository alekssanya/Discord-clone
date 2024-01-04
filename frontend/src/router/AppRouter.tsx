import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('../components/App'))

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={
        <Suspense fallback={<>...</>}>
          <Home />
        </Suspense>}
      />
    </Routes>
  )
}

export default AppRouter
