(function() {
    angular
        .module("Neo4jNetwork")
        .controller("AppController", AppController);
    
    function AppController($location, AppService) {
        var usuario = sessionStorage.getItem("neo4j-usuario");
        if (Boolean(usuario)) {
            AppService.Usuario = JSON.parse(usuario);
            $location.path("/");
        } else {
            $location.path("/login");
        }
    }
})();