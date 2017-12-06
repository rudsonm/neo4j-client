(function () {
    angular
        .module("Neo4jNetwork")
        .controller("PerfilController", PerfilController);

    function PerfilController($http, $location, AppService, $sessionStorage) {
        let perfilVm = this;

        perfilVm.st = $sessionStorage;
        perfilVm.logout = logout;
        perfilVm.uploadImagem = uploadImagem;
        perfilVm.AppService = AppService;

        _obterSeguidores();
        _obterSeguidos();

        $(document).ready(() =>
            $("#upload-button").on("click", () => document.getElementById("perfil-arquivo-input").click())
        );

        function logout() {
            AppService.logout();
        }

        function _obterSeguidores() {
            let promise = $http.get(AppService.API_URL.concat("pessoas/", perfilVm.AppService.getUser().id, "/seguidores"));
            promise.then(response => {
                let usuario = AppService.getUser();
                usuario.seguidores = response.data.map(seguidor => seguidor.id);
                AppService.setFollowers(usuario.seguidores);
                AppService.setUser(usuario);
            });
        }

        function _obterSeguidos() {
            let promise = $http.get(AppService.API_URL.concat("pessoas/", perfilVm.AppService.getUser().id, "/seguidos"));
            promise.then(response => {
                let usuario = AppService.getUser();
                usuario.seguidos = response.data.map(seguido => seguido.id);
                AppService.setFolloweds(usuario.seguidos);
                AppService.setUser(usuario);
            });
        }

        function uploadImagem(imagem) {
            let url = AppService.API_URL.concat("pessoas/", perfilVm.AppService.getUser().id, "/avatar");
            let formdata = new FormData();
            formdata.append("file", imagem);
            $http({
                method: 'post',
                url: AppService.API_URL.concat("pessoas/", perfilVm.AppService.getUser().id, "/avatar"),
                data: formdata,
                headers: { 'Content-Type': undefined }
            }).then(response => _getBase64(imagem).then(base64 => {
                perfilVm.st.User.avatar = base64;
                document.getElementById("user.avatar").setAttribute("src", base64);
                perfilVm.AppService.setUseImage(base64);
            }));
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