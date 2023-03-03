/***
 * Vue
 * 
 * data -> data() -> vm.$data -> reactive -> vm.xx
 *      
 *      get vm[key] -> vm.$data[key]
 *      set vm[key] -> vm.$data[key] = newValue
 *             ？ -> updateComputedProp -> value
 *              ? -> updateWatchProp - callback
 *           
 * 
 * computed -> props ->{
 *  value ->get >value
 *  get -> methods
 *  dep -> [a ,b]
 * }
 * 
 * 
 * watch -> props -> fn -> data set -> call fn
 * 
 */
import { reactive } from './reactive'
import Computed from './Computed'


class Vue {
    constructor(options) {
        const { data, computed, watch } = options

        this.$data = data()

        this.init(this, computed, watch)

    }

    init(vm, computed, watch) {

        this.initData(vm)
        const computedIns = this.initComputed(vm, computed)

        this.$computed = computedIns.update.bind(computedIns)
    }

    initData(vm) {
        //数据响应式
        reactive(vm, (key, value) => {
            // console.log(key, value, '__get__')
        }, (key, newValue, oldValue) => {

            this.$computed(key)
            // console.log(newValue, oldValue, '__set__')
        })
    }

    initComputed(vm, computed) {
        //枚举computed -> 增加computeData
        //返回实例 ——> 实例有update -> 更新computeData的value

        const computedIns = new Computed()

        for (let key in computed) {
            computedIns.addComputed(vm, computed, key)
        }

        return computedIns
    }

    initWatcher(vm, watch) {
        //枚举watcher -> 增加侦听器
        //返回实例 -> 实例有调用watch的方法 -> 执行侦听器
    }

    createApp(el) {

    }
    mount() {

    }
}

export default Vue