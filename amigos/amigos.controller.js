angular
    .module("Neo4jNetwork")
    .controller("AmigosController", AmigosController)

    function AmigosController(RestService, AppService, $sessionStorage){
        let amigosVM = this;
        
        amigosVM.filtrarPessoas = filtrarAmigos;
        amigosVM.seguirPessoa = seguirPessoa;
        amigosVM.deseguirPessoa = deseguirPessoa;

        function filtrarAmigos(nome){
            if(!nome || !nome.length)
                return;
            console.log(AppService.getUser().id);
            RestService
                .buscar("pessoas", { nome: nome })
                .then(function(response){
                    response = response.filter(pessoa => pessoa.id !== AppService.getUser().id);
                    response.forEach(pessoa => 
                        pessoa.seguida = AppService.getFolloweds().some(f => f === pessoa.id)
                    );
                    amigosVM.listaPessoas = response;
                    console.log(AppService.getFolloweds(), response);
                });
        }

        function seguirPessoa(pessoa) {
            let origem = AppService.getUser().id;
            RestService
                .salvar("pessoas/"+origem+"/seguir/"+pessoa.id, {})
                .then(function(response){
                    if(response === 200){
                        Materialize.toast("Seguiu com sucesso!!", 3500);
                        pessoa.seguida = true;
                        $sessionStorage.seguidores++;
                    }else{
                        Materialize.toast("Falha ao seguir!!!",3500);
                    }
                });
        }

        function deseguirPessoa(pessoa) {
            let origem = AppService.getUser().id;
            RestService
                .remover("pessoas/"+origem+"/seguir/", pessoa.id)
                .then(function(response) {
                    if(response == 200) {
                        Materialize.toast("Você não segue mais " + pessoa.nome.split(" ")[0], 3500);
                        pessoa.seguida = false;
                        $sessionStorage.seguidos--;
                    }
                });
        }

    }