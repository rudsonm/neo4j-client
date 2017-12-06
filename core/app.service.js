(function() {
    angular
        .module("Neo4jNetwork")
        .service("AppService", AppService);

    function AppService($location, $sessionStorage) {
        this.API_URL = "http://localhost:1234/api/";

        this.getUser = () => $sessionStorage.User;

        this.setUser = (user) => {
            $sessionStorage.User = user;
            sessionStorage.setItem("neo4j-usuario", JSON.stringify(user));
        }

        this.setUserImage = (image) => {
            $sessionStorage.User.avatar = image;
            sessionStorage.setItem("neo4j-usuario", JSON.stringify($sessionStorage.User));
        }

        this.logout = () => {
            $sessionStorage.User = undefined;
            sessionStorage.setItem("neo4j-usuario", "");
            $location.path("/login");
        }

        this.login = (user) => {
            $sessionStorage.User = user;
            sessionStorage.setItem("neo4j-usuario", JSON.stringify(user));
            $location.path("/");
        }

        this.setFollowers = (followers) => {
            $sessionStorage.seguidores = followers.length;
            $sessionStorage.followers = followers;
        }

        this.getFollowers = () => $sessionStorage.followers;

        this.setFolloweds = (followeds) => {
            $sessionStorage.seguidos = followeds.length;
            $sessionStorage.followeds = followeds
        };

        this.getFolloweds = () => $sessionStorage.followeds;

    }
})();