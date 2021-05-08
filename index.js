function error(message, _Error = TypeError) {
   throw new _Error(message);
}

let type, types;

type = types = module.exports = {
    string(value, name = "value") {
        typeof name !== "string" && error("Expected name as string");

        return typeof value == "string" ? true : error(`Expected ${name} as String`);
    },
    object(value, name = "value") {
        types.string(name, "name");

        return value instanceof Object ? true : error(`Expected ${name} as Object`);
    },
    ["function"](value, name = "value") {
        types.string(name, "name");

        return value instanceof Function ? true : error(`Expexted ${name} as Function`);
    },
    type(value, name = "value") {
        types.string(name, "name");

        for (const _type of Object.values(types)) if (_type === value && _type !== type.instanceof && _type !== type.gen || value.head === types) return true;

        error(`Expected ${name} as Type or Instance validator`);
    },
    array(value, name = "value", argsType = [], argsName = []) {
        type.string(name, "name");
        !Array.isArray(value) && error("Expected array as Array");
        !Array.isArray(argsType) && error("Expected argsType as Array");
        !Array.isArray(argsName) && error("Expected argsName as Array");

        const no = value.slice().map((value, i) => new Object({ value, i }));

        for (let o = 0; o < argsType.length; o++) {
            const _type = argsType[o];

            type.type(_type, `argsType.${o}`);

            for (let i = 0; i < no.length; i++) type.noError(_type, value[i]) && no.splice(i--, 1);
        }

        for (const val of no) throw new TypeError(`Expected ${argsName[val.i] ? "" : `${name}.`}${argsName[val.i] || val.i} as ${argsType.length > 1 ? `one of these: ${argsType.map(type => type.name).join(", ")}` : argsType[0].name}`);

        return true;
    },
    buffer(value, name = "value") {
        types.string(name, "name");

        return Buffer.isBuffer(value) ? true : error(`Expected ${name} as Buffer`);
    },
    instanceof(constructor, constructorName = "Function", valueName) {
        valueName && types.string(valueName, "valueName");
        types.string(constructorName, "valueName");
        types.function(constructor, "constructor");

        const f = value => {
            return value instanceof constructor ? true : error(`Expected ${`${valueName} as` || ""} instance of ${constructorName}`);
        };

        f.head = type, f.name = constructorName;

        return f;
    },
    gen(func, argsType = [], argsName = []) {
        types.function(func, "func");
        types.array(argsType, "argsType", [types.type]);
        types.array(argsName, "argsName", [types.string]);

        return (...args) => {
            for (let i = 0; i < argsType.length; i++) argsType[i](args[i], argsName[i]);

            return func(...args);
        };
    },
    noError(type, value, name = "value") {
        types.type(type, "type");

        try { return type(value); } catch { return false; }
    },
    number(number, name = "value") {
        types.string(name, "name");

        return typeof number === "number" ? true : error(`Expected ${name} as Number`);
    }
};

types.string.name = "String",
types.number.name = "Number",
types.array.name = "Array",
types.object.name = "Object",
types.type.name = "Type/Instance validator",
types.buffer.name = "Buffer",
types.function.name = "Function";