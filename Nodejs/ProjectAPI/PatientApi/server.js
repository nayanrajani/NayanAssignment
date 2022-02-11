const express = require("express");
const cors = require("cors");

const authLogic = require("./dal/tokenlogic");
const PatientLogic = require("./dal/PatientAPI");
const DoctorLogic = require("./dal/DoctorAPI");
const WardLogic = require("./dal/WardAPI");
const RoomLogic = require("./dal/RoomLogic");
const WardBoyLogic = require("./dal/WardBoyAPI");
const CanteenLogic = require("./dal/CanteenAPI");
const BillLogic = require("./dal/BillAPI");
const MedicineLogic = require("./dal/MedicineAPI");
const Nurselogic = require("./dal/NurseAPI");
const DischargeLogic = require("./dal/DischargeAPI");
const Stafflogic = require("./dal/StaffAPI");
const UsersLogic = require("./dal/UsersAPI");
const RoleLogic = require("./dal/RoleAPI");
const PatientmedicineLogic = require("./dal/AddPatientMedicineAPI");
const PharmacymedicineprovidedetailsLogic = require('./dal/PharmacyMedicineprovideAPI');
const MedicineIssueDetailsLogic = require('./dal/MedicineIssueAPI');

const instance = express();
instance.use(express.urlencoded({ extended: false }));
instance.use(express.json());

instance.use(
  cors({
    origin: "*", // all oriogins are allowd OR specify orogins as per your demand
    allowedHeaders: "*", // allow all headers OR specifiy headers
    methods: "*", // allow all method OR specify http methods
  })
);
// apply the middleware for the token in express instance

// define an object for the secret key
const jwtSettings = {
  jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
};
// this can be omitted if the express-jwt package is used instaed of jsonwebtoken
// the 'set()' method of the express will be used toi provide server level configuration
// so all requests and responses will be able to use the configuration using the 'get()' method
instance.set("jwtSecret", jwtSettings.jwtSecret);

let auth = new authLogic();
let Patient = new PatientLogic();
let Doctor = new DoctorLogic();
let Ward = new WardLogic();
let Room = new RoomLogic();
let WardBoy = new WardBoyLogic();
let Canteen = new CanteenLogic();
let Bill = new BillLogic();
let Medicine = new MedicineLogic();
let Nurse = new Nurselogic();
let Discharge = new DischargeLogic();
let Staff = new Stafflogic();
let User = new UsersLogic();
let Role = new RoleLogic();
let PatientMedicine = new PatientmedicineLogic();
let Pharmacymedicineprovide = new PharmacymedicineprovidedetailsLogic();
let MedicineIssue = new MedicineIssueDetailsLogic();

//Auth API---------------------------------------------------
instance.post("/api/app/register", auth.registerUser);
instance.post("/api/app/auth", auth.authUser);

//Patient API------------------------------------------------
instance.get("/api/app/getPatientData", Patient.getPatientData);
instance.get("/api/app/getPatientDatabyID/:id", Patient.getPatientDatabyID);
instance.get(
  "/api/app/getPatientDatabyDoctorID",
  Patient.getPatientDatabyDoctorID
);
instance.post("/api/app/AddPatientData", Patient.AddPatientData);
instance.put("/api/app/putPatientData/:id", Patient.putPatientData);
instance.delete("/api/app/DeletePatientData/:id", Patient.DeletePatientData);

//Doctor API-------------------------------------------------
instance.get("/api/app/getDoctorData", Doctor.getDoctorData);
instance.get("/api/app/getDoctorDatabyID/:id", Doctor.getDoctorDatabyID);
instance.post("/api/app/AddDoctorData", Doctor.AddDoctorData);
instance.put("/api/app/putDoctorData/:id", Doctor.putDoctorData);
instance.delete("/api/app/DeleteDoctorData/:id", Doctor.DeleteDoctorData);

//Ward API-------------------------------------------------
instance.get("/api/app/getWardData", Ward.getWardData);
instance.get("/api/app/getWardDatabyID/:id", Ward.getWardDatabyID);
instance.post("/api/app/AddWardData", Ward.AddWardData);
instance.put("/api/app/putWardData/:id", Ward.putWardData);
instance.delete("/api/app/DeleteWardData/:id", Ward.DeleteWardData);

//Room API-------------------------------------------------
instance.get("/api/app/getRoomData", Room.getRoomData);
instance.get("/api/app/getRoomDatabyID/:id", Room.getRoomDatabyID);
instance.post("/api/app/AddRoomData", Room.AddRoomData);
instance.put("/api/app/putRoomData/:id", Room.putRoomData);
instance.delete("/api/app/DeleteRoomData/:id", Room.DeleteRoomData);

//WardBoy API-------------------------------------------------
instance.get("/api/app/getWardBoyData", WardBoy.getWardBoyData);
instance.get("/api/app/getWardBoyDatabyID/:id", WardBoy.getWardBoyDatabyID);
instance.post("/api/app/AddWardBoyData", WardBoy.AddWardBoyData);
instance.put("/api/app/putWardBoyData/:id", WardBoy.putWardBoyData);
instance.delete("/api/app/DeleteWardBoyData/:id", WardBoy.DeleteWardBoyData);

//Nurse API-------------------------------------------------
instance.get("/api/app/getNurseData", Nurse.getNurseData);
instance.get("/api/app/getNurseDatabyID/:id", Nurse.getNurseDatabyID);
instance.post("/api/app/AddNurseData", Nurse.AddNurseData);
instance.put("/api/app/putNurseData/:id", Nurse.putNurseData);
instance.delete("/api/app/DeleteNurseData/:id", Nurse.DeleteNurseData);

//Canteen API-------------------------------------------------
instance.get("/api/app/getCanteenData", Canteen.getCanteenData);
instance.get("/api/app/getCanteenDatabyID/:id", Canteen.getCanteenDatabyID);
instance.get("/api/app/getPatientCanteenDatabyID/:id", Canteen.getPatientCanteenDatabyID);

instance.post("/api/app/AddCanteenData", Canteen.AddCanteenData);
instance.put("/api/app/putCanteenData/:id", Canteen.putCanteenData);
instance.delete("/api/app/DeleteCanteenData/:id", Canteen.DeleteCanteenData);

//Bill API-------------------------------------------------
instance.get("/api/app/getBillData", Bill.getBillData);
instance.get("/api/app/getBillDatabyID/:id", Bill.getBillDatabyID);
instance.post("/api/app/AddBillData", Bill.AddBillData);
instance.put("/api/app/putBillData/:id", Bill.putBillData);
instance.delete("/api/app/DeleteBillData/:id", Bill.DeleteBillData);

//Medicine API-------------------------------------------------
instance.get("/api/app/getMedicineData", Medicine.getMedicineData);
instance.get("/api/app/getMedicineDatabyID/:id", Medicine.getMedicineDatabyID);
instance.post("/api/app/AddMedicineData", Medicine.AddMedicineData);
instance.put("/api/app/putMedicineData/:id", Medicine.putMedicineData);
instance.delete("/api/app/DeleteMedicineData/:id", Medicine.DeleteMedicineData);

//Discharge API-------------------------------------------------
instance.get("/api/app/getDischargeData", Discharge.getDischargeData);
instance.get(
  "/api/app/getDischargeDatabyID/:id",
  Discharge.getDischargeDatabyID
);
instance.post("/api/app/AddDischargeData", Discharge.AddDischargeData);
// instance.put("/api/app/putMedicineData/:id", Medicine.putMedicineData);
// instance.delete("/api/app/DeleteMedicineData/:id", Medicine.DeleteMedicineData);

//Staff API-------------------------------------------------
instance.get("/api/app/getStaffData", Staff.getStaffData);
instance.get("/api/app/getStaffDoctorData", Staff.getStaffDoctorData);
instance.post("/api/app/AddStaffData", Staff.AddStaffData);

//Pharmacymedicineprovide API-------------------------------------------------
instance.get("/api/app/getpharmacymedicineprovidedetailsData", Pharmacymedicineprovide.getpharmacymedicineprovidedetailsData);
instance.get("/api/app/getpharmacymedicineprovidedetailsDatabyID/:id", Pharmacymedicineprovide.getpharmacymedicineprovidedetailsDatabyID);
instance.post("/api/app/AddpharmacymedicineprovidedetailsData", Pharmacymedicineprovide.AddpharmacymedicineprovidedetailsData);
instance.put("/api/app/putpharmacymedicineprovidedetailsData/:id", Pharmacymedicineprovide.putpharmacymedicineprovidedetailsData);
instance.delete("/api/app/DeletepharmacymedicineprovidedetailsData/:id", Pharmacymedicineprovide.DeletepharmacymedicineprovidedetailsData);

//Users API-------------------------------------------------
instance.get("/api/app/getUsersData", User.getUsersData);

//Role API-------------------------------------------------
instance.get("/api/app/getRoleData", Role.getRoleData);
instance.post("/api/app/AddRoleData", Role.AddRoleData);

//PatientMedicine API------------------------------------------------
instance.get("/api/app/getpatientmedicineData", PatientMedicine.getpatientmedicineData);
instance.get("/api/app/getpatientmedicineDatabyID/:id", PatientMedicine.getpatientmedicineDatabyID);
instance.get("/api/app/getpatientmedicineDatabyPatientID/:id", PatientMedicine.getpatientmedicineDatabyPatientID);

instance.post("/api/app/AddpatientmedicineData", PatientMedicine.AddpatientmedicineData);
instance.put("/api/app/putpatientmedicineData/:id", PatientMedicine.putpatientmedicineData);
instance.delete("/api/app/DeletepatientmedicineData/:id", PatientMedicine.DeletepatientmedicineData);


//PharmacyMedicineIssue API------------------------------------------------
instance.get("/api/app/getmedicineissuedetailsData", MedicineIssue.getmedicineissuedetailsData);
instance.get("/api/app/getmedicineissuedetailsDatabyID/:id", MedicineIssue.getmedicineissuedetailsDatabyID);

instance.post("/api/app/AddmedicineissuedetailsData", MedicineIssue.AddmedicineissuedetailsData);
instance.put("/api/app/putmedicineissuedetailsData/:id", MedicineIssue.putmedicineissuedetailsData);
instance.delete("/api/app/DeletemedicineissuedetailsData/:id", MedicineIssue.DeletemedicineissuedetailsData);

instance.listen(8010, () => {
  console.log("Server Started on port 8010");
});
