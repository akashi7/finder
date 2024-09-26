import { useNavigate } from 'react-router-dom'
import image from '../../assets/uok.jpg'

export default function HomeNav() {
  const navigate = useNavigate()
  return (
    <header className='bg-[#F5F5F5] text-black p-5   flex justify-between items-center w-full border'>
      <div
        className=' text-3xl  text-red-400 hover:cursor-pointer w-full  flex flex-row items-center gap-5'
        onClick={() => navigate(`/`)}
      >
        <div>
          Children{' '}
          <span className='p-2 bg-black text-white  rounded-tr-[30%]  rounded-bl-[30%]'>
            {' '}
            finder{' '}
          </span>
        </div>
        <div className='hidden'>
          <p className='text-black'>Nziramuhindo gael</p>
          <p className='text-black'>909809809</p>
        </div>
      </div>
      <div className='w-full flex justify-center '>
        <img src={image} alt='oo' className='w-[10%] hidden ' />
      </div>
      <div className=' w-full flex justify-end'>
        <div className='flex flex-row gap-5 items-center'>
          <p
            className='text-xl hover:cursor-pointer'
            onClick={() => navigate(`/signup`)}
          >
            Sign up
          </p>
          <p
            className='text-xl hover:cursor-pointer text-red-400'
            onClick={() => navigate(`/login`)}
          >
            Login
          </p>
        </div>
      </div>
    </header>
  )
}
