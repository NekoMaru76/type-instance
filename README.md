# Type Instance

# Description
Don't want to use TypeScript to check types? Use this!

# Examples
```js
const types = require("type-instance");

types.string("hi"); //true
types.string(0); //TypeError
types.number(0); //true
types.buffer(Buffer.alloc(0)); //true
types.object({}); //true
types.array([0, "hi", 1], "value", [types.string, types.number], ["arg1", "arg2", "arg3"]); //true
types.gen(content => console.log(content), [types.string], ["content"])()//TypeError
```

# Methods
## string(value, name)
### Description
Check is value is a string
### Arguments
#### value [Any]
String you want to check
#### name [String] {Default: "value"}
The value's name
### Returns
Boolean / Throw TypeError

## object(value, name)
### Description
Check is value is an object
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Returns
Boolean / Throw TypeError

## function(value, name)
### Description
Check is value is a function
### Arguments
#### value [Any]
Function you want to check
#### name [String] {Default: "value"}
The function's name
### Returns
Boolean / Throw TypeError

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
### Returns
Boolean / Throw TypeError

## number(value, name)
### Description
Check is value is a number
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Returns
Boolean / Throw TypeError

## buffer(value, name)
### Description
Check is value is a buffer
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Returns
Boolean / Throw TypeError

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
To check does value is instance of the constructor
#### Arguments
##### value [Any]
Value to check

## type(value, name)
### Description
Check is value is a type or instance validator
### Arguments
#### value [Any]
Value you want to check
#### name [String] {Default: "value"}
The value's name
### Returns
Boolean / Throw TypeError

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

# Buy me a Coffee
PayPal: https://paypal.me/nekomaru76

# Author
NPM: nekomaru76__
GitHub: NekoMaru76__
Discord: Gaia#9524