import { Layout } from 'antd'
import { childrenData } from './data'
import { useNavigate } from 'react-router-dom'

export default function ListChildren() {
  const navigate = useNavigate()
  return (
    <Layout className='bg-white'>
      <div className='flex justify-center'>
        <div className='text-3xl text-red-400 font-extrabold'>
          Missing children
        </div>
      </div>
      <div className='w-[80%] mx-auto'>
        <div className='flex flex-wrap'>
          {childrenData.map((list) => (
            <div key={list.id} className='w-[25%] p-4'>
              <div className='w-full h-[300px] relative '>
                <div className='absolute  top-0 left-0 right-0 p-2 bg-red-400 w-[20%] text-center text-white'>
                  <p>Lost</p>
                </div>
                <img
                  src={list.imgSrc}
                  alt={list?.name + 'avatar'}
                  className='w-[100%] h-[100%] object-cover rounded-tr-[20%]  rounded-bl-[20%]  hover:cursor-pointer '
                  onClick={() => navigate(`/child/${list.id}`)}
                />
                <div className='absolute bottom-0 left-0 right-0 p-4 font-extrabold text-3xl text-white text-center '>
                  <p className='text-white '>{list.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
