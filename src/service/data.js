import {fakeTopics, fakeTags, fakeCategory} from 'testData/data'
import { firebaseEndpoints } from 'service/firebaseEndpoints'

const NODE_ENV = process.env.REACT_APP_NODE_ENV
const TARGET_COLLECTION =  process.env.REACT_APP_TARGET_COLLECTION

//NODE_ENV = 'github_page' // open this to use real database from firebase

export async function getOneFakeTopic(id, fireGlobalContext){// use type define: fireGlobalContext
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, TARGET_COLLECTION, 'topics', {filter:{id}})
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                console.log('getOneFakeTopic', fakeTopics.data.filter(x=>x.id==id))
                resolve(fakeTopics.data.filter(x=>x.id==id)[0])
            },500+(Math.random()*500))
        })
    }
}
export async function getFakeTopics(fireGlobalContext){
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, TARGET_COLLECTION, 'topics')
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(fakeTopics)
            },500+(Math.random()*500))
        })
    }
}
export async function getFakeTags(fireGlobalContext){
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, TARGET_COLLECTION, 'tags')
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(fakeTags)
            },500+(Math.random()*500))
        })
    }
}
export async function getFakeCategory(fireGlobalContext){
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, TARGET_COLLECTION, 'categories')
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(fakeCategory)
            },500+(Math.random()*500))
        })
    }
}