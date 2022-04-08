import {useContext} from 'react'
import { SplitContext } from 'hoc/factory/RootPageHoc'

export const WithContextFactory = function (Element) {
    return function WithContext(props) { // here function have to has a name in order to be conside a legit react component
        //use pseudo type SplitContextValue
        const {toRightContent, leftContent, contentPageState, leftContentRef, rightContentRef} = useContext(SplitContext)
        return (
            <Element {...props} toRightContent={toRightContent} leftContentRef={leftContentRef} rightContentRef={rightContentRef}/>
        )
    }
}

