const { MessageEmbed, message } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
const fs = require("fs");
const path = require("path");
const { forEach } = require("lodash");

const command = new SlashCommand()
	.setName("guildleave")
	.setDescription("Elimina el acceso de un bot a un servidor (owner use).")
    .addStringOption((option) =>
    option
      .setName("id")
      .setDescription("Ingrese el ID identifcador para eliminar (escriba `list` para ver las ids)")
      .setRequired(true)
  )
  .setRun(async (client, interaction, options) => {
		if (interaction.user.id === client.config.adminId) {
		    try{
			const id = interaction.options.getString('id');

			if (id.toLowerCase() === 'list'){
			    client.guilds.cache.forEach((guild) => {
				console.log(`${guild.name} | ${guild.id}`);
			    });
			    const guild = client.guilds.cache.map(guild => ` ${guild.name} | ${guild.id}`);
			    try{
				return interaction.reply({content:`Servidores:\n\`${guild}\``, ephemeral: true});
			    }catch{
				return interaction.reply({content:`Chequee la consola para ver los servidores`, ephemeral: true});
			    }
			}

			const guild = client.guilds.cache.get(id);

			if(!guild){
			    return interaction.reply({content: `\`${id}\` no es un ID correcto.`, ephemeral:true});
			}

			await guild.leave().then(c => console.log(`Acceso a ${id} eliminado`)).catch((err) => {console.log(err)});
			return interaction.reply({content:`Acceso a \`${id}\` eliminado`, ephemeral: true});
		    }catch (error){
			console.log(`Ocurrió un error al eliminar el acceso a ${id}`, error);
		    }
		}else {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(client.config.embedColor)
						.setDescription(":face_with_monocle: | **No estás autorizado a utilizar este comando.**"),
				],
				ephemeral: true,
			});
		}
	});

module.exports = command;
