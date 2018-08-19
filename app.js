//==============================================
//===========Algoritmo de Levenshtain===========
//==============================================


let strg1 = 'constancua ecomica';
let strg2 = [];
strg2[0] = 'hacer cursos en otra carrera';
strg2[1] = 'retiro e inclusion de cursos';
strg2[2] = 'Admisión para personas con Discapacidad';
strg2[3] = 'Conformidad de Documentos';
strg2[4] = 'Constancia Biblioteca';
strg2[5] = 'Constancia Economica';
strg2[6] = 'Constancia de no adeudo';

let weights = [];
let MaxPercentWord = [];
//Position 0 : Percent ------- Position 1: Word

for (let i = 0; i < strg2.length; i++) {
    weights[i] = similarity(strg1, strg2[i]);
    if (i == 0) {
        MaxPercentWord[0] = weights[i];
        MaxPercentWord[1] = strg2[i];
    } else if (weights[i] > MaxPercentWord[0]) {
        MaxPercentWord[0] = weights[i];
        MaxPercentWord[1] = strg2[i];
    }
}

console.log(`Porcentaje Maximo: ${ MaxPercentWord[0]}`);
console.log(`Palabra aproximada: ${ MaxPercentWord[1]}`);



function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i < s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return (costs[s2.length]);
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    let percent = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    console.log(s1 + ' y ' + s2 + ' es:               ' + percent);
    return percent;
}