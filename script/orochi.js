const axios = require('axios');

module.exports.config = {
    name: "orochi",
    version: 1.0,
    credits: "ArYAN",
    description: "ask an questions to Orochi Ai",
    hasPrefix: true,
    usages: "{pn} [prompt]",
    aliases: ['chi"],
    cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const prompt = args.join(" ");
        const response = await axios.get(`https://aryan-apis.onrender.com/orochiai?prompt=${encodeURIComponent(prompt)}`);
        const answer = response.data.fullResponse;

        await api.sendMessage(answer, event.threadID);
    } catch (error) {
        console.error("Error:", error.message);
    }
};
