import { ChakraProvider } from '@chakra-ui/react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import { BlogScreen } from './screens/BlogScreen';
import SingleBlogScreen from './screens/SingleBlogScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <main>
          <Routes>
             <Route path='/blog/:category' element={<BlogScreen />} />    
             <Route path='/blog/single/:id' element={<SingleBlogScreen />} />    

          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
