import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBook = () => {
  const[book,setBook] = useState({})
  const[loading,setLoading] = useState(false)
  const{id} = useParams()
  useEffect(()=>{
    console.log("useffect triggered")
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setBook(response.data.books)
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
    })
  },[])
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ?(
        <Spinner/>
        ):(
          <div className='flex flex-col border-2 border-sky-700 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-600'>Id</span>
              <span className=''>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-600'>Title</span>
              <span className=''>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-600'>Author</span>
              <span className=''>{book.authorName}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-600'>Year</span>
              <span className=''>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-600'>Created Time</span>
              <span className=''>{new Date(book.createdAt).toLocaleString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-600'>Last update time</span>
              <span className=''>{new Date(book.updatedAt).toLocaleString()}</span>
            </div>
          </div>
      )}
    </div>
  )
}

export default ShowBook