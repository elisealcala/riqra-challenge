

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      isInShoppingCart: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false 
      },
      shoppingCartNumber: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.dropTable('products');
  }
};
