import { useEffect, useState } from 'react'

export default function List() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')

  async function Listdata() {
    setLoading(true)
    const config = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    fetch(`http://localhost:5000/api/v1/relative/missing-children`, config)
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

  useEffect(() => {
    Listdata()
  }, [])

  return (
    <div>
      <div className='flex justify-center mt-[20px]'>
        <div className='text-red-400 text-3xl'>My List</div>
      </div>
      <div className='w-[80%] mx-auto mt-[10px]'>
        {loading ? (
          <div className='text-center text-red-400 mt-[10px]'>
            Loading.................
          </div>
        ) : (
          <div className='flex flex-wrap'>
            {data.length === 0 ? (
              <div>List empty</div>
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
    </div>
  )
}
