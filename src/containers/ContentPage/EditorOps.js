import { Transforms } from 'slate'

export const EditorOps = {
    addCodeBlock: (editor, at=null)=>{
        Transforms.insertNodes(
            editor,
            { type: 'code', children: [{ text: `xxxx` }] },
            { at: [at??editor.children.length] }
        )
    },
    insertImage: (editor, url, firebasePath='') => {
        const text = { text: '' }
        const image = { type: 'image', url, children: [text] , firebasePath: firebasePath}
        Transforms.insertNodes(editor, image)
    }
}

