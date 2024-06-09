// MADE BY: GONDAAA
// DC: gondaaa

const { Client, GatewayIntentBits, EmbedBuilder, AuditLogEvent } = require('discord.js');
require("dotenv").config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const moment = require('moment-timezone');
const schedule = require('node-schedule');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});


const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info', 
  format: combine(
    format.timestamp({
      format: () => moment().tz('Europe/Budapest').format('YYYY-MM-DD HH:mm:ss')
    }),
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'app.log' })
  ]
});

client.on('guildMemberAdd', member => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})
        .setTitle('Felhasználó csatlakozott.')
        .setDescription(`**${member.user.tag}** csatlakozott a szerverre.`)
        .setColor('#008000')
        .setTimestamp();
    
    client.channels.cache.get(process.env.MEMB_CHANNEL_ID).send({ embeds: [embed] })
    console.log(`\n${member.user.tag} csatlakozott a szerverhez!`);
    logger.info(`${member.user.tag} csatlakozott a szerverhez!\n`);
});

client.on('guildMemberRemove', member => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})
        .setTitle('Felhasználó kilépett.')
        .setDescription(`**${member.user.tag}** kilépett a szerverről.`)
        .setColor('#FF0000')
        .setTimestamp();
    
    client.channels.cache.get(process.env.MEMB_CHANNEL_ID).send({ embeds: [embed] })
    console.log(`\n${member.user.tag} kilépett a szerverről.`);
    logger.info(`${member.user.tag} kilépett a szerverről.\n`);
});

client.on('guildBanAdd', async ban => {
    const guild = ban.guild;
    if (!guild) return;

    const auditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MemberBanAdd,
    });

    const logEntry = auditLogs.entries.first();
    let executor = logEntry?.executor.tag || 'Unknown';
    const embed = new EmbedBuilder()
       .setAuthor({ name: `${executor}`, iconURL: `${logEntry?.executor.displayAvatarURL()}`}) 
       .setTitle('Felhasználó kitiltva')
       .setDescription(`**${ban.user.tag}** ki lett tiltve **${executor}** által.`)
       .setColor('#FF0000')
       .setTimestamp();

    client.channels.cache.get(process.env.MEMB_CHANNEL_ID).send({ embeds: [embed] })
    console.log(`\n${ban.user.tag} ki lett tiltva ${executor} által.`);
    logger.info(`${ban.user.tag} ki lett tiltva ${executor} által.\n`);
});
client.on('guildBanRemove', async ban => {
    const guild = ban.guild;
    if (!guild) return;

    
    const auditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MemberBanRemove,
    });

    const logEntry = auditLogs.entries.first();
    let executor = logEntry?.executor.tag || 'Unknown'; 

    const embed = new EmbedBuilder()
       .setAuthor({ name: `${executor}`, iconURL: `${logEntry?.executor.displayAvatarURL()}`}) 
       .setTitle('Felhasználó feloldva.')
       .setDescription(`**${ban.user.tag}** fel lett oldva **${executor}** által.`)
       .setColor('#FFFF00')
       .setTimestamp();

    client.channels.cache.get(process.env.MEMB_CHANNEL_ID).send({ embeds: [embed] })
    console.log(`\n${ban.user.tag} fel lett oldva ${executor} által.`)
    logger.info(`${ban.user.tag} fel lett oldva ${executor} által.\n`)
});

client.on('messageDelete', async message => {
    if (message.partial) return; 
    const guild = message.guild;
    if (!guild) return;

       const auditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MessageDelete,
    });

    const logEntry = auditLogs.entries.first();
    let executor = logEntry?.executor.tag || 'Unknown'; 
    if (logEntry && logEntry.target.id === message.id) {
        executor = logEntry.executor.tag;
    }

    const embed = new EmbedBuilder()
       .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
       .setTitle('Üzenet törölve.')
       .setDescription(`**${message.author.tag}** üzenete törölve lett itt: ${message.channel}.`)
       .addFields([
            { name: '**Tartalma:**', value: message.content || '[Csatolmány]' }, 
        ])
       .setColor('#FFA500')
       .setTimestamp();

    client.channels.cache.get(process.env.MESS_CHANNEL_ID).send({ embeds: [embed] })
    console.log(`\n${message.author.tag} üzenete törölve lett a ${message.channel.name} csatornában.`);
    console.log(`Tartalma: ${message.content}`)

    logger.info(`${message.author.tag} üzenete törölve lett a ${message.channel.name} csatornában.`);
    logger.info(`Tartalma: ${message.content}\n`)
});

const attachmentMap = new Map();

client.on('messageCreate', message => {
    if (message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
            attachmentMap.set(message.id, attachment.url);
        });
    }
});

client.on('messageDelete', message => {
    if (message.partial) return; 
    const attachmentURL = attachmentMap.get(message.id);
    if (attachmentURL) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
            .setTitle('Csatolmány törölve.')
            .setDescription(`${message.author.tag} csatolmánya törölve lett.`)
            .addFields([{ name: 'Csatolmány:', value: attachmentURL }])
            .setColor('#FF0000')
            .setTimestamp();

        const logChannel = client.channels.cache.get(process.env.MESS_CHANNEL_ID);
        if (logChannel) logChannel.send({ embeds: [embed] }); 

        console.log(`Csatolmánya: ${attachmentURL}`);
        logger.info(`Csatolmánya: ${attachmentURL}\n`);
        attachmentMap.delete(message.id);
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.partial || newMessage.partial) return; 
    if (oldMessage.content === newMessage.content) return; 
    const embed = new EmbedBuilder()
        .setAuthor({ name: `${oldMessage.author.tag}`, iconURL: `${oldMessage.author.displayAvatarURL()}`})
        .setTitle('Üzenet módosítva.')
        .setDescription(`**${oldMessage.author.tag}** üzenete módosítva itt: ${oldMessage.channel}.`)
        .addFields([
            { name: '**Előtte:**', value: oldMessage.content || '[No Content]' },
            { name: '**Utánna**', value: newMessage.content || '[No Content]' }
        ])
        .setColor('#0000FF')
        .setTimestamp();
    
    client.channels.cache.get(process.env.MESS_CHANNEL_ID).send({ embeds: [embed] });
    console.log(`\n${oldMessage.author.tag} üzenete módosítva lett a ${oldMessage.channel.name} csatornában.`);
    console.log(`Előtte: ${oldMessage.content}`)
    console.log(`Utánna: ${newMessage.content}`)

    logger.info(`${oldMessage.author.tag} üzenete módosítva lett a ${oldMessage.channel.name} csatornában.`);
    logger.info(`Előtte: ${oldMessage.content}`)
    logger.info(`Utánna: ${newMessage.content}\n`)
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const embed = new EmbedBuilder()
        .setTitle('Csatorna állapota frissítve')
        .setColor('#A020F0')
        .setTimestamp();

    if (!oldState.channel && newState.channel) {
        embed.setDescription(`**${newState.member.user.tag}** belépett egy hangcsatornába: ${newState.channel.name}.`);
    } else if (oldState.channel && !newState.channel) {
        embed.setDescription(`**${oldState.member.user.tag}** kilépett egy hangcsatornából ${oldState.channel.name}.`);
    } else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
        embed.setDescription(`**${oldState.member.user.tag}** átlépett ${oldState.channel.name}-ból ${newState.channel.name}-ba.`);
    }

    client.channels.cache.get(process.env.VOICE_CHANNEL_ID).send({ embeds: [embed] });
});

client.login(process.env.TOKEN);