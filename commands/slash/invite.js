const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
  .setName("invite")
  .setDescription("Solicita el link URL para invitarme a tu servidor.")
  .setRun(async (client, interaction, options) => {
    return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.config.embedColor)
          .setTitle(`:cowboy: | **Invitame a tu servidor!**`),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel("Click aquí")
            .setStyle("LINK")
            .setURL(
              `https://discord.com/oauth2/authorize?client_id=${
                client.config.clientId
              }&permissions=${
                client.config.permissions
              }&scope=${client.config.inviteScopes
                .toString()
                .replace(/,/g, "%20")}`
            )
        ),
      ],
    });
  });
module.exports = command;
