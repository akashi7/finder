import { Route, Routes } from 'react-router-dom'
import Authority from './routes/authority.route'
import HomeRoutes from './routes/home.route'
import Relative from './routes/relative.route'

function App() {
  return (
    <Routes>
      <Route path='/*' element={<HomeRoutes />} />
      <Route path='/re/*' element={<Relative />} />
      <Route path='/auth/*' element={<Authority />} />
    </Routes>
  )
}

export default App
