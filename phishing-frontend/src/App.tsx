import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { PageLayout } from "components";
import { store } from "libraries/redux";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <PageLayout />
    </Provider>
  </BrowserRouter>
);

export default App;
