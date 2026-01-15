import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const MfeAuth = React.lazy(() => import('mfe-auth/Module'));

const Auth = React.lazy(() => import('auth/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mfe-auth">MfeAuth</Link>
        </li>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/mfe-auth" element={<MfeAuth />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
