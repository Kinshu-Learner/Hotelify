import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Layout from './layouts/Layout';

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path='/'
          element={
            <Layout>
              <p className="">Home Page</p>
            </Layout>
          }
        />

        <Route
          path='/search'
          element={
            <Layout>
              <p className="">Search Page</p>
            </Layout>
          }
        />

        <Route path='*' element={<Navigate to='/' />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
