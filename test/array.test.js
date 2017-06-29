import test from 'ava';
import util from '../lib'

test('util.drop(arr,num)', t => {
    t.deepEqual(util.drop([1, 2, 3, 4, 5]), [2, 3, 4, 5]);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], 1), [2, 3, 4, 5]);

    t.deepEqual(util.drop([1, 2, 3, 4, 5], 2), [3, 4, 5]);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], 3), [4, 5]);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], 4), [5]);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], 5), []);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], 6), []);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], 100), []);


    t.deepEqual(util.drop([1, 2, 3, 4, 5], 0), [1, 2, 3, 4, 5]);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], -1), [1, 2, 3, 4, 5]);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], -2), [1, 2, 3, 4, 5]);
    t.deepEqual(util.drop([1, 2, 3, 4, 5], -100), [1, 2, 3, 4, 5]);
});

test('util.dropRight(arr,num)', t => {
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5]), [1, 2, 3, 4]);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 1), [1, 2, 3, 4]);

    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 2), [1, 2, 3]);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 3), [1, 2]);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 4), [1]);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 5), []);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 6), []);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 100), []);


    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], 0), [1, 2, 3, 4, 5]);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], -1), [1, 2, 3, 4, 5]);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], -2), [1, 2, 3, 4, 5]);
    t.deepEqual(util.dropRight([1, 2, 3, 4, 5], -100), [1, 2, 3, 4, 5]);
});

test('util.concat(arr1,arr2,arr3,[arr...])', t => {
    t.deepEqual(util.concat([1, 2, 3], [2, 3]), [1, 2, 3, 2, 3]);
    t.deepEqual(util.concat([1, 2, 3], [5, 6], [2, 3]), [1, 2, 3, 5, 6, 2, 3]);
    t.deepEqual(util.concat([1, 2, 3], []), [1, 2, 3]);
    t.deepEqual(util.concat([], []), []);
})

test('util.indexOf(array,value)', t => {
    t.deepEqual(util.indexOf([1, 2, 3], 1), 0);
    t.deepEqual(util.indexOf([1, 2, 3], 2), 1);
    t.deepEqual(util.indexOf([1, 2, 3], 3), 2);
    t.deepEqual(util.indexOf([1, 2, 3], 4), -1);
    t.deepEqual(util.indexOf([1, 2, 3], "4"), -1);
})
test('util.findIndex(objects,obj)', t => {
    t.deepEqual(util.findIndex([{ n: 1 }, { n: 2 }, { n: 3 }], { n: 1 }), 0);
    t.deepEqual(util.findIndex([{ n: 1 }, { n: 2 }, { n: 3 }], { n: 2 }), 1);
    t.deepEqual(util.findIndex([{ n: 1 }, { n: 2 }, { n: 3 }], { n: 3 }), 2);
    t.deepEqual(util.findIndex([{ n: 1 }, { n: 2 }, { n: 3 }], { a: 2 }), -1);
    t.deepEqual(util.findIndex([{ n: 1 }, { n: 2 }, { n: 3 }], '{a:2}'), -1);
})


test('util.findOne(objects,obj)', t => {
    t.deepEqual(util.findOne([{ n: 1, b: 1 }, { n: 1, b: 2 }, { n: 3 }], { n: 1 }), { n: 1, b: 1 });
    t.deepEqual(util.findOne([{ n: 1, b: 1 }, { n: 2, a: 1, g: "dddd" }, { n: 3 }], { g: "dddd" }), { n: 2, a: 1, g: "dddd" });
    t.deepEqual(util.findOne([{ n: 1, b: 1 }, { n: 2 }, { n: 3 }], { aaaa: 1 }), undefined);
})

test('util.find(objects,cons)', t => {
    t.deepEqual(util.find([{ n: 1 }, { n: 2, a: 22 }, { n: 1, c: 2 }], [{ n: 1 }]), [{ n: 1 }, { n: 1, c: 2 }]);
    t.deepEqual(util.find([{ n: 1 }, { n: 2, a: 22 }, { n: 3 }], [{ n: 2 }]), [{ n: 2, a: 22 }]);
    t.deepEqual(util.find([{ n: 1 }, { n: 2, a: 22 }, { n: 3 }], [{ n: 1 }, { n: 2 }]), [{ n: 1 }, { n: 2, a: 22 }]);
    t.deepEqual(util.find([{ n: 1 }, { n: 2, a: 22 }, { n: 3 }], [{ n: 5 }]), []);
    t.deepEqual(util.find([{ n: 1 }, { n: 2, a: 22 }, { n: 3 }], [{ s: 1 }]), []);
})

test('util.max(array)', t => {
    t.deepEqual(util.max([1, 2, 3, 4, 5]), 5);
    t.deepEqual(util.max(['a', 'b', 'e', 'c', 'd']), 'e');
    t.deepEqual(util.max([]), undefined);
})

test('util.maxBy(array,key)', t => {
    t.deepEqual(util.maxBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'n'), { n: 3, c: 1 });
    t.deepEqual(util.maxBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'e'), undefined);
})
test('util.min(array)', t => {
    t.deepEqual(util.min([1, 2, 3, 4, 5]), 1);
    t.deepEqual(util.min(['a', 'b', 'c', 'd', 'e']), 'a');
})
test('util.minBy(array,key)', t => {
    t.deepEqual(util.minBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'n'), { n: 1, a: 2 });
    t.deepEqual(util.minBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'e'), undefined);
    t.deepEqual(util.minBy([], 'e'), undefined);
})
test('util.sort(array)', t => {
    t.deepEqual(util.sort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
    t.deepEqual(util.sort([5, 4]), [4, 5]);
})

test('util.sort(array)', t => {

    let arr = [{
        id: 22463,
        host: 'opnode210',
        name: '玻璃珠岛',
        aid: 600,
        version: '0.0.2372',
        combineTo: 0,
        port: 8212
    },
    {
        id: 22464,
        host: 'opnode211',
        name: '玻璃珠岛',
        aid: 600,
        version: '0.0.2372',
        combineTo: 0,
        port: 8212
    },
    {
        id: 22465,
        host: 'opnode204',
        name: '圣地玛丽杰尔',
        aid: 400,
        version: '0.0.2372',
        combineTo: 0,
        port: 8215
    },
    {
        id: 22466,
        host: 'opnode206',
        name: '圣地玛丽杰尔',
        aid: 400,
        version: '0.0.2372',
        combineTo: 0,
        port: 8213
    },
    {
        id: 22467,
        host: 'opnode205',
        name: '圣地玛丽杰尔',
        aid: 400,
        version: '0.0.2372',
        combineTo: 0,
        port: 8215
    },
    {
        id: 22468,
        host: 'opnode207',
        name: '圣地玛丽杰尔',
        aid: 400,
        version: '0.0.2372',
        combineTo: 0,
        port: 8213
    },
    {
        id: 22469,
        host: 'opnode208',
        name: '圣地玛丽杰尔',
        aid: 400,
        version: '0.0.2372',
        combineTo: 0,
        port: 8213
    },
    {
        id: 22470,
        host: 'opnode211',
        name: '圣地玛丽杰尔',
        aid: 400,
        version: '0.0.2372',
        combineTo: 0,
        port: 8213
    },
    {
        id: 22471,
        host: 'opnode210',
        name: '圣地玛丽杰尔',
        aid: 400,
        version: '0.0.2372',
        combineTo: 0,
        port: 8213
    },
    {
        id: 22472,
        host: 'opnode204',
        name: '休闲岛',
        aid: 299,
        version: '0.0.2372',
        combineTo: 0,
        port: 8212
    },
    {
        id: 22473,
        host: 'opnode205',
        name: '休闲岛',
        aid: 299,
        version: '0.0.2372',
        combineTo: 0,
        port: 8212
    },
    {
        id: 22474,
        host: 'opnode206',
        name: '休闲岛',
        aid: 299,
        version: '0.0.2372',
        combineTo: 0,
        port: 8210
    },
    {
        id: 22475,
        host: 'opnode208',
        name: '休闲岛',
        aid: 299,
        version: '0.0.2372',
        combineTo: 0,
        port: 8210
    },
    {
        id: 22476,
        host: 'opnode207',
        name: '休闲岛',
        aid: 299,
        version: '0.0.2372',
        combineTo: 0,
        port: 8210
    }]
    t.deepEqual(util.findOne(arr,{host:'opnode207',port: 8210}),{
        id: 22476,
        host: 'opnode207',
        name: '休闲岛',
        aid: 299,
        version: '0.0.2372',
        combineTo: 0,
        port: 8210
    });
})


