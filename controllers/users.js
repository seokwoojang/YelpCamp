const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    // 계정 등록
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerdUser = await User.register(user, password);
    req.login(registerdUser, (err) => {
      if (err) return next(err);
      req.flash("success", "welcome to yelp camp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    // 사용자 중복이 되면 오류 메시지를 출력하고, 다시 해당페이지로 돌아감
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("succes", "welcome back");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
