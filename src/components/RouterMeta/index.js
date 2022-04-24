
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

let NODE_ENV = process.env.REACT_APP_NODE_ENV

export function RouterMeta(props) {
    let navigate = useNavigate(); 
    useEffect(()=>{
        if(NODE_ENV=='github_page'){
            console.log('RouterMeta navigate')
            const href = window.location.href
            const newPath = href.split('/?gh-pages-alter')[1]
            if(newPath){
                navigate(newPath.replace('&','?'), {replace: true})
            }
        }
    }, [])
    return (
        <div></div>
    )
}
