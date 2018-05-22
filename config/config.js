const path = require('path');

const PublicPath = path.join(__dirname, '../public');
const ServerPath = path.join(__dirname, '../server');
const Port = process.env.PORT || 3000;

module.exports = { PublicPath, ServerPath, Port };
