import { useState } from 'react';

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + 1);
    console.log(`incremented to ${count + 1}`)
  }

  return { count, increment };
}
