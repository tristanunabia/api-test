const express = require("express");

const app = express();
const UserRouter = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("/user/login");
});

app.use("/user", UserRouter);

app.listen(3000, () => {
    console.log("Server connected at port 3000");
});