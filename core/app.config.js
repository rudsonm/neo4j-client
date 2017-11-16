(function() {
    angular
        .module("Neo4jNetwork")
        .config(AppConfig);

    function AppConfig($httpProvider) {
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';        
    }
})();