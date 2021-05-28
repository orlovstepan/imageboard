(function () {
    new Vue({
        el: "#main", //el is where we define which element in the html we'll target to inject rendered html to
        data: {
            cohort: "Clove",
            show: true,
            showXmpl: false,
            sweets: [],
            user: {
                name: "Stepan",
                age: "26",
                somethingElse: ["💀", "🤟🏻"],
            },
        },
        mounted: function () {
            console.log("vue instance mounted");
            console.log("this before axios", this); //this can access the values in our vue instance's data object
            var vueInstanceThis = this;
            axios.get("/sweets").then(function (resp) {
                console.log("response in GET/sweets", resp);
                console.log("this after axios", this);
                vueInstanceThis.sweets = resp.data;
            });
        },
        methods: {
            myFirstMethod: function () {
                console.log("my first method");
            },
            mySecondMethod: function (arg) {
                console.log("argument passed to method:", arg);
            },
        },
    });
})();
