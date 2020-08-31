import { createContext } from "react";

const ColorContext = createContext({ color: "red", setColor: () => {} });

export default ColorContext;
