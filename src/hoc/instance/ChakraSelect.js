
import { Select } from '@chakra-ui/react'
import { ChakraCssInjector } from 'hoc/factory/ChakraCssInjector'

const styleString = `
    --chakra-colors-gray-200: aquamarine !important;
    & *:focus{
        border-color: aquamarine !important;
        box-shadow: 0 0 0 1px aquamarine !important;
    }
`

export const CSelect = ChakraCssInjector(Select, styleString);