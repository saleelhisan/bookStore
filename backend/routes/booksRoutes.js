import { defaultMaxListeners } from 'events'
import express from 'express'
import { Book } from '../models/booksModel.js'
const router = express.Router()    


router.post('/', async (request, response) => {

    console.log(request.body)
    try {
        if (
            !request.body.title || !request.body.authorName || !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "require all fields"
            })
        }
        const newBook = {
            title: request.body.title,
            authorName: request.body.authorName,
            publishYear: request.body.publishYear,
        }
        const book = await Book.create(newBook)


        return response.status(201).send(book)
    } catch (error) {
        return response.status(501).send(error.message)
    }
})


router.get('/', async (request, response) => {

    try {
        const books = await Book.find({})
        // console.log(books)
        return response.status(200).send({ books: books, count: books.length })
    }
    catch (error) {
        return response.send({ message: error.message })
    }
})

router.get('/:id', async (request, response) => {
    console.log("hotted----------")
    try {
        const { id } = request.params
        const books = await Book.findById(id);
        console.log(books)

        return response.status(200).send({ books: books })
    }
    catch (error) {
        return response.send({ message: error.message })
    }
})

router.put('/:id', async (request, response) => {
    console.log('put request hitted')
    try {
        const { id } = request.params
        if (
            !request.body.title || !request.body.authorName || !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "require all fields"
            })
        }
       const result = await Book.findByIdAndUpdate(id,request.body)
        if(!result){
            return response.status(404).json({
                message:"book not found with this id"
            })
        }else{
            return response.status(200).send({
                message : "book updated successfully",
                result : result
            })
        }

            
    } catch(error) {
        console.log(error)
        return response.status(400).send({
            message:error.message
        })
    }
})

router.delete('/:id',async(request,response)=>{

    console.log('----------')
   try{
    const {id} = request.params
    const deleted = await Book.findByIdAndDelete(id)
    if(deleted){
        return response.status(200).send({
            message:"item deleted",
        })
    }else{
        return response.status(404).send({
            message:"item not found"
        })
    }
   }catch(error){
     return response.status(400).send({
        error:error.message
     })
   }

})


export default router 