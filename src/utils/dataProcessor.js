

function injectStyleState (data){
    data.display = true
    data?.data.forEach(element => {
        element.display = true
        element?.data?.forEach(element2 => {
            element2.display = true
        })
    })
    return data
}

function toggleDisplayViaKeyAndId (data, layerNum, key, id ){
    data = JSON.parse(JSON.stringify(data))
    if(Array.isArray(id)){
        const idArray = id
        if(layerNum==2 && data.data){
            data.data.forEach((el)=>{
                if(el[key].length==0) {
                    return;
                }
                let matched = (el[key].filter(x=>idArray.indexOf(x)>=0).length)>0  //.indexOf(id)
                if(matched){
                    el.display=true
                }else{
                    el.display=false
                }
            })
        }
        return data
    }else{
        if(layerNum==2 && data.data){
            data.data.forEach((el)=>{
                let matchedIndex = el[key].indexOf(id)
                if(matchedIndex>=0){
                    el.display=true
                }else{
                    el.display=false
                }
            })
        }
        return data
    } 
}
function toggleDisplayViaArrayOfIds(data, layerNum, arrayOfIds ){
    data = JSON.parse(JSON.stringify(data))
    if(layerNum==2 && data.data){
        data.data.forEach((el)=>{
            let indexOf = arrayOfIds.indexOf(el['id'])
            if(indexOf>=0){
                el.display=true
            }else{
                el.display=false 
            }
        })
    }
    return data
}

export {
    injectStyleState,
    toggleDisplayViaKeyAndId,
    toggleDisplayViaArrayOfIds
}