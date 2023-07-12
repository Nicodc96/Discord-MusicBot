const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("filters")
	.setDescription("Agrega o elimina un filtro")
	.addStringOption((option) =>
		option
			.setName("tipo")
			.setDescription("tipo de filtro a agregar")
			.setRequired(true)
			.addChoices(
				{ name: "Anime", value: "nightcore" },
				{ name: "BassBoost", value: "bassboost" },
				{ name: "Vaporwave", value: "vaporwave" },
				{ name: "Pop", value: "pop" },
				{ name: "Soft", value: "soft" },
				{ name: "Treblebass", value: "treblebass" },
				{ name: "7.1 Effect", value: "eightD" },
				{ name: "Karaoke", value: "karaoke" },
				{ name: "Vibrato", value: "vibrato" },
				{ name: "Tremolo", value: "tremolo" },
				{ name: "Reset", value: "off" },
			),
	)
	
	.setRun(async (client, interaction, options) => {
		const args = interaction.options.getString("tipo");
		
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
		
		// create a new embed
		let filtersEmbed = new MessageEmbed().setColor(client.config.embedColor);
		
		if (args == "nightcore") {
			filtersEmbed.setDescription("✅ | El filtro Anime está ahora activado!");
			player.nightcore = true;
		} else if (args == "bassboost") {
			filtersEmbed.setDescription("✅ | El filtro BassBoost está ahora activado!");
			player.bassboost = true;
		} else if (args == "vaporwave") {
			filtersEmbed.setDescription("✅ | El filtro Vaporwave está ahora activado!");
			player.vaporwave = true;
		} else if (args == "pop") {
			filtersEmbed.setDescription("✅ |El filtro Pop está ahora activado!");
			player.pop = true;
		} else if (args == "soft") {
			filtersEmbed.setDescription(":white_check_mark: | **El filtro Soft está ahora activado**");
			player.soft = true;
		} else if (args == "treblebass") {
			filtersEmbed.setDescription(":white_check_mark: | **El filtro Treblebass está ahora activado**");
			player.treblebass = true;
		} else if (args == "eightD") {
			filtersEmbed.setDescription(":white_check_mark: | **El filtro 7.1 Effect está ahora activado**");
			player.eightD = true;
		} else if (args == "karaoke") {
			filtersEmbed.setDescription(":white_check_mark: | **El filtro Karaoke está ahora activado**");
			player.karaoke = true;
		} else if (args == "vibrato") {
			filtersEmbed.setDescription(":white_check_mark: | **El filtro Vibrato está ahora activado**");
			player.vibrato = true;
		} else if (args == "tremolo") {
			filtersEmbed.setDescription(":white_check_mark: | **El filtro Tremolo está ahora activado**");
			player.tremolo = true;
		} else if (args == "off") {
			filtersEmbed.setDescription(":white_check_mark: | **Se ha limpiado el/los filtro/s!**");
			player.reset();
		} else {
			filtersEmbed.setDescription(":x: | **Filtro inválido!**");
		}
		
		return interaction.reply({ embeds: [filtersEmbed] });
	});

module.exports = command;
