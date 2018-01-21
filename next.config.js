module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/hotel/:id': { page: 'single-item'}
    }
  }
}