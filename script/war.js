const fs = require('fs');
const path = require('path');
const warJsonPath = path.join(__dirname, 'war.json');

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

const m = [
"ginalit moko putanginamo ka walang iyakan ah bwakananginaka eh",
"gumagamit ka nalang bot ingay mo pa tanginaka ket nga siguro reboot ng cp mo di mo alam dami mong satsat ampota",
"paduduguin ko ulo mo ewan kona lang kung dika mag panic",
"gago ampt palamunin",
"pabigat sa pamilya tanginaka lagay mo na cp mo paluin ka mamaya di kapa nag hugas plato HAHAHAHA tanga ampota",
"asa sa magulang feeling coolkid ang cool mo naman tanginamo pwede kana mamatay",
"syempre mag rereply ka dito tanga ka eh alam mong bot kakausapin mo ulol kanaba?",
"jejemon am.puta liit tite",
"kaya pa ? baka mapahiya ka sa gc nyo leave kana block mo bot HAHAHAHAHA luha mo boi punasan mo na",
"pumapatol sa bot am.puta baka ikaw yung tigang na lalaki na nag papasend ng nudes",
"feeling coolkid amputa babatukan lang kita e",
    "kaya paba? pag naluluha kana stop na ah leave na awa ako sayo eh bata",
    "baka ikaw yung 16 years old na nag cocomment sabi ng minor ah ulol HAHAHAHAHA",
    "Walis kana ng bahay nyo tamo lilipad tsinelas sa mukha mo mamaya",
    "tanginaka ginigigil mo bot ko sarap mong i sidekick with recall putanginaka",
    "gulat ka no ? HAHAHAHA tanga ka kase d moto alam",
    "nagrereply ka palang minumura na kita tanginamo",
    "shempre rereply ka ule dito yakk ilalabas mo pagiging coolkid mo frfr istg",
    "baka pag in-english kita pati nanay mo mahimatay",
    "feeling famous nagmamakaawa i heart profile agoiiii HAHAHAHAHAA LT si tanga",
    "lakas maka myday pangit naman tuwang tuwa pa pag may nag heart napindot lng naman yak",
    "face reveal nga baka puro sipon at luha kna ah HAAHHAHAHA iyakin ka eh",
    "stop naba ako ? baka hiyang hiya kana sa sarili mo leave kana wala kang ambag sa gc nato",
    "wala kang masabi? malamang tanga ka gago ka putangina kang nigga ka HAHAHAHAHA",
    "feeling gwapo/maganda pag hinubad facemask mukhang tilapiang nakawala sa tubig ampota",
    "till next time gago bye na pasok kana sa aquarium mo bawal ka sa lupa mukha kang wtf",
    "tangina mo mamatay kana pabigat ka lang sa pamilya mo e",
    "di kapa minumura umiiyak kana",
    "inutusan ako na dapat nakakadepressed at nakakatraumatize daw",
    "kokotong kotongan lang kita rito e",
    "bye kinginamo pangit"
];

let t = [];
let lastMessageIndex = -1;
const warData = readWarJson();

if (warData.uids) {
  t = warData.uids;
}

const permissions = ["61557118090040"]; 

module.exports.config = {
  name: "war",
  version: "1.0",
  credits: "cliff",
  cooldown: 5,
  role: 1,
  hasPrefix: false,
  description: "launch attack of roasts on someone",
  usage: "{pn} [uid] or [mention]",
  aliases: [],
};

module.exports.run = async function ({ api, event, args }) {
  const command = args[0];
  const { mentions, messageReply, threadID, senderID, messageID } = event;
  const senderIDString = senderID.toString();

  if (!permissions.includes(senderIDString)) {
    await api.sendMessage({
      body: "you are not admin lol",
      attachment: null,
      mentions: []
    }, threadID, messageID);
    return;
  }

  if (command === 'on') {
    const uid = args[1];
    if (uid) {
      t.push(uid);
      writeWarJson({ uids: t });
      await api.sendMessage({
        body: "war command is now on",
        attachment: null,
        mentions: []
      }, threadID, messageID);
    } else {
      await api.sendMessage({
        body: "Please provide a UID to add.",
        attachment: null,
        mentions: []
      }, threadID, messageID);
    }
  } else if (command === "off") {
    const uid = args[1];
    if (uid) {
      t = t.filter(u => u !== uid);
      writeWarJson({ uids: t });
      await api.sendMessage({
        body: "war command is now off",
        attachment: null,
        mentions: []
      }, threadID, messageID);
    } else {
      await api.sendMessage({
        body: "provide uid to remove",
        attachment: null,
        mentions: []
      }, threadID, messageID);
    }
  }
};

module.exports.handleEvent = async function ({ api, event }) {
  const senderID = event.senderID.toString();
  const { mentions, messageReply, threadID, senderID, messageID } = event;
  if (t.includes(senderID) && !this.alphabet.some(a => senderID.includes(a))) {
    let messageIndex = lastMessageIndex + 1;
    if (messageIndex >= m.length) {
      messageIndex = 0;
    }
    const message = m[messageIndex];
    lastMessageIndex = messageIndex;
    await api.sendMessage({
      body: message,
      attachment: null,
      mentions: []
    }, threadID, messageID);
  }
};
