// EASY TASKS
export type MyPick<T, K extends keyof (T)> = { [P in K]: T[P] };


type User = {
    id: number;
    name: string;
    age: number;
};
const userWithoutAge: MyPick<User, 'id' | 'name'> = {
    id: 1,
    name: 'John',
};
console.log(userWithoutAge);

// в данной реализации вместо any надо было реализовать интерфейс или тип
// и использовать его в качестве передаваемого типа (0.2 балла)

export type NOfArray<ArrayObj extends {[n:number]:any}, N extends number> =
    ArrayObj[N] extends boolean ? boolean :
        ArrayObj[N] extends number ? number :
            ArrayObj[N] extends string ? string :
                ArrayObj[N];

type ExampleArrayType = [string, number, { name: string, surname: string }]

const exampleArray: ExampleArrayType = ['Pavel', 2, {name: 'Pavel', surname: 'Mernov'}];

type First = NOfArray<typeof exampleArray, 0>;
type Second = NOfArray<typeof exampleArray, 1>;
type Third = NOfArray<typeof exampleArray, 2>;

const firstInArray: First = 'Polina';
const secondInArray: Second = 20; // Years Old
const thirdInArray: Third = {
    name: "qasdf",
    surname: "Smirnova"
}

console.log('NOfArray:');
console.log(firstInArray, secondInArray, thirdInArray);

// все супер (0.5 балла)



export type Unshift<ArrayType, Element> = [Element, ...ArrayType[]];

const unshiftExample: (boolean | number)[] = [true, 1, 2, 3];
console.log('Unshift')
console.log(unshiftExample);


// (0.5 баллов)


export type MyExclude<T, U> = T extends U
    ? never
    : T;

type MyExcludeExample = MyExclude<'John' | 'Paul' | 'Peter', 'Peter'>;

const myExcludeExample: MyExcludeExample = 'Paul';

console.log('MyExclude:');
console.log(myExcludeExample);

// (0.5 балла) скатано


// MEDIUM TASKS
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Person = {
    name: string,
    address: {
        country: string,
        city: string,
        street: string,
        houseNumber: number
    },
    age: number,
};

const partialPaul: DeepPartial<Person> = {
    name: 'Pavel',
    address: {
        country: 'Russia'
    },
    age: 12
}

console.log('DeepPartial:');
console.log(partialPaul);

// (1 балл)



export type MyCapitalize<T extends string> =
    0 extends keyof T ? // проверяем что в строке есть хотябы 1 буква
        T extends `${T[0]}${infer Tail}` ? // если есть еще буквы капитализируем только первую
            `${Uppercase<T[0]>}${Tail}`
            : `${Uppercase<T>}` // иначе всю строку из одной буквы
        : T

type MyCapitalizeAbc = MyCapitalize<'as'>;
const myCapitalizeAbc: MyCapitalizeAbc = 'As';

type AlreadyCapitalized = MyCapitalize<'AlreAdy'>;
const alreadyCapitalized: AlreadyCapitalized = 'AlreAdy';

console.log('MyCapitalize:');
console.log(myCapitalizeAbc);
console.log(alreadyCapitalized);

// (1 балл) скатано



export type DeepMutable<T> = {
    -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

type Student = {
    readonly name: string,
    readonly age: number,
    readonly university: {
        readonly universityName: string,
        readonly facultyName: string,
        readonly year: number
    }
};

const mutableStudent: DeepMutable<Student> = {
    name: "Paul",
    age: 20,
    university: {
        universityName: "HSE",
        facultyName: "Computer Science",
        year: 2
    }
};

console.log('DeepMutable:');
console.log('Before finishing 2 year:', mutableStudent);

mutableStudent.university.year = 3;

console.log('After finishing 3 year:', mutableStudent);

// (1 балл)



type ParseURLParams<StringElem extends string> =
    StringElem extends `${infer _Start}:${infer Param}/${infer Rest}`
        ? Param | ParseURLParams<`/${Rest}`>
        : StringElem extends `${infer _Start}:${infer Param}`
            ? Param
            : never;

type UserParams = ParseURLParams<':id'> // id
type UserParams1 = ParseURLParams<'posts/:id'> // id
type UserParams2 = ParseURLParams<'posts/:id/:user'> // id | user

const usersParam: UserParams = 'id';
const usersParam1: UserParams1 = 'id';
const usersParam2: UserParams2 = 'user';

console.log('ParseURLParams:');
console.log('User params:', usersParam, usersParam1, usersParam2);

// (1 балл)

// HARD TASKS



type CamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
    : S;

type Camelize<ObjType> = ObjType extends object
    ? {
        [Key in keyof ObjType as CamelCase<Extract<Key, string>>]: ObjType[Key] extends object
            ? Camelize<ObjType[Key]>
            : ObjType[Key];
    }
    : ObjType;

type SnakeCaseUser = {
    user_name: string,
    user_age: number,
    address_info: {
        countryName: string,
        city_name: string,
        street_name: string,
        house_num_ber: {
            aa_aa_aa: number,
            b: number,
        }
    },
};

const snake_case_paul: SnakeCaseUser = {
    user_name: "Pavel_ущernov",
    user_age: 20,
    address_info: {
        countryName: "Russia",
        city_name: "Moscow",
        street_name: "Leninsky prospect",
        house_num_ber: {
            aa_aa_aa: 12,
            b: 13,
        }
    }
}

type CamelizeUser = Camelize<SnakeCaseUser>;

const camelizedPaulUser: CamelizeUser = {
    userName: "Pavel_зклщаernov",
    userAge: 20,
    addressInfo: {
        countryName: "Russia",
        cityName: "Moscow",
        streetName: "Leninsky prospect",
        houseNumBer: {
            aaAaAa: 12,
            b: 13,
        }
    }
}

console.log('Camelize:');
console.log('Snake case object:', snake_case_paul);
console.log('Camelized object:', camelizedPaulUser);

// (2 балла)



type DeepPick<T, Path extends string> =
    Path extends `${infer Key}.${infer Rest}`
        ? Key extends keyof T
            ? { [K in Key]: DeepPick<T[K], Rest> }
            : never
        : Path extends keyof T
            ? { [K in Path]: T[K] }
            : never;

type obj = {
    name: 'hoge',
    age: 20,
    friend: {
        name: 'fuga',
        age: 30,
        family: {
            name: 'baz',
            age: 1
        }
    }
}

type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
type T3 = DeepPick<obj, 'name' | 'friend.name' |'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

const t1: T1 = {name: 'hoge'};
const t2: T2 = {name: 'hoge', friend: {name: 'fuga'}};
const t3: T3 = {name: 'hoge', friend: {name: 'fuga', family: {name: 'baz'}}};

console.log('DeepPick:');
console.log(t1);
console.log(t2);
console.log(t3);

// (2 балла) скатано