import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&subset=korean");

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: 'Noto Sans KR', 'Sans-serif';
    /* font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", Dotum, '돋움', "Noto Sans KR", "Nanum Gothic", 'Lato', Helvetica, sans-serif; */
    vertical-align: top;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  * {
  	/*-webkit-overflow-scrolling: touch;*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  *:before,
  *:after{
  	box-sizing: border-box;
  	-webkit-box-sizing: border-box;
  }

  body {
  	color: #333;
  	line-height: 1.2;
  	word-break: keep-all;
  	word-wrap: break-word;
  	-webkit-text-size-adjust:none; /* 뷰포트 변환시 폰트크기 자동확대 방지 */
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }

  ol, ul {
  	list-style: none;
  }

  pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}

  blockquote, q {quotes: none;}

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {content: ''; content: none;}

  table {
  	border-collapse: collapse;
  	border-spacing: 0;
  }

  caption, legend{font-size:0; line-height:0; height:0;}

  img, fieldset, iframe {
  	border: 0 none;
  }

  img, iframe{max-width: 100%;}

  a {color:inherit; text-decoration:none; cursor: pointer; }
  a:hover, a:active {text-decoration:none }
  a:active, a:focus {outline: none; }

  ::-webkit-input-placeholder {color:#aaa; }
  ::-moz-placeholder {color:#aaa; } /* firefox 19+ */
  :-moz-placeholder {color:#aaa; }
  :-ms-input-placeholder {color:#aaa; } /* ie */

  button {cursor: pointer;}
  button::-moz-focus-inner {border:0; padding:0;}
  button:disabled{opacity: 0.7}

  textarea {resize: none; box-shadow: none}

  input, select,
  textarea, button {
    margin:0;
    padding:0;
    font-size: 100%;
    font-family: 'Noto Sans KR', 'Sans-serif';
    vertical-align: top;
    border-radius:0;
    -webkit-border-radius:0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    outline: none;
  }

  input:disabled,
  textarea:disabled,
  select:disabled{
  	background: #f3f3f3;
  	cursor: not-allowed;
  }
  input:-webkit-autofill {
  	-webkit-box-shadow: 0 0 0 30px white inset;
  }
  input[type='file'],
  ::-webkit-file-upload-button {cursor:pointer;}

  .ellipsis{display: block; width: 100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}
`;
export default GlobalStyles;
