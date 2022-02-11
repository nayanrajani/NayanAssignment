import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

import reportWebVitals from "./reportWebVitals";
// import Calculator1 from "./17SepCalculator/components/Calculator";

// import Employeeformcomponentreuse from "./20Sep/q1/employeetable/employeeformcomponentreuse";
// import Multiple from "./20Sep/q2/DropdownComponent";
// import Checkbox from "./20Sep/q3/Checkbox/checkboxcompone";
// import Radio from "./20Sep/q3/Radio/RadioComponent";
// import HttpCallComponent from "./HTTPandSERVICE/ajaxcallcomponent/httpCallComponent";
// import SecureHttpCallComponent from "./HTTPandSERVICE/ajaxcallcomponent/securecallcomponent";
// import ValidationComponent from "./22Sep/validate/validationComponent";
// import SignIn from "./routingapp/SigninSignUp/SignIn";

import { BrowserRouter } from "react-router-dom";
import MainSPAComponent from "./routingapp/SigninSignUp/mainroutingcomponent";

//redux
// import the redux and react-redux object model
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reduxapp/reducers/reducers";
import MainReduxComponent from "./reduxapp/mainreduxcomponent";
import S3ListFile from "./18_OctAWS_S3App/home";

// define a store object
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: will subscribe to the REDUX extension
// of the browser to show the simulation
let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);

ReactDOM.render(
  <React.StrictMode>
    {/*This is for route for HealthCare App */}
    <BrowserRouter>
      <MainSPAComponent />
    </BrowserRouter>
    ,
    {/*This is for MainRedux and saga thing*/}
    {/* the MainReduxComponent will now have its lifecycle under the redux store*/}
    {/* <Provider store={store}>
      <MainReduxComponent></MainReduxComponent>
    </Provider> */}
    {/*This is for AWS S3 App*/}
    {/* <S3ListFile></S3ListFile> */}

  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
