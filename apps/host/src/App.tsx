import React, { Suspense, lazy } from "react";

const RemoteUsersList = lazy(() => import("users/UsersApp"));

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Host App</h1>
      <p>
        The following component is loaded from the <strong>users</strong>{" "}
        remote:
      </p>
      <Suspense fallback={<p>Loading users module...</p>}>
        <RemoteUsersList />
      </Suspense>
    </div>
  );
}
