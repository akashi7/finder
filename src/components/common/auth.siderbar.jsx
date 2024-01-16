import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Authmenus } from '../../routes/menu'
export default function AuthSidebar() {
  const navigate = useNavigate()
  const handleNavigation = (e) => {
    navigate(e.key)
  }
  return (
    <div className='w-[265px] h-[100vh] p-4 flex-col justify-between hidden md:hidden lg:flex border border-r-2'>
      <div className='w-[100%] bg-white mb-2 '>
        <div
          className=' text-3xl  text-red-400 hover:cursor-pointer '
          onClick={() => navigate(`/dash`)}
        >
          Children{' '}
          <span className='p-2 bg-black text-white  rounded-tr-[30%]  rounded-bl-[30%]'>
            {' '}
            finder{' '}
          </span>
        </div>
        <div className='mt-[50px]'>
          <Menu items={Authmenus} mode='inline' onClick={handleNavigation} />
        </div>
      </div>
    </div>
  )
}
