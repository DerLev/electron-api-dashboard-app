import Input from "./components/Input";

function Login() {
  return (
    <div className="bg-gray-100 text-black rounded-lg py-1 px-2 shadow-lg absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-3/4 text-center">
      <h2>Login to continue</h2>
      <form className="mt-2">
        <Input type='email' placeholder='Email' light={true} />
        <Input type='password' placeholder='Password' light={true} />
      </form>
    </div>
  )
}

export default Login