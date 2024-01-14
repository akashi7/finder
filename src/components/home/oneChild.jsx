import { Layout } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { childrenData } from './data'
import { AiTwotoneNotification } from 'react-icons/ai'

export default function OneChild() {
  const { id } = useParams()

  const navigate = useNavigate()

  const data = childrenData.filter((list) => list.id == id)

  function navigates() {
    navigate(`/notification/${id}`, { state: data })
  }

  return (
    <Layout className='bg-white w-full'>
      <div className='flex justify-center'>
        <div>
          {childrenData
            .filter((list) => list.id == id)
            .map((list) => (
              <div key={list.id} className='font-bold text-2xl text-red-400'>
                {' '}
                {list.name}{' '}
              </div>
            ))}
        </div>
      </div>
      <div className='w-[80%] mx-auto  flex justify-center mt-[50px]'>
        <div className='flex justify-between'>
          <div>
            {' '}
            {childrenData
              .filter((list) => list.id == id)
              .map((list) => (
                <div key={list.id} className='w-[100%] p-4 '>
                  <div className='flex flex-col gap-8'>
                    <div>
                      <p className=' font-bold text-2xl'>Nationality</p>
                      <p className=' text-gray-500'> {list.nationality} </p>
                    </div>
                    <div>
                      <p className=' font-bold text-2xl'>location</p>
                      <p className=' text-gray-500'> {list.location} </p>
                    </div>
                    <div>
                      <p className=' font-bold text-2xl'>Description</p>
                      <p className=' text-gray-500'> {list.message} </p>
                    </div>
                    <div>
                      <p className=' font-bold text-2xl'>Telephone</p>
                      <p className=' text-gray-500'> {list.telephone} </p>
                    </div>
                  </div>
                </div>
              ))}{' '}
          </div>
          <div className='w-full'>
            {childrenData
              .filter((list) => list.id == id)
              .map((list) => (
                <div key={list.id} className='w-[100%] p-4'>
                  <div className='w-full h-[300px] relative '>
                    <img
                      src={list.imgSrc}
                      alt={list?.name + 'avatar'}
                      className='w-[100%] h-[100%] object-cover rounded-tr-[20%]  rounded-bl-[20%]  hover:cursor-pointer '
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-[100px]'>
        <div>
          <div
            className='flex flex-row items-center w-full gap-5 bg-red-400 p-5 hover:cursor-pointer'
            onClick={navigates}
          >
            <AiTwotoneNotification className=' ' size={30} />
            <div>
              <p className=' text-white'>Send A Notification</p>
              <p className=' text-white'>with SMS</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
