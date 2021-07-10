const name = `Abdul-Azeez`; //using constant and let 
let age = 25;
const hasHobbies = true;

//declaring a function 
// function summarizeUser(userName, userAge, userHasHobbies)
// {
// 	return(`My name is ${userName}, I am ${userAge} years old and hobby is ${hasHobbies}`); // Using template literals
// }

//Another way of declaring a function called arrow function
const summarizeUser = (userName, userAge, userHasHobbies) => // Arrow Function with many args 
{
	return(`My name is ${userName}, I am ${userAge} years old and hobby is ${hasHobbies}`); // Using template literals
}

const Single = userName =>  //arrow function with one arg
{
	return (`My name is ${userName}`);
}

const addNumber = () => //Arrow function with no arg
{
	console.log(1+3);
}

console.log(Single(name));

console.log(summarizeUser(name,age,hasHobbies));

addNumber();