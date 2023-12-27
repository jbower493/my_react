import React from "../packages/react";

export default function App() {
    const [name] = useState("Fred");

    return (
        <div className="app">
            <h1>Hello {name}</h1>
        </div>
    );
}
