const express = require('express')
const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()
const dbUrl = 'mongodb+srv://ikechukwujo45:test123@cluster0.lclwo.mongodb.net/roadroyale'
mongoose.connect(dbUrl)
    .then((result) => {
        app.listen(3000, () => console.log('server listening on port 3000'))
    })
    .catch((err)=> console.log(err))



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/about', (req, res)=>{
    res.render('about')
})
app.get('/cars', (req, res) => {
    
    const cars = [
        { id: 1, image: "images/sedan/sedan1.jpg", title: "Hyundai sedan car", price: '$50/hour',  category: "sedan" },
        { id: 2, image: "images/sport/bydu9.avif", title: "BYD u9 sport car", price: '$100/hour',  category: "sport" },
        { id: 1, image: "images/sedan/sedan2.jpg", title: "BMW M2 sedan car", price: '$50/hour',  category: "sedan" },
        { id: 2, image: "images/sport/sport2.jpg", title: "Mclaren 720s ", price: '$95/hour',  category: "sport" },
        { id: 2, image: "images/sport/sport3.jpg", title: "Mercedes AMG sport", price: '$80/hour',  category: "sport" },
        { id: 2, image: "images/sport/sport4.jpg", title: "Toyota supra 6", price: '$80/hour',  category: "sport" },
        { id: 1, image: "images/sport/sport5.jpg", title: "BYD sport car", price: '$90/hour',  category: "sport" },
        { id: 1, image: "images/sedan/sedan3.jpg", title: "suzuki sedan car", price: '$50/hour',  category: "sedan" },
        { id: 1, image: "images/sedan/sedan4.jpg", title: "Genesis G20 car", price: '$50/hour',  category: "sedan" },
        { id: 1, image: "images/sedan/sedan5.jpg", title: "KIA sedan car", price: '$50/hour',  category: "sedan" },
        { id: 3, image: "images/suv/suv1.jpg", title: "XUV car", price: '$60/hour',  category: "suv" },
        { id: 3, image: "images/suv/suv2.jpg", title: "Hyudai altima car", price: '$60/hour',  category: "suv" },
        { id: 3, image: "images/suv/suv3.jpg", title: "Jeep wrangler", price: '$65/hour',  category: "suv" },
        { id: 3, image: "images/suv/suv4.jpg", title: "Honda Elevate", price: '$60/hour',  category: "suv" },
        { id: 3, image: "images/suv/suv5.jpg", title: "Lexus G600 car", price: '$70/hour',  category: "suv" }
    ]

    res.render('cars', {cars})
})
app.use(authRoutes)
app.use((req, res)=>{
    res.status(404).render('404')
})
