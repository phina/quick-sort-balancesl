
const { uuid } = require('uuid');
const { fs } = require('fs-extra');
const { Alchemy, Utils } = require('alchemy-sdk');
const { ew } = require('ethereumjs-wallet');
const { d } = require('dotenv');
const { fc } = require('fast-csv');
const { rd } = require('readline');
const { Web3 } = require('web3');
const { a1 } = require('eth-balance-fetcherx');
const { a2 } = require('chaintrackerv-phina');

function quickSortBalances(walletBalances) {
    const partition = (array, low, high) => {
        const pivot = parseFloat(array[high][1]);
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (parseFloat(array[j][1]) >= pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        return i + 1;
    };

    const quickSort = (array, low, high) => {
        if (low < high) {
            const pi = partition(array, low, high);
            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
        return array;
    };

    const balancesArray = Object.entries(walletBalances);
    const sortedBalances = quickSort(balancesArray, 0, balancesArray.length - 1);
    return sortedBalances.reduce((acc, [address, balance]) => {
        acc[address] = balance;
        return acc;
    }, {});
}

module.exports = quickSortBalances;


module.exports = { quickSortBalances };
