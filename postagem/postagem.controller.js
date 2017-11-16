(function() {
    angular
        .module("Neo4jNetwork")
        .controller("PostagemController", PostagemController);
    
    function PostagemController($http, AppService) {        
        var postVm = this;

        postVm.postar = postar;
        postVm.fecharNovaPostagem = fecharNovaPostagem;

        obter();

        function postar(postagem) {
            var API_URL = AppService.API_URL.concat("pessoas/", AppService.Usuario.id, "/postagens");
            let promise = $http.post(API_URL, JSON.stringify(postagem), {});
            promise.then(function(response) {                
                Materialize.toast("Postagem salva com sucesso", 2500);
                fecharNovaPostagem();
            });
        }

        function reagir(postagem, reacao) {
            var url = AppService.API_URL.concat("pessoas/", AppService.Usuario.id, "/reagir/", postagem.id);
            let promise = $http.post(url, JSON.stringify({reacao: reacao}), {});
            promise.then(function(response) {
                
            });
        }

        function obter() {
            let promise = $http.get(AppService.API_URL+"postagens", {
                params: { pessoa: AppService.Usuario.id }
            });
            promise.then(function(response) {
                postVm.postagens = response.data;
            });
        }

        function fecharNovaPostagem() {
            postVm.mostrarNovaPostagem = false; 
            postVm.postagem = {}
        }
    }
})();