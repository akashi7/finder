import { Layout, notification } from 'antd'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [state, setState] = useState({
    phone: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function validateTelephone(telephone) {
    const isValid = /^\d{10}$/.test(telephone)
    return isValid
  }

  async function login(e) {
    e.preventDefault()

    const testing = validateTelephone(state.phone)

    if (testing) {
      setLoading(true)
      const config = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(state),
      }
      fetch(`http://localhost:5000/api/v1/auth/user-login`, config)
        .then(async (ree) => {
          setLoading(false)
          if (ree.status === 200) {
            const res = await ree.json()
            localStorage.setItem('token', res?.data?.token)
            if (res.data.user.role === 'RELATIVE') {
              navigate('/re/')
            } else {
              navigate('/auth/')
            }
          }
        })
        .catch((ee) => {
          console.log({ ee })
          setLoading(false)
        })
    } else {
      notification.error({
        placement: 'topRight',
        message: 'Please enter a valid 10-digit phone number.',
        duration: 5,
        key: 'error',
      })
    }
  }

  return (
    <Layout className='bg-white'>
      <div className='flex justify-center'>
        <div className='text-3xl font-bold text-red-400'>Login</div>
      </div>
      <div className=' w-[100%] flex justify-center  mt-[100px] '>
        <form onSubmit={login}>
          <div className='mx-auto w-[80%]'>
            <input
              placeholder='telephone'
              name='phone'
              className='login-input'
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
            <input
              placeholder='password'
              name='password'
              className='login-input'
              type='password'
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />

            <button
              className='login-button bg-yellow-400'
              type='submit'
              disabled={loading}
            >
              {loading ? 'loading.....' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
