// import { createApp } from 'vue'
import Vue from '../module/vue'

import App from './App.vue'


// createApp(App).mount('#app')

const vm = new Vue({
    data() {
        return {
            a: 1,
            b: 2,
            c:2
        }
    },
    computed: {

        // descriptor.value
        total() {
            return this.a + this.b
        },
         // descriptor.value.get
        test1:{
            get(){
                return this.b + this.b
            }
        },
        test2:{
            get(){
                return this.b + this.a
            }
        }
    },
    watch: {
        total(newValue, oldValue) {
            console.log('total', newValue, oldValue)

        },
        a(newValue, oldValue) {
            console.log('a', newValue, oldValue)

        },
        b(newValue, oldValue) {
            console.log('b', newValue, oldValue)
        },
    }
})

console.log(vm)
console.log(vm.total)
console.log(vm.total)

vm.a = 100

console.log(vm.total)
console.log(vm.total)

vm.b = 200

console.log(vm.total)
console.log(vm.total)