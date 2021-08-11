import Login from "./Login";

interface homeProps {
  setAccessToken: Function,
  setRefreshToken: Function
}

function Home({ setAccessToken, setRefreshToken }: homeProps) {
  return (
    <>
      <Login setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />
    </>
  )
}

export default Home
