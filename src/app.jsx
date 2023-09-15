import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { useSelector } from "react-redux";
import { useMeQuery } from "./reducers/auth";

function App() {

    const me = useSelector((state) => state.auth.credentials.user);

    console.log(me);

    const guestRouter = (
        <Routes>
            <Route path="/*" element={<AuthForm />} />
        </Routes>
    );

    return guestRouter;
}

export default App;
