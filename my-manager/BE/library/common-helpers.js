const _ = require('lodash');

module.exports = {
    validateRequestBody: (body, schema) => {
        // Check if the keys match exactly
        const bodyKeys = Object.keys(body).sort();
        const schemaKeys = Object.keys(schema).sort();

        return _.isEqual(bodyKeys, schemaKeys);
    }
}