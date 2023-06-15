
const app = Vue.createApp({
    data() {
        return {
            result: []
        }
    },
    methods: {
        updData(res) {
            this.result = res;
        }
    },
   
})


