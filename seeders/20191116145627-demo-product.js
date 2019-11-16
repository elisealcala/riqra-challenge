'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkInsert('Products', [{
       name: 'Yogurt Laive',
       brand: 'Laive',
       image: 'asdad',
       price: 23.00,
     },{
      name: 'Pan',
      brand: 'Bread',
      image: 'asdad',
      price: 15.00,
     },
    {
      name: 'Gaseosa',
      brand: 'Inca Kola',
      image: 'asdad',
      price: 3.00,
    }, {
      name: 'Queso',
      brand: 'Bonle',
      image: 'asdad',
      price: 5.00,
    },
  {
    name: 'Hot Dog',
      brand: 'La Segoviana',
      image: 'asdad',
      price: 2.00,
  }], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Products', null, {});
  }
};
