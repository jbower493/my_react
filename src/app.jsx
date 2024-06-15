import React from "../packages/react";

// function Kevin() {
//     const [count, setCount] = React.useState(0);
//     console.log("kev");
//     return (
//         <h2 id="headingTwo" onClick={() => setCount(count + 1)}>
//             Kevin's count: {count}
//         </h2>
//     );
// }

// export default function App() {
//     const [name] = React.useState("Jim");
//     const [count, setCount] = React.useState(0);
//     console.log("jims app");
//     return (
//         <div className="app">
//             <h1 id="headingOne" onClick={() => setCount(count + 1)}>
//                 {name}'s count: {count}
//             </h1>
//             {count > 1 && count < 10 ? (
//                 <div id="highCount">Its a high count</div>
//             ) : (
//                 <Kevin />
//             )}
//         </div>
//     );
// }

// function AppKid() {
//     const [secondCount, setSecondCount] = React.useState(0);

//     React.useEffect(() => {
//         console.log("my first effect ran");
//     }, []);

//     React.useEffect(() => {
//         console.log("my second effect ran");
//     }, [secondCount]);

//     React.useEffect(() => {
//         console.log("my third effect ran");
//     });

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

function Users({ name }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [users, setUsers] = React.useState(null);

    React.useEffect(() => {
        setIsLoading(true);

        fetch("https://randomuser.me/api/")
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                // setUsers(data);
            });
    }, []);

    return (
        <div>
            <h2>{name || "Default Users Page Name"}</h2>
            {isLoading ? <div>Loading users...</div> : <div>Users fetched</div>}
            {/* <div>{users?.info?.seed || "Nothing yet"}</div> */}
        </div>
    );
}

export default function App() {
    const [usersPageName, setUsersPageName] = React.useState("");

    return (
        <div>
            <h1>App</h1>
            <input
                placeholder="Set users page name"
                value={usersPageName}
                onChange={(e) => setUsersPageName(e.target.value)}
            />
            <Users name={usersPageName} />
        </div>
    );
}
