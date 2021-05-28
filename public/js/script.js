(function () {
    console.log("linked");
    new Vue({
        el: "#main",
        data: {
            test: "test",
            images: [],
        },
        mounted: function () {
            // console.log("vue mounted");
            var vueInstanceThis = this;
            axios.get("/images").then(function (resp) {
                console.log("resp:", resp);
                vueInstanceThis.images = resp.data;
            });
        },
    });
})();
