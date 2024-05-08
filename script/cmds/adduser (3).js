module.exports.config = {
	name: "adduser",
	version: "1.0.1",
	role: 0,
	aliases: ["add"],
	credits: "Yan Maglinte",
	description: "Add user to group by user uid or FB link.",
	cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
	const { threadID, messageID } = event;
	const botID = api.getCurrentUserID();
	const out = msg => api.sendMessage(msg, threadID, messageID);
	var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
	participantIDs = participantIDs.map(e => parseInt(e));
	if (!args[0]) return out("⛔| 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗔𝗰𝘁𝗶𝗼𝗻\n━━━━━━━━━━━━\n\n𝖯𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝖺𝗇 𝖨𝖽/𝖫𝗂𝗇𝗄 𝗉𝗋𝗈𝖿𝗂𝗅𝖾 𝗎𝗌𝖾𝗋 𝗍𝗈 𝖺𝖽𝖽.");
	if (!isNaN(args[0])) return adduser(args[0], undefined);
	else {
		try {
			var [id, name, fail] = await getUID(args[0], api);
			if (fail === true && id !== null) return out(id);
			else if (fail === true && id === null) return out("User ID not found.");
			else {
				await adduser(id, name || "Facebook users");
			}
		} catch (e) {
			return out(`${e.name}: ${e.message}.`);
		}
	}

	async function adduser(id, name) {
		id = parseInt(id);
		if (participantIDs.includes(id)) return out(`✅| 𝗔𝗹𝗿𝗲𝗮𝗱𝘆 𝗘𝘅𝗶𝘀𝘁𝘀\n━━━━━━━━━━━━\n\n${name ? name : "Member"} 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.`);
		else {
			var admins = adminIDs.map(e => parseInt(e));
			try {
				await api.addUserToGroup(id, threadID);
			}
			catch {
				return out(`⛔| 𝗙𝗮𝗶𝗹𝗲𝗱\n━━━━━━━━━━━━\n\n𝖢𝖺𝗇'𝗍 𝖺𝖽𝖽 ${name ? name : "user"} 𝗂𝗇 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.`);
			}
			if (approvalMode === true && !admins.includes(botID)) return out(`Added ${name ? name : "member"} to the approved list !`);
			else return out(`✅ | 𝗔𝗱𝗱𝗲𝗱 𝗨𝘀𝗲𝗿\n━━━━━━━━━━━━\n\n𝖠𝖽𝖽𝖾𝖽 ${name ? name : "member"} 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉!`);
		}
	}
}
