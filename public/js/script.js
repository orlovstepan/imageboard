(function () {
    Vue.component("some-component", {
        template: "#some-component",
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
            imageId: null,
        },
        mounted: function () {
            // console.log("vue mounted");
            var vueInstanceThis = this;
            axios.get("/images").then(function (resp) {
                console.log("resp:", resp);
                vueInstanceThis.images = resp.data;
            });
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
                        vueInstanceThis.images.push(result);
                    })
                    .catch((e) => console.log("error in handlesubmit", e));
            },

            setImageId: function (id) {
                this.imageId = id;
            },

            closeMeInParent: function () {
                console.log("close me in parent running");
                this.imageId = null;
            },
        },
    });
})();
