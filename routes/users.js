const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
router.use(express.json())

const users = []

router.get("/", (req,res) => {
    res.json(users)
    })
    
router.post("/", (req,res) => {

})    

router.get("/new", (req,res) => {
    res.send("new user form")
})

module.exports = router