class ContextBuilder {
    constructor(repository, event, actor) {
        this.repository = repository;
        this.event = event;
        this.actor = actor;
    }

    buildContext() {
        return {
            repository: this.repository,
            event: this.event,
            actor: this.actor,
            // Additional context properties can be added here
        };
    }
}

module.exports = ContextBuilder;