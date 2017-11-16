(function() {
    angular
        .module("Neo4jNetwork")
        .directive("postagemDirective", PostagemDirective);
    
    function PostagemDirective() {
        return {
            restrict: "E",
            controller: "PostagemController",
            controllerAs: "postVm",
            templateUrl: "postagem/postagem.html"
        }
    }
})();