const fs = require('fs');

class Help {
    constructor(client, message, args, config) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.config = config;
    }

    run() {
        if (!this.args[0]) {
            let descriptionList = [];
            fs.readdir('./commands/', (err, files) => {
                files.forEach(file => {
                    const File = require(`./${file}`);
                    const desc = new File(this.client, this.message, this.args, this.config).desc();
                    if (desc[0] && this.message.member.roles.cache.find(r => r.id === this.config.adminRole) == undefined) return;
                    descriptionList.push(
                        {
                            name: `${this.config.prefix}${file.slice(0, -3)}`,
                            value: desc[1]
                        }
                    )
                });
                this.message.author.send({
                    embed: {
                        title: 'Liste des commandes',
                        color: '#056856',
                        fields: descriptionList
                    }
                });
            })
        } else {
            try {
                const File = require(`./${this.args[0]}.js`);
                const command = new File(this.client, this.message, this.args, this.config);
                let desc = !command.fullDesc ? command.desc() : command.fullDesc();
                if (desc[0] && this.message.member.roles.cache.find(r => r.id === this.config.adminRole) == undefined) return this.message.reply(`vous n'avez pas la permission de consulter cette commande !`).then(msg => msg.delete({ timeout: 5000 }));
                if (desc[1] == true) {
                    this.message.author.send({
                        embed: {
                            title: this.config.prefix + this.args[0],
                            color: '#056856',
                            fields: desc[2]
                        }
                    })
                } else {
                    this.message.author.send({
                        embed: {
                            title: this.config.prefix + this.args[0],
                            description: desc[1],
                            color: '#056856'
                        }
                    });
                }

            } catch (e) {
                this.message.reply(`la commande \`${this.args[0]}\` n'existe pas.`).then(msg => msg.delete({ timeout: 5000 }));
            }

        }

    }

    desc() {
        return [false, `Commande permettant de voir la liste des commandes disponible.\nUtilisation : \`${this.config.prefix}help\``];
        // [isAdminRequired, true(if command contain multiples commands) || string(description), (only if previous element is true) array of object(containing name and value string)]
    }
}

module.exports = Help;
