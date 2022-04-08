import {faker} from '@faker-js/faker'

let  fakeCategory = null
let  fakeTags = null
let  fakeTopics = null

fakeTags = {
    id: faker.datatype.uuid(),
    data: [
        {//0
            id:'af7ac9b9-1c47-4998-817e-8c3c0bef64fe',// faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//1
            id: 'f807d533-ea0b-4f69-95f1-c3e62e69d73d', //faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//2
            id: '66acbe6d-c287-4354-b83d-850b836d2e4c',//faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//3
            id: 'd5b22ff8-71a5-46b7-a819-366d75a2133a',//faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//4
            id: 'fbf01690-3311-4e37-8893-480274b060d9',//faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//5
            id: '7c8f0b3a-a96f-43ff-9f6c-c1c1ff665ac3',//faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//6
            id: 'c6cf54eb-2865-4479-9cfb-dc7ef1f46c10',//faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//7
            id: 'cd8f5155-d8c8-42ee-8937-fb30388f3af2',//faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        }
    ]
}

fakeCategory = {
    id: faker.datatype.uuid(),
    data: [
        {
            id: 'bdc14f54-eda7-4ea4-bac8-6e10ace99e25',
            name: 'Category One',
            tags:[
                fakeTags.data[3].id,
                fakeTags.data[2].id,
            ]
        },
        {
            id: 'a3b8616b-a4b8-4818-960f-f02ef82304b8',
            name: 'Category Two',
            tags:[
                fakeTags.data[3].id,
                fakeTags.data[4].id,
                fakeTags.data[5].id,
            ]
        },
        {
            id: 'f6e85e5e-dc30-4ec8-b0b3-73fa3ecc1fab',
            name: 'Category Three',
            tags:[
                fakeTags.data[2].id,
            ]
        },
        {
            id: 'f6377f5e-0df9-4e2b-82e1-bb7d7d28dec0',
            name: 'Category Four',
            tags:[
                fakeTags.data[0].id,
                fakeTags.data[1].id,
                fakeTags.data[6].id,
                fakeTags.data[7].id,
            ]
        }
    ]
} 


fakeTopics = {
    id: faker.datatype.uuid(),
    data: [
        {
            id: 'c5ab82f7-da61-4952-b46d-4d9b13e67c23',//faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[1].id,
                fakeTags.data[2].id,
            ]
        },
        {
            id: '1af898f8-5ac0-47f0-88ff-e563b6be38d7',//faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[0].id,
                fakeTags.data[1].id,
            ]
        },
        {
            id: 'b199bb59-ddd1-4e5d-9b72-560200f25972',//faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[3].id,
            ]
        },
        {
            id: '06663524-faec-4dd2-8ac6-570d01b62eb3',//faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[0].id,
            ]
        },
        {
            id: '9693d8ed-fea9-4dd6-8608-a55afafb29c7',//faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[0].id,
                fakeTags.data[1].id,
                fakeTags.data[2].id,
            ]
        }
    ]
}


export {
    fakeTopics,
    fakeTags,
    fakeCategory,
}