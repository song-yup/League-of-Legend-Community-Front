import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { isDarkAtom } from "./atom";
import { useRecoilValue } from "recoil";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
