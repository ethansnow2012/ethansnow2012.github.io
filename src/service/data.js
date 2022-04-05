import {fakeTopics, fakeTags, fakeCategory} from 'testData/data'

export async function getOneFakeTopic(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(fakeTopics.data[0])
        },500+(Math.random()*500))
    })
}
export async function getFakeTopics(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(fakeTopics)
        },500+(Math.random()*500))
    })
}
export async function getFakeTags(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(fakeTags)
        },500+(Math.random()*500))
    })
}
export async function getFakeCategory(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(fakeCategory)
        },500+(Math.random()*500))
    })
}