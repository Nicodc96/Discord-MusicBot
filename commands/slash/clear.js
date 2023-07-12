const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("clear")
	.setDescription("Limpia la cola de canciones completamente")
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
						.setDescription(":man_shrugging: | **No hay nada reproduciéndose ahora mismo.**"),
				],
				ephemeral: true,
			});
		}
		
		if (!player.queue || !player.queue.length || player.queue.length === 0) {
			let cembed = new MessageEmbed()
				.setColor(client.config.embedColor)
				.setDescription(":x: | **Error, cantidad insuficiente de canciones para limpiar.**");
			
			return interaction.reply({ embeds: [cembed], ephemeral: true });
		}
		
		player.queue.clear();
		
		let clearEmbed = new MessageEmbed()
			.setColor(client.config.embedColor)
			.setDescription(`:white_check_mark: | **Se ha limpiado la lista correctamente.**`);
		
		return interaction.reply({ embeds: [clearEmbed] });
	});

module.exports = command;