import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <MetaProvider>
            <Title>HTML2PDF</Title>
          </MetaProvider>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
