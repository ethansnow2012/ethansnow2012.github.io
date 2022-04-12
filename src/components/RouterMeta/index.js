
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export function RouterMeta(props) {
    let navigate = useNavigate(); 
    useEffect(()=>{
        console.log('RouterMeta navigate')
        const href = window.location.href
        const newPath = href.split('/?gh-pages-alter')[1]
        if(newPath){
            navigate(newPath, {replace: true})
        }
    }, [])
    return (
        <div></div>
    )
}
