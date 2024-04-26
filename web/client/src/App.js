import { useEffect, useState } from 'react';
import './App.css'
import Text from './components/text'

function App() {
    const [text, setText] = useState(text);

    return (
        <div className="app">
            <Text text={text} setText={setText} />
        </div>
    );
}

export default App;
