// alert("This is Alert");

var arr = [1,2,3,4,5,6,7,8,9,10];

// arr.forEach(function(val){
//     val = console.log(val + " Hello");
// })

// var newArr = arr.map(function(val){
//     return val+10;
// })
// console.log(newArr);

// var evenArr = arr.filter(function(val){
//     return val%2==0;
// })
// console.log(evenArr);

//  var n = arr.find(function(val){
//     return val==5;
//  })
//  console.log(n);

// console.log(arr.indexOf(4));
// console.log(arr.indexOf(99));


// var obj = {
//     name: "abc",
//     age:17,
// }
// console.log(obj);
// console.log(obj.age);
// console.log(obj['age']);
// Object.freeze(obj);
// obj.age = 22;
// console.log(obj['age']);



// console.log(abc())

// function abc() {
//     return 122;
// }

async function abc() {
    var blob = await fetch('https://randomuser.me/api/');
    var res = await blob.json();
    console.log(res.results);
}
abc();
console.log("Hello");


