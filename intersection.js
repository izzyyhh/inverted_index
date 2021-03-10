const intersection = (arrA, arrB) => {
    return arrA.filter(el => arrB.includes(el));
};

const intersectMany = arrays => {
    if (arrays.length == 0) return [];
    if (arrays.length == 1) return arrays[0];

    let result = arrays[0].slice();

    for (let count = 1; count < arrays.length; count++) {
        result = intersection(result, arrays[count]);
    }

    return result;
};

export { intersection, intersectMany };
