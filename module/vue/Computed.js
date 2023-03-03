

class Computed {
    constructor() {
        /**
         * total(){
         *   
         *   return this.a + this.b
         * }
         * 描述对象
         *  {
         *      key : total,
         *      value:3，
         *      get:total fn，
         *      dep : []
         *      
         *  }
         * 
         */

        this.computedData = []

    }

    addComputed(vm, computed, key) {
        //建立computedData池
        const descriptor = Object.getOwnPropertyDescriptor(computed, key),
            descriptorFn = descriptor.value.get
                ? descriptor.value.get
                : descriptor.value,
            value = descriptorFn.call(vm),
            get = descriptorFn.bind(vm),
            dep = this._collectDep(descriptorFn)

        this._addComputedProp({
            key,
            value,
            get,
            dep
        })

        console.log(descriptorFn ,'descriptorFn')

        const dataItem = this.computedData.find(item => item.key === key)
        console.log(dataItem, 'dataItem', descriptor)
        //把里面的数据放到实例上面，进行响应式
        Object.defineProperty(vm, key, {
            get() {
                return dataItem.value
            },
            set() {
                dataItem.value = dataItem.get()
            }
        })
    }

    update(key, cb) {
        this.computedData.map(item => {
            const dep = item.dep
            const _key = dep.find(el => el == key)

            if (_key) {
                item.value = item.get()
                cb && cb(item.key, item.value)

            }
        })

    }

    _addComputedProp(computedProp) {
        this.computedData.push(computedProp)
    }

    _collectDep(fn) {
        const matched = fn.toString().match(/this\.(.+?)/g)
        console.log(matched)
        return matched.map(item => item.split('.')[1])
    }

}

export default Computed