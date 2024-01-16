import { useEffect, useState } from 'react'
import { AiTwotoneNotification } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { notification } from 'antd'

export default function One() {
  const { id } = useParams()
  // const navigate = useNavigate()

  const [data, setData] = useState({})

  const token = localStorage.getItem('token')

  async function Listdata() {
    const config = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    fetch(
      `http://localhost:5000/api/v1/authority/notification?id=${id}`,
      config
    )
      .then(async (ree) => {
        if (ree.status === 200) {
          const res = await ree.json()
          setData(res.data)
        }
      })
      .catch((ee) => {
        console.log({ ee })
      })
  }

  useEffect(() => {
    Listdata()
  }, [id])

  function Notify() {
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    fetch(`http://localhost:5000/api/v1/authority/notify?id=${id}`, config)
      .then(async (ree) => {
        if (ree.status === 201) {
          notification.success({
            placement: 'topRight',
            message: 'Notification sent Successfully',
            duration: 5,
            key: 'success',
          })
        }
      })
      .catch((ee) => {
        console.log({ ee })
      })
  }

  return (
    <div>
      <div className='flex justify-center mt-[10px]'>
        <div className='text-3xl text-red-400'>Notification</div>
      </div>
      <div className='w-[80%] mx-auto  flex justify-center mt-[50px]'>
        <div className='flex justify-between'>
          <div>
            <div className='w-[100%] p-4 '>
              <div className='flex flex-col gap-8'>
                <div>
                  <p className=' font-bold text-2xl'>Nationality</p>
                  <p className=' text-gray-500'> {data?.child?.nationality} </p>
                </div>
                <div>
                  <p className=' font-bold text-2xl'>location</p>
                  <p className=' text-gray-500'> {data?.child?.location} </p>
                </div>
                <div>
                  <p className=' font-bold text-2xl'>Description</p>
                  <p className=' text-gray-500'> {data?.child?.message} </p>
                </div>
                <div>
                  <p className=' font-bold text-2xl'>Telephone</p>
                  <p className=' text-gray-500'> {data?.child?.user?.phone} </p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className='w-[100%] p-4'>
              <div className='w-full h-[300px] relative '>
                <img
                  src={data?.child?.imgSrc}
                  alt={data?.child?.name + 'avatar'}
                  className='w-[100%] h-[100%] object-cover rounded-tr-[20%]  rounded-bl-[20%]  hover:cursor-pointer '
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-[100px]'>
        <div>
          <div
            className='flex flex-row items-center w-full gap-5 bg-red-400 p-5 hover:cursor-pointer'
            onClick={Notify}
          >
            <AiTwotoneNotification className=' ' size={30} />
            <div>
              <p className=' text-white'>Send A Notification</p>
              {/* <p className=' text-white'>with SMS</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
