# Type Instance

# Description
Don't want to use TypeScript to validate types? Use this!

# Examples
```js
const types = require("type-instance");

types.string("hi"); //no throws
types.string(0); //TypeError
types.number(0); //no throws
types.buffer(Buffer.alloc(0)); //no throws
types.object({}); //no throws
types.array([0, "hi", 1], "value", [types.string, types.number], ["arg1", "arg2", "arg3"]); //no throws
types.gen(content => console.log(content), [types.string], ["content"])()//TypeError
```
# How to Use Methods
To use the methods, u need to import the module with `require("type-instance")` and now u just need to use properties from the imported object, ex: `require("type-instance").function`

# Methods
## string(value, name)
### Description
Check is value is a string
### Arguments
#### value [Any]
String you want to check
#### name [String] {Default: "value"}
The value's name
### Throws
TypeError if value is not a string

## object(value, name)
### Description
Check is value is an object
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Throws
TypeError if value is not an object

## object#notArray(value, name)
### Description
Check is value is an object
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Throws
TypeError if value is not an object or if value is an array

## function(value, name)
### Description
Check is value is a function
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The function's name
### Throws
TypeError if value is not a function

## function#async(value, name)
### Description
Check is value is an async function
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The function's name
### Throws
TypeError if value is not an async function

## function#sync(value, name)
### Description
Check is value is a sync function
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The function's name
### Throws
TypeError if value is not a sync function

## array(value, name, argsType, argsName)
### Description
Check is value is an array
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
#### argsType[Array] {Default: []}
The value's name
#### argsName [Array] {Default: []}
### Throws
TypeError if value is not an array

## number(value, name)
### Description
Check is value is a number
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Throws
TypeError if value is not a number

## buffer(value, name)
### Description
Check is value is a buffer
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Throws
TypeError if value is not a buffer

## instanceof(constructor, constructorName, valueName)
### Description
Create a new function to check does value is an instance of a constructor
### Arguments
#### constructor [Function]
Function to check against
#### constructorName [String] {Default: "Function"}
Constructor's name
#### valueName [String] {Not Required}
Value's name
### Returns
\[Function: f](value)
#### Description
To check does value is an instance of the constructor
#### Arguments
##### value [Any]
Value to check
#### Throws
TypeError if value is not an instance of the constructor

## type(value, name)
### Description
Check is value is a type or instance validator
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Throws
TypeError if value is not a type validator or not an instance validator

## gen(func, argsType, argsName)
### Description
Create a new function from old function. When the new function called, it will check arguments do they have right type/are they an instance of right constructor. Then call old function with it's arguments.
### Arguments
#### func [Function]
#### argsType [Array] {Default: []}
#### argsName [Array] {Default: []}
### Returns
\[Function (Anonymous)](...args)

## noError(type, value)
### Description
Check value without throwing an error
### Arguments
#### type [Function]
Type/instance validator function such as string, object and etc
#### value [Any]
Value you want to check
### Returns
Boolean

## new Object(object)
### Arguments
#### object [Object] {Default: {}}
### Description
Create new custom object
### Example
```js
const customObject = new Object;

customObject.addSetter(function(prop, value, end) { 
    return end(value === "Hello World" ? "No" : value);
}, "first");
customObject.addGetter(function(prop, value, end) {
    return end(value === "Hello World" ? "No" : value);
}, "first");

customObject.object.first = "Hello World";

console.log(customObject.object.first); //No
```

## Object#addSetter(setter, path)
### Description
Add setter function
### Arguments
#### setter [Function]
##### Arguments
###### prop [String]
###### value [Any]
###### set [Function]
#### path [String] {Default: ""}

## Object#addGetter(getter, path)
### Description
Add getter function
### Arguments
#### getter [Function]
##### Arguments
###### prop [String]
###### value [Any]
###### get [Function]
#### path [String] {Default: ""}

## Object#removeSetters(setter, path)
### Description
Remove setter functions
### Arguments
#### setter [Function]
#### path [String] {Default: ""}
### Returns
Number

## Object#removeGetters(getter, path)
### Description
Remove getter functions
### Arguments
#### getter [Function]
#### path [String] {Default: ""}
### Returns
Number

## Object#object

# Buy me a Coffee
PayPal: https://paypal.me/nekomaru76

# Author
NPM: nekomaru76<br />
GitHub: NekoMaru76<br />
Discord: Gaia#9524