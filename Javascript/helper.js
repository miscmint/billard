
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

// normal to an 2-dimensional array
function normalVector(array, direction = undefined) {
    let normal = [-1 * array[1], array[0]];
    if (undefined !== direction && angleBetweenArrays(normal, direction) > Math.PI / 2) {
        normal = [array[1], -1 * array[0]];
    }
    return normal;
}

// angle between two 2-dimensional arrays
function angleBetweenArrays(array1, array2) {
    let scalarProduct = array1[0] * array2[0] + array1[1] * array2[1];
    let euclidianNormArray1 = norm(array1, 2);
    let euclidianNormArray2 = norm(array2, 2);
    angle = Math.acos(scalarProduct / (euclidianNormArray1 * euclidianNormArray2));
    
    return angle;
}