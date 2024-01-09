const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/views"))


app.get("/", (req, res) => {
    console.log("hehe")
    res.render("index")
});


const userRouter = require("./routes/users")
app.use("/users", userRouter)


app.listen(1500); 