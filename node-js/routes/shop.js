const express = require('express')
const path = require('path')

const adminData = require('./admin')
const router = express.Router()

router.get('/', (req,res) =>{
	// res.send('<p> welcome </p>')
	// res.sendFile(path.join(__dirname, '../', 'views', 'shop-view.html'))
	res.render('shop' , {prods: adminData.products, pageTitle: 'Shop'})
})


module.exports = router