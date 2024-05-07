const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
		name: "tempmail",
		role: 2,
		credits: "ArYAN",
		description: "Generate temporary email (auto get inbox)",
		usages: "[tempmail]",
		hasPrefix: false,
		cooldown: 5,
		aliases: ["temp"]
};

module.exports.run = async function ({ api, event }) {
    try {
      if (args.length === 0) {
        return api.sendMessage(this.config.guide.en, event.threadID, event.messageID);
      }

      if (args[0] === "gen") {
        try {
          const response = await axios.get("https://aryan-apis.onrender.com/api/tempmail/get?key=aryan09");
          const responseData = response.data.tempmail;
          api.sendMessage(`📮|𝗧𝗲𝗺𝗽𝗺𝗮𝗶𝗹\n━━━━━━━━━━━━━\n\n𝖧𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽 𝗍𝖾𝗆𝗉𝗆𝖺𝗂𝗅\n\n📍|𝗘𝗺𝗮𝗶𝗹\n➤ ${responseData}`, event.threadID, event.messageID);
        } catch (error) {
          console.error("❌ | Error", error);
          api.sendMessage("❌|Unable to generate email address. Please try again later...", event.threadID, event.messageID);
        }
      } else if (args[0].toLowerCase() === "inbox" && args.length === 2) {
        const email = args[1];
        try {
          const response = await axios.get(`https://aryan-apis.onrender.com/api/tempmail/inbox?email=${email}&key=aryan09`);
          const data = response.data;
          const inboxMessages = data.map(({ from, subject, body, date }) => `📍|𝗧𝗲𝗺𝗺𝗮𝗶𝗹 𝗜𝗻𝗯𝗼𝘅\n━━━━━━━━━━━━━━━\n\n𝖧𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝗍𝖾𝗆𝗉𝗆𝖺𝗂𝗅 𝗂𝗇𝖻𝗈𝗑\n\n🔎 𝗙𝗿𝗼𝗺\n${from}\n📭 𝗦𝘂𝗯𝗷𝗲𝗰𝘁\n➤ ${subject || 'Not Found'}\n\n📝 𝗠𝗲𝘀𝘀𝗮𝗴𝗲\n➤ ${body}\n🗓️ 𝗗𝗮𝘁𝗲\n➤ ${date}`).join('\n\n');
          api.sendMessage(`${inboxMessages}, event.threadID, event.messageID);
        } catch (error) {
          console.error("🔴 Error", error);
          api.sendMessage("❌|Can't get any mail yet. Please send mail first.", event.threadID, event.messageID);
        }
      } else {
        api.sendMessage("❌ | Use 'Tempmail gen' to generate email and 'Tempmail inbox {email}' to get the inbox emails.", event.threadID, event.messageID);
      }

    } catch (error) {
      console.error(error);
      return api.sendMessage(`⛔|An error occurred. Please try again later.`, event.threadID, event.messageID);
    }
  }
};
