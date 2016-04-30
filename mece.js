// pre SQL
var gameParameter = {
    priceSens: 50,
    marketingSens: 25,
    qualitySens: 25,
    bankPercent: 25,
    industryChanges: 3,
    tax: 25,
    fullSales: 30,
    zeroSales: 50,
    dayNow: 0,
    allDay: 10,
    stepOfPlayer: 0,
    industrySupply: 2000,
    playerNow: 1,
}

var playerList = [
    // {
    // 	name:'1',
    // 	industryPower:1000,
    // 	marketing:100,
    // 	quality:0,
    // 	balance:10000,
    // 	price:40,
    // 	deprecation:2000,
    // 	buferProduct:0,
    // 	pointsPerPeriod:0,
    // 	salesPerPeriod:0,
    // },

]
//for dom changing
var playerOnScreen = 0;

function addNewPlayer() {
    playerOnScreen++;
    $('.playerList').append('<div class="oneOfPlayer" id=s' + playerOnScreen + '><p>Player Name ' + playerOnScreen + '</p><form action=""><input id="a' + playerOnScreen + '" value="name' + playerOnScreen + '" type="text"></form></div>');

}
//addNewPlayer();
addNewPlayer();
addNewPlayer();

function nextStep() {

    $('#playerCreate')[0].style.display = 'none';
    $('#gameParameter')[0].style.display = 'block';


}

function goButton() {
    $('#gameParameter')[0].style.display = 'none';
    $('#playPeriod')[0].style.display = 'block';
    //changing game parameter
    gameParameter.industryChanges = +$('#industryInNextPeriod')[0].value;
    gameParameter.tax = +$('#TaxLevel')[0].value;
    gameParameter.industrySupply = +$('#supply')[0].value;
    gameParameter.bankPercent = +$('#bankPercent')[0].value;
    var tempIndustryPower = +$('#productPerPlayer')[0].value;
    for (var i = 1; i <= playerOnScreen; i++) {
        playerList.push({
            name: $('#a' + i)[0].value,
            industryPower: +$('#productPerPlayer')[0].value,
            marketing: 100,
            quality: 100,
            balance: 0,
            price: 30,
            deprecation: +$('#productPerPlayer')[0].value * 2,
            buferProduct: 0,
            pointsPerPeriod: 0,
            salesPerPeriod: 0,
            income: 0,
            maxSales:0,
        });

    }
	setFormValue();
   tak();

}
//nextStep();
//goButton();
//////////////////////////////////////////////////
//////////////////////////////////////////////////

function hideglobal() {
    $('.global')[0].style.display = 'none';
    $('#hidenTik')[0].style.display = 'block';
}


function unHideglobal() {
    $('.global')[0].style.display = 'block';
    $('#hidenTik')[0].style.display = 'none';
}

function tik() {
console.log(gameParameter.playerNow);
    hideglobal();
    playerList[gameParameter.playerNow - 1].price = $('#fPrice')[0].value;
    playerList[gameParameter.playerNow - 1].marketing = $('#fMarketing')[0].value;
    playerList[gameParameter.playerNow - 1].deprecation = $('#fDepresation')[0].value;
    playerList[gameParameter.playerNow - 1].quality = $('#fQuality')[0].value;
    if (gameParameter.playerNow == playerOnScreen  ) {
        gameParameter.playerNow = 0
        startCalcResult();
    }
    gameParameter.playerNow++;

}


//tak();
function setFormValue(){
	
    $('#fPrice')[0].value = playerList[gameParameter.playerNow - 1].price;
    $('#fMarketing')[0].value = playerList[gameParameter.playerNow - 1].marketing;
    $('#fDepresation')[0].value = playerList[gameParameter.playerNow - 1].deprecation;
    $('#fQuality')[0].value = playerList[gameParameter.playerNow - 1].quality;
	
}
function tak() {
    unHideglobal();
    $('#name')[0].innerHTML = playerList[gameParameter.playerNow - 1].name;
    $('#industryChanges')[0].innerHTML = gameParameter.industryChanges + ' %';

    $('#industySupply')[0].innerHTML = gameParameter.industrySupply;

    function calcDemand() {
        var tempSum = 0;
        for (var i = 0; i < playerList.length; i++) {
            tempSum = tempSum + playerList[i].industryPower;
        }
        return tempSum;
    }
    $('#industryDemand')[0].innerHTML = calcDemand();
    $('#bankBalance')[0].innerHTML = playerList[gameParameter.playerNow - 1].balance;
    $('#industryPlayer')[0].innerHTML = playerList[gameParameter.playerNow - 1].industryPower;
    $('#playerSales')[0].innerHTML = playerList[gameParameter.playerNow - 1].salesPerPeriod;
    $('#productSalent')[0].innerHTML = playerList[gameParameter.playerNow - 1].buferProduct;
    $('#income')[0].innerHTML = playerList[gameParameter.playerNow - 1].income;
	setFormValue();

}



//test
function startCalcResult() {
    'use strict'
    var priceSum = 0;
    var marketingSum = 0;
    var qualitySum = 0;
    for (var a = 0; a < playerList.length; a++) {
        marketingSum = marketingSum + playerList[a].marketing;
  		playerList[a].salesPerPeriod = 0;
  		playerList[a].pointsPerPeriod = 0;
    }
    for (var b = 0; b < playerList.length; b++) {
        qualitySum = qualitySum + playerList[b].quality;
    }


    for (var i = 0; i < playerList.length; i++) {
        // calc sales for each player
        if (playerList[i].price < gameParameter.zeroSales && playerList[i].price > 0) {
            var pricePoint = calcPricePoint(playerList[i]);
            priceSum = priceSum + pricePoint;
            playerList[i].pointsPerPeriod = playerList[i].pointsPerPeriod + pricePoint;
        	playerList[i].maxSales = tempQuatity; 
        }
    }
    for (var i = 0; i < playerList.length; i++) {
        if (playerList[i].pointsPerPeriod == 0) {
            continue;
        }
        var marketingPoint = calcMarketingPoint(playerList[i], marketingSum, priceSum);
        playerList[i].pointsPerPeriod = playerList[i].pointsPerPeriod + marketingPoint;
    }
    for (var i = 0; i < playerList.length; i++) {
        if (playerList[i].pointsPerPeriod == 0) {
            continue;
        }
        var qualityPoint = calcQualityPoint(playerList[i], qualitySum, priceSum);
        playerList[i].pointsPerPeriod = playerList[i].pointsPerPeriod + qualityPoint;
    }



    function salesTime() {
        var calcAllPoint = 0;
        for (var i = 0; i < playerList.length; i++) {
            calcAllPoint = calcAllPoint + playerList[i].pointsPerPeriod;
        }
        
        // product per player 
        for (var i = 0; i < playerList.length; i++) {
            var percentOfIndustry = (playerList[i].pointsPerPeriod / calcAllPoint).toFixed(3);
            playerList[i].salesPerPeriod = Math.round(gameParameter.industrySupply * percentOfIndustry);
            if((gameParameter.industrySupply * percentOfIndustry)>playerList[i].maxSales){
            	playerList[i].salesPerPeriod = playerList[i].maxSales;
            }
            console.log(playerList[i].salesPerPeriod);

        }
    }
    salesTime();

    function industryChanges() {
        gameParameter.industrySupply = Math.round(gameParameter.industrySupply * (1 + (gameParameter.industryChanges / 100)));
    }
    industryChanges();


    function calcBuffer(){
    	for (var i = 0; i < playerList.length; i++) {
    		playerList[i].buferProduct = +playerList[i].buferProduct +( +playerList[i].industryPower - +playerList[i].salesPerPeriod);

    	}
    }
    calcBuffer();

    function calcIncome(){
    	for (var i = 0; i < playerList.length; i++) {
    	var tempSales = +playerList[i].salesPerPeriod * playerList[i].price;
    	var tempWaste = +playerList[i].industryPower * 18;
    	var tempBufferCost = +playerList[i].buferProduct* 2;
    	var tempWasteMarketingAndOther = (+playerList[i].marketing) +(+playerList[i].quality) + (+playerList[i].deprecation);
		var allWaste = +tempWaste +tempBufferCost+tempWasteMarketingAndOther;
    	var profitBeforeTax = tempSales - tempWaste;
    	var netProfit = profitBeforeTax;
    	console.log( netProfit);
    	playerList[i].income = netProfit;
    	}

    }
    calcIncome();
    function calcBalance(){
    	for (var i = 0; i < playerList.length; i++) {
    		playerList[i].balance = playerList[i].balance + playerList[i].income;
    	}
    }
    calcBalance();

}



// tik();
// tak();
// tik();
// tak();
// tik();
// tak();
var tempQuatity =0;
function calcPricePoint(playerStat) {
	tempQuatity =0;
    'use strict'
    var price = playerStat.price;
    var productPerDaltaPoor =Math.round( gameParameter.industrySupply / (gameParameter.zeroSales - gameParameter.fullSales));
   

    var quantity = (gameParameter.zeroSales - price) * productPerDaltaPoor;
 	tempQuatity = quantity;
    console.log(quantity);
    return Math.round(quantity * gameParameter.priceSens);
}

function calcMarketingPoint(playerStat, Msum, Psum) {
    'use strict'
    var marketing = playerStat.marketing;
    var percentOfIndustry = marketing / Msum;
    Psum = Psum * (100 / gameParameter.priceSens);

    var allPointsOfMarkiting = Psum * gameParameter.marketingSens / 100;
    // console.log(allPointsOfMarkiting);
    var marketingPoint = allPointsOfMarkiting * percentOfIndustry;
    return Math.round(marketingPoint);
}

function calcQualityPoint(playerStat, Msum, Psum) {
    'use strict'
    var quality = playerStat.quality;
    var percentOfIndustry = quality / Msum;
    Psum = Psum * (100 / gameParameter.priceSens);

    var allPointsOfMarkiting = Psum * gameParameter.qualitySens / 100;
    // console.log(allPointsOfMarkiting);
    var qualityPoint = allPointsOfMarkiting * percentOfIndustry;

    return Math.round(qualityPoint);
}