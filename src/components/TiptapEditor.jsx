'use client';
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
// Convert HTML to Markdown (Removed as we now save HTML directly)
// import TurndownService from 'turndown';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Heading1,
    Heading2,
    Heading3,
    Minus,
    Table as TableIcon,
    Palette,
    PaintBucket,
    Maximize2,
} from 'lucide-react';

/* const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
}); */

// Toolbar Button Component
const ToolbarButton = ({ onClick, isActive, disabled, children, title }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${isActive ? 'bg-gray-200 text-blue-600' : 'text-gray-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
        {children}
    </button>
);

// Toolbar Component
const Toolbar = ({ editor }) => {
    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addTextColor = () => {
        const color = window.prompt('Enter color (e.g., #ff0000 or red):');
        if (color) {
            editor.chain().focus().setColor(color).run();
        }
    };

    const insertTableWithSize = () => {
        const rows = window.prompt('Enter number of rows:', '3');
        const cols = window.prompt('Enter number of columns:', '3');
        if (rows && cols) {
            const numRows = parseInt(rows);
            const numCols = parseInt(cols);
            if (numRows > 0 && numCols > 0 && numRows <= 20 && numCols <= 20) {
                editor.chain().focus().insertTable({ rows: numRows, cols: numCols, withHeaderRow: true }).run();
            } else {
                alert('Please enter valid numbers between 1 and 20');
            }
        }
    };

    const setCellBackgroundColor = () => {
        const color = window.prompt('Enter cell background color (e.g., #ffff00 or yellow):');
        if (color) {
            editor.chain().focus().setCellAttribute('backgroundColor', color).run();
        }
    };

    const setCellAlignment = (alignment) => {
        editor.chain().focus().setCellAttribute('textAlign', alignment).run();
    };

    const setCellWidth = () => {
        const width = window.prompt('Enter cell width (e.g., 100px, 20%, or auto):');
        if (width) {
            editor.chain().focus().setCellAttribute('width', width).run();
        }
    };

    return (
        <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
            {/* Headings */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    <Heading3 size={18} />
                </ToolbarButton>
            </div>

            {/* Text Formatting */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold"
                >
                    <Bold size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic"
                >
                    <Italic size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Underline"
                >
                    <UnderlineIcon size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive('code')}
                    title="Code"
                >
                    <Code size={18} />
                </ToolbarButton>
            </div>

            {/* Alignment */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    title="Align Left"
                >
                    <AlignLeft size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    title="Align Center"
                >
                    <AlignCenter size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    title="Align Right"
                >
                    <AlignRight size={18} />
                </ToolbarButton>
            </div>

            {/* Lists */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    <ListOrdered size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Quote"
                >
                    <Quote size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    <Minus size={18} />
                </ToolbarButton>
            </div>

            {/* Links & Images */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={addLink}
                    isActive={editor.isActive('link')}
                    title="Add Link"
                >
                    <LinkIcon size={18} />
                </ToolbarButton>
                <ToolbarButton onClick={addImage} title="Add Image">
                    <ImageIcon size={18} />
                </ToolbarButton>
            </div>

            {/* Text Color */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={addTextColor}
                    title="Text Color"
                >
                    <Palette size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    title="Remove Color"
                >
                    <span className="text-xs font-bold">✗</span>
                </ToolbarButton>
            </div>

            {/* Table */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={insertTableWithSize}
                    title="Insert Table (Custom Size)"
                >
                    <TableIcon size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    disabled={!editor.can().addColumnBefore()}
                    title="Add Column Before"
                >
                    <span className="text-xs font-bold">⬅+</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    disabled={!editor.can().addColumnAfter()}
                    title="Add Column After"
                >
                    <span className="text-xs font-bold">➡+</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    disabled={!editor.can().deleteColumn()}
                    title="Delete Column"
                >
                    <span className="text-xs font-bold">⬇✗</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    disabled={!editor.can().addRowBefore()}
                    title="Add Row Before"
                >
                    <span className="text-xs font-bold">⬆+</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    disabled={!editor.can().addRowAfter()}
                    title="Add Row After"
                >
                    <span className="text-xs font-bold">⬇+</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    disabled={!editor.can().deleteRow()}
                    title="Delete Row"
                >
                    <span className="text-xs font-bold">➡✗</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    disabled={!editor.can().deleteTable()}
                    title="Delete Table"
                >
                    <span className="text-xs font-bold">🗑</span>
                </ToolbarButton>
            </div>

            {/* Cell Styling */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={() => setCellAlignment('left')}
                    disabled={!editor.can().setCellAttribute('textAlign', 'left')}
                    title="Align Cell Left"
                >
                    <AlignLeft size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => setCellAlignment('center')}
                    disabled={!editor.can().setCellAttribute('textAlign', 'center')}
                    title="Align Cell Center"
                >
                    <AlignCenter size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => setCellAlignment('right')}
                    disabled={!editor.can().setCellAttribute('textAlign', 'right')}
                    title="Align Cell Right"
                >
                    <AlignRight size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => setCellAlignment('justify')}
                    disabled={!editor.can().setCellAttribute('textAlign', 'justify')}
                    title="Justify Cell"
                >
                    <AlignJustify size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={setCellBackgroundColor}
                    disabled={!editor.can().setCellAttribute('backgroundColor', '#ffffff')}
                    title="Cell Background Color"
                >
                    <PaintBucket size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={setCellWidth}
                    disabled={!editor.can().setCellAttribute('width', '100px')}
                    title="Set Cell Width"
                >
                    <Maximize2 size={18} />
                </ToolbarButton>
            </div>

            {/* Undo/Redo */}
            <div className="flex items-center">
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo size={18} />
                </ToolbarButton>
            </div>
        </div>
    );
};

// Main TipTap Editor Component
function TiptapEditor({ name, content, setValue, height = '400px' }) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded',
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Start writing...',
            }),
            // Text Color Extensions
            TextStyle,
            Color,
            // Table Extensions
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full my-4',
                },
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 bg-gray-100 font-bold p-2',
                },
            }),
            TableCell.extend({
                addAttributes() {
                    return {
                        ...this.parent?.(),
                        backgroundColor: {
                            default: null,
                            parseHTML: element => element.style.backgroundColor,
                            renderHTML: attributes => {
                                if (!attributes.backgroundColor) {
                                    return {};
                                }
                                return {
                                    style: `background-color: ${attributes.backgroundColor}`,
                                };
                            },
                        },
                        textAlign: {
                            default: null,
                            parseHTML: element => element.style.textAlign,
                            renderHTML: attributes => {
                                if (!attributes.textAlign) {
                                    return {};
                                }
                                return {
                                    style: `text-align: ${attributes.textAlign}`,
                                };
                            },
                        },
                        width: {
                            default: null,
                            parseHTML: element => element.style.width,
                            renderHTML: attributes => {
                                if (!attributes.width) {
                                    return {};
                                }
                                return {
                                    style: `width: ${attributes.width}`,
                                };
                            },
                        },
                    };
                },
            }).configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 p-2',
                },
            }),
        ],
        content: content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none p-4',
                style: `min-height: calc(${height} - 50px); overflow-y: auto;`,
            },
        },
        onUpdate: ({ editor }) => {
            // Save as HTML to preserve all rich text features (colors, tables, etc.)
            const html = editor.getHTML();

            if (name) {
                setValue(name, html, { shouldValidate: true, shouldDirty: true });
            } else {
                setValue('content', html, { shouldValidate: true, shouldDirty: true });
            }
        },
    });

    // Update editor content when content prop changes
    useEffect(() => {
        if (editor && content !== undefined) {
            // Compare HTML to prevent loop
            const currentContent = editor.getHTML();
            if (content !== currentContent) {
                // TipTap handles both HTML and Markdown input automatically
                editor.commands.setContent(content || '');
            }
        }
    }, [content, editor]);

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <Toolbar editor={editor} />
            <div style={{ height, overflow: 'auto' }}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default TiptapEditor;
