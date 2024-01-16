import { useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  return (
    <header className='bg-[#F5F5F5] text-black p-5 flex  justify-end w-full border'>
      <div className='flex flex-row gap-5 items-center'>
        <p
          className='text-xl hover:cursor-pointer text-red-400'
          onClick={() => {
            navigate(`/`)
            localStorage.removeItem('token')
          }}
        >
          Log out
        </p>
      </div>
    </header>
  )
}
