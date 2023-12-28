import React from "../packages/react";

function Kevin() {
    return (
        <aside>
            <h4>Aside from Kevin, it's all good</h4>
        </aside>
    );
}

function KevinsDad() {
    return <Kevin />;
}

export default function App() {
    // const [name] = useState("Fred");

    return (
        <div className="app">
            <h1>Hello name</h1>
            <p>
                My name is <strong>Jamie</strong>
            </p>
            <KevinsDad />
        </div>
    );
}
