var express = require("express");
var router = express.Router();
var path = require("path");

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

function sendData() {
  new Promise((resolve, reject) => {
    resolve((ytObj = res.data.items));
  });
}

async function getUser() {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems"
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

/* GET users listing. */
// 路由
router.get("/playListItems", async function (req, res, next) {
  try {
    const playlistItems = [];
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet,contentDetails", // 必填，把需要的資訊列出來
          playlistId: process.env.ID, // 播放清單的id
          maxResults: 20, // 預設為五筆資料，可以設定1~50
          key: process.env.KEY,
        },
      }
    );
    // console.log(response.data);
    playlistItems.push(response.data);
    // 再send裡面一定要是陣列
    res.header("Access-Control-Allow-Origin", '*');
    res.status(200).send(playlistItems);
  } catch (error) {
    console.log(error);
  }
});

router.get("/search", async function (req, res, next) {
  try {
    const playlistItems = [];
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet", // 必填，把需要的資訊列出來
          maxResults: 20, // 預設為五筆資料，可以設定1~50
          q: req.query.q,
          key: process.env.KEY
        }
      }
    );
    // console.log(response.data);
    playlistItems.push(response.data);
    // 再send裡面一定要是陣列
    res.header("Access-Control-Allow-Origin", '*');
    res.status(200).send(playlistItems);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
