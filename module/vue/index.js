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
import Watcher from './Watcher'


class Vue {
    constructor(options) {
        const { data, computed, watch } = options

        this.$data = data()

        this.init(this, computed, watch)

    }

    init(vm, computed, watch) {

        this.initData(vm)
        const computedIns = this.initComputed(vm, computed)
        const watcherIns = this.initWatcher(vm, watch)

        this.$computed = computedIns.update.bind(computedIns)
        this.$watch = watcherIns.invoke.bind(watcherIns)
    }

    initData(vm) {
        //数据响应式
        reactive(vm,
            (key, value) => {
                // console.log(key, value, '__get__')
            },
            (key, newValue, oldValue) => {

                if (newValue === oldValue) {
                    return
                }  // 无变化不更新


                // console.log(newValue, oldValue, '__set__')

                this.$computed(key, this.$watch)
                this.$watch(key, newValue, oldValue)
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
        const watcherIns = new Watcher()

        for (let key in watch) {
            watcherIns.addWatcher(vm, watch, key)
        }

        return watcherIns
    }

    createApp(el) {

    }
    mount() {

    }
}

export default Vue