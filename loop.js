/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable array-callback-return */
// 用于派发任务，任务代表每个模块，每个模块的更新时间由各自决定

/**
 * 流程
 * 1、获取到模块
 * 2、设置tasks对象，用于存储每个模块（pk）（轮询的间隔）（更新的时间）
 * 3、记录模块轮询时间间隔（delay），记录当前时间（now），计算出更新时间（） = 当前的时间 + 模块轮询间隔
 * 4、一个更新函数
 * 5、完成一次更新循环，遍历tasks对象的updated属性来判断是否可以下一次更新
 */

/**
 * @param {*} moduleList 大屏模块列表
 * @param {*} cb 需要更新模块的callback
 */
function loops(moduleList, cb) {
    // 任务，存储每一个模块的信息
    const tasks = {};

    moduleList.map((list) => {
        const { pk } = list;
        // 单个模块更新时间

        tasks[pk] = {
            delay: list.frequency,
            updated: false,
            ...list,
        };

        update(tasks[pk], moduleList, tasks, cb);
    });

    // console.log('tasks---', tasks);
}

function update(list, moduleList, tasks, cb) {
    const { pk, delay } = list;
    let timer = null;

    timer = setTimeout(() => {
        clearTimeout(timer);

        cb(pk);
        list.updated = true;

        // 是否开始下次循环，所有模块都更新完
        const shouldLoop = Object.entries(tasks).every(task => task[1].updated);
        if (shouldLoop) {
            loops(moduleList, cb);
            console.log('下一次更新开始了');
        }
    }, delay);
}

export { loops };
