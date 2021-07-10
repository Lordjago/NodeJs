//Creating object of school and name, location, motto and greet are called the 'key'
const school = {
	name: 'Nurudeen',
	location: 'Iwo',
	motto:'Knowledge is light',
	greet() {
		console.log('Welcome to ' + this.name + ' located at ' + this.location + ' our motto is ' + this.motto + '.');
	}
};

const copiedObj = {...school}; //coping an object
console.log(copiedObj);
school.greet(); 