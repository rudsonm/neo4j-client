(function() {
    angular
        .module("Neo4jNetwork")
        .config(LoginRouteConfig);

    function LoginRouteConfig($routeProvider) {
        $routeProvider
        .when("/login", {
            controller: "LoginController",
            controllerAs: "login",
            templateUrl: "login/login.html"
        });
    }
})();