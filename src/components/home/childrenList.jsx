import { Layout } from 'antd'
// import { childrenData } from './data'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ListChildren() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  async function Listdata() {
    setLoading(true)
    const config = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
    fetch(`http://localhost:5000/api/v1/children/missing-children`, config)
      .then(async (ree) => {
        setLoading(false)
        if (ree.status === 200) {
          const res = await ree.json()
          setData(res.data)
        }
      })
      .catch((ee) => {
        console.log({ ee })
        setLoading(false)
      })
  }

  function Navigate(id) {
    navigate(`/child/${id}`, { state: data })
  }

  useEffect(() => {
    Listdata()
  }, [])
  return (
    <Layout className='bg-white'>
      <div className='flex justify-center'>
        <div className='text-3xl text-red-400 font-extrabold'>
          Missing children
        </div>
      </div>
      <div className='w-[80%] mx-auto'>
        {loading ? (
          <div className='text-center text-red-400 mt-[10px]'>
            Loading.................
          </div>
        ) : (
          <div className='flex flex-wrap'>
            {data.length === 0 ? (
              <div className='text-center text-3xl'>List empty</div>
            ) : (
              <>
                {data.map((list) => (
                  <div key={list.id} className='w-[25%] p-4'>
                    <div className='w-full h-[300px] relative '>
                      <div className='absolute  top-0 left-0 right-0 p-2 bg-red-400 w-[20%] text-center text-white'>
                        <p>Lost</p>
                      </div>
                      <img
                        src={list.imgSrc}
                        alt={list?.name + 'avatar'}
                        className='w-[100%] h-[100%] object-cover rounded-tr-[20%]  rounded-bl-[20%]  hover:cursor-pointer '
                        onClick={() => Navigate(list.id)}
                      />
                      <div className='absolute bottom-0 left-0 right-0 p-4 font-extrabold text-3xl text-white text-center '>
                        <p className='text-white '>{list.fullName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
