import { Layout, notification } from 'antd'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function SendNotification() {
  const location = useLocation()
  const { id } = useParams()
  const Datas = location.state

  console.log({ Datas })

  const [state, setState] = useState({
    fullName: '',
    phone: '',
    notification: '',
  })

  const [loading, setLoading] = useState(false)

  function submit(e) {
    e.preventDefault()
    setLoading(true)
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(state),
    }
    fetch(`http://localhost:5000/api/v1/children/notification?id=${id}`, config)
      .then(async (ree) => {
        setLoading(false)
        if (ree.status === 201) {
          notification.success({
            placement: 'topRight',
            message: 'Notification sent Successfully',
            duration: 5,
            key: 'success',
          })
          setState({ ...state, phone: '', notification: '', fullName: '' })
        }
      })
      .catch((ee) => {
        console.log({ ee })
        setLoading(false)
      })
  }
  return (
    <Layout className='bg-white'>
      <div className='flex justify-center'>
        <div className='text-3xl font-bold'>send notification</div>
      </div>
      <div className=' w-[100%] flex justify-center  mt-[100px]'>
        <form onSubmit={submit}>
          <div>
            <input
              placeholder='name'
              name='fullName'
              className='login-input'
              value={state.fullName}
              onChange={(e) => setState({ ...state, fullName: e.target.value })}
            />
            <input
              placeholder='telephone'
              name='phone'
              className='login-input'
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
            <textarea
              name='notification'
              cols='50'
              placeholder='message'
              value={state.notification}
              onChange={(e) =>
                setState({ ...state, notification: e.target.value })
              }
              className='border w-full ml-[10px] mt-[10px] p-5 '
            ></textarea>
            <button className='login-button' type='submit' disabled={loading}>
              {loading ? 'Loading....' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
