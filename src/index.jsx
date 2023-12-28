import ReactDomRenderer from "../packages/react-dom";
import React from "../packages/react";

import App from "./app";

const root = document.getElementById("root");
// ReactDomRenderer.render(<div>Mate</div>, root);
ReactDomRenderer.render(<App />, root);
// ReactDomRenderer.render(
//     <section>
//         <p>
//             Message:
//             <span> Hello</span>
//             <strong> world</strong>
//         </p>
//         <h1>adsfd</h1>
//         <p>asdffds</p>
//         <aside>
//             <h4>This is working</h4>
//             <p>
//                 It would seem <span>Its a miracle</span>
//             </p>
//         </aside>
//     </section>,
//     root
// );
