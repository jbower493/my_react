import React from "../packages/react";

function Kevin() {
    const [count, setCount] = React.useState(0);
    console.log("kev");
    return (
        <h2 id="headingTwo" onClick={() => setCount(count + 1)}>
            Kevin's count: {count}
        </h2>
    );
}

export default function App() {
    const [name] = React.useState("Jim");
    const [count, setCount] = React.useState(0);
    console.log("jims app");
    return (
        <div className="app">
            <h1 id="headingOne" onClick={() => setCount(count + 1)}>
                {name}'s count: {count}
            </h1>
            {count > 1 && count < 10 ? <div>Its a high count</div> : <Kevin />}
        </div>
    );
}

// function AppKid() {
//     const [secondCount, setSecondCount] = React.useState(0);

//     return (
//         <div>
//             <p>{secondCount}</p>
//             <button onClick={() => setSecondCount(secondCount + 1)}>
//                 Increment second
//             </button>
//             <h4>Count</h4>
//         </div>
//     );
// }

// export default function App() {
//     const [count, setCount] = React.useState(0);

//     return (
//         <div>
//             <p>{count}</p>
//             <button onClick={() => setCount(count + 1)}>Increment</button>
//             <h2>Count</h2>
//             <AppKid />
//         </div>
//     );
// }
