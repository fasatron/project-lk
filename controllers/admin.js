module.exports = {
  // GET /
  showAdminPage(req, res) {
    res.render('admin', {
      id: 'admin',
      title: 'Admin',
    })
  },
}
