const express = require('express'); 
const router = express.Router(); 

const {routers} = require("./controller.js")

router.get('/', routers)

module.exports = router