require("dotenv").config();
const express = require("express");
const { DataTypes } = require("sequelize");
const app = express();
const sequelize = require("./models/index").sequelize;
const User = require("./models/user");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const p = require("path");

const storage = multer.diskStorage({
  destination: p.join(__dirname + "/upload"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 3000);
    const splittedFormat = file.mimetype.split("/");
    const extension = splittedFormat[splittedFormat.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const port = process.env.PORT || 3000;

const upload = multer({ storage });

const saltRounds = 10;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(p.join(__dirname + "/upload")));

app.post("/upload-file", upload.single("file"), async (req, res) => {
  console.log(req.file);
  return res.status(200).json({ data: req.file });
});

const authentticate = (req, res, next) => {
  const token = req.headers.authorization;
  const payload = jwt.decode(token, "rahasia");
  if (token) {
    return res.status(200).json({ message: "tidak punya akses" });
  }
  next();
};

app.post("/register", async (req, res) => {
  const hashedPassword = await hash(req.body.password, saltRounds);

  const data = await User(sequelize, DataTypes).create({
    username: req.body.username,
    password: hashedPassword,
  });

  res.status(200).json(data);
});

app.post("/login", async (req, res) => {
  const user = await User(sequelize, DataTypes).findOne({
    where: {
      username: req.body.username,
    },
  });

  const isEligible = await compare(req.body.password, user.password);

  if (!isEligible) {
    return res.status(400).json({ message: "password atau username salah" });
  }

  const token = jwt.sign(req.body, process.env.secret_env);

  res.status(200).json({
    username: req.body.username,
    token,
  });
});

app.delete("/delete_user/:id", authentticate, async (req, res) => {
  await User(sequelize, DataTypes).destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "user berhasil dihapus" });
});

app.listen(port, console.log("Listening at " + port));
