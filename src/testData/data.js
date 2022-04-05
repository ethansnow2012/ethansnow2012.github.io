import {faker} from '@faker-js/faker'

let  fakeCategory = null
let  fakeTags = null
let  fakeTopics = null

fakeTags = {
    id: faker.datatype.uuid(),
    data: [
        {//0
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//1
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//2
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//3
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//4
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//5
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//6
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            color: faker.internet.color(),
        },
        {//7
            id: faker.datatype.uuid(),
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
            id: faker.datatype.uuid(),
            name: 'Category One',
            tags:[
                fakeTags.data[3].id,
                fakeTags.data[2].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            name: 'Category Two',
            tags:[
                fakeTags.data[3].id,
                fakeTags.data[4].id,
                fakeTags.data[5].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            name: 'Category Three',
            tags:[
                fakeTags.data[2].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
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
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[1].id,
                fakeTags.data[2].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[0].id,
                fakeTags.data[1].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[3].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            content: faker.lorem.text(),
            tags:[
                fakeTags.data[0].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
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