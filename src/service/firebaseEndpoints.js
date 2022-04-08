

//pseudo type dependcy: fireGlobalContext
const authStore = function (params) {
    
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

    firebase.store
        .collection(collectionKey)
        .doc(userUid)
        .set(dataRootType)
}

const _firebaseEndpoints = function () {
    this.authed = new _authed()
}

export const firebaseEndpoints = new _firebaseEndpoints()