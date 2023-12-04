import React from "react";

const LastBookContext = React.createContext({
  lastBookElement: null,
  setLastBookElement: () => {},
});

export default LastBookContext;
