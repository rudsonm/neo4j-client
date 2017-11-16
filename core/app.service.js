(function() {
    angular
        .module("Neo4jNetwork")
        .service("AppService", AppService);

    function AppService($location) {
        this.API_URL = "http://localhost:1234/api/";
        this.Usuario = null;

        this.setUserImage = imagem => {
            this.Usuario.avatar = imagem;
            sessionStorage.setItem("neo4j-usuario", JSON.stringify(this.Usuario));
        }

        this.logout = () => {
            this.Usuario = null;
            sessionStorage.setItem("neo4j-usuario", "");
            $location.path("/login");
        }

        this.login = usuario => {
            this.Usuario = usuario;
            sessionStorage.setItem("neo4j-usuario", JSON.stringify(this.Usuario));
            $location.path("/");
        }
    }
})();