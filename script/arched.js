const axios = require('axios');

module.exports.config = {
    name: "arched",
    version: 1.0,
    credits: "ArYAN",
    description: "Ask any questions to Orochi Ai",
    hasPrefix: true,
    usages: "{pn} [prompt]",
    aliases: ['arc'],
    cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const prompt = args.join(" ");
        if (!prompt) {
            return api.sendMessage("Please provide a prompt.", event.threadID);
        }
        
        const response = await axios.get(`https://aryan-apis.onrender.com/archedai?prompt=${encodeURIComponent(prompt)}`);
        const answer = response.data.fullResponse;

        await api.sendMessage(answer, event.threadID);
    } catch (error) {
        console.error("Error:", error.message);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
