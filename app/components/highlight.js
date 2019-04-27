import highlight from 'highlight.js';

if (process.browser) {
  highlight.configure({
    languages: ['javascript', 'java', 'swift', 'cpp'],
  });

  window.hljs = highlight;
}
