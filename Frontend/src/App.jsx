import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNoteForm from "./components/createNoteForm";
import EditNotesForm from "./components/EditNotesForm";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoutes";
import 'font-awesome/css/font-awesome.min.css';


function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/new-note"  element={<PrivateRoute element={<CreateNoteForm />}/>} />
            <Route path="/:id/edit"  element={<PrivateRoute element={<EditNotesForm />}/>} />
            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/>}/>
            <Route path="/" element={<PrivateRoute element={<Home />}/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
