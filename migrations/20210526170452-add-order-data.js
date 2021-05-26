'use strict';

const data = [
  {name: 'Ban 1', staffName: 'Bui Van At', staffPhone: '0123456879', listProduct: [
    {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
    {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
    {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
    ], status: 'new', note: "", createdAt: '2021-05-03 16:24:27', updatedAt: '2021-05-03 16:24:27'},

  {name: 'Ban 1', staffName: 'Bui Van Nam', staffPhone: '0123456879', listProduct: [
    {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
    {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
    ], status: 'new', note: "", createdAt: '2021-05-04 16:24:27', updatedAt: '2021-05-03 16:24:27'},

  {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
    {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000}
    ], status: 'new', note: "", createdAt: '2021-05-04 16:24:27', updatedAt: '2021-05-03 16:24:27'},

  {name: 'Ban 1', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
    {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
    {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
    ], status: 'new', note: "", createdAt: '2021-05-05 16:24:27', updatedAt: '2021-05-03 16:24:27'},

  {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
    {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
    {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
    {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
    ], status: 'new', note: "", createdAt: '2021-05-05 16:24:27', updatedAt: '2021-05-03 16:24:27'},

    {name: 'Ban 1', staffName: 'Bui Van Nam', staffPhone: '0123456879', listProduct: [
      {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
      {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
      ], status: 'new', note: "", createdAt: '2021-05-06 16:24:27', updatedAt: '2021-05-03 16:24:27'},
  
    {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
      {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000}
      ], status: 'new', note: "", createdAt: '2021-05-07 16:24:27', updatedAt: '2021-05-03 16:24:27'},
  
    {name: 'Ban 1', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
      {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
      {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
      ], status: 'paid', note: "", createdAt: '2021-05-07 16:24:27', updatedAt: '2021-05-03 16:24:27'},
  
    {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
      {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
      {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
      {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
      ], status: 'paid', note: "", createdAt: '2021-05-08 16:24:27', updatedAt: '2021-05-03 16:24:27'},

      {name: 'Ban 1', staffName: 'Bui Van Nam', staffPhone: '0123456879', listProduct: [
        {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
        {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
        ], status: 'paid', note: "", createdAt: '2021-05-09 16:24:27', updatedAt: '2021-05-03 16:24:27'},
    
      {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
        {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000}
        ], status: 'new', note: "", createdAt: '2021-05-09 16:24:27', updatedAt: '2021-05-03 16:24:27'},
    
      {name: 'Ban 1', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
        {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
        {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
        ], status: 'new', note: "", createdAt: '2021-05-09 16:24:27', updatedAt: '2021-05-03 16:24:27'},
    
      {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
        {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
        {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
        {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
        ], status: 'done', note: "", createdAt: '2021-05-10 16:24:27', updatedAt: '2021-05-03 16:24:27'},

        {name: 'Ban 1', staffName: 'Bui Van Nam', staffPhone: '0123456879', listProduct: [
          {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
          {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
          ], status: 'done', note: "", createdAt: '2021-05-10 16:24:27', updatedAt: '2021-05-03 16:24:27'},
      
        {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
          {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000}
          ], status: 'done', note: "", createdAt: '2021-05-10 16:24:27', updatedAt: '2021-05-03 16:24:27'},
      
        {name: 'Ban 1', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
          {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
          {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
          ], status: 'done', note: "", createdAt: '2021-05-11 16:24:27', updatedAt: '2021-05-03 16:24:27'},
      
        {name: 'Ban 3', staffName: 'Le Van Tinh', staffPhone: '0123456879', listProduct: [
          {"id": 0, "name":"Tra Sua DDV", "image":"/api/images/product/g22D7xRH1oYa67H.jpg", "option":"Mang ve", "quantity":1 ,"price":30000},
          {"id": 1, "name":"Tra Sua DDV", "image":"/api/images/product/2wcMSlmSLaybF2l.jpg", "option":"", "quantity":3 ,"price":35000},
          {"id": 2, "name":"Tra Sua A", "image":"/api/images/product/61aeAYuORyYyDPf.jpg", "option":"", "quantity":2 ,"price":20000},
          ], status: 'done', note: "", createdAt: '2021-05-11 16:24:27', updatedAt: '2021-05-03 16:24:27'},
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    // build query
    var query = ''
    for(let i = 0; i < data.length; i++){
      var d = data[i]
      query = `INSERT into orders (name, staffName, staffPhone, `+
      `listProduct, note, status, createdAt, updatedAt) VALUES ('${d.name}', '${d.staffName}', '${d.staffPhone}', '${JSON.stringify(d.listProduct)}', `
      +` '${d.note}', '${d.status}', '${d.createdAt}', '${d.updatedAt}'); `
      queryInterface.sequelize.query(query)
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
