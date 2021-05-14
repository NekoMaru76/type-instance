function error(message, _Error = TypeError) {
   throw new _Error(message);
}

let type, types;

type = types = module.exports = {
    Object: class Object {
        constructor(object = {}) {
            type.object(object, "object");

            const self = this;
            const handler = { set: {}, get: {} };
            const proxy = new Proxy(object, {
                set(target, prop, value) {
                    const setters = [self.handler.set[prop], self.handler.set[""], [(prop, val, end) => end(val)]].flat();

                    let next = true, val_;

                    for (let i = 0; i < setters.length && next; i++) {

                        setters[i]?.bind(target)(prop, value, val => { 
                            next = false; 
                            target[prop] = val_ = val;
                        });
                    }

                    return value === val_;
                },
                get(target, prop) {
                    const getters = [self.handler.get[prop], self.handler.get[""], [(prop, val, end) => end(val)]].flat();

                    let next = true, val_;

                    for (let i = 0; i < getters.length && next; i++) {
                        getters[i]?.bind(target)(prop, target[prop], val => { 
                            next = false; 
                            target[prop] = val_ = val;
                        });
                    }

                    return val_;
                }
            });

            this.proxy = proxy, 
            this.realObject = object,
            this.handler = handler;
        }
        addSetter(func, path = "") {
            types.function.sync(func, "func");
            types.string(path, "path");

            if (!this.handler.set[path]) this.handler.set[path] = [];

            this.handler.set[path].push(func);
        }
        addGetter(func, path = "") {
            types.function.sync(func, "func");
            types.string(path, "path");

            if (!this.handler.get[path]) this.handler.get[path] = [];

            this.handler.get[path].push(func);
        }
        removeSetters(func, path = "") {
            types.function.sync(func, "func");
            types.string(path, "path");

            return Number(this.handler.set[path] && (() => {
                let count = 0;

                for (let i = 0; i < this.handler.set.length; i++) {
                    if (this.handler.set[path][i] !== func) continue;
      
                    this.handler.set[path].splice(i, 1);

                    count++, i--;
                }

                return count;
            })());
        }
        removeGetters(func, path = "") {
            types.function.sync(func, "func");
            types.string(path, "path");

            return Number(this.handler.get[path] && (() => {
                let count = 0;

                for (let i = 0; i < this.handler.get.length; i++) {
                    if (this.handler.get[path][i] !== func) continue;
      
                    this.handler.get[path].splice(i, 1);

                    count++, i--;
                }

                return count;
            })());
        }
        get object() {
            return this.proxy;
        }
    },
    string(value, name = "value") {
        typeof name !== "string" && error("Expected name as string");
        typeof value !== "string" && error(`Expected ${name} as String`);
    },
    object(value, name = "value") {
        types.string(name, "name");
        !value instanceof Object && error(`Expected ${name} as Object`);
    },
    ["function"](value, name = "value") {
        types.string(name, "name");
        !value instanceof Function && error(`Expexted ${name} as Function`);
    },
    type(value, name = "value") {
        types.string(name, "name");

        for (const _type of Object.values(types)) if (_type === value && _type !== type.instanceof && _type !== type.gen || value.head === types) return;

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
    },
    buffer(value, name = "value") {
        types.string(name, "name");
        !Buffer.isBuffer(value) && error(`Expected ${name} as Buffer`);
    },
    instanceof(constructor, constructorName = "Function", valueName) {
        valueName && types.string(valueName, "valueName");
        types.string(constructorName, "valueName");
        types.function(constructor, "constructor");

        const f = value => {
            return !value instanceof constructor && error(`Expected ${`${valueName} as` || ""} instance of ${constructorName}`);
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

        try { type(value); return true; } catch { return false; }
    },
    number(number, name = "value") {
        types.string(name, "name");
        typeof number !== "number" && error(`Expected ${name} as Number`);
    }
};

types.function.async = (func, name = "value") => {
    types.function(func, name);
    
    func.constructor.name !== "AsyncFunction" && error(`Expected ${name} as Async Function`);
},
types.function.sync = (func, name = "value") => {
    types.function(func, name);

    func.constructor.name !== "Function" && error(`Expected ${name} as Sync Function`);
};
types.object.notArray = (object, name) => {
    types.object(object, name);
    Array.isArray(object) && error(`Expected ${name} as Object`);
};

types.string.name = "String",
types.number.name = "Number",
types.array.name = "Array",
types.object.name = "Object",
types.object.notArray.name = "Object",
types.type.name = "Type/Instance validator",
types.buffer.name = "Buffer",
types.function.sync.name = "Function",
types.function.async.name = "AsyncFunction",
types.function.name = "Function";