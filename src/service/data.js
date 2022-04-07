import {fakeTopics, fakeTags, fakeCategory} from 'testData/data'

export async function getOneFakeTopic(id){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('getOneFakeTopic', fakeTopics.data.filter(x=>x.id==id))
            resolve(fakeTopics.data.filter(x=>x.id==id)[0])
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