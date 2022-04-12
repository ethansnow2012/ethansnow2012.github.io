
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const GitHubPageRoute = function(RouteDistElement, baseName){
    function El(props){
        let navigate = useNavigate(); 
        useEffect(() => {
            console.log('navigate111', baseName)
            const href = window.location.href
            const newPath = href.split('/?gh-pages-alter')[1]
            if(newPath){
                navigate(newPath, {replace: true})
            }
        }, [])
        return (
            <RouteDistElement navigate={navigate} />
        )
    }
    return (
        <El/>
    )
}
export default GitHubPageRoute