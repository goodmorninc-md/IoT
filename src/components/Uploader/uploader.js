import { Uploader } from '@arco-design/mobile-react';
import {useState} from "react"
const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'employeelist.doc', {
    type: mimeType,
});

export default function UploaderDemo() {
    

    return <Uploader  />;
}