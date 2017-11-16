(function () {
    angular
        .module("Neo4jNetwork")
        .controller("PerfilController", PerfilController);

    function PerfilController($http, $location, AppService) {
        let perfilVm = this;

        perfilVm.AppService = AppService;
        perfilVm.logout = logout;
        perfilVm.uploadImagem = uploadImagem;

        _obterSeguidores();
        _obterSeguidos();

        $(document).ready(() =>
            $("#upload-button").on("click", () => document.getElementById("perfil-arquivo-input").click())
        );

        function logout() {
            AppService.logout();
        }

        function _obterSeguidores() {
            let promise = $http.get(AppService.API_URL.concat("pessoas/", perfilVm.AppService.Usuario.id, "/seguidores"));
            promise.then(response => 
                perfilVm.AppService.Usuario.seguidores = response.data
            );
        }

        function _obterSeguidos() {
            let promise = $http.get(AppService.API_URL.concat("pessoas/", perfilVm.AppService.Usuario.id, "/seguidos"));
            promise.then(response => 
                perfilVm.AppService.Usuario.seguidos = response.data
            );
        }

        function uploadImagem(imagem) {
            let url = AppService.API_URL.concat("pessoas/", perfilVm.AppService.Usuario.id, "/avatar");
            let formdata = new FormData();
            formdata.append("file", imagem);
            $http({
                method: 'post',
                url: AppService.API_URL.concat("pessoas/", perfilVm.AppService.Usuario.id, "/avatar"),
                data: formdata,
                headers: { 'Content-Type': undefined }
            }).then(response => 
                _getBase64(imagem).then(base64 => perfilVm.AppService.setUserImage(base64))
            );
        }

        function _getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    }
})();