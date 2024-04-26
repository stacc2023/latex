import { useEffect, useState } from 'react';
import './index.scss'
import Text from './text'
import Viewer from './viewer'
import File from './file';

async function sendTex(tex, setPdfUrl) {
    try {
        const response = await fetch('http://localhost:3002/text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tex),
        });

        console.log(response.status);

        if (response.status != 200) {
            setPdfUrl('');
            return
        }

        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl)
    }

    catch (err) {
        console.log(err)
    }
}

async function getFiles(setFiles) {
    try {
        const response = await fetch('http://localhost:3002/files', { method: 'GET', });
        const data = await response.json();
        setFiles(data)
    } 
    catch (err) {
        console.log(err)
    }
}

function Frame() {
    // tex: { url, contents }
    const [tex, setTex] = useState({url: 'first.tex', contents: null});
    const [pdfUrl, setPdfUrl] = useState();
    const [files, setFiles] = useState([]);

    useEffect(() => { getFiles(setFiles) }, [pdfUrl])

    return (
        <div className="frame">
            <header>
                <span id='logo' className='left'>LaTeX</span>
                <button className='right' onClick={e => sendTex(tex, setPdfUrl)}>전송</button>
            </header>
            <div className='contents'>
                <div className='sidebar'>
                    <File files={files} setTex={setTex} />
                </div>
                <Text tex={tex} setTex={setTex} />
                {pdfUrl && <Viewer pdfUrl={pdfUrl} />}
                {!pdfUrl && <div className='pdf-frame'></div>}
            </div>
        </div>
    )
}

export default Frame