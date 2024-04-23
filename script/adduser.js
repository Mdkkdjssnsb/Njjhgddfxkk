const axios = require('axios');
const cheerio = require('cheerio');

module.exports.config = {
  name: "adduser",
  version: "1.0.2",
  role: 0,
  hasPermission: 0,
  credits: "cliff",
  description: "Add user to group by UID or Facebook profile link",
  hasPrefix: false,
  commandCategory: "group",
  usages: "adduser [id/link]",
  usage: "[args]",
  aliases: ["add", "Add"],
  cooldowns: 5,
  cooldown: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const botID = api.getCurrentUserID();
  const out = msg => api.sendMessage(msg, threadID, messageID);
  var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
  var participantIDs = participantIDs.map(e => parseInt(e));

  if (!args[0]) return out("Please enter a UID or a Facebook profile link to add.");

  if (!isNaN(args[0])) return adduser(args[0]);
  else {
    try {
      var [id, name, fail] = await getUID(args[0]); 
      if (fail == true && id != null) return out(id);
      else if (fail == true && id == null) return out("User ID not found.")
      else {
        await adduser(id, name || "Facebook user");
      }
    } catch (e) {
      return out(`${e.name}: ${e.message}.`);
    }
  }

  async function adduser(id, name) {
    id = parseInt(id);
    if (participantIDs.includes(id)) return out(`${name} is already in the group.`);
    else {
      var admins = adminIDs.map(e => parseInt(e.id));
      try {
        await api.addUserToGroup(id, threadID);
      }
      catch {
        return out(`Can't add ${name} to the group.`);
      }
      if (approvalMode === true && !admins.includes(botID)) return out(`Added ${name} to the approved list!`);
      else return out(`Added ${name} to the group!`)
    }
  }
}

async function getUID(input) { 
  try {
    const id = await findUid(input);
    const name = await getUserName(id);
    return [id, name];
  } catch (error) {
    throw error;
  }
}

async function getUserName(uid) {
    try {
        const userInfo = await api.getUserInfo([uid]);
        return Object.values(userInfo).map(user => user.name || `Facebook user`);
    } catch (error) {
        console.error('Error getting user name:', error);
        return [];
    }
}

async function findUid(input) {
  try {
    const isLink = /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/i.test(input);

    if (isLink) {
      const html = await axios.get(input);
      const $ = cheerio.load(html.data);
      const el = $('meta[property="al:android:url"]').attr('content');
      if (!el) {
        throw new Error('UID not found');
      }
      const number = el.split('/').pop();
      return number;
    } else {
      const response = await axios.post(
        'https://seomagnifier.com/fbid',
        new URLSearchParams({
          'facebook': '1',
          'sitelink': input
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': 'PHPSESSID=0d8feddd151431cf35ccb0522b056dc6'
          }
        }
      );
      const id = response.data;
      if (isNaN(id)) {
        throw new Error('UID not found');
      }
      return id;
    }
  } catch (error) {
    throw new Error('An unexpected error occurred. Please try again.');
  }
}
