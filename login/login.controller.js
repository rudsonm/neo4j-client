(function() {
    angular
        .module("Neo4jNetwork")
        .controller("LoginController", LoginController);

    function LoginController($http, $location, AppService) {
        var login = this;

        login.mostrarFormularioRegistro = false;
        login.obterPerfilPrevio = obterPerfilPrevio;
        login.registrar = registrar;
        login.entrar = logar;        

        function obterPerfilPrevio(email) {
            let promise = $http.get(AppService.API_URL.concat("pessoas"), {
                params: { email: email }
            });
            promise.then(function(response) {
                let height = $(".avatar").height();
                $(".avatar").width(height);
                
                if(response.data.length) {
                    // login.usuario.nome = response.data[0].nome;
                    login.usuario.avatar = response.data[0].avatar;
                }
            });
        }

        function registrar(usuario) {
            let promise = $http.post(AppService.API_URL.concat("pessoas"), JSON.stringify(usuario), {});
            promise.then(function(response) {
                let usuario = response.data;
                AppService.login(usuario);
            });
        }

        function logar(email, senha) {
            let promise = $http.get(AppService.API_URL.concat("pessoas"), {
                params: { email: email, senha: senha}
            });
            promise.then(function(response) {
                if(response.data.length) {
                    var usuario = response.data[0];
                    AppService.login(usuario);
                } else {
                    Materialize.toast("Email ou Senha inválidos");
                }
            });
        }
    }
})();