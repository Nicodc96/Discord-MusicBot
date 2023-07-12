const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("skip")
	.setDescription("Saltea la canción actual")
	.setRun(async (client, interaction, options) => {
		let channel = await client.getChannel(client, interaction);
		if (!channel) {
			return;
		}
		
		let player;
		if (client.manager) {
			player = client.manager.players.get(interaction.guild.id);
		} else {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription(":x: | **El nodo Lavalink no está conectado.**"),
				],
			});
		}
		
		if (!player) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription(":man_shrugging: | **No hay nada que saltear.**"),
				],
				ephemeral: true,
			});
		} 
        	const song = player.queue.current;
	        const autoQueue = player.get("autoQueue");
                if (player.queue[0] == undefined && (!autoQueue || autoQueue === false)) {
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor("RED")
					.setDescription(`:octagonal_sign: | No hay nada después de [${ song.title }](${ song.uri }) en esta lista.`),
			],
		})}
		
		player.queue.previous = player.queue.current;
		player.stop();
		
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(":white_check_mark: | **Saltado!**"),
			],
		});
	});

module.exports = command;
