module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getMain: (req, res) => {
    res.render("main.ejs");
  },
};
