const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("skipto")
	.setDescription("Saltea las canciones hasta una en específico")
	.addNumberOption((option) =>
		option
			.setName("number")
			.setDescription("El número de la canción a saltar")
			.setRequired(true),
	)
	
	.setRun(async (client, interaction, options) => {
		const args = interaction.options.getNumber("number");
		//const duration = player.queue.current.duration
		
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
						.setDescription(":man_shrugging: | **No estoy en el canal de voz.**"),
				],
				ephemeral: true,
			});
		}
		
		await interaction.deferReply();
		
		const position = Number(args);
		
		try {
			if (!position || position < 0 || position > player.queue.size) {
				let thing = new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(":x: | **Posición inválida!**");
				return interaction.editReply({ embeds: [thing] });
			}
			
			player.queue.remove(0, position - 1);
			player.stop();
			
			let thing = new MessageEmbed()
				.setColor(client.config.embedColor)
				.setDescription(":white_check_mark: | Saltado a la posición " + position);
			
			return interaction.editReply({ embeds: [thing] });
		} catch {
			if (position === 1) {
				player.stop();
			}
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor(client.config.embedColor)
						.setDescription(":white_check_mark: | Saltado a la posición " + position),
				],
			});
		}
	});

module.exports = command;
