import { Layout, notification } from 'antd'
import { useLocation } from 'react-router-dom'

export default function SendNotification() {
  const location = useLocation()
  const Datas = location.state

  console.log({ Datas })

  function submit(e) {
    e.preventDefault()
    notification.success({
      placement: 'topRight',
      message: 'Notification sent Successfully',
      duration: 5,
      key: 'success',
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
            <input placeholder='name' name='fullName' className='login-input' />
            <input
              placeholder='telephone'
              name='phone'
              className='login-input'
            />
            <button className='login-button'>Send</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
