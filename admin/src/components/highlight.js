import highlight from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css'


highlight.configure({
    languages: ['javascript', 'java', 'swift', "cpp" ]
});

window.hljs = highlight;