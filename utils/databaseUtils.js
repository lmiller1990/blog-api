module.exports = {
  authenticate (sequelize) {
    sequelize.authenticate()
      .then((err)  => console.log('Sucessfully connected.')) 
      .catch((err) => console.log('Error:', err))
  }
}
