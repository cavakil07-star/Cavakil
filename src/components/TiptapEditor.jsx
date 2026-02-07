'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
// Table extensions
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
// Text styling
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
// Task list
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
// Typography
import Typography from '@tiptap/extension-typography';
import TurndownService from 'turndown';
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
    Heading1,
    Heading2,
    Heading3,
    Minus,
    Table as TableIcon,
    TableCellsMerge,
    TableCellsSplit,
    Rows3,
    Columns3,
    Trash2,
    Palette,
    Highlighter,
    ListTodo,
    Search,
    X,
} from 'lucide-react';

// Convert HTML to Markdown
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
});

// Add table support to turndown
turndownService.addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: function (content) {
        return ' ' + content.trim() + ' |';
    }
});

turndownService.addRule('tableRow', {
    filter: 'tr',
    replacement: function (content, node) {
        let output = '|' + content + '\n';
        if (node.parentNode.nodeName === 'THEAD') {
            const cellCount = node.querySelectorAll('th, td').length;
            output += '|' + ' --- |'.repeat(cellCount) + '\n';
        }
        return output;
    }
});

turndownService.addRule('table', {
    filter: 'table',
    replacement: function (content) {
        return '\n\n' + content + '\n\n';
    }
});

// Add task list support to turndown
turndownService.addRule('taskListItem', {
    filter: function (node) {
        return node.nodeName === 'LI' && node.getAttribute('data-type') === 'taskItem';
    },
    replacement: function (content, node) {
        const checkbox = node.querySelector('input[type="checkbox"]');
        const checked = checkbox && checkbox.checked ? 'x' : ' ';
        return `- [${checked}] ${content.trim()}\n`;
    }
});

// Predefined colors for color picker
const TEXT_COLORS = [
    { name: 'Default', color: null },
    { name: 'Black', color: '#000000' },
    { name: 'Dark Gray', color: '#4B5563' },
    { name: 'Red', color: '#EF4444' },
    { name: 'Orange', color: '#F97316' },
    { name: 'Yellow', color: '#EAB308' },
    { name: 'Green', color: '#22C55E' },
    { name: 'Blue', color: '#3B82F6' },
    { name: 'Purple', color: '#A855F7' },
    { name: 'Pink', color: '#EC4899' },
];

const HIGHLIGHT_COLORS = [
    { name: 'None', color: null },
    { name: 'Yellow', color: '#FEF08A' },
    { name: 'Green', color: '#BBF7D0' },
    { name: 'Blue', color: '#BFDBFE' },
    { name: 'Purple', color: '#E9D5FF' },
    { name: 'Pink', color: '#FBCFE8' },
    { name: 'Red', color: '#FECACA' },
    { name: 'Orange', color: '#FED7AA' },
];

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

// Color Picker Dropdown Component
const ColorPicker = ({ colors, onSelect, currentColor, icon: Icon, title }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                title={title}
                className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer flex items-center gap-1"
            >
                <Icon size={18} style={{ color: currentColor || 'inherit' }} />
            </button>
            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20 grid grid-cols-5 gap-1 min-w-[160px]">
                        {colors.map((c) => (
                            <button
                                key={c.name}
                                type="button"
                                onClick={() => {
                                    onSelect(c.color);
                                    setIsOpen(false);
                                }}
                                title={c.name}
                                className={`w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform ${
                                    c.color === null ? 'bg-white relative' : ''
                                }`}
                                style={{ backgroundColor: c.color || 'white' }}
                            >
                                {c.color === null && (
                                    <X size={14} className="absolute inset-0 m-auto text-gray-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// Table Menu Dropdown Component
const TableMenu = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false);

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                title="Table"
                className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${
                    editor.isActive('table') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'
                }`}
            >
                <TableIcon size={18} />
            </button>
            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-20 min-w-[180px]">
                        <button
                            type="button"
                            onClick={insertTable}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm"
                        >
                            <TableIcon size={16} /> Insert Table (3x3)
                        </button>
                        <hr className="my-1" />
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().addRowBefore().run(); setIsOpen(false); }}
                            disabled={!editor.can().addRowBefore()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                        >
                            <Rows3 size={16} /> Add Row Above
                        </button>
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().addRowAfter().run(); setIsOpen(false); }}
                            disabled={!editor.can().addRowAfter()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                        >
                            <Rows3 size={16} /> Add Row Below
                        </button>
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().deleteRow().run(); setIsOpen(false); }}
                            disabled={!editor.can().deleteRow()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50 text-red-600"
                        >
                            <Trash2 size={16} /> Delete Row
                        </button>
                        <hr className="my-1" />
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().addColumnBefore().run(); setIsOpen(false); }}
                            disabled={!editor.can().addColumnBefore()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                        >
                            <Columns3 size={16} /> Add Column Left
                        </button>
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().addColumnAfter().run(); setIsOpen(false); }}
                            disabled={!editor.can().addColumnAfter()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                        >
                            <Columns3 size={16} /> Add Column Right
                        </button>
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().deleteColumn().run(); setIsOpen(false); }}
                            disabled={!editor.can().deleteColumn()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50 text-red-600"
                        >
                            <Trash2 size={16} /> Delete Column
                        </button>
                        <hr className="my-1" />
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().mergeCells().run(); setIsOpen(false); }}
                            disabled={!editor.can().mergeCells()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                        >
                            <TableCellsMerge size={16} /> Merge Cells
                        </button>
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().splitCell().run(); setIsOpen(false); }}
                            disabled={!editor.can().splitCell()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                        >
                            <TableCellsSplit size={16} /> Split Cell
                        </button>
                        <hr className="my-1" />
                        <button
                            type="button"
                            onClick={() => { editor.chain().focus().deleteTable().run(); setIsOpen(false); }}
                            disabled={!editor.can().deleteTable()}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm disabled:opacity-50 text-red-600"
                        >
                            <Trash2 size={16} /> Delete Table
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

// Find & Replace Component
const FindReplace = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [replaceTerm, setReplaceTerm] = useState('');

    const handleFind = useCallback(() => {
        if (!searchTerm || !editor) return;
        
        const { state } = editor;
        const { doc } = state;
        
        let pos = 0;
        doc.descendants((node, nodePos) => {
            if (node.isText) {
                const nodeText = node.text || '';
                const matchIndex = nodeText.toLowerCase().indexOf(searchTerm.toLowerCase());
                if (matchIndex !== -1 && pos === 0) {
                    pos = nodePos + matchIndex;
                    return false;
                }
            }
        });
        
        if (pos > 0) {
            editor.chain().focus().setTextSelection({ from: pos, to: pos + searchTerm.length }).run();
        }
    }, [searchTerm, editor]);

    const handleReplace = useCallback(() => {
        if (!searchTerm || !editor) return;
        
        const { state } = editor;
        const { from, to } = state.selection;
        const selectedText = state.doc.textBetween(from, to);
        
        if (selectedText.toLowerCase() === searchTerm.toLowerCase()) {
            editor.chain().focus().insertContent(replaceTerm).run();
            handleFind();
        } else {
            handleFind();
        }
    }, [searchTerm, replaceTerm, editor, handleFind]);

    const handleReplaceAll = useCallback(() => {
        if (!searchTerm || !editor) return;
        
        let content = editor.getHTML();
        const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        content = content.replace(regex, replaceTerm);
        editor.commands.setContent(content);
    }, [searchTerm, replaceTerm, editor]);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                title="Find & Replace"
                className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${
                    isOpen ? 'bg-gray-200 text-blue-600' : 'text-gray-700'
                }`}
            >
                <Search size={18} />
            </button>
            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20 min-w-[280px]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-sm">Find & Replace</span>
                            <button 
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Find..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                                onKeyDown={(e) => e.key === 'Enter' && handleFind()}
                            />
                            <input
                                type="text"
                                placeholder="Replace with..."
                                value={replaceTerm}
                                onChange={(e) => setReplaceTerm(e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={handleFind}
                                    className="flex-1 px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                                >
                                    Find
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReplace}
                                    className="flex-1 px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                                >
                                    Replace
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReplaceAll}
                                    className="flex-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                                >
                                    All
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

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

            {/* Text Color & Highlight */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ColorPicker
                    colors={TEXT_COLORS}
                    onSelect={(color) => {
                        if (color) {
                            editor.chain().focus().setColor(color).run();
                        } else {
                            editor.chain().focus().unsetColor().run();
                        }
                    }}
                    currentColor={editor.getAttributes('textStyle').color}
                    icon={Palette}
                    title="Text Color"
                />
                <ColorPicker
                    colors={HIGHLIGHT_COLORS}
                    onSelect={(color) => {
                        if (color) {
                            editor.chain().focus().toggleHighlight({ color }).run();
                        } else {
                            editor.chain().focus().unsetHighlight().run();
                        }
                    }}
                    currentColor={editor.getAttributes('highlight').color}
                    icon={Highlighter}
                    title="Highlight"
                />
            </div>

            {/* Task List */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    isActive={editor.isActive('taskList')}
                    title="Task List"
                >
                    <ListTodo size={18} />
                </ToolbarButton>
            </div>

            {/* Table */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
                <TableMenu editor={editor} />
            </div>

            {/* Undo/Redo */}
            <div className="flex items-center border-r border-gray-300 pr-2 mr-2">
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

            {/* Find & Replace */}
            <div className="flex items-center">
                <FindReplace editor={editor} />
            </div>
        </div>
    );
};

// Main TipTap Editor Component
function TiptapEditor({ name, content, setValue, height = '400px' }) {
    const editor = useEditor({
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
            // Table extensions
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse border border-gray-300',
                },
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 bg-gray-100 p-2 font-semibold',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 p-2',
                },
            }),
            // Text styling
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            // Task list
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            // Typography (smart quotes, dashes, etc.)
            Typography,
        ],
        content: content || '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none p-4',
                style: `min-height: calc(${height} - 50px); overflow-y: auto;`,
            },
        },
        onUpdate: ({ editor }) => {
            // Convert HTML to Markdown
            const html = editor.getHTML();
            const markdown = turndownService.turndown(html);
            if (name) {
                setValue(name, markdown, { shouldValidate: true, shouldDirty: true });
            } else {
                setValue('content', markdown, { shouldValidate: true, shouldDirty: true });
            }
        },
    });

    // Update editor content when content prop changes
    useEffect(() => {
        if (editor && content !== undefined) {
            const currentContent = turndownService.turndown(editor.getHTML());
            if (content !== currentContent) {
                // Convert markdown to HTML for TipTap
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
