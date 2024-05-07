const axios = require("axios");

module.exports.config = {
    name: 'lyrics',
    version: '1.0.0',
    role: 0,
    description: "This command allows you to search for song lyrics from Google.",
    usage: "${prefix}lyrics [songName]",
    credits: 'ArYAN',
    cooldown: 0,
    hasPrefix: true,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const songName = args.join(" ");
        if (!songName) {
            api.sendMessage(`⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗧𝗶𝘁𝗹𝗲\n\n➤ Please provide a song name!`, event.threadID);
            return;
        }

        const apiUrl = `https://aryan-apis.onrender.com/api/lyrics?songName=${encodeURIComponent(songName)}&key=loveyou`;
        const response = await axios.get(apiUrl);
        const { lyrics, title, artist, image } = response.data;

        if (!lyrics) {
            api.sendMessage(`⛔ 𝗡𝗼 𝗗𝗮𝘁𝗮\n\n➤ Sorry, lyrics not found. Please provide another song name!`, event.threadID);
            return;
        }

        let message = `🎶 𝗟𝗬𝗥𝗜𝗖𝗦\n\nℹ️ 𝗧𝗶𝘁𝗹𝗲\n➪ ${title}\n👑 𝗔𝗿𝘁𝗶𝘀𝘁\n➪ ${artist}\n🔎 𝗟𝘆𝗿𝗶𝗰𝘀\n━━━━━━━━━━━━━━━\n${lyrics}`;
        let attachment = await global.utils.getStreamFromURL(image);
        api.sendMessage({ body: message, attachment }, event.threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage(`⛔ 𝗡𝗼 𝗗𝗮𝘁𝗮\n\n➤ Sorry, lyrics not found. Please provide another song name!`, event.threadID);
    }
};
