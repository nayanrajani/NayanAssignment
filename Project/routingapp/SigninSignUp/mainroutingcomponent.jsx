import React, { Component } from "react";
import { Route, Redirect, Link, Switch } from "react-router-dom";
import Signup from "./SignUp";
import Signin from "./SignIn";
import DashboardComponent from "../Dashboard/AdminDashBoard/AdminDashboard";
import PatientComponent from "../Dashboard/AdminDashBoard/Patient/PatientComponent";
import EditPatientComponent from "../Dashboard/AdminDashBoard/Patient/EditPatientComponent";
import CreatePatientComponent from "../Dashboard/AdminDashBoard/Patient/CreatePatient";
import DeletePatientData from "../Dashboard/AdminDashBoard/Patient/DeletePatientData";
import DoctorComponent from "../Dashboard/AdminDashBoard/Doctor/DoctorComponent";
import EditDoctorComponent from "../Dashboard/AdminDashBoard/Doctor/EditDoctorComponent";
import DeleteDoctorData from "../Dashboard/AdminDashBoard/Doctor/DeleteDoctorData";
import CreateDoctorComponent from "../Dashboard/AdminDashBoard/Doctor/CreateDoctor";
import WardComponent from "../Dashboard/AdminDashBoard/Ward/WardComponent";
import EditWardComponent from "../Dashboard/AdminDashBoard/Ward/EditWardComponent";
import CreateWardComponent from "../Dashboard/AdminDashBoard/Ward/CreateWard";
import DeleteWardData from "../Dashboard/AdminDashBoard/Ward/DeleteWardData";
import RoomComponent from "../Dashboard/AdminDashBoard/Room/RoomComponent";
import EditRoomComponent from "../Dashboard/AdminDashBoard/Room/EditRoomComponent";
import DeleteRoomComponent from "../Dashboard/AdminDashBoard/Room/RoomComponent";
import DeleteRoom from "../Dashboard/AdminDashBoard/Room/DeleteRoomData";
import CreateRoomComponent from "../Dashboard/AdminDashBoard/Room/CreateRoom";
import WardboyComponent from "../Dashboard/AdminDashBoard/WardBoy/WardBoyComponent";
import EditWardBoyComponent from "../Dashboard/AdminDashBoard/WardBoy/EditWardBoyComponent";
import DeleteWardBoy from "../Dashboard/AdminDashBoard/WardBoy/DeleteWardBoyData";
import CreateWardBoyComponent from "../Dashboard/AdminDashBoard/WardBoy/CreateWardBoy";
import CanteenComponent from "../Dashboard/AdminDashBoard/Canteen/CanteenComponent";
import EditCanteenComponent from "../Dashboard/AdminDashBoard/Canteen/EditCanteen";
import DeleteCanteen from "../Dashboard/AdminDashBoard/Canteen/DeleteCanteen";
import CreateCanteenComponent from "../Dashboard/AdminDashBoard/Canteen/CreateCanteen";
import MedicineComponent from "../Dashboard/AdminDashBoard/Medicine/MedicineComponent";
import EditMedicineComponent from "../Dashboard/AdminDashBoard/Medicine/EditMedicineComponent";
import DeleteMedicine from "../Dashboard/AdminDashBoard/Medicine/DeleteMedicineData";
import CreateMedicineComponent from "../Dashboard/AdminDashBoard/Medicine/CreateMedicine";
import BillComponent from "../Dashboard/AdminDashBoard/Bill/BillComponent";
import CreateBillComponent from "../Dashboard/AdminDashBoard/Bill/CreateBill";
import EditBillComponent from "../Dashboard/AdminDashBoard/Bill/EditBill";
import DeleteBill from "../Dashboard/AdminDashBoard/Bill/DeleteBill";
import NurseComponent from "../Dashboard/AdminDashBoard/Nurse/NurseComponent";
import EditNurseComponent from "../Dashboard/AdminDashBoard/Nurse/EditNurseComponent";
import DeleteNurse from "../Dashboard/AdminDashBoard/Nurse/DeleteNurseData";
import CreateNurseComponent from "../Dashboard/AdminDashBoard/Nurse/CreateNurse";

import AdminDashboardComponent from "../Dashboard/AdminDashBoard/AdminDashboard";
import OperatorDashboardComponent from "../Dashboard/OperatorDashBoard/OperatorDashboard";
import DoctorDashboardComponent from "../Dashboard/DoctorDashboard/DoctorDashboard";
import DoctorPatient from "../Dashboard/DoctorDashboard/DoctorPatient";
import EditDoctorPatient from "../Dashboard/DoctorDashboard/EditDoctorPatient";
import OperatorPatientComponent from "../Dashboard/OperatorDashBoard/OperatorPatientComponent";
import OperatorCreatePatient from "../Dashboard/OperatorDashBoard/OperatorCreatePatient";
import OperatorEditPatient from "../Dashboard/OperatorDashBoard/OperatorEditPatient";
import SignIn from "./SignIn";
import DoctorPatientDischarge from "../Dashboard/DoctorDashboard/DoctorPatientDischarged";
import PatientDischarge from "../Dashboard/AdminDashBoard/Discharge/AllPatientDischarged";
import StaffPageComponent from "../Dashboard/AdminDashBoard/Staff/StaffDashBoard";
import CreateStaffDoctor from "../Dashboard/AdminDashBoard/Staff/CreateStaffDoctor";
import CreateStaffNurse from "../Dashboard/AdminDashBoard/Staff/CreateStaffNurse";
import CreateStaffWardBoy from "../Dashboard/AdminDashBoard/Staff/CreateStaffWardBoy";

class MainSPAComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-lg">
        {/* Define Links for Routing */}
        <br />
        <br />
        {/*--------------------------------------------------------------------------------------------- */}

        {/* Defining the Route Table */}
        <Switch>
          {/* Sign In/Sign Up Route table */}
          {/* <Route exact path="/" component={Signin}></Route> */}
          <Route exact path="/" component={Signin}></Route>
          <Route exact path="/SignUp" component={Signup}></Route>
          <Route exact path="/SignIn" component={Signin}></Route>

          {/*--------------------------------------------------------------------------------------------- */}
          {/* Operator DashBoard Route table */}
          <Route
            exact
            path="/operatorDashboard"
            component={OperatorDashboardComponent}
          ></Route>
          <Route
            exact
            path="/operatorPatient"
            component={OperatorPatientComponent}
          ></Route>
          <Route
            exact
            path="/operatorCreatePatient"
            component={OperatorCreatePatient}
          ></Route>
          <Route
            exact
            path="/OperatorEditPatient/:id"
            component={OperatorEditPatient}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}
          {/* Staff Route table */}
          <Route exact path="/Staff" component={StaffPageComponent}></Route>
          <Route
            exact
            path="/CreateStaffDoctor"
            component={CreateStaffDoctor}
          ></Route>
          <Route
            exact
            path="/CreateStaffNurse"
            component={CreateStaffNurse}
          ></Route>
          <Route
            exact
            path="/CreateStaffWardBoy"
            component={CreateStaffWardBoy}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}
          {/* Doctor DashBoard Route table */}
          <Route
            exact
            path="/DoctorDashboard"
            component={DoctorDashboardComponent}
          ></Route>
          <Route
            exact
            path="/PatientDoctorDashboard"
            component={DoctorPatient}
          ></Route>
          <Route
            exact
            path="/EditDoctorPatient/:id"
            component={EditDoctorPatient}
          ></Route>
          <Route
            exact
            path="/DischargeData"
            component={DoctorPatientDischarge}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}
          {/* Admin Route table */}
          <Route
            exact
            path="/Dashboard"
            component={AdminDashboardComponent}
          ></Route>
          <Route
            exact
            path="/AllDischarge"
            component={PatientDischarge}
          ></Route>
          {/* Patient Route table */}
          <Route exact path="/Patient" component={PatientComponent}></Route>
          {/* <Route exact path="/Patient" component={Temp}></Route> */}
          <Route
            exact
            path="/EditPatient/:id"
            component={EditPatientComponent}
          ></Route>
          <Route
            exact
            path="/CreatePatient"
            component={CreatePatientComponent}
          ></Route>
          <Route
            exact
            path="/DeletePatientData/:id"
            component={DeletePatientData}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* Doctor Route table */}
          <Route exact path="/Doctor" component={DoctorComponent}></Route>
          <Route
            exact
            path="/EditDoctor/:id"
            component={EditDoctorComponent}
          ></Route>
          <Route
            exact
            path="/CreateDoctor"
            component={CreateDoctorComponent}
          ></Route>
          <Route
            exact
            path="/DeleteDoctorData/:id"
            component={DeleteDoctorData}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* Ward Route table */}
          <Route exact path="/Ward" component={WardComponent}></Route>
          <Route
            exact
            path="/EditWard/:id"
            component={EditWardComponent}
          ></Route>
          <Route
            exact
            path="/CreateWard"
            component={CreateWardComponent}
          ></Route>
          <Route
            exact
            path="/DeleteWardData/:id"
            component={DeleteWardData}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* Room Route table */}
          <Route exact path="/Room" component={RoomComponent}></Route>
          <Route
            exact
            path="/EditRoom/:id"
            component={EditRoomComponent}
          ></Route>
          <Route
            exact
            path="/CreateRoom"
            component={CreateRoomComponent}
          ></Route>
          <Route
            exact
            path="/DeleteRoomData/:id"
            component={DeleteRoom}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* WardBoy Route table */}
          <Route exact path="/WardBoy" component={WardboyComponent}></Route>
          <Route
            exact
            path="/EditWardBoy/:id"
            component={EditWardBoyComponent}
          ></Route>
          <Route
            exact
            path="/CreateWardBoy"
            component={CreateWardBoyComponent}
          ></Route>
          <Route
            exact
            path="/DeleteWardBoyData/:id"
            component={DeleteWardBoy}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* Canteen Route table */}
          <Route exact path="/Canteen" component={CanteenComponent}></Route>
          <Route
            exact
            path="/EditCanteen/:id"
            component={EditCanteenComponent}
          ></Route>
          <Route
            exact
            path="/CreateCanteen"
            component={CreateCanteenComponent}
          ></Route>
          <Route
            exact
            path="/DeleteCanteen/:id"
            component={DeleteCanteen}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* Medicine Route table */}
          <Route exact path="/Medicine" component={MedicineComponent}></Route>
          <Route
            exact
            path="/EditMedicine/:id"
            component={EditMedicineComponent}
          ></Route>
          <Route
            exact
            path="/CreateMedicine"
            component={CreateMedicineComponent}
          ></Route>
          <Route
            exact
            path="/DeleteMedicine/:id"
            component={DeleteMedicine}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* Bill Route table */}
          <Route exact path="/Bill" component={BillComponent}></Route>
          <Route
            exact
            path="/EditBill/:id"
            component={EditBillComponent}
          ></Route>
          <Route
            exact
            path="/CreateBill"
            component={CreateBillComponent}
          ></Route>
          <Route exact path="/DeleteBill/:id" component={DeleteBill}></Route>
          {/*--------------------------------------------------------------------------------------------- */}

          {/* Nurse Route table */}
          <Route exact path="/Nurse" component={NurseComponent}></Route>
          <Route
            exact
            path="/EditNurse/:id"
            component={EditNurseComponent}
          ></Route>
          <Route
            exact
            path="/CreateNurse"
            component={CreateNurseComponent}
          ></Route>
          <Route exact path="/DeleteNurse/:id" component={DeleteNurse}></Route>

          <Redirect to="/"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default MainSPAComponent;
