import { StyledApp } from "src/app/styled";
import Header from "src/widgets/Header";
import Sidebar from "src/widgets/SIdebar";
import Schedule from "src/widgets/Schedule";

function App() {
  return (
    <StyledApp>
      <Header></Header>
      <Sidebar></Sidebar>
      <Schedule></Schedule>
    </StyledApp>
  );
}

export default App;
