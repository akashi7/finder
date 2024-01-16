import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import ListChildren from '../components/home/childrenList'
import HomeNav from '../components/home/header'
import Login from '../components/home/login'
import OneChild from '../components/home/oneChild'
import SendNotification from '../components/home/sendNotification'
import Signup from '../components/home/signup'

export default function HomeRoutes() {
  return (
    <Layout className='h-screen w-full bg-white'>
      <div className='fixed top-0  z-50 w-full'>
        <HomeNav />
      </div>
      <div className='bg-white mt-[100px]'>
        <Routes>
          <Route path='/' element={<ListChildren />} />
          <Route path='/child/:id' element={<OneChild />} />
          <Route path='/notification/:id' element={<SendNotification />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Layout>
  )
}
