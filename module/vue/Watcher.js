class Watcher {
    /**
     * 
     * addWatcher (vm , watcher ,key)
     * 
     * 新增监听器
     *  {
     *      key：
     *      fn:  key fn
     *  }
     * 
     * 
     * 
     */
    constructor(options) {
        this.watcher = []
    }

    addWatcher(vm, watcher, key) {
        this._addWatchProp({
            key,
            fn: watcher[key].bind(vm)
        })

        console.log( this.watcher,'asd')

    }

    invoke(key,newValue , oldValue){
        this.watcher.map(item=>{
            if(item.key === key){
                item.fn(newValue , oldValue) 
            }
        })
    }

    _addWatchProp(watcherProp) {
        this.watcher.push(watcherProp)
    }
}

export default Watcher