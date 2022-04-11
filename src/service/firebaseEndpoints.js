

//pseudo type dependcy: fireGlobalContext

const authFirebaseId = 'A6KyMKQiSIg1CmuVWVEw0Od3NVh1'
const _notAuthed = function () {}

_notAuthed.prototype.getStore = (fireGlobalContext, collectionKey, dataKey, options={})=>{
    /* type define getStoreOptions
    ** filter<{id}>
    */
    return new Promise((resolve, reject)=>{
        const firebase = fireGlobalContext
        const userUid = firebase?.self.auth().currentUser?.uid // even not authed access can use some user info

        var docRef = firebase.store.collection(collectionKey).doc(authFirebaseId);
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
const _authed = function () {}

_authed.prototype.setStore = (fireGlobalContext, collectionKey, data)=>{
    console.log('fireGlobalContext', fireGlobalContext)
    const firebase = fireGlobalContext
    const userUid = firebase.self.auth().currentUser.uid

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