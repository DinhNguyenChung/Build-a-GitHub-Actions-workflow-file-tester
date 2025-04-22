module.exports = {
    validateYaml: (yamlData) => {
        if (!yamlData || typeof yamlData !== 'object') {
            throw new Error('Invalid YAML data: Must be a non-empty object.');
        }
        // Additional validation logic can be added here
    },

    validateAction: (action) => {
        if (!action || typeof action !== 'object') {
            throw new Error('Invalid action: Must be a non-empty object.');
        }
        if (!action.name || typeof action.name !== 'string') {
            throw new Error('Invalid action: Missing or invalid name property.');
        }
        // Additional validation logic for action properties can be added here
    }
};