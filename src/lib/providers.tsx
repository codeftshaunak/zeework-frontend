"use client";

import React from "react";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { SocketProvider } from "../contexts/SocketContext";
import { CurrentUserProvider } from "../contexts/CurrentUser";
import { FormProvider } from "../contexts/FormContext";
import { Toaster } from "@/components/ui/sonner";
import store from "../redux/store";

// export 
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <CurrentUserProvider>
          <SocketProvider>
            <FormProvider>

              {children}
              <Toaster />

            </FormProvider>
          </SocketProvider>
        </CurrentUserProvider>
      </CookiesProvider>
    </Provider>
  );
}