// This function takes a stock symbol and returns a corresponding color in RGBA format (was included in the directions).//
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}
//This function retrieves stock data from the 'twelevedata API' and creates three charts using the data.//
async function main() {
    // Gets the canvas elements for the charts//
const timeChartCanvas = document.querySelector('#time-chart');
const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
const averagePriceChartCanvas = document.querySelector('#average-price-chart');

const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=3530d8641a214c459d7a41948be72ad8`)

const result = await response.json()

const { GME, MSFT, DIS, BNTX } = result;

const stocks = [GME, MSFT, DIS, BNTX];
// Reverses the order of values in each stock so they are in chronological order//
stocks.forEach( stock => stock.values.reverse())

// Creates a line chart showing the daily high prices of each stock over time//
new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    })    
    ;
    // Creates a bar chart showing the highest daily price of each stock over time
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label:stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    })
};
//This function takes an array of stock values and returns the highest price.//
function findHighest(values) {
    let highest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}

// Calls the main function to create the charts//
main();