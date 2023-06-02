import { useState } from "react";

export default function useInputState(initialValue) {
  const [inputValue, setInputValue] = useState(initialValue);
  const handleChange = (event) => setInputValue(event.target.value);
  const resetValue = () => setInputValue("");
  return [inputValue, handleChange, resetValue];
}
