import ReactDomRenderer from "../packages/react-dom";
import React from "../packages/react";

import App from "./app";

const root = document.getElementById("root");
// ReactDomRenderer.render(<div>Mate</div>, root);
// ReactDomRenderer.render(<App />, root);
ReactDomRenderer.render(
    <section>
        <p>
            Message:
            <span>Hello</span>
            <strong>world</strong>
        </p>
        <p>adsfd</p>
        <p>asdffds</p>
    </section>,
    root
);
