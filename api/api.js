let data = [
    {
        "name": "Soap",
        "qty": "2",
        "price": 6000,
        "total": 12000
    },
    {
        "name": "Shampoo",
        "qty": "3",
        "price": 24000,
        "total": 72000
    },
    {
        "name": "Tooth Brush",
        "qty": "5",
        "price": 3000,
        "total": 15000
    },
    {
        "name": "Brush",
        "qty": "1",
        "price": 2000,
        "total": 2000
    },
    {
        "name": "Pepsodent",
        "qty": "1",
        "price": 10000,
        "total": 10000
    },
];

let name     = [];
let qty             = [];
let price           = [];
let total           = [];
const datalength    = data.length;

for(let i=0; i<datalength; i++) {
    name     = data[i].name;
    qty             = data[i].qty;
    price           = data[i].price;
    total           = data[i].total;
}

module.exports = data;