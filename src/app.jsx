import React from "../packages/react";

function Kevin(props) {
    const [cousin] = React.useState("Bob");

    return (
        <aside>
            <h4>Aside from Kevin, it's all good</h4>
            <h6>Dude: {cousin}</h6>
            {props.children}
        </aside>
    );
}

export default function App() {
    // const [name] = React.useState("Fred");
    const [count, setCount] = React.useState(0);
    const name = "ken";
    return (
        <div className="app">
            <h1 id="headingOne" onClick={() => setCount(count + 1)}>
                Hello {count}
            </h1>
            <p>
                My name is <strong>{name}</strong>
            </p>
            {/* <Kevin>in the hood</Kevin> */}
        </div>
    );
}
