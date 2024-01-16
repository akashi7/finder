import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function List() {
  const [data, setData] = useState([])

  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  async function Listdata() {
    const config = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    fetch(`http://localhost:5000/api/v1/authority/notifications`, config)
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
  }, [])

  return (
    <div>
      <div>
        <div className=' flex justify-center mt-5'>
          <div className='text-3xl text-red-400'>Cases notification</div>{' '}
        </div>
        <div className='text-center'>
          {data.length === 0 ? (
            <div className='text-3xl mt-5'> No record </div>
          ) : (
            <div>
              {data.map((list, idx) => (
                <div
                  key={idx}
                  className='m-5 p-5 border hover:cursor-pointer'
                  onClick={() => navigate(`/auth/one/${list.id}`)}
                >
                  <div className='flex justify-between items-center'>
                    <div> {moment(list.createdAt).format('YYYY-MM-DD')} </div>
                    <div> {list.fullName} </div>
                    <div
                      className={`${
                        list.notified !== 'NOTIFIED'
                          ? 'bg-red-400'
                          : ' bg-green-400'
                      } p-3 text-white`}
                    >
                      {list.notified}
                    </div>
                    <div
                      className={`${
                        list.status !== 'VIEWED'
                          ? 'bg-red-400'
                          : ' bg-green-400'
                      } p-3 text-white`}
                    >
                      {list.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
