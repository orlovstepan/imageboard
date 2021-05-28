(function () {
    console.log("linked");
    new Vue({
        el: "#main",
        data: {
            images: [],
            title: "",
            image: null,
            description: "",
            username: "",
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
                e.preventDefault();
                console.log("handleSubmit");
                const data = new FormData();
                data.append("title", this.title);
                data.append("image", this.image);
                data.append("description", this.description);
                data.append("username", this.username);
                var vueInstanceThis = this;
                axios
                    .post("/upload", data)
                    .then(function (result) {
                        vueInstanceThis.images.push(result);
                    })
                    .catch((e) => console.log("error in handlesubmit", e));
            },
        },
    });
})();
