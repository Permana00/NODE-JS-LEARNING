const express = require("express")
const { DataTypes } = require("sequelize")
const app = express()
const sequelize = require("./models/index").sequelize
const User = require("./models/user")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.get("/get_route", (req, res) => {
//     res.status(300).json({message: "Halo Dari server"})
// })

// app.post("/create_route", (req, res) => {
//     console.log(req.body);
//     res.status(300).json({message: "Dibuat Dari server"})
// })

app.post("/create_user", async (req, res) => {
    const data = await User(sequelize, DataTypes).create(req.body)
    res.status(201).json({message: "success created user", data: data})
})

app.get("/get_user", async (req, res) => {
    const data = await User(sequelize, DataTypes).findAll()
    res.status(201).json({message: "success get all user", data: data})
})

app.listen(3000, console.log("Listening at " + 3000))