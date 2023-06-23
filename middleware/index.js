const textFieldsValidation = require('../middleware/textFieldsValidation');
const roleValidations = require('../middleware/verifyUserRole');
const jwtValidations = require('../middleware/JWTValidator');

module.exports = {
    ...textFieldsValidation,
    ...roleValidations,
    ...jwtValidations
}