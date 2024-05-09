import { Uploader } from '@arco-design/mobile-react';
import {useState} from "react"
const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });



export default function UploaderDemo() {
    const [files, setFiles] = useState([
        // { file, status: 'loaded' },
        // { file, status: 'loading' },
        // { file, status: 'error' },
    ]);

    return <Uploader files={files} onChange={setFiles}>
    </Uploader>;
}