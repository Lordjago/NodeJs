var arrays = ['Show','Room', 'Here'];
// for(let array of arrays){
// 	console.log(array);
// }
arrays.push("Well done");
console.log(arrays.map(array => 'Postion: ' + array));
// const copied = arrays.slice(); //how to coppy an array
const copied = [...arrays]; //Spread operator to pull out the value inside of the existing array into the new array
console.log(`This is copied array ${copied}`);
console.log(arrays);

const args = (...args) => { //Rest Operator it takes all argument inform of array
	return args;
}

console.log(args(1,2,3,4,5,6));