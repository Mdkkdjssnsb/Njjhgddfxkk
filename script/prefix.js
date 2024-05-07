const fs = require("fs");

module.exports.config = {
    name: "prefix",
    version: "1.0.1",
    role: 0,
    credits: "ArYAN",
    description: "Display the prefix of your bot",
    hasPrefix: false,
    usages: "prefix",
    cooldown: 5,
    aliases: ["prefix", "Prefix", "PREFIX", "prefi"],
};

module.exports.run = function ({ api, event, prefix, admin }) {
    const { threadID, messageID } = event;

    if (event.body.toLowerCase() === `${prefix}prefix`) {
        api.sendMessage(
            "This command cannot be executed manually.",
            threadID,
            messageID
        );
        return;
    }

    api.sendMessage(
        {
            body: `👑|𝗔𝗨𝗧𝗢𝗕𝗢𝗧\n━━━━━━━━━━━\n\n𝗛𝗲𝗹𝗹𝗼! 𝗠𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝘀 [ ${prefix} ]\n\n𝖠𝗎𝗍𝗈𝖻𝗈𝗍 𝖱𝖾𝗏𝗈𝗅𝗎𝗍𝗂𝗈𝗇𝗂S𝖾𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗌𝗒𝗌𝗍𝖾𝗆, 𝖺𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖾𝖺𝗌y-𝗍𝗈-𝗎𝗌𝖾 𝖺𝗇𝖽 𝖾𝖺𝗌y-to-𝗋𝖾𝗎𝗌𝖾 𝗌𝗍𝗒l𝖾𝗌𝗁𝖾𝖾𝗍𝗌 𝗍𝗁𝖺𝗍 𝖺𝖽𝖽𝗌 𝗎𝗇𝗂𝖼𝗈𝖽𝖾 𝗌𝗍𝗒𝖾𝗅𝖾 𝗍𝗈 𝗒𝗈𝗎𝗋 𝖻𝗈𝗍 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝖾𝖺𝗌𝖾, 𝗐𝗂𝗍𝗁 𝖺 𝖻𝖾𝗍𝗍𝖾𝗋 𝗁𝖺𝗇𝖽𝗅𝗂𝗇𝗀 𝗌𝗒𝗌𝗍𝖾𝗆, 𝖺𝗏𝗈𝗂𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝗂𝗌𝗄 𝗈𝖿 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝗌𝗎𝗌𝗉𝖾𝗇𝗌𝗂𝗈𝗇!\n👑|𝗗𝗲𝘃: https://www.facebook.com/${admin}`,
            },
        threadID,
        (err, messageInfo) => {
            if (err) return console.error(err);

            const voiceFile = fs.readFileSync(__dirname + "/../cache/prefix.jpeg");
            api.sendMessage(
                {
                    attachment: voiceFile,
                    type: "audio",
                    body: "Hey, listen to my prefix information!",
                },
                threadID,
                () => {}
            );
            api.setMessageReaction("✅", messageInfo.messageID, (err) => {}, false);
        }
    );
};
