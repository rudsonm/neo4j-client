(function() {
    angular
        .module("Neo4jNetwork")
        .directive("perfilDirective", PerfilDirective);

    function PerfilDirective() {
        return {
            restrict: "E",
            controller: "PerfilController",
            controllerAs: "perfilVm",
            templateUrl: "perfil/perfil.html"
        }
    }
})();