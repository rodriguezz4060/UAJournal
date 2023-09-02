import React from 'react';
import EditorJS from '@editorjs/editorjs';
import {useRef} from "react";

const Editor = () => {
    const ref = useRef<null | EditorJS>(null);
    React.useEffect(() => {
        if (!ref.current?.isReady) {
            ref.current = new EditorJS({
                holder: 'textEditor',
                placeholder: 'Введите текст вашей статьи',
                hideToolbar: false,
            });
        }
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);
    return <div id={'textEditor'} ref={ref}/>;
};

export default Editor;