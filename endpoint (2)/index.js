const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/get_route", (req, res) => {
    res.status(300).json({message: "Halo Dari server"})
})

app.post("/create_route", (req, res) => {
    console.log(req.body);
    res.status(300).json({message: "Dibuat Dari server"})
})

app.listen(3000, console.log("Listening at " + 3000))