import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import 'primeicons/primeicons.css';
import Layouts from './layout'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" name="Home" element={
        <Layouts />}
      />
    </Routes>
</BrowserRouter>
  );
}