//config inicial
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const Animal = require('./models/Animal')

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

//rotas
app.post('/animal', async(req, res) => {
    const {name, age} = req.body
    const animal = {
        breed,
        size,
        puppy
    }

    try {
        await Animal.create(animal)
        res.status(201).json({message: 'Added animal'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

app.get('/animal', async (req, res) => {
    try {
        const animals = await Animal.find()
        res.status(200).json(animals)
    } catch (error) {
        res.status(500).json({erro:error})
    }
  
})

app.get('/animal/:id', async(req, res) =>
{
    const id = req.params.id

    try {
        const animal = await Animal.findOne({_id:id})
        if(!animal) {
            res.status(422).json({message:'Animal not found, sry'})
            return
        }
        res.status(200).json(animal)
    } catch (error) {
        res.status(500).json({erro:error})
    }
})
app.patch('/animal/:id', async(req, res) =>{
    const id = req.params.id
    const {breed, size, puppy} = req.body

    const animal = {
        breed,
        size,
        puppy
    }

    try {
        const updatedAnimal = await Animal.updateOne({_id:id}, animal)
            if(updatedAnimal.matchedCount === 0) {
                res.status(422).json({message:'Animals not found'})
                return
            }
            res.status(200).json(animal)
    }catch(error) {
        res.status(500).json({erro:error})
    }
})

app.delete('/animal/:id', async(req,res) => {

    const id = req.params.id
    const animal = await Animal.findOne({_id:id})

    if(!animal) {
        res.status(422).json({message:'animal not found'})
        return
    }

    try {
        await Animal.deleteOne({_id:id})
        res.status(204).json({message:'Deleted animal'})
    } catch (error) {
        res.status(500).json({erro:error})
    }
})

mongoose.connect('mongodb+srv://vinilemess:mongodb123@fundatectab-cluster.jxjc1x3.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    console.log('Running at port 3000')
    app.listen(3000)
})
.catch((err)=>console.log(err))
