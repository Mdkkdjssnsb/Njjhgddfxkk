const fs = require('fs');
const path = require('path');
const warJsonPath = path.join(__dirname, '/../cache/war.json');

function readWarJson() {
  try {
    const jsonData = fs.readFileSync(warJsonPath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    return {};
  }
}

function writeWarJson(data) {
  fs.writeFileSync(warJsonPath, JSON.stringify(data, null, 2));
}

let t = [];
let lastMessageIndex = -1;

const warData = readWarJson();
if (warData.uids) {
  t = warData.uids;
}

const permissions = ["100093016749575",
  "100087591006635", "61557118090040"];

const insults = [
  "ginalit moko putanginamo ka walang iyakan ah bwakananginaka eh",
  "gumagamit ka nalang bot ingay mo pa tanginaka ket nga siguro reboot ng cp mo di mo alam dami mong satsat ampota.",
  "tanginamo baboy","bakla tatay mo"
  
];

module.exports.config = {
  name: "war",
  version: "1.0",
  credits: "cliff",
  cooldown: 5,
  role: 1,
  hasPrefix: false,
  description: "launch attack of roasts on someone",
  usage: "{pn} [uid] or mention ",
  aliases: [],
};

module.exports.run = async function ({ api, event, args }) {
  const { mentions, messageReply, threadID, senderID, messageID } = event;
  const subCommand = args[0];
  const userId = senderID.toString();

  if (!permissions.includes(userId)) {
    await api.sendMessage({
      body: "shut up gey",
      attachment: null,
      mentions: [],
    }, threadID, messageID);
    return;
  }

  if (subCommand === "on") {
    const uidToAdd = args[1];
    if (uidToAdd) {
      t.push(uidToAdd);
      writeWarJson({ uids: t });
      await api.sendMessage({
        body: `war is on`,
        attachment: null,
        mentions: [],
      }, threadID, messageID);
    } else {
      await api.sendMessage({
        body: "gey give the uid to add",
        attachment: null,
        mentions: [],
      }, threadID, messageID);
    }
  } else if (subCommand === "off") {
    const uidToRemove = args[1] ? args[1].toString() : null;
    if (uidToRemove) {
      t = t.filter(uid => uid !== uidToRemove);
      writeWarJson({ uids: t });
      await api.sendMessage({
        body: `war is off`,
        attachment: null,
        mentions: [],
      }, threadID, messageID);
    } else {
      await api.sendMessage({
        body: "Please provide a UID to remove.",
        attachment: null,
        mentions: [],
      }, threadID, messageID);
    }
  }
};

module.exports.handleEvent = async function ({ api, event }) {
  const { mentions, messageReply, threadID, senderID, messageID } = event;
  const s = senderID.toString();

  if (t.includes(s)) {
    const insult = insults[Math.floor(Math.random() * insults.length)];
    await api.sendMessage({
      body: insult,
      attachment: null,
      mentions: [],
    }, threadID, messageID);
  }
};
