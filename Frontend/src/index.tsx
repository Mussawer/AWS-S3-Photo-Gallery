import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} position='top-right'/>
  </QueryClientProvider>,
  document.getElementById("root")
);

