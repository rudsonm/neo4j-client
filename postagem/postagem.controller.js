(function() {
    angular
        .module("Neo4jNetwork")
        .controller("PostagemController", PostagemController);
    
    function PostagemController($http, AppService, RestService) {
        var postVm = this;

        postVm.usuario = AppService.getUser();
        postVm.postar = postar;
        postVm.remover = remover;
        postVm.carregarImagem = carregarImagem;
        postVm.fecharNovaPostagem = fecharNovaPostagem;

        obter();

        function postar(postagem) {
            let url = AppService.API_URL.concat("pessoas/", AppService.getUser().id, "/postagens");
            let formdata = new FormData();
            formdata.append("file", postagem.imagem);
            formdata.append("titulo", postagem.titulo);
            formdata.append("descricao", postagem.descricao);
            formdata.append("autor", AppService.getUser().nome);
            $http({
                method: 'post',
                url: AppService.API_URL.concat("pessoas/", AppService.getUser().id, "/postagens"),
                data: formdata,
                headers: { 'Content-Type': undefined }
            }).then(response => {
                postVm.postagens.push(response.data);
                Materialize.toast("Postagem salva com sucesso", 2500);
                fecharNovaPostagem();
            });
        }

        function carregarImagem(imagem) {
            postVm.postagem.imagem = imagem;
        }

        function reagir(postagem, reacao) {
            var url = AppService.API_URL.concat("pessoas/", AppService.getUser().id, "/reagir/", postagem.id);
            let promise = $http.post(url, JSON.stringify({reacao: reacao}), {});
            promise.then(function(response) {
                
            });
        }

        function obter() {
            let promise = $http.get(AppService.API_URL+"postagens", {
                params: { pessoa: AppService.getUser().id }
            });
            promise.then(function(response) {
                postVm.postagens = response.data;
            });
        }

        function remover(id) {
            RestService
                .remover("postagens", id)
                .then(response => {
                    if(response === 200) {
                        Materialize.toast("Postagem removida com sucesso", 3500);
                        let indice = postVm.postagens.findIndex(p => p.id === id);
                        postVm.postagens.splice(indice, 1);
                    } else
                        Materialize.toast("Erro ao tentar remover postagem", 3500);
                });
        }

        function fecharNovaPostagem() {
            postVm.mostrarNovaPostagem = false; 
            postVm.postagem = {}
        }
    }
})();