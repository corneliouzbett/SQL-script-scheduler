'use strict';

module.exports = (sequelize, DataTypes) => {
  const mysql_connection = sequelize.define('mysql_connection',
    {
      connection_name: DataTypes.STRING,
      database_name: DataTypes.STRING,
      host: DataTypes.STRING,
      user: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      timestamps: false,
      paranoid: true
    });
  mysql_connection.associate = function (models) {
    // associations can be defined here
  };
  return mysql_connection;
};