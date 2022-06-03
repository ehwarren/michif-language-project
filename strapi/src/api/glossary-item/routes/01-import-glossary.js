module.exports = {
    routes: [
      { // Path defined with an URL parameter
        method: 'GET',
        path: '/glossary-item/import', 
        handler: 'glossary-item.import',
      },
    ]
  }