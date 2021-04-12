module.exports = (client,msg) => {
    let message = msg.content.split("")
    message = message [0]
    msg.reply(`Algo de errado n esta certo! O comando ${message} não exite \nDigite '</ajuda' para ver minha listas de comandos `)
}