import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../reducers/auth"

// AuthForm for login and register
function AuthForm() {
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLogin, setIsLogin] = useState("");
    const authType = isLogin ? "Login" : "Register";
    const oppositeAuthCopy = isLogin
        ? "Not registered?"
        : "Already registed?";
    const oppositeAuthType = isLogin ? "Register" : "Login";

// Send credentials to server
async function attemptAuth(event) {
    event.preventDefault();
    setError(null);

    const authMethod = isLogin ? login : register;
    const credentials = {username, password};

    try {
        setLoading(true);
        await authMethod(credentials).unwrap();
    } catch(error) {
        setLoading(false);
        setError(error.data);
    }
}

return (
    <>
        <h1>{authType}</h1>
        <form onsubmit={attemptAuth} name={authType}>
            <label>
                Username
                <input type="text" name="username" onChange={(event) => {
                    setUsername(event.target.value);
                }}
                />
            </label>
            <label>
                Password
                <input type="password" name="password" onChange={(event) => {
                    setPassword(event.target.value);
                }}
                />
            </label>
            <buttom type="submit">{authType}</buttom>
        </form>
        <p>
            {oppositeAuthCopy}{" "}
            <a onClick={() => {
                setIsLogin(!isLogin);
            }}
            >
                {oppositeAuthType}
            </a>
        </p>
        {loading && <p>Logging in...</p>}
        {error && <p>{error}</p>}
    </>
    );
}

export default AuthForm;