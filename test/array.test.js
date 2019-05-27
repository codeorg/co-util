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

test('util.xor()', t => {
    console.log('----', util.xor([1, 2, 6, 6], [1, 2, 3, 4, 5], [1, 7], [8]))
    t.deepEqual(util.xor([1, 2], [1, 2, 3, 4, 5]), [3, 4, 5]);
    t.deepEqual(util.xor([{a: 1, b: 2}, {a: 10, c: 2}, {d: 2}], [{c: 1}, {a: 1, b: 2}]), [{
        a: 10,
        c: 2
    }, {d: 2}, {c: 1}]);
});
test('util.notIn()', t => {
    t.deepEqual(util.notIn([1, 2, 3, 4, 5], [1, 2, 5]), [3, 4]);
    t.deepEqual(util.notIn([{a: 1, b: 2}, {a: 10, c: 2}, {d: 2}], [{c: 1}, {a: 1, b: 2}]), [{a: 10, c: 2}, {d: 2}]);
});

test('util.concat(arr1,arr2,arr3,[arr...])', t => {
    t.deepEqual(util.concat([1, 2, 3], [2, 3]), [1, 2, 3, 2, 3]);
    t.deepEqual(util.concat([1, 2, 3], [5, 6], [2, 3]), [1, 2, 3, 5, 6, 2, 3]);
    t.deepEqual(util.concat([1, 2, 3], []), [1, 2, 3]);
    t.deepEqual(util.concat([], []), []);
})

test('util.compact(arr)', t => {
    //console.log('fromNow------',util.fromNow('2019-05-27 14:04:00'))
    t.deepEqual(util.compact([0, 1, false, 2, '', null, 3]), [1, 2, 3]);
})

test('util.indexOf(array,value)', t => {
    t.deepEqual(util.indexOf([1, 2, 3], 1), 0);
    t.deepEqual(util.indexOf([1, 2, 3], 2), 1);
    t.deepEqual(util.indexOf([1, 2, 3], 3), 2);
    t.deepEqual(util.indexOf([1, 2, 3], 4), -1);
    t.deepEqual(util.indexOf([1, 2, 3], "4"), -1);
})
test('util.findIndex(objects,obj)', t => {
    t.deepEqual(util.findIndex([{n: 1}, {n: 2}, {n: 3}], {n: 1}), 0);
    t.deepEqual(util.findIndex([{n: 1}, {n: 2}, {n: 3}], {n: 2}), 1);
    t.deepEqual(util.findIndex([{n: 1}, {n: 2}, {n: 3}], {n: 3}), 2);
    t.deepEqual(util.findIndex([{n: 1}, {n: 2}, {n: 3}], {a: 2}), -1);
    t.deepEqual(util.findIndex([{n: 1}, {n: 2}, {n: 3}], '{a:2}'), -1);
})


test('util.findOne(objects,obj)', t => {
    t.deepEqual(util.findOne([{n: 1, b: 1}, {n: 1, b: 2}, {n: 3}], {n: 1}), {n: 1, b: 1});
    t.deepEqual(util.findOne([{n: 1, b: 1}, {n: 2, a: 1, g: "dddd"}, {n: 3}], {g: "dddd"}), {n: 2, a: 1, g: "dddd"});
    t.deepEqual(util.findOne([{n: 1, b: 1}, {n: 2}, {n: 3}], {aaaa: 1}), undefined);
})

test('util.find(objects,cons)', t => {
    t.deepEqual(util.find([{n: 1}, {n: 2, a: 22}, {n: 1, c: 2}], [{n: 1}]), [{n: 1}, {n: 1, c: 2}]);
    t.deepEqual(util.find([{n: 1}, {n: 2, a: 22}, {n: 3}], [{n: 2}]), [{n: 2, a: 22}]);
    t.deepEqual(util.find([{n: 1}, {n: 2, a: 22}, {n: 3}], [{n: 1}, {n: 2}]), [{n: 1}, {n: 2, a: 22}]);
    t.deepEqual(util.find([{n: 1}, {n: 2, a: 22}, {n: 3}], [{n: 5}]), []);
    t.deepEqual(util.find([{n: 1}, {n: 2, a: 22}, {n: 3}], [{s: 1}]), []);
})
test('util.map(objects,key)', t => {
    t.deepEqual(util.map([{a: 1}, {a: 2}], 'a'), [1, 2]);
})

test('util.max(array)', t => {
    t.deepEqual(util.max([1, 2, 3, 4, 5]), 5);
    t.deepEqual(util.max(['a', 'b', 'e', 'c', 'd']), 'e');
    t.deepEqual(util.max([]), undefined);

    t.deepEqual(util.max([{n: 1, a: 2}, {n: 2, a: 5}, {n: 3, c: 1}], 'n'), {n: 3, c: 1});
    t.deepEqual(util.max([{n: 1, a: 2}, {n: 2, a: 5}, {n: 3, c: 1}], 'e'), undefined);
})

// test('util.maxBy(array,key)', t => {
//     t.deepEqual(util.maxBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'n'), { n: 3, c: 1 });
//     t.deepEqual(util.maxBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'e'), undefined);
// })

test('util.min(array)', t => {
    t.deepEqual(util.min([1, 2, 3, 4, 5]), 1);
    t.deepEqual(util.min(['a', 'b', 'c', 'd', 'e']), 'a');

    t.deepEqual(util.min([{n: 1, a: 2}, {n: 2, a: 5}, {n: 3, c: 1}], 'n'), {n: 1, a: 2});
    t.deepEqual(util.min([{n: 1, a: 2}, {n: 2, a: 5}, {n: 3, c: 1}], 'e'), undefined);
    t.deepEqual(util.min([], 'e'), undefined);
})
// test('util.minBy(array,key)', t => {
//     t.deepEqual(util.minBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'n'), { n: 1, a: 2 });
//     t.deepEqual(util.minBy([{ n: 1, a: 2 }, { n: 2, a: 5 }, { n: 3, c: 1 }], 'e'), undefined);
//     t.deepEqual(util.minBy([], 'e'), undefined);
// })
test('util.sort(array)', t => {
    t.deepEqual(util.sort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
    t.deepEqual(util.sort([5, 4]), [4, 5]);
})

test('util.kv(array,key)', t => {
    t.deepEqual(util.kv([{id: "key1", b: 2}, {id: "key2", b: 3}], 'id'), {
        "key1": {id: "key1", b: 2},
        "key2": {id: "key2", b: 3}
    });
})


