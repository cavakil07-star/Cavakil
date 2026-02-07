'use client';
import React from 'react';
import TiptapEditor from './TiptapEditor';

function RTEFieldGlobal({ name, content, setValue }) {
    return (
        <div className="w-full bg-white text-primary">
            <TiptapEditor
                name={name}
                content={content}
                setValue={setValue}
                height="400px"
            />
        </div>
    );
}

export default RTEFieldGlobal;
