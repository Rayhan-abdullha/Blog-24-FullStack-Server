const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postsRoute = require("./routes/post")
const categoryRoute = require("./routes/categories");
const multer = require("multer")
const path = require("path")


app.use(express.json())
app.use("/images", express.static(path.join(__dirname,"/images")))

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to Mongodb"))
.catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("file has been uploded")
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postsRoute)
app.use("/api/categories", categoryRoute)

app.listen("5000", () => {
    console.log('listing port is 5000')
})