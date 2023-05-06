import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartupPage from '@page/StartupPage';
import Home from '@page/Home';
import LockScreen from '@page/LockScreen';
import LoginPage from '@page/LoginPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route element={<LockScreen />} path="/Lockscreen" />
                    <Route element={<StartupPage />} path="/" />
                    <Route element={<LoginPage />} path="/Login" />
                    <Route element={<Home />} path="/Home" />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
