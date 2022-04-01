
import React, {forwardRef, useImperativeHandle} from 'react'


export function DataForwarder(Element){
    
    return forwardRef((props, ref)=>{
        useImperativeHandle(ref, () => ({
            log: () => {
                console.log('useImperativeHandle', ref)
            },
            // get input() {
            //     return inputRef.current;
            // },
            // get label() {
            //     return labelRef.current;
            // },
        }));
        return (
            <div >
                <Element {...props}/>
            </div>
        )
    })
}