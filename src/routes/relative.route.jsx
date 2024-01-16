import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/common/sidebar'
import Create from '../components/dashboard/children/create'
import List from '../components/dashboard/children/list'
import NavBar from '../components/dashboard/navBar'

export default function Relative() {
  return (
    <div className='flex bg-white'>
      <Sidebar />
      <div className='flex-1'>
        <NavBar />
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </div>
    </div>
  )
}
