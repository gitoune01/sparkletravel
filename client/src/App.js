import { ChakraProvider } from '@chakra-ui/react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import { BlogScreen } from './screens/BlogScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <main>
          <Routes>
             <Route path='/blog/:category' element={<BlogScreen />} />    

          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
