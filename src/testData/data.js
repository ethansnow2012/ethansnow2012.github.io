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
            description: faker.commerce.productDescription()
        },
        {//1
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription()
        },
        {//2
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription()
        },
        {//3
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription()
        },
        {//4
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription()
        },
        {//5
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription()
        },
        {//6
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription()
        },
        {//7
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription()
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
            tags:[
                fakeTags.data[1].id,
                fakeTags.data[2].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            tags:[
                fakeTags.data[0].id,
                fakeTags.data[1].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            tags:[
                fakeTags.data[3].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
            tags:[
                fakeTags.data[0].id,
            ]
        },
        {
            id: faker.datatype.uuid(),
            topic: faker.name.jobTitle(),
            description: faker.commerce.productDescription(),
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
    fakeCategory
}