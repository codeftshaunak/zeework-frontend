"use client";

import React from "react";
import { ChakraProvider, } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { SocketProvider } from "../contexts/SocketContext";
import { CurrentUserProvider } from "../contexts/CurrentUser";
import { FormStateProvider } from "../contexts/FormContext";
import theme from "./theme";
import store from "../redux/store";
import { Toaster } from "@/components/ui/toaster";

// export const toaster = createToaster({
//   placement: "top",
// });



export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <CurrentUserProvider>
          <SocketProvider>
            <FormStateProvider>
              <ChakraProvider value={theme}>
                {children}
                <Toaster />
              </ChakraProvider>
            </FormStateProvider>
          </SocketProvider>
        </CurrentUserProvider>
      </CookiesProvider>
    </Provider>
  );
}
