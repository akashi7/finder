import { Route, Routes } from 'react-router-dom'
import AuthSidebar from '../components/common/auth.siderbar'
import NavBar from '../components/dashboard/navBar'
import List from '../components/dashboard/notificatioin/list'
import One from '../components/dashboard/notificatioin/one'

export default function Authority() {
  return (
    <div className='flex bg-white'>
      <AuthSidebar />
      <div className='flex-1'>
        <NavBar />
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/one/:id' element={<One />} />
        </Routes>
      </div>
    </div>
  )
}
