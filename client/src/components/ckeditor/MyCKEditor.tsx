/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdCMGYKRCAnARg6tUAcUALAKwAMICaIJp5C9pxA7KdlAqYchAKYB2yUmGAYwQoaIkBdSAGMAJqQBmAIwQqIUoA=
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
	Indent,
	IndentBlock,
	Italic,
	Link,
	Paragraph,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	Underline,
	Image,
	ImageInsert,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	List,
	type EditorConfig,
	Editor,
	EventInfo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './ckeditor.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

interface Props {
	placeholder?: string
	initialData?: string
	onChange?: (data: string) => void
}

export default function MyCKEditor(props: Props) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo<{ editorConfig: EditorConfig }>(() => {
		return {
			editorConfig: {
				toolbar: {
					items: [
						'undo',
						'redo',
						'|',
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'|',
						'link',
						'imageInsert',
						'insertTable',
						'blockQuote',
						'|',
						'bulletedList',
						'numberedList',
						'|',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Autosave,
					BlockQuote,
					Bold,
					Essentials,
					Heading,
					Indent,
					IndentBlock,
					Italic,
					Link,
					Paragraph,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					Underline,
					Image,
					ImageInsert,
					ImageCaption,
					ImageStyle,
					ImageToolbar,
					List
				],
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						}
					]
				},
				initialData: props.initialData,
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				placeholder: props.placeholder,
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
				},
				image: {
					toolbar: [
						'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
						'toggleImageCaption', 'imageTextAlternative'
					]
				},
				height: "500px"
			}
		};
	}, [isLayoutReady]);

	function onChange(_: EventInfo, editor: Editor) {
		props.onChange?.(editor.getData());
	}

	return (
		<div className="ckeditor-main-container">
			<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div ref={editorRef}>{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} onChange={onChange} />}</div>
				</div>
			</div>
		</div>
	);
}
