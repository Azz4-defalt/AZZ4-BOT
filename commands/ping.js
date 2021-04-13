module.exports = (client,msg) => {
    msg.channel.send(`🏓O bot esta com a latencia de ${Date.now() - msg.createdTimestamp}ms. A latencia da API é ${Math.round(client.ws.ping)}ms`)
    }