import React, { useState, useEffect, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; // Import the CodeMirror CSS
import 'codemirror/mode/stex/stex'; // Import the LaTeX mode
import 'codemirror/theme/idea.css'


function Text(props) {
    const { file, setFile, tex, setTex } = props;
    // Function to handle code changes
    const handleCodeChange = (editor, data, value) => {
        setTex({ url: tex.url, contents: value}); // Update the code state
    };

    useEffect(e => {
        if (file) {
            setTex(file);
            setFile(null);
        }
    }, [file])

    return(<>
        <div className='code-frame' style={{ overflow: 'hidden', height: '100%', }}>
            <CodeMirror
                value={tex.contents}
                onBeforeChange={handleCodeChange}
                options={{
                    mode: 'stex', // Set the language mode
                    lineNumbers: true, // Show line numbers
                    lineWrapping: false,
                    theme: 'idea',
                }}
            />
        </div>
    </>)

}

export default Text