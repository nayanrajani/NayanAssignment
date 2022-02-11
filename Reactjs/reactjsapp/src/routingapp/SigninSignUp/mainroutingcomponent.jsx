import React, { Component } from "react";
import { Route, Redirect, Link, Switch } from "react-router-dom";
import Signup from "./SignUp";
import Signin from "./SignIn";

//Admin ---------------------------------------------------------------------->>>>
import AdminDashboardComponent from "../Dashboard/AdminDashBoard/AdminDashboard";
import PatientDischarge from "../Dashboard/AdminDashBoard/Discharge/AllPatientDischarged";
import UserdataComponent from "../Dashboard/AdminDashBoard/UsersData";

//Patient ---------------------------------------------------------------------->>>>
import PatientComponent from "../Dashboard/AdminDashBoard/Patient/PatientComponent";
import EditPatientComponent from "../Dashboard/AdminDashBoard/Patient/EditPatientComponent";
import CreatePatientComponent from "../Dashboard/AdminDashBoard/Patient/CreatePatient";
import DeletePatientData from "../Dashboard/AdminDashBoard/Patient/DeletePatientData";

//Doctor ---------------------------------------------------------------------->>>>
import DoctorComponent from "../Dashboard/AdminDashBoard/Doctor/DoctorComponent";
import EditDoctorComponent from "../Dashboard/AdminDashBoard/Doctor/EditDoctorComponent";
import DeleteDoctorData from "../Dashboard/AdminDashBoard/Doctor/DeleteDoctorData";
import CreateDoctorComponent from "../Dashboard/AdminDashBoard/Doctor/CreateDoctor";

//Ward ---------------------------------------------------------------------->>>>
import WardComponent from "../Dashboard/AdminDashBoard/Ward/WardComponent";
import EditWardComponent from "../Dashboard/AdminDashBoard/Ward/EditWardComponent";
import CreateWardComponent from "../Dashboard/AdminDashBoard/Ward/CreateWard";
import DeleteWardData from "../Dashboard/AdminDashBoard/Ward/DeleteWardData";

//Room ---------------------------------------------------------------------->>>>
import RoomComponent from "../Dashboard/AdminDashBoard/Room/RoomComponent";
import EditRoomComponent from "../Dashboard/AdminDashBoard/Room/EditRoomComponent";
import DeleteRoom from "../Dashboard/AdminDashBoard/Room/DeleteRoomData";
import CreateRoomComponent from "../Dashboard/AdminDashBoard/Room/CreateRoom";

//WardBoy ---------------------------------------------------------------------->>>>
import WardboyComponent from "../Dashboard/AdminDashBoard/WardBoy/WardBoyComponent";
import EditWardBoyComponent from "../Dashboard/AdminDashBoard/WardBoy/EditWardBoyComponent";
import DeleteWardBoy from "../Dashboard/AdminDashBoard/WardBoy/DeleteWardBoyData";
import CreateWardBoyComponent from "../Dashboard/AdminDashBoard/WardBoy/CreateWardBoy";

//Canteen ---------------------------------------------------------------------->>>>
import CanteenComponent from "../Dashboard/AdminDashBoard/Canteen/CanteenComponent";
import EditCanteenComponent from "../Dashboard/AdminDashBoard/Canteen/EditCanteen";
import DeleteCanteen from "../Dashboard/AdminDashBoard/Canteen/DeleteCanteen";
import CreateCanteenComponent from "../Dashboard/AdminDashBoard/Canteen/CreateCanteen";

//Medicine ---------------------------------------------------------------------->>>>
import MedicineComponent from "../Dashboard/AdminDashBoard/Medicine/MedicineComponent";
import EditMedicineComponent from "../Dashboard/AdminDashBoard/Medicine/EditMedicineComponent";
import DeleteMedicine from "../Dashboard/AdminDashBoard/Medicine/DeleteMedicineData";
import CreateMedicineComponent from "../Dashboard/AdminDashBoard/Medicine/CreateMedicine";

//Bill ---------------------------------------------------------------------->>>>
import BillComponent from "../Dashboard/AdminDashBoard/Bill/BillComponent";
import CreateBillComponent from "../Dashboard/AdminDashBoard/Bill/CreateBill";
import EditBillComponent from "../Dashboard/AdminDashBoard/Bill/EditBill";
import DeleteBill from "../Dashboard/AdminDashBoard/Bill/DeleteBill";

//Nurse ---------------------------------------------------------------------->>>>
import NurseComponent from "../Dashboard/AdminDashBoard/Nurse/NurseComponent";
import EditNurseComponent from "../Dashboard/AdminDashBoard/Nurse/EditNurseComponent";
import DeleteNurse from "../Dashboard/AdminDashBoard/Nurse/DeleteNurseData";
import CreateNurseComponent from "../Dashboard/AdminDashBoard/Nurse/CreateNurse";

//Doctor-Patient ---------------------------------------------------------------------->>>>
import DoctorDashboardComponent from "../Dashboard/DoctorDashboard/DoctorDashboard";
import DoctorPatient from "../Dashboard/DoctorDashboard/DoctorPatient";
import EditDoctorPatient from "../Dashboard/DoctorDashboard/EditDoctorPatient";
import DoctorPatientDischarge from "../Dashboard/DoctorDashboard/DoctorPatientDischarged";

//Operator ---------------------------------------------------------------------->>>>
import OperatorDashboardComponent from "../Dashboard/OperatorDashBoard/OperatorDashboard";
import OperatorPatientComponent from "../Dashboard/OperatorDashBoard/OperatorPatient/OperatorPatientComponent";
import OperatorCreatePatient from "../Dashboard/OperatorDashBoard/OperatorPatient/OperatorCreatePatient";
import OperatorEditPatient from "../Dashboard/OperatorDashBoard/OperatorPatient/OperatorEditPatient";

//Staff ---------------------------------------------------------------------->>>>
import StaffPageComponent from "../Dashboard/AdminDashBoard/Staff/StaffDashBoard";
import CreateStaffDoctor from "../Dashboard/AdminDashBoard/Staff/CreateStaffDoctor";
import CreateStaffNurse from "../Dashboard/AdminDashBoard/Staff/CreateStaffNurse";
import CreateStaffWardBoy from "../Dashboard/AdminDashBoard/Staff/CreateStaffWardBoy";

//Role ---------------------------------------------------------------------->>>>
import RoleComponent from "../Dashboard/AdminDashBoard/Role/RoleComponent";
import CreateRoleComponent from "../Dashboard/AdminDashBoard/Role/CreateRole";

//Patient Medicine ---------------------------------------------------------------------->>>>
import AddPatientmedicine from "../Dashboard/DoctorDashboard/PatientMedicine/AddPatientMedicine";
import PatientMedicine from "../Dashboard/DoctorDashboard/PatientMedicine/PatientMedicineComponent";
import EditPatientmedicine from "../Dashboard/DoctorDashboard/PatientMedicine/EditMedicinePatient";
import PatientBillDischarge from "../Dashboard/OperatorDashBoard/OperatorBillDischarge/PatientBillDischarge";
import OperatorCreateBillComponent from "../Dashboard/OperatorDashBoard/OperatorBill/CreateBill";
import OperatorBillComponent from "../Dashboard/OperatorDashBoard/OperatorBill/BillComponent";

//CanteenUser ---------------------------------------------------------------------->>>>
import CanteenUserComponent from "../Dashboard/CanteenUser/CanteenUserComponent";
import CanteenUserDashboard from "../Dashboard/CanteenUser/CanteenUserDashboard";
import EditCanteenUserComponent from "../Dashboard/CanteenUser/EditCanteenUser";
import CreateCanteenUserComponent from "../Dashboard/CanteenUser/CreateCanteenUser";
import DeleteCanteenUser from "../Dashboard/CanteenUser/DeleteCanteenUser";

//PharmacyUser ---------------------------------------------------------------------->>>>
import PharmacyUserDashboard from "../Dashboard/Pharmacy/PharmacyUserDashboard";
import PharmacyUserComponent from "../Dashboard/Pharmacy/PharmacyUser/PharmacyUserComponent";
import EditPharmacyUser from "../Dashboard/Pharmacy/PharmacyUser/EditPharmacyUser";
import CreatePharmacyUser from "../Dashboard/Pharmacy/PharmacyUser/CreatePharmacyUser";
import DeletePharmacyUser from "../Dashboard/Pharmacy/PharmacyUser/DeletePharmacyUser";
import PharmacyMedicineprovide from "../Dashboard/Pharmacy/MedicineAllotment/PharmacyMedicineProvide";
import AddPharmacyMedBill from "../Dashboard/Pharmacy/MedicineAllotment/MedicineAllotBill";


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
          <Route exact path="/Users" component={UserdataComponent}></Route>
          <Route exact path="/Role" component={RoleComponent}></Route>
          <Route
            exact
            path="/CreateRole"
            component={CreateRoleComponent}
          ></Route>
          {/*--------------------------------------------------------------------------------------------- */}
          {/* Operator DashBoard Route table */}
          <Route
            exact
            path="/operatorDashboard"
            component={OperatorDashboardComponent}
          ></Route>
          {/* Operator Patient Route table */}
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
          {/* PharmacyUser Route table */}
          <Route exact path="/PharmacyUserDashboard" component={PharmacyUserDashboard}></Route>
          <Route exact path="/PharmacyUser" component={PharmacyUserComponent}></Route>
          <Route
            exact
            path="/EditPharmacyUser/:id"
            component={EditPharmacyUser}
          ></Route>
          <Route
            exact
            path="/CreatePharmacyUser"
            component={CreatePharmacyUser}
          ></Route>
          <Route
            exact
            path="/DeletePharmacyUser/:id"
            component={DeletePharmacyUser}
          ></Route>
          <Route exact path="/PharmacyMedprovide" component={PharmacyMedicineprovide}></Route>
          <Route
            exact
            path="/AddPharmacyBill/:id"
            component={AddPharmacyMedBill}
          ></Route>
{/*--------------------------------------------------------------------------------------------- */}
          {/* CanteenUser Route table */}
          <Route exact path="/CanteenUserDashboard" component={CanteenUserDashboard}></Route>
          <Route exact path="/CanteenUser" component={CanteenUserComponent}></Route>
          <Route
            exact
            path="/EditCanteenUser/:id"
            component={EditCanteenUserComponent}
          ></Route>
          <Route
            exact
            path="/CreateCanteenUser"
            component={CreateCanteenUserComponent}
          ></Route>
          <Route
            exact
            path="/DeleteCanteenUser/:id"
            component={DeleteCanteenUser}
          ></Route>
{/*--------------------------------------------------------------------------------------------- */}
          {/* Operator Create Bill Route table */}
          <Route
            exact
            path="/OperatorPatientBill"
            component={PatientBillDischarge}
          ></Route>
          {/* Show Bill and perform CRUD */}
          <Route
            exact
            path="/OperatorAllbills"
            component={OperatorBillComponent}
          ></Route>

          <Route
            exact
            path="/OperatorPatientCreateBill/:id"
            component={OperatorCreateBillComponent}
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
          <Route
            exact
            path="/AddPatientMedicine/:id"
            component={AddPatientmedicine}
          ></Route>
          <Route
            exact
            path="/PatientMedicine"
            component={PatientMedicine}
          ></Route>
          <Route
            exact
            path="/EditPatientMedicine/:id"
            component={EditPatientmedicine}
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
