const express = require("express");
const { DataTypes } = require("sequelize");
const app = express();
const sequelize = require("./models/index").sequelize;
const User = require("./models/user");
const {hash, compare} = require("bcrypt")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/get_route", (req, res) => {
//     res.status(300).json({message: "Halo Dari server"})
// })

// app.post("/create_route", (req, res) => {
//     console.log(req.body);
//     res.status(300).json({message: "Dibuat Dari server"})
// })

//post
app.post("/create_user", async (req, res) => {
  const password = req.body.password;
  const saltRound = 10;
  const hashPassword = await hash(password, saltRound)
  const data = await User(sequelize, DataTypes).create(
    {
      username:req.body.username,
      password: hashPassword,
      isActive:req.body.isActive
    }
  );
  res.status(201).json({ message: "success created user", data: data });
});

//get
app.get("/get_user", async (req, res) => {
  const data = await User(sequelize, DataTypes).findAll();
  res.status(201).json({ message: "success get all user", data: data });
});

//put
app.put("/edit_user/:id", async (req, res) => {
  const id = req.params.id;
  const data = await User(sequelize, DataTypes).update(
    {
      username: req.body.username,
      password: req.body.password,
      isActive: req.body.isActive,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.json({ Message: "berhasil update", data: data });
});

//delete
app.delete("/delete_user/:id", async (req, res) => {
  const id = req.params.id;
  const data = await User(sequelize, DataTypes).destroy({
    where: {
      id: id,
    },
  });
  res.json({ Messsage: `berhasil delete` });
});

app.listen(1000, console.log("Listening at " + 1000));
