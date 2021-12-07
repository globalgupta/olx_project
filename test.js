


// let num = 2345
// let second = num % 10

// console.log(second)

// while (num >= 10) {
//     num = Math.floor(num / 10)
// }
// first = num;
// console.log(first)
// let res = first + second

// console.log(`sum of first and second number is: ${res} `);



// let num = 121;
// let rem = 0, pali = 0;
// temp = num;
// while (num != 0) {
//     rem = num % 10;
//     pali = pali * 10 + rem;
//     num = Math.floor(num / 10);
// }
// if (pali == temp)
//     console.log("wins");
// else
//     console.log("loose");


// let blnc = 50000;
// let bankCharge = 0.50
// let withdrawAmt = 500000;
// let transaction = 0;

// if (withdrawAmt % 5 == 0 && withdrawAmt <= blnc) {
//     transaction = blnc - (withdrawAmt + bankCharge);
//     console.log(`withdraw success for ${withdrawAmt}, current balance is: ${transaction}`);
// }
// else if (withdrawAmt % 5 != 0) {
//     console.log(`your current balance is: ${blnc}`);
// }
// else if(withdrawAmt > blnc){
//     console.log(`current balance is: ${blnc}`);
// }
// return;

// var student = [
//     {
//         name: 'Rama',
//         age: 24
//     },
//     {
//         name: 'Renu',
//         age: [26,28,20]
//     },
//     {
//         name: 'Shayama',
//         age: 29
//     },
// ];
// student.forEach((kk)=>{
// console.log(kk)
// });

var number = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// number.forEach(res => {
//     if(res >3){
//         console.log(res)
//     }
// })

// var temp = number.filter(num => {
//     console.log(temp)
//     if (num >3) {
//         console.log(temp)
//     }
// })
// var ref = number.includes(2)
// console.log(ref)

//console.log(student[1].age[1])
// var temp = number.map(num => num+1)

var temp = number.reduce((total, value)=>value)
console.log(temp)