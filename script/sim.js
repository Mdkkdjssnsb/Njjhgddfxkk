module.exports.config = {
    name: "sim",
    version: "1.0.0",
    role: 0,
    aliases: ["Sim"],
    credits: "cliff", //api by mark
    description: "Talk to sim",
    cooldown: 0,
    hasPrefix: false
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { threadID, messageID, senderID } = event;
    let tid = threadID,
        mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("Please type a message to talk simsimi...", tid, mid);
    try {
        const res = await axios.get(`https://69070.replit.app/sim?ask=${content}&lang=en`);
        const respond = res.data.respond;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, mid);
        } else {
            api.sendMessage(respond, tid, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};
