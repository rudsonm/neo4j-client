(function() {
    angular
        .module("Neo4jNetwork")
        .directive("amigosDirective", AmigosDirective)

        function AmigosDirective() {
            return {
                restrict: "E",
                controller: "AmigosController",
                controllerAs: "amigosVM",
                templateUrl: "amigos/amigos.html"
            }
        }
})();