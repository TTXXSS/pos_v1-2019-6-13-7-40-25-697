'use strict';
function getBarcodesValidData(tags) {
  let tagsOfCutLastServeralLetters = cutLastServeralLettersOfTags(tags);
  let allItems = loadAllItems();
  let barcodeValidData = [];
  let k = 0;
  tagsOfCutLastServeralLetters.forEach(i => {
    allItems.forEach(j => {
      if (i === j.barcode) {
        barcodeValidData[k] = true;
        k++;
      }
    })

  });
  return barcodeValidData;
}


function cutLastServeralLettersOfTags(tags) {
  let tagsOfCutLastServeralLetters = [];
  tags.forEach(i => {
    tagsOfCutLastServeralLetters.push(i.substring(0, 10));
  })
  //console.log(tagsOfCutLastServeralLetters);
  return tagsOfCutLastServeralLetters;
}


function seperateItemIntoBarcode(tags) {
  let itemBarcodes = [];
  let k = 0;
  tags.forEach(i => {
    itemBarcodes[k] = i.substring(0, 10);
    k++;
  })
  return itemBarcodes;
}

function seperateItemIntoNumber(tags) {
  let numbersOfItem = [];
  let changeNumbersOfItemIntoFloat = [];
  let k = 0;
  let j = 0;
  tags.forEach(i => {
    numbersOfItem[k] = i.substring(10, i.length);
    k++;
  })
  numbersOfItem.forEach(i => {
    if (i === "")
      changeNumbersOfItemIntoFloat[j] = 1;
    else
      changeNumbersOfItemIntoFloat[j] = parseFloat(i.substring(1, i.length));
    j++;
  })
  return changeNumbersOfItemIntoFloat;
}

function combineSameItemByBarcode(itemBarcodes, changeNumbersOfItemIntoFloat) {
  let itemOfCombination = [];
  let itemOfCutSameItem = Array.from(new Set(itemBarcodes));
  for (let i = 0; i < itemOfCutSameItem.length; i++) {
    let count = 0;
    for (let j = 0; j < itemBarcodes.length; j++) {
      if (itemOfCutSameItem[i] === itemBarcodes[j]) {
        count += changeNumbersOfItemIntoFloat[j];
      }
    }
    itemOfCombination.push({ barcode: itemOfCutSameItem[i], number: count });
  }

  return itemOfCombination;
}

function getReceipt(itemOfCombination) {
  let originalPrice = getOriginalPrice(itemOfCombination);
  let promotionPrice = getPromotionPrice(itemOfCombination);

  //return originalPrice;
}

function getPromotionPrice(itemOfCombination) {
  let promotionItems = loadPromotions();
  let barcodesOfPromotionItems = promotionItems[0].barcodes;
  let allItems = loadAllItems();
  let promotionPrice = 0;
  itemOfCombination.forEach(i => {
    barcodesOfPromotionItems.forEach(j => {
      if (i.barcode === j) {

        allItems.forEach(k => {
          if (i.barcode === k.barcode)
            promotionPrice += Math.floor(i.number / 2) * k.price;
        })

      }

    })

  })
  return promotionPrice;
}
function getOriginalPrice(itemOfCombination) {
  let originalPrice = 0;
  let allItems = loadAllItems();
  itemOfCombination.forEach(i => {
    allItems.forEach(j => {
      if (i.barcode === j.barcode)
        originalPrice += j.price * i.number;
    })
  })
  return originalPrice;
}

function verifyBarcodesValid(barcodeValidData) {
let isBarcodesValid = true;
for(let i=0;i<barcodeValidData.length;i++)
  if(barcodeValidData[i]===false){
    isBarcodesValid = false;
    break;
  }
  return isBarcodesValid;
}


function getReceipt(itemOfCombination) {
  let promotionItems = loadPromotions();
  let barcodesOfPromotionItems = promotionItems[0].barcodes;
  let allItems = loadAllItems();
  let receipt = "";
  let itemOfFinalPrice = 0;
  for (let i = 0; i < itemOfCombination.length; i++)
    for (let j = 0; j < allItems.length; j++) {
      if (itemOfCombination[i].barcode === allItems[j].barcode) {
        for (let k = 0; k < barcodesOfPromotionItems.length; k++){
          if (itemOfCombination[i].barcode === barcodesOfPromotionItems[k]) {
            itemOfFinalPrice = itemOfCombination[i].number * allItems[j].price -Math.floor(itemOfCombination[i].number/2) * allItems[j].price;
            itemOfFinalPrice = itemOfFinalPrice.toFixed(2);
            receipt += '名称：' + allItems[j].name + '，数量：' + itemOfCombination[i].number + allItems[j].unit+'，单价：' + allItems[j].price.toFixed(2)
              + '(元)，小计：' + itemOfFinalPrice + '(元)\n';
            break;
          } 
          if(k===barcodesOfPromotionItems.length-1&&itemOfCombination[i].barcode != barcodesOfPromotionItems[k]){
            itemOfFinalPrice = itemOfCombination[i].number * allItems[j].price;
            itemOfFinalPrice = itemOfFinalPrice.toFixed(2);
            receipt += '名称：' + allItems[j].name + '，数量：' + itemOfCombination[i].number + allItems[j].unit+'，单价：' +allItems[j].price.toFixed(2)
              + '(元)，小计：' + itemOfFinalPrice + '(元)\n';
            break;
          }
        }
          
      }
    }

  return receipt;
}

function printReceipt(tags) {
  let numberOfItem;
  let itemOfCombination;
  let originalPrice;
  let promotionPrice;
  let receipt;
  let finalPrice;
  let barcodeValidData = getBarcodesValidData(tags);
  let itemBarcodes = seperateItemIntoBarcode(tags);
  let isBarcodesValid = verifyBarcodesValid(itemBarcodes);
  if(isBarcodesValid===false){
    console.log("error");
  }else{
  numberOfItem = seperateItemIntoNumber(tags);
  itemOfCombination = combineSameItemByBarcode(itemBarcodes, numberOfItem);
  originalPrice = getOriginalPrice(itemOfCombination);
  promotionPrice = getPromotionPrice(itemOfCombination);
  receipt = getReceipt(itemOfCombination);
  finalPrice = originalPrice - promotionPrice;
  console.log('***<没钱赚商店>收据***\n'+receipt+'----------------------\n总计：'+finalPrice.toFixed(2)+'(元)'+'\n节省：'+promotionPrice.toFixed(2)+'(元)'
  +'\n**********************');
  }
  //combineSameItemByBarcode(tags);
  //let isBarcodeValid = verifyBarcodesValid(barcodeValidData);
}
function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}
