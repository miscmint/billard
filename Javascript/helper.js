
// calculates the n-norm of an array
function norm(array, number) {
    returnValue = 0;
    array.forEach(function(value) {
        returnValue += Math.pow(Math.abs(value), number);
    });

    return Math.pow(returnValue, 1/number);
}

// calculates the normalized direction vector of an array
function normalizedDirection(array, amount = undefined) {
    if (undefined === amount) {
        amount = norm(array, 2);
    }
    for (let i = 0; i < array.length; i++) {
        array[i] *= (1/amount);
    }
    return array;
}

// vector addition of arrays
function arrayAddition(array1, array2) {
    array = [];
    for (let i = 0; i < array1.length; i++) {
        array.push(array1[i] + array2[i]);
    }
    return array;
}

// vector addition of arrays
function arraySubstraction(array1, array2) {
    array = [];
    for (let i = 0; i < array1.length; i++) {
        array.push(array1[i] - array2[i]);
    }
    return array;
}

// scalar multiplication scalar * array
function scalarMultiplication(scalar, array) {
    returnArray = [];
    array.forEach(function(value) {
        returnArray.push(scalar * value);
    });
    return returnArray;
}