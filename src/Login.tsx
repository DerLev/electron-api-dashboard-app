import { useState } from "react";
import axios from "axios";
import Input from "./components/Input";
import Button from "./components/Button";

interface loginProps {
  setAccessToken: Function,
  setRefreshToken: Function
}

function Login({ setAccessToken, setRefreshToken }: loginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const changeEmail = (e:any) => {
    setEmail(e.target.value)
  }

  const changePassword = (e:any) => {
    setPassword(e.target.value)
  }

  const loginSubmit = async(e:any) => {
    e.preventDefault();
    setLoading(true);
    const credentials = { email: email, password: password }
    try {
      const req = await axios.post('/auth/login', credentials).then(res => res.data);
      setAccessToken(req.access_token);
      setRefreshToken(req.refresh_token);
      console.log(req);
    } catch(err) {
      if(err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="bg-gray-100 text-black rounded-lg py-1 px-2 shadow-lg absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-3/4 text-center">
        <h2 className="mb-3 mt-2">Login to continue</h2>
        <form className="mt-2" onSubmit={loginSubmit}>
          <Input type='email' placeholder='Email' light={true} value={email} onChange={changeEmail} disabled={loading} />
          <Input type='password' placeholder='Password' light={true} value={password} onChange={changePassword} disabled={loading} />
          <Button text="Login" type='submit' block={true} light={true} className="my-3" loading={loading} />
        </form>
      </div>
    </>
  )
}

export default Login