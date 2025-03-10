import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import Bookscard from '../components/home/Bookscard'
import Bookstable from '../components/home/Bookstable'
const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showTypes, setShowTypes] = useState("table")
    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5555/books/')
            .then((response) => {
                setBooks(response.data.books)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={()=>{setShowTypes('table')}}>
            Table</button>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={()=>{setShowTypes('card')}}>
            card
            </button>
            </div>
            <div className='flex justify-between items-center'></div>
            <h1 className='text-3xl my-8'>Book list</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
            {loading ? (
                <Spinner />
            ):
               showTypes==='table'? (<Bookstable books={books}/>):(<Bookscard books={books}/>)
            }
            </div>
        </>
    )
}

export default Home


