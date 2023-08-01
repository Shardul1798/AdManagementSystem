// database.js

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('AdManagementDev', 'postgres', 'myPassword', {
  host: 'localhost',
  dialect: 'postgres', // Replace with your database dialect (e.g., mysql, sqlite)
  // ... other database configurations
});



export { sequelize };
