import React  from 'react';
import ReactQuill  from 'react-quill';
import PropTypes from 'prop-types'
import { uploadfile } from 'commons/_api';
import { APP_CONFIG } from 'utils/constants';
import 'react-quill/dist/quill.snow.css';
import { KEY } from '../../modules/Commons/_store/constants';
import ImageResize from 'quill-image-resize-module-react';  // import as default
import QuillBetterTable from 'quill-better-table'


ReactQuill.Quill.register('modules/imageResize', ImageResize);
ReactQuill.Quill.register(
  {
    'modules/better-table': QuillBetterTable
  },
  true
);
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' , readOnly: false };
    this.quillRef = null;
    this.handleChange = this.handleChange.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.insertTable = this.insertTable.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setQuillRef = element => {
      this.quillRef = element;
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) { 
    if (nextProps.type && nextProps.type === KEY.DETAIL) {
      this.setState({readOnly: true})
    }
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.value && !this.state.editorHtml  ) {
      this.setState({ editorHtml: nextProps.value });
    }
  }
  
 
  handleChange(html) {
    this.setState({ editorHtml: html });
    this.handleBlur();
  }
  
  handleBlur() {
    this.props.onChange(this.state.editorHtml);
  }

  imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = async function() {
      const file = input.files[0];
      // Save current cursor state
 
      const range = this.quillRef.getEditor().getSelection(true);

      // Insert temporary loading placeholder image
      // this.quillRef.getEditor().insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);
      // Move cursor to right side of image (easier to continue typing)
      this.quillRef.getEditor().setSelection(range.index + 1);

      const res = await uploadfile(file); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      this.quillRef.getEditor().deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quillRef.getEditor().insertEmbed(range.index, 'image', APP_CONFIG.appUrl + res);
    }.bind(this);
  }
  insertTable() {
    let module = this.quillRef.getEditor().getModule('better-table')
    module.insertTable(3, 3)
  } 

  render() {
    return (
      <>
        <ReactQuill
          readOnly={this.state.readOnly}
          ref={this.setQuillRef}
          onChange={this.handleChange}
          value={this.state.editorHtml}        
          placeholder={this.props.placeholder}
          theme="snow"
          onBlur={this.handleBlur}
          modules={{
            table: true,  // disable table module
            'better-table': {
              operationMenu: {
                items: {
                  unmergeCells: {
                    text: 'Another unmerge cells name'
                  }
                },
                color: {
                  colors: ['#fff', 'red', 'rgb(0, 0, 0)'],  // colors you need in operationMenu, ['white', 'red', 'yellow', 'blue'] as default
                  text: 'Background Colors'  // subtitle, 'Background Colors' as default
                } 
              }
            },
            // keyboard: {
            //   bindings: QuillBetterTable.keyboardBindings
            // },
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
                ['blockquote', 'code-block'],                    // blocks
                [{ 'header': 1 }, { 'header': 2 }],              // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
                [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
                [{ 'direction': 'rtl' }],                        // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
                [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
                [{ 'font': [] }],                                // font family
                [{ 'align': [] }],   
                ['image'],                            // text align
                ['clean'],   
                ['table']  
              ],
              handlers: {
                image: this.imageHandler,
                table: this.insertTable
              }
            },
            imageResize: {
              handleStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar'],
            },

          }}
        />
      </>
    );
  }
}

Editor.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  type: PropTypes.string,
}

Editor.defaultProps = {
  placeholder: 'Nhập vào nội dung',
  type: ''
}

export default Editor;



// import React, {  useRef  } from 'react';
// import ReactQuill from 'react-quill';
// import PropTypes from 'prop-types'
// import { uploadfile } from 'commons/_api';
// import { APP_CONFIG } from 'utils/constants';
// import 'react-quill/dist/quill.snow.css';


// function Editor(props) {
//   // const [value, setValue] = useState('');
//   const {placeholder , onChange } = props
//   const quillRef = useRef(null);
//   const imageHandler = () => {
//     const input = document.createElement('input');

//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const urlImage = await uploadfile(file); // I'm using react, so whatever upload function
//       const range = quillRef.current.getEditor().getSelection();
//       const link = `${APP_CONFIG.appUrl}${urlImage}`;
//       // by 'image' option below, you just have to put src(link) of img here. 
//       quillRef.current.getEditor().insertEmbed(range.index, 'image', link); 
//     };
//   };
  

//   const modules = {
//     toolbar: {
//       container: [
//         ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
//         ['blockquote', 'code-block'],                    // blocks
//         [{ 'header': 1 }, { 'header': 2 }],              // custom button values
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
//         [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
//         [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
//         [{ 'direction': 'rtl' }],                        // text direction
//         [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
//         [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
//         [{ 'font': [] }],                                // font family
//         [{ 'align': [] }],   
//         ['link', 'image'],                            // text align
//         ['clean'],                                       // remove formatting
//       ],
//       handlers: {
//         image: () => imageHandler()
//       }
//     },
//     clipboard: {
//       // toggle to add extra line breaks when pasting HTML:
//       matchVisual: false,
//     },
//   }
//   const formats = [
//     'header', 'font', 'background', 'color', 'code', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent', 'script', 'align', 'direction',
//     'link', 'image', 'code-block', 'formula', 'video'
//   ]
//   // const handleChange = (html) => {
//   //   onChange(html);
//   // }
//   return (
//     <ReactQuill ref={quillRef} placeholder={placeholder} formats={formats} modules={modules} theme="snow" onChange={(html) => {
//       onChange(html)
//     }}/>
//   );
// }
// Editor.propTypes = {
//   placeholder: PropTypes.string,
//   content: PropTypes.any,
//   onChange: PropTypes.func,
// }
// Editor.defaultProps = {
//   placeholder: 'Nhập vào nội dung'
// }
// export default Editor