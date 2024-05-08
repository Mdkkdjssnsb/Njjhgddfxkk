const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports.config = {
    name: "pinterest",
    version: "1.0.0",
    role: 0,
    credits: "ArYAN",
    description: "Image search",
    hasPrefix: true,
    commandCategory: "Search",
    usages: "${prefix}pin [query]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
    try {
        const keySearch = args.join(" ");
        if (!keySearch.includes("-")) {
            return api.sendMessage(
                "⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗔𝗰𝘁𝗶𝗼𝗻\n━━━━━━━━━━━━\n\nPlease enter the search query and number of images. (1-99)",
                event.threadID
            );
        }

        const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
        let numberSearch = parseInt(keySearch.split("-").pop()) || 99;
        if (numberSearch > 99) {
            numberSearch = 99;
        }

        const apiUrl = `https://aryan-apis.onrender.com/api/pinterest2?search=${encodeURIComponent(keySearchs)}&keysearch=${numberSearch}&key=loveyou`;

        const res = await axios.get(apiUrl);
        const data = res.data.result;
        const imgData = [];

        for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
            const imgResponse = await axios.get(data[i], {
                responseType: "arraybuffer"
            });
            const imgPath = path.join(__dirname, `${i + 1}.jpg`);
            await fs.promises.writeFile(imgPath, imgResponse.data, 'binary');
            imgData.push(fs.createReadStream(imgPath));
        }

        await api.sendMessage({
            body: `🖼️|𝗣𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁\n━━━━━━━━━━━━\n\nHere| are the top ${numberSearch} results for your query ${keySearchs}`,
            attachment: imgData,
        }, event.threadID);

        for (let i = 0; i < imgData.length; i++) {
            await fs.promises.unlink(path.join(__dirname, `${i + 1}.jpg`));
        }

    } catch (error) {
        console.error(error);
        return api.sendMessage(
            `⛔| Invalid response from API.`,
            event.threadID
        );
    }
};
