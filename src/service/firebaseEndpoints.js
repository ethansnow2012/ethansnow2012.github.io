

//pseudo type dependcy: fireGlobalContext

const authorDefaultFirebaseId = 'A6KyMKQiSIg1CmuVWVEw0Od3NVh1'//ethansnow2012
const _notAuthed = function () {}

_notAuthed.prototype.getStore = (fireGlobalContext, collectionKey, dataKey, options={})=>{// option field: author 
    /* type define getStoreOptions
    ** filter<{id}>
    */
    return new Promise((resolve, reject)=>{
        const firebase = fireGlobalContext
        const userUid = firebase?.self.auth().currentUser?.uid // even not authed access can use some user info

        var docRef = firebase.store.collection(collectionKey).doc(options.author??authorDefaultFirebaseId);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                let data = doc.data()
                if(options.filter){
                    const topic = options.filter.id
                    resolve(data.data[dataKey].data.filter(x=>x.id==topic)[0])
                }
                resolve(data.data[dataKey])
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                reject()
            }
        })
    })
}

const fieldForUi = [
    'editable',
    'active'
]
const _authed = function () {}

_authed.prototype.setStore = (fireGlobalContext, collectionKey, data)=>{
    console.log('fireGlobalContext', fireGlobalContext)
    data= JSON.parse(JSON.stringify(data))
    const firebase = fireGlobalContext
    const userUid = firebase.self.auth()?.currentUser.uid

    // mutate data before it get stored
    Object.keys(data).map(function(key) {
        let el = data[key]
        if(el.data){
            data[key].data = el.data.filter(x=>x.ui_data!=true)
                .map((x)=>{ 
                    fieldForUi.forEach((dueField)=>{
                        delete x[dueField]
                    })
                    return x
                })
        }
    })

    // require fields:
    const dataRootType = {}
    dataRootType.uid = firebase.self.auth().currentUser.uid
    dataRootType.data = data

    return firebase.store
        .collection(collectionKey)
        .doc(userUid)
        .set(dataRootType)
}

const _firebaseEndpoints = function () {
    this.authed = new _authed()
    this.notAuthed = new _notAuthed()
}

export const firebaseEndpoints = new _firebaseEndpoints()