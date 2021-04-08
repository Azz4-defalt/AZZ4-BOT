const discord = require("discord.js")
const client  = new discord.Client()

//const prefix   = "</"
const config   = require("./config.json")
const commands = require("./scripts/commandsReader")(config.prefix)

const unknowCommand = require("./scripts/unknowCommand")

client.on('ready', () => {
    console.log(`logando com o bot ${client.user.tag}`)
})

client.on('message', (msg) => {
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`)
        const args = msg.content.split(" ")
        if(commands[args[0]]) commands[args[0]](client,msg)
        else if(args[0].split("")[0] == config.prefix) unknowCommand(client,msg)
    };
})

client.on('guildMemberAdd', async (member) => {
    let guild = client.guilds.cache.get(config.guild) //ID do servidor
    let channel = client.channels.cache.get(config.wellcome) //ID do canal
//  let emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'radioactive')

    if (guild != member.guild){
        return console.log('Sai daki saco pela! Vocẽ não é do meu servidor')
    }else {
        let embed = new discord.MessageEmbed()
        .setColor('#404040')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`:radioactive: Wellcome the ${member.guild.name} :radioactive:`)
        .setImage('https://media.giphy.com/media/LPNYiRyuDKGoqKmtwD/giphy.gif')
        .setDescription(`${member.user}, bemvindo ao inferno espero que goste, caso precise de algo consulte os ademiros mas antes da uma lidazinha nas regras 👌👌👌 `)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        .setFooter('ID de usuario: ' + member.user.id)
        .setTimestamp()

     await channel.send(embed)
    }

})

client.on("guildMemberRemove", (member) => {
    client.channels.cache.get(config.bye).send(new discord.MessageEmbed()
        .setColor('#000000')
        .setTitle(`${member.user.username} disconnected from the server`)
        .setThumbnail(member.user.displayAvatarURL({format: "png"}))
        .setDescription(`reconnecting to the server in 3 ... 2 ... 1 connection lost 😕😕😕`)
        .setImage("https://media.giphy.com/media/SqrU0sjhYmsoqMH8U4/giphy.gif")
    )
})

client.on("ready", () => {
    let actives = [
        `${config.prefix}help para obter ajuda`,
        `${client.guilds.cache.size} servidores`,
        `${client.channels.cache.size} canais`,
        `${client.users.cache.size} usuários`,
        `Entrem no meu servidor | aS3VnpE`,
    ]
    i = 0
    setInterval(() => client.user.setActivity(`${actives[i++ % actives.length]}`, {
        type: "WATCHING"
    }), 60000) //WATCHING, LISTENING, PLAYING, STREAMING
    /* client.user
        .setStatus("online")
        .catch(console.log) */
    console.log("PAI TA ON")
})

client.login(config.token)      
