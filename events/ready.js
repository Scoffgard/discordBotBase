class Ready {
    constructor(client, config) {
        this.client = client;
        this.config = config;
    }

    run() {
        console.log(`Bot ready & logged in as ${this.client.user.username}#${this.client.user.discriminator}`);
        this.client.user.setActivity(this.config.activity.text, { type: this.config.activity.type })
            .then(presence => console.log(`Activity set to '${presence.activities[0].type} ${presence.activities[0].name}'`));
    }
}

module.exports = Ready;