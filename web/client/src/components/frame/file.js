import { useEffect } from "react"

function File(props) {
    const {files, setTex} = props;

    return (
        <div className="files">
            {files.map((file) => {
                return <li onClick={async e => {
                    try {
                        const response = await fetch('http://localhost:3002/file/' + file, { method: 'GET' });
                        const data = await response.text();
                        setTex({url: file, contents: data});
                    }
                    catch (err) {
                        console.log(err);
                    }
                }}>{file}</li>
            })}
        </div>
    )
}

export default File