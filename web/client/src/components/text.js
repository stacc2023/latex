import './text.css'
import React, { useState, useEffect, useRef } from 'react';

function highlight(text) {
    return text
}

function Text(props) {
    const { text, setText } = props;
    return(
        <textarea
            className="text" 
            style={{ border: '1px solid #ccc', minHeight: '100px', padding: '10px' }}
            onChange={e => setText(highlight(e.target.value))}
            value={text}
        >
        </textarea>
    )

}

export default Text