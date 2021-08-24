const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBroOptions = require("./adminBro.options.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro(AdminBroOptions);

// Build and use a router which will handle all AdminBro routes
const AdminBroRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      }
    }
    // if (email === "admin" && password === "admin") {
    //   return true;
    // }
    return false;
  },
  cookieName: "adminbro",
  cookiePassword: process.env.COOKIE_ADMIN_SECRET || "adminBro",
});

module.exports = AdminBroRouter;
