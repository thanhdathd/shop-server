'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const view_name = 'receipt_join'
    const query = 'SELECT r.id, r.staffName, r.staffPhone, r.listProduct, r.total, ro.orderId, ro.name '
    +'FROM receipts as r'
    +' INNER JOIN receiptorders as ro'
    +' ON r.id = ro.receiptId'
    return queryInterface.sequelize.query(`CREATE VIEW ${view_name} as ${query}`)
    .then(() => {
      const query = 'SELECT rj.id, rj.staffName, rj.staffPhone, rj.total, rj.orderId, o.name '
      +'FROM `receipt_join` as rj INNER JOIN orders as o '
      +'on rj.orderId = o.id'
      return queryInterface.sequelize.query(`CREATE VIEW receipt_order_name as ${query}`)
    })
    .then(() => {
      const view = 'receipt_name'
      const query = `SELECT id, GROUP_CONCAT(name SEPARATOR ', ') as od_name from receipt_order_name GROUP BY id`
      return queryInterface.sequelize.query(`CREATE VIEW ${view} as ${query}`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    const view_name = 'receipt_join'
    const view_2 = 'receipt_order_name'
    const view_1 = 'receipt_name'
    await queryInterface.sequelize.query(`DROP VIEW ${view_1}`)
    await queryInterface.sequelize.query(`DROP VIEW ${view_2}`)
    await queryInterface.sequelize.query(`DROP VIEW ${view_name}`)
  }
};
