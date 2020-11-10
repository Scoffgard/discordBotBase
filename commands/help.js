const fs = require('fs');

class Help {
    constructor(client, message, args, config) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.config = config;
    }

    run() {
        this.message.delete();
        let descriptionList = [];
        fs.readdir('./commands/', (err, files) => {
            files.forEach(file => {
                const File = require(`./${file}`);
                descriptionList.push(
                    {
                        name: `${this.config.prefix}${file.slice(0, -3)}`,
                        value: new File(this.client, this.message, this.args, this.config).desc()
                    }
                )
            });
        });
        this.message.author.send({
            embed: {
                title: 'Liste de commandes',
                color: '#056856',
                fields: descriptionList
            }
        });
    }

    desc() {
        return `Commande permettant de voir la liste des commandes disponible.\nUtilisation : \`${this.config.prefix}help\``;
    }
}

module.exports = Help;