import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styles from './blog.module.css';
import Image from 'next/image';

function BlogData({ blog }) {
    return (
        <section className="w-full flex flex-col gap-5 p-2">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <div className='w-full relative h-full'>
                {blog?.imageURL && (
                    <Image
                        className="h-full max-h-[300px] object-cover rounded-lg"
                        src={blog.imageURL}
                        alt={blog.title || 'blog Image'}
                        height={1000}
                        width={1000}
                    />
                )}
            </div>
            <div className={`px-3 rounded-md prose prose-lg max-w-none ${styles.postStyle}`}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{blog.content}</ReactMarkdown>
            </div>
        </section>
    );
}

export default BlogData;
