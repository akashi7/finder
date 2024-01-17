import { Layout, notification } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  allProvinces,
  getAllCells,
  getAllDistricts,
  getAllSectors,
  getAllVillages,
} from '../../utils'

export default function Signup() {
  const [state, setState] = useState({
    fullName: '',
    password: '',
    district: '',
    sector: '',
    cell: '',
    phone: '',
    role: 'RELATIVE',
    email: '',
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [sectors, setSectors] = useState([])
  const [cells, setCells] = useState([])
  const [, setVillages] = useState([])
  const [activeProvince, setActiveProvince] = useState('')
  const [activeDistrict, setActiveDistrict] = useState('')
  const [activeSector, setActiveSector] = useState('')
  const [activeCell, setActiveCell] = useState('')

  useEffect(() => {
    allProvinces().then((resp) => setProvinces(resp))
  }, [])
  useEffect(() => {
    if (activeProvince) {
      getAllDistricts(activeProvince).then((resp) => setDistricts(resp))
      setSectors([])
    }
  }, [activeProvince])
  useEffect(() => {
    if (activeDistrict) {
      getAllSectors(activeProvince, activeDistrict).then((resp) =>
        setSectors(resp)
      )
    }
    /*eslint-disable-next-line */
  }, [activeDistrict])
  useEffect(() => {
    if (activeSector) {
      getAllCells(activeProvince, activeDistrict, activeSector).then((resp) =>
        setCells(resp)
      )
    }
    /*eslint-disable-next-line */
  }, [activeSector])
  useEffect(() => {
    if (activeCell) {
      getAllVillages(
        activeProvince,
        activeDistrict,
        activeSector,
        activeCell
      ).then((resp) => setVillages(resp))
    }
    /*eslint-disable-next-line */
  }, [activeCell])

  function validateTelephone(telephone) {
    const isValid = /^\d{10}$/.test(telephone)
    return isValid
  }

  function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const testing = validateTelephone(state.phone)
    if (testing) {
      setState({
        ...state,
        district: districts,
        sector: sectors,
        cell: cells,
      })
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
              placeholder='email'
              name='email'
              className='login-input'
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <input
              placeholder='password'
              name='password'
              className='login-input'
              type='password'
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />

            <select
              className='login-input'
              value={activeProvince}
              onChange={(e) => setActiveProvince(e.target.value)}
            >
              <option value=''>Select Province</option>

              {provinces.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              className='login-input'
              value={activeDistrict}
              onChange={(e) => setActiveDistrict(e.target.value)}
            >
              <option value=''>Select District</option>

              {districts.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              className='login-input'
              value={activeSector}
              onChange={(e) => setActiveSector(e.target.value)}
            >
              <option value=''>Select Sector</option>

              {sectors.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              className='login-input'
              value={activeCell}
              onChange={(e) => setActiveCell(e.target.value)}
            >
              <option value=''>Select Cell</option>

              {cells.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
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
