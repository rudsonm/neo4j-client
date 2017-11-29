(function() {
    angular
        .module("Neo4jNetwork")
        .config($httpProvider => $httpProvider.defaults.headers.common['Content-Type'] = 'application/json')
        .config(RestangularProvider => {
            RestangularProvider.setBaseUrl('http://localhost:1234/api/');
            RestangularProvider.setDefaultHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0'
            });
        });
})();