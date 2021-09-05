import Login from "./Login";

interface homeProps {
  setAccessToken: Function,
  setRefreshToken: Function,
  addNotification: Function
}

function Home({ setAccessToken, setRefreshToken, addNotification }: homeProps) {
  return (
    <>
      <Login setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} addNotification={addNotification} />
    </>
  )
}

export default Home
