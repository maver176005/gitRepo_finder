import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./components/App";
import "./index.css";
const API_KEY = import.meta.env.VITE_GH_TOKEN;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

const rootContainer = document.querySelector("#root");
const root = createRoot(rootContainer!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
