(function () {
    Vue.component("comments-component", {
        template: "#comments-component",
        props: ["id"],
        data: function () {
            return {
                comments: [],
                comment: "",
                username: "",
            };
        },
        mounted: function () {
            axios.get("/comments/" + this.id).then((result) => {
                console.log("result in comments", result);
                this.comments = result.data;
            });
        },
        methods: {
            handleSubmit: function (e) {
                axios
                    .post("/comments/" + this.id, {
                        comment: this.comment,
                        username: this.username,
                    })
                    .then((resp) => {
                        this.comments.push(resp.data);
                    });
            },
        },
    });

    Vue.component("img-modal", {
        template: "#img-modal",
        props: ["id"],
        data: function () {
            return {
                description: "",
                title: "",
                url: "",
                username: "",
                created_at: "",
            };
        },
        mounted: function () {
            axios.get("/imagedata/" + this.id).then((result) => {
                console.log("result.data in get imagedata", result.data);
                console.log("this in imagedata", this);
                console.log("description", this.description);
                this.description = result.data.description;
                this.title = result.data.title;
                this.url = result.data.url;
                this.username = result.data.username;
                this.created_at = result.data.created_at;
            });
        },
        methods: {
            closeInfo: function () {
                console.log("about to emit close");
                this.$emit("close");
            },
        },
    });

    new Vue({
        el: "#main",
        data: {
            images: [],
            title: "",
            image: null,
            description: "",
            username: "",
            imageId: location.hash.slice(1),
        },
        mounted: function () {
            // console.log("vue mounted");
            var vueInstanceThis = this;
            axios.get("/images").then(function (resp) {
                console.log("resp:", resp);
                vueInstanceThis.images = resp.data;
            });

            window.addEventListener("hashchange", () => {
                // console.log("hashchange");

                this.imageId = location.hash.slice(1);
                console.log(this.imageId);
            });
        },

        watch: {
            imageId: function () {
                // console.log("imageId changed, this is the watcher reporting");
                //we should do exactly the same that our mounted fumction is doing
            },
        },

        methods: {
            handleChange: function (e) {
                this.image = e.target.files[0];
            },
            handleSubmit(e) {
                console.log(this.image);
                // e.preventDefault();
                // console.log("handleSubmit");
                const data = new FormData();
                data.append("title", this.title);
                data.append("image", this.image);
                data.append("description", this.description);
                data.append("username", this.username);
                var vueInstanceThis = this;
                axios
                    .post("/upload", data)
                    .then(function (result) {
                        console.log("final result", result);
                        vueInstanceThis.images.unshift(result.data);
                    })
                    .catch((e) => console.log("error in handlesubmit", e));
            },

            setImageId: function (id) {
                this.imageId = id;
                // @click="setImageId(image.id)" this used to be in html in the image tag
            },

            closeMeInParent: function () {
                // console.log("close me in parent running");
                this.imageId = null;
                location.hash = "";
            },

            loadMoreImages: function (lowestid) {
                axios
                    .get(`/more/${lowestid}`)
                    .catch((e) => console.log("error in loading more", e));
            },
        },
    });
})();
