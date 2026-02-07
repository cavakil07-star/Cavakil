"use client"
import React from "react";
import TiptapEditor from '@/components/TiptapEditor';

function RTEField({ content, setValue }) {
    return (
        <div className="w-full mx-auto bg-white text-primary">
            <TiptapEditor
                content={content}
                setValue={setValue}
                height="600px"
            />
        </div>
    );
}

export default RTEField;

