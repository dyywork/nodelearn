module.exports = function(app) {


    app.use("/api/users", require("./user.js"));
    app.use("/api/addresses", require("./address.js"));
    app.use("/api/loginInfos", require("./loginInfo.js"));
    app.use("/api/roles", require("./role.js"));
    app.use("/api/slides",require('./slideroutes/sildeTreeRoutes.js'))
    app.use("/api/child",require('./slideroutes/childtreeRoutes.js'))

};