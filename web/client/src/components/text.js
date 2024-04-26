import './text.css'
import React, { useState, useEffect, useRef } from 'react';

function Text(props) {
    const [text, setText] = props;

    return(
        <div
            className="text" 
            contentEditable={true}
            style={{ border: '1px solid #ccc', minHeight: '100px', padding: '10px' }}
            onInput={e => setText(e.value)}
        >
            { text }
        </div>
    )

}

export default Text