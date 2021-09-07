import { useState, useEffect } from 'react';
import { KeyIcon, AtSymbolIcon } from '@heroicons/react/outline';

import Card from './components/Card';
import Button from './components/Button';
import Input from './components/Input';

interface homeProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

function Home({ setTitle }: homeProps) {
  useEffect(() => {
    setTitle('Dashboard');
  })

  return (
    <>
      <Login />
    </>
  )
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card title="Login">
      <form onSubmit={(e) => e.preventDefault()}>
        <Input type="email" value={email} setValue={setEmail} label="Email" prependIcon={ <AtSymbolIcon /> } />
        <Input type="password" value={password} setValue={setPassword} label="Password" prependIcon={ <KeyIcon /> } passwordIcon={true} />
        <Button text="Login" type="submit" block={true} />
      </form>
    </Card>
  )
}

export default Home
