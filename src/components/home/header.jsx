import { useNavigate } from 'react-router-dom'

export default function HomeNav() {
  const navigate = useNavigate()
  return (
    <header className='bg-[#F5F5F5] text-black p-5 flex justify-between items-center w-full border'>
      <div
        className=' text-3xl  text-red-400 hover:cursor-pointer '
        onClick={() => navigate(`/`)}
      >
        Children{' '}
        <span className='p-2 bg-black text-white  rounded-tr-[30%]  rounded-bl-[30%]'>
          {' '}
          finder{' '}
        </span>
      </div>
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
    </header>
  )
}
