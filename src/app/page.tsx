"use client"
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import JEEMainApp from "@/components/Main";

export default function Home() {
  return (
    <Provider store={store}>
      <JEEMainApp />
    </Provider>
  );
}
