angular
    .module("Neo4jNetwork")
    .controller("AmigosController", AmigosController)

    function AmigosController(RestService, AppService){
        let amigosVM = this;
        
        amigosVM.filtrarPessoas = filtrarAmigos;
        amigosVM.seguirPessoa = seguirPessoa;

        function filtrarAmigos(nome){
            RestService
                .buscar("pessoas", { nome: nome })
                .then(function(response){
                    amigosVM.listaPessoas = response;
                })
        }

        function seguirPessoa(id) {
            let origem = AppService.getUser().id;
            RestService
                .salvar("pessoas/"+origem+"/seguir/"+id, {})
                .then(function(response){
                    if(response === 200){
                        Materialize.toast("Seguiu com sucesso!!",3500);

                    }else{
                        Materialize.toast("Falha ao seguir!!!",3500);
                    }

                })
        }

    }