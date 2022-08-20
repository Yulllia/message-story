const { Router, response } = require("express");
const router = Router();
const fs = require("fs");
module.exports = router;
const fetch = require("node-fetch");

const User = require("../models/User");
const Message = require("../models/Message");
const UserData = require("../models/UserData");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const { ObjectId } = require("mongodb");

// /api/auth/register
router.post(
  "/register",
  [
    check("password", "Minimum length password 6 letter").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Minimum length password 6 letter",
        });
      }
      let { password, name, id } = req.body;
      const candidate = await User.findOne({ name });
      if (candidate) {
        return res.status(400).json({ message: "User already exist" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ password: hashedPassword, name, id });
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "24h",
      });
      await user.save();
      res.json({
        token,
        name: user.name,
        links: user.links,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Try again!" });
    }
  }
);

router.post(
  "/login",
  [check("password", "Водьте пароль").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Input is not valid!",
        });
      }
      const { password, name } = req.body;
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(400).json({ message: "User not found!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password incorrect!" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "24h",
      });
      res.json({
        token,
        name: user.name,
        links: user.links,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Try again!" });
    }
  }
);

router.post("/login/facebook", async (req, res) => {
  const { userId, accessToken, image} = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/${userId}?access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(async (response) => {
      let { id, name } = response;

      const user = await User.findOne({ idFacebook: id });
      if (!user) {
        try {
          const user = new User({ name, idFacebook: id });
          // const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
          //   expiresIn: "24h",
          // });
          await user.save();
          res.json({
            token,
            name: user.name,
            idFacebook: user.idFacebook,
            image:image
          });
        } catch (e) {
          res.status(500).json({ message: "Try again!" });
        }
      }
      try {
        const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
          expiresIn: "24h",
        });
        res.json({
          token,
          name: user.name,
          idFacebook: user.idFacebook,
          image:image
        });
      } catch (e) {
        res.status(500).json({ message: "Try again!" });
      }
    });
});

router.get("/getUserChat", async (req, res) => {
  try {
    const userData = await UserData.find()
    res
      .status(201)
      .json({
        data: userData,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Оновіть ще раз" });
  }
});



router.post("/message", async (req, res) => {
  try {
    const { from, name, message, date} = req.body;

    const messageData = new Message({ from:from, name: name, message:message, date:date});
    await messageData.save();
    res
      .status(200)
      .json({
        data: messageData,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Оновіть ще раз" });
  }
});

router.get("/message", async (req, res) => {
  try {
    const name = req.params.messageName;
    const message = await Message.find();

    res.status(200).json({ message: message });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Оновіть ще раз" });
  }
});

