const axios = require('axios');
const fs = require('fs');
const path = require('path');
const getFBInfo = require("@xaviabot/fb-downloader");

module.exports.config = {
  name: "mediaDL",
  joinNoti: [],
  leaveNoti: [],
  version: "69",
  credits: "jonell",
  description: "Download media from Facebook" 
}

const downloadDirectory = path.resolve(__dirname, 'cache');

module.exports.handleEvent = async function ({ api, event }) {
   if (event.body !== null) {
    const regEx_tiktok = /https:\/\/(www\.|vt\.)?tiktok\.com\//;
    const link = event.body;
    if (regEx_tiktok.test(link)) {
      api.setMessageReaction("📥", event.messageID, () => {}, true);
      try {
        const response = await axios.post(`https://www.tikwm.com/api/`, { url: link });
        const data = response.data.data;
        const videoStream = await axios({
          method: 'get',
          url: data.play,
          responseType: 'stream'
        });
        const fileName = `TikTok-${Date.now()}.mp4`;
        const filePath = path.join(downloadDirectory, fileName);
        const videoFile = fs.createWriteStream(filePath);

        videoStream.data.pipe(videoFile);

        videoFile.on('finish', () => {
          videoFile.close(() => {
            console.log('Downloaded video file.');

            api.sendMessage({
              body: `𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖳𝗂𝗄𝖳𝗈𝗄 \n\n𝙲𝚘𝚗𝚝𝚎𝚗𝚝: ${data.title}\n\n𝙻𝚒𝚔𝚎𝚜: ${data.digg_count}\n\n𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜: ${data.comment_count}\n\n𝗬𝗔𝗭𝗞𝗬 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃`,
              attachment: fs.createReadStream(filePath)
            }, event.threadID, () => {
              fs.unlinkSync(filePath);
            });
          });
        });
      } catch (error) {
        api.sendMessage(`Error when trying to download the TikTok video: ${error.message}`, event.threadID, event.messageID);
            }
          }
        }

     if (event.body !== null) {
    const fbvid = path.join(downloadDirectory, 'video.mp4');

    if (!fs.existsSync(downloadDirectory)) {
      fs.mkdirSync(downloadDirectory, { recursive: true });
    }

        const facebookLinkRegex = /https:\/\/www\.facebook\.com\/\S+/;

        const downloadAndSendFBContent = async (url) => {
          try {
            const result = await getFBInfo(url);
            let videoData = await axios.get(encodeURI(result.sd), { responseType: 'arraybuffer' });
            fs.writeFileSync(fbvid, Buffer.from(videoData.data, "utf-8"));
            return api.sendMessage({body: "𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖵𝗂𝖽𝖾𝗈\n\n𝗬𝗔𝗭𝗞𝗬 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃", attachment: fs.createReadStream(fbvid) }, event.threadID, () => fs.unlinkSync(fbvid));
          }
          catch (e) {
            return console.log(e);
          }
        };

        if (facebookLinkRegex.test(event.body)) {
          downloadAndSendFBContent(event.body);
      }
   }
}