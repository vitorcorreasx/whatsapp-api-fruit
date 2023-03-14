const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { ActualDate } = require("../../../helpers/data");

const MESSAGE_DEFAULT = {
  ping: "pong",
  test: "através de mensagens do WhatsApp é possível descobrir diversas informações do seu dispositivo, isso não é necessariamente uma quebra de segurança, porém é interessante que todos saibam quais informações estão disponíveis para quem tem seu WhatsApp",
};

const receivers = ["555584241789"];

/**
 *
 * @returns {Promise<WhatsAppClient>}
 */
async function buildClient() {
  return new Promise((resolve, reject) => {
    return new Client({
      authStrategy: new LocalAuth({
        clientId: "client-one",
      }),
    })
      .on("authenticated", (session) => {
        console.log("You're authenticated");
      })
      .on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
      })
      .on("ready", async () => {
        console.log("Ready");

        // receivers.map(async (value) => {
        // console.log(`Message has been sent to -> ${value}`);
        // this.sendMessage(`${value}@c.us`, "Server is back online");
        // });
      })
      .on("message", async (message) => {
        console.log("Message Received!", {
          message: message.body,
          // from: message_data.notifyName,
        });
        const reply = MESSAGE_DEFAULT[message.body];
        if (reply) {
          return x1.reply(reply);
        }
        // x1.reply(

        // if (message.body === "ping") x1.reply("pong");
        // if (message.body === "teste") x1.reply(MESSAGE_DEFAULT);
      })
      .on("message_ack", (message, ack) => {
        // status = ack;
        return resolve(ack); //console.log("message_ack: ", ack);
      })
      .initialize();
    // return { ...client };
  });
}

const client = buildClient();

module.exports = { client, buildClient };
