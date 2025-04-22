class Environment {
    constructor() {
        this.variables = {};
    }

    setVariable(key, value) {
        this.variables[key] = value;
    }

    getVariable(key) {
        return this.variables[key] || null;
    }

    getAllVariables() {
        return this.variables;
    }

    clearVariables() {
        this.variables = {};
    }
}

module.exports = Environment;