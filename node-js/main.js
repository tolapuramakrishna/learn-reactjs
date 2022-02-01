const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', 'views')
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')


app.use('/admin', adminData.router)
app.use(shopRoutes)
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})
app.listen(3000)