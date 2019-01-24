'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('mysql_connections',
      [
        {
          connection_name: 'Local-server',
          database_name: 'codeLabTest',
          host: 'localhost',
          user: 'root',
          password: 'password'
        },
        {
          connection_name: 'Local-server',
          database_name: 'openmrs',
          host: 'localhost',
          user: 'root',
          password: 'password'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('mysql_connections',
      null,
      {}
    );
  }
};
