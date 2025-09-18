"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { SocketProvider } from "../contexts/SocketContext";
import { CurrentUserProvider } from "../contexts/CurrentUser";
import { FormProvider } from "../contexts/FormContext";
import theme from "../../theme";
import store from "../redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CurrentUserProvider>
        <SocketProvider>
          <FormProvider>
            <ChakraProvider
              theme={theme}
              toastOptions={{ defaultOptions: { variant: 'custom' } }}
            >
              {children}
            </ChakraProvider>
          </FormProvider>
        </SocketProvider>
      </CurrentUserProvider>
    </Provider>
  );
}