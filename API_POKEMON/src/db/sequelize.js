const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: console.log,  // or logging: false if you want to suppress logging
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true, alter: true }).then(() => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    bcrypt.hash('pikachu', 10).then((hash) => User.create({ username: 'pikachu', password: hash })).then((user) => console.log(user.toJSON()));

    console.log('La base de donnée a bien été initialisée !');
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
