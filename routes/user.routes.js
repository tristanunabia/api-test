const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async(req, res, next) => {
    const user = await UserModel.findOne({ where: { email: req.body.email } });
    if (user) {
        const password_valid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (password_valid) {
            res.send("ok");
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }
    } else {
        res.status(404).json({ error: "User does not exist" });
    }
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", async(req, res) => {
    const salt = await bcrypt.genSalt(10);
    var user = {
        email: req.body.email,
        pw: req.body.password,
        cpw: req.body.cPassword,
    };

    if (user.pw === user.cpw) {
        var hashedPW = await bcrypt.hash(user.pw, salt);
        try {
            await UserModel.create({ email: user.email, password: hashedPW });
        } catch (err) {
            console.error(err);
        }
        res.redirect("login");
    } else {
        console.log("Password not match!");
    }

    // console.log(User);
});

module.exports = router;