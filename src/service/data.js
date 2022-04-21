import {fakeTopics, fakeTags, fakeCategory} from 'testData/data'
import { firebaseEndpoints } from 'service/firebaseEndpoints'

let NODE_ENV = process.env.REACT_APP_NODE_ENV
let TARGET_COLLECTION =  process.env.REACT_APP_TARGET_COLLECTION

//NODE_ENV = 'github_page' // open this to use real database from firebase
//TARGET_COLLECTION='test_random'
//NODE_ENV='local'

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
export async function getTopics(fireGlobalContext, options={}){
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, TARGET_COLLECTION, 'topics', options)
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(fakeTopics)
            },500+(Math.random()*500))
        })
    }
}
export async function getTags(fireGlobalContext, options={}){
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, TARGET_COLLECTION, 'tags', options)
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(fakeTags)
            },500+(Math.random()*500))
        })
    }
}
export async function getCategory(fireGlobalContext, options={}){
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.notAuthed.getStore(fireGlobalContext, TARGET_COLLECTION, 'categories', options)
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(fakeCategory)
            },500+(Math.random()*500))
        })
    }
}

export async function storeMainContent(firebase, TARGET_COLLECTION ,_categories, _tags, _topics){
    if(NODE_ENV=='github_page'){
        return firebaseEndpoints.authed.setStore(
            firebase, 
            TARGET_COLLECTION,
            {
                categories: _categories,
                tags: _tags,
                topics: _topics,
            }
        )
    }else{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(true)
            },500+(Math.random()*500))
        })
    }
}