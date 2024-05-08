module.exports.config = {
    name: 'sim',
    version: '1.0.0',
    role: 0,
    description: "Engage in conversation with an AI bot",
    usage: "sim [prompt]",
    credits: 'Developer',
    cooldown: 3,
	  hasPrefix: false,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const input = args.join(" ");

    if (!input) {
        api.sendMessage("⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗔𝗰𝘁𝗶𝗼𝗻\n━━━━━━━━━━━━\n\nPlease provide a text prompt.", event.threadID, event.messageID);
        return;
    }
    try {  
        const content = encodeURIComponent(input);
        const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${content}&filter=false`);
        const responseData = response.data;
        if (responseData.error) {
            api.sendMessage("An error occurred. Please try again later.", event.threadID, event.messageID);
        } else {
            api.sendMessage(`🔎|𝗦𝗶𝗺𝗶𝗦𝗶𝗺𝗶\n━━━━━━━━━━━━\n\n${responseData.success}`, event.threadID, event.messageID);
        }
    } catch (error) {
        api.sendMessage("An error occurred while fetching the data.", event.threadID, event.messageID);
    }
};
