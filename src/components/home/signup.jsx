import { Layout } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [state, setState] = useState({
    fullName: '',
    password: '',
    district: '',
    sector: '',
    cell: '',
    phone: '',
    role: 'RELATIVE',
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(state),
    }
    fetch(`http://localhost:5000/api/v1/auth/sign-up`, config)
      .then(async (ree) => {
        setLoading(false)
        if (ree.status === 201) {
          const res = await ree.json()
          localStorage.setItem('token', res?.data?.token)
          navigate('/re/')
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
        <div className='text-3xl font-bold text-red-400'>Sign up</div>
      </div>
      <div className=' w-[100%] flex justify-center  mt-[100px] '>
        <form onSubmit={onSubmit}>
          <div className='mx-auto w-[30%]'>
            <input
              placeholder='name'
              name='fullName'
              className='login-input'
              value={state.fullName}
              onChange={(e) => setState({ ...state, fullName: e.target.value })}
            />
            <input
              placeholder='password'
              name='password'
              className='login-input'
              type='password'
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <input
              placeholder='district'
              name='district'
              className='login-input'
              value={state.district}
              onChange={(e) => setState({ ...state, district: e.target.value })}
            />
            <input
              placeholder='sector'
              name='sector'
              className='login-input'
              value={state.sector}
              onChange={(e) => setState({ ...state, sector: e.target.value })}
            />
            <input
              placeholder='cell'
              name='cell'
              className='login-input'
              value={state.cell}
              onChange={(e) => setState({ ...state, cell: e.target.value })}
            />
            <input
              placeholder='telephone'
              name='phone'
              className='login-input'
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />

            <button
              className='login-button bg-yellow-400'
              type='submit'
              disabled={loading}
            >
              {' '}
              {loading ? 'Loading...' : 'Sign up'}{' '}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
