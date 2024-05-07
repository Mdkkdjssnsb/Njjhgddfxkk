const axios = require('axios');

module.exports.config = {
    name: 'imagine',
    version: '1.0.0',
    role: 0,
    description: "This command allows to create images based on user prompts",
    usage: "${prefix} [prompt]",
    credits: 'ArYAM',
    cooldown: 0,
    hasPrefix: true,
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");
    if (!prompt) {
        return api.sendMessage("⛔ Invalid Usage\n━━━━━━━━━━━━━━━\n\nPlease provide a prompt.", event.threadID);
    }

    try {
        const response = await axios.get(`https://aryan-apis.onrender.com/api/midjourney?prompt=${encodeURIComponent(prompt)}&key=loveyou`);
        const imageStream = response.data;

        await api.sendMessage({
            body: `🖼️ 𝗠𝗶𝗱𝗷𝗼𝘂𝗿𝗻𝗲𝘆\n━━━━━━━━━━━━━━━\n\nHere is your created image.`,
            attachment: imageStream
        }, event.threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage("Failed to generate your imagination.", event.threadID);
    }
};
