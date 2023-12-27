import ReactDomRenderer from "../packages/react-dom";
import React from "../packages/react";

import App from "./app";

const root = document.getElementById("root");
ReactDomRenderer.render(<App />, root);
// ReactDomRenderer.render(
//     <div>
//         <p>
//             Hello
//             <span>Bob</span>
//             <strong>Smith</strong>
//         </p>
//         <p>How are you?</p>
//         <p>Something</p>
//     </div>,
//     root
// );
