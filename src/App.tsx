import { useState } from 'react';
import { Button } from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Smart Recipe Book
      </h1>
      <Button onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </Button>
    </div>
  );
}

export default App;
