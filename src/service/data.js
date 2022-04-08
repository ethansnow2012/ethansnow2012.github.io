import {fakeTopics, fakeTags, fakeCategory} from 'testData/data'
import { firebaseEndpoints } from 'service/firebaseEndpoints'

let NODE_ENV = process.env.REACT_APP_NODE_ENV

//NODE_ENV = 'github_page'

export async function getOneFakeTopic(id, fireGlobalContext){// use type define: fireGlobalContext
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, 'test_random', 'topics', {filter:{id}})
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
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, 'test_random', 'topics')
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
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, 'test_random', 'tags')
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
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, 'test_random', 'categories')
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(fakeCategory)
            },500+(Math.random()*500))
        })
    }
}