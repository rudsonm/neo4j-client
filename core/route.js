(function() {
    angular
        .module("Neo4jNetwork")
        .config(RouteConfig);

    function RouteConfig($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "main/main.html"
        })
        .otherwise({
            redirectTo: "/"
        });
    }
})();