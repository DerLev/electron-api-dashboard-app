import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e:any) => {
    setEmail(e.target.value)
  }

  const changePassword = (e:any) => {
    setPassword(e.target.value)
  }

  const loginSubmit = (e:any) => {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className="bg-gray-100 text-black rounded-lg py-1 px-2 shadow-lg absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-3/4 text-center">
      <h2 className="mb-3 mt-2">Login to continue</h2>
      <form className="mt-2" onSubmit={loginSubmit}>
        <Input type='email' placeholder='Email' light={true} value={email} onChange={changeEmail} />
        <Input type='password' placeholder='Password' light={true} value={password} onChange={changePassword} />
        <Button text="Login" type='submit' block={true} light={true} className="my-3" />
      </form>
    </div>
  )
}

export default Login