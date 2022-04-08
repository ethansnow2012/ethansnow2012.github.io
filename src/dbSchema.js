


const userCollectionkey = 'test-atticstoneV2'

const test_dbCollectionSchema = {
    //readable by every one; writeable by self
    atticstoneV2:[
        {
            uid:'--',
            space:[ //just allow one for now
                {
                    categories:{},
                    tags:{},
                    topics:{}
                }
            ]// actual
        }
    ]
}
export {
    test_dbCollectionSchema,
}