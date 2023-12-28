import React from "../packages/react";

function Kevin(props) {
    return (
        <aside>
            <h4>Aside from Kevin, it's all good</h4>
            <h6>Dude</h6>
            {props.children}
        </aside>
    );
}

export default function App() {
    // const [name] = useState("Fred");

    return (
        <div className="app">
            <h1
                id="headingOne"
                onClick={() => console.log("click event worked")}
            >
                Hello name
            </h1>
            <p>
                My name is <strong>Jamie</strong>
            </p>
            <Kevin>in the hood</Kevin>
        </div>
    );
}
