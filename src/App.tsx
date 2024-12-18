import { useState } from 'react';
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>JSDC 2024 Vite, React, Vitest Demo</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
      </div>
    </>
  );
}

export default App;
