import { notification } from 'antd'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState([])
  const [state, setState] = useState({
    fullName: '',
    location: '',
    nationality: '',
    message: '',
    imgSrc: '',
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const CLAUD_NAME = 'captionthis'
  const PRESET = 'nest-pay'

  const onDrop = (File) => {
    if (File.length > 0) {
      setFileName(File[0].name)
      setFile(File[0])
    }
  }
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', PRESET)

  const token = localStorage.getItem('token')

  function onSubmit(e) {
    setLoading(true)
    e.preventDefault()

    fetch(`https://api.cloudinary.com/v1_1/${CLAUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(async (resp) => {
        setState({ ...state, imgSrc: resp.secure_url })
        const config = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(state),
        }

        return fetch('http://localhost:5000/api/v1/relative/child', config)
      })
      .then(async (ree) => {
        setLoading(false)
        if (ree.status === 201) {
          notification.success({
            placement: 'topRight',
            message: 'Child added Successfully',
            duration: 5,
            key: 'success',
          })
          setTimeout(() => {
            navigate('/re/')
          }, 5000)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <div className='h-[100%]'>
      <section className='mt-8 px-4'>
        <div className='flex justify-center mb-[10px]'>
          <div className='text-3xl text-red-400'> Add missing child</div>
        </div>
        <section className='space-y-5 lg:space-y-0 '>
          <div className=' flex  flex-row gap-10   p-5 mx-auto w-[80%]'>
            <Dropzone
              multiple={false}
              onDrop={onDrop}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
            >
              {({ getRootProps, getInputProps }) => (
                <section
                  className={`  relative border-dashed border w-[80%] h-[300px]  mt-2 mb-2 ${
                    isDragging ? ' border-everglade-600' : 'border-gray-400'
                  }`}
                >
                  <div
                    {...getRootProps({
                      className:
                        'text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full',
                    })}
                  >
                    <input {...getInputProps()} />
                    {fileName.length > 0 ? (
                      <div className=' font-bold'>{fileName}</div>
                    ) : (
                      <div className='font-bold'>
                        <p>
                          Drag and drop photo here, or click to select photo
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
            <div>
              <form onSubmit={onSubmit}>
                <div className='w-[80%]'>
                  <input
                    placeholder='name'
                    name='fullName'
                    value={state.fullName}
                    className='login-input'
                    onChange={(e) =>
                      setState({ ...state, fullName: e.target.value })
                    }
                  />
                  <input
                    placeholder='location'
                    name='location'
                    className='login-input'
                    value={state.location}
                    onChange={(e) =>
                      setState({ ...state, location: e.target.value })
                    }
                  />
                  <input
                    placeholder='nationality'
                    name='nationality'
                    className='login-input'
                    value={state.nationality}
                    onChange={(e) =>
                      setState({ ...state, nationality: e.target.value })
                    }
                  />
                  <textarea
                    name='notification'
                    id=''
                    cols='50'
                    placeholder='message'
                    value={state.message}
                    className='border w-full ml-[10px] mt-[10px] p-5 '
                    onChange={(e) =>
                      setState({ ...state, message: e.target.value })
                    }
                  ></textarea>

                  <button
                    className='login-button bg-yellow-400'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? 'Loading..' : 'SEND'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}
