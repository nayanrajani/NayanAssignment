import axios from "axios";

export class SecureCallService {
  //Auth User------------------------------------------------
  registerUser(user) {
    let response = axios.post("http://localhost:8010/api/app/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  authUser(user) {
    let response = axios.post("http://localhost:8010/api/app/auth", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  getUsersData(token) {
    let response = axios.get("http://localhost:8010/api/app/getUsersData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  //Patient API-----------------------------------------------
  getPatientData(token) {
    let response = axios.get("http://localhost:8010/api/app/getPatientData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getPatientDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getPatientDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  getPatientDatabyDoctorID(token) {
    let response = axios.get(
      `http://localhost:8010/api/app/getPatientDatabyDoctorID`,
      {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  AddPatientData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddPatientData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putPatientData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putPatientData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeletePatientData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeletePatientData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Doctor API-----------------------------------------------
  getDoctorData(token) {
    let response = axios.get("http://localhost:8010/api/app/getDoctorData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getDoctorDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getDoctorDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddDoctorData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddDoctorData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putDoctorData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putDoctorData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteDoctorData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteDoctorData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Ward API-----------------------------------------------
  getWardData(token) {
    let response = axios.get("http://localhost:8010/api/app/getWardData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getWardDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getWardDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddWardData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddWardData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putWardData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putWardData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteWardData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteWardData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Room API-------------------------------------------------
  getRoomData(token) {
    let response = axios.get("http://localhost:8010/api/app/getRoomData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getRoomDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getRoomDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddRoomData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddRoomData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putRoomData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putRoomData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteRoomData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteRoomData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //WardBoy API-------------------------------------------------
  getWardBoyData(token) {
    let response = axios.get("http://localhost:8010/api/app/getWardBoyData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getWardBoyDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getWardBoyDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddWardBoyData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddWardBoyData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putWardBoyData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putWardBoyData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteWardBoyData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteWardBoyData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Canteen API-------------------------------------------------
  getCanteenData(token) {
    let response = axios.get("http://localhost:8010/api/app/getCanteenData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getCanteenDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getCanteenDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  getPatientCanteenDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getPatientCanteenDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddCanteenData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddCanteenData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putCanteenData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putCanteenData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteCanteenData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteCanteenData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Bill API-------------------------------------------------
  getBillData(token) {
    let response = axios.get("http://localhost:8010/api/app/getBillData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getBillDatabyID(id, token) {
    let response = axios.get(
      `http://localhost:8010/api/app/getBillDatabyID/${id}`,

      {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  AddBillData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddBillData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putBillData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putBillData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteBillData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteBillData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Medicine API-------------------------------------------------
  getMedicineData(token) {
    let response = axios.get("http://localhost:8010/api/app/getMedicineData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getMedicineDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getMedicineDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddMedicineData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddMedicineData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putMedicineData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putMedicineData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteMedicineData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteMedicineData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Nurse API-------------------------------------------------
  getNurseData(token) {
    let response = axios.get("http://localhost:8010/api/app/getNurseData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getNurseDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getNurseDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddNurseData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddNurseData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putNurseData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putNurseData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeleteNurseData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeleteNurseData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //Discharge API-----------------------------------------------
  getDischargeData(token) {
    let response = axios.get("http://localhost:8010/api/app/getDischargeData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getDischargeDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getDischargeDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddDischargeData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddDischargeData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }
  //Staff API-----------------------------------------------
  getStaffData(token) {
    let response = axios.get("http://localhost:8010/api/app/getStaffData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getStaffDoctorData(token) {
    let response = axios.get(
      "http://localhost:8010/api/app/getStaffDoctorData",
      {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  AddStaffData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddStaffData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  //Role API-----------------------------------------------
  getRoleData() {
    let response = axios.get("http://localhost:8010/api/app/getRoleData", {
      // headers: {
      //   AUTHORIZATION: `Bearer ${token}`,
      // },
    });
    return response;
  }
  AddRoleData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddRoleData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  //Pharmacymedicineprovide API-------------------------------------------------
  getpharmacymedicineprovidedetailsData(token) {
    let response = axios.get("http://localhost:8010/api/app/getpharmacymedicineprovidedetailsData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getpharmacymedicineprovidedetailsDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getpharmacymedicineprovidedetailsDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddpharmacymedicineprovidedetailsData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddpharmacymedicineprovidedetailsData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putpharmacymedicineprovidedetailsData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putpharmacymedicineprovidedetailsData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeletepharmacymedicineprovidedetailsData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeletepharmacymedicineprovidedetailsData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //PharmacymedicineIssue API-------------------------------------------------
  getmedicineissuedetailsData(token) {
    let response = axios.get("http://localhost:8010/api/app/getmedicineissuedetailsData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getmedicineissuedetailsDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getmedicineissuedetailsDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddmedicineissuedetailsData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddmedicineissuedetailsData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putmedicineissuedetailsData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putmedicineissuedetailsData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeletemedicineissuedetailsData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeletemedicineissuedetailsData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  //PatientMedicine API-----------------------------------------------
  getpatientmedicineData(token) {
    let response = axios.get("http://localhost:8010/api/app/getpatientmedicineData", {
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
      },
    });
    return response;
  }

  getpatientmedicineDatabyID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getpatientmedicineDatabyID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  getpatientmedicineDatabyPatientID(id) {
    let response = axios.get(
      `http://localhost:8010/api/app/getpatientmedicineDatabyPatientID/${id}`,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  AddpatientmedicineData(data) {
    let response = axios.post(
      `http://localhost:8010/api/app/AddpatientmedicineData`,
      data,
      {
        // headers: {
        //   AUTHORIZATION: `Bearer ${token}`,
        // },
      }
    );
    return response;
  }

  putpatientmedicineData(id, data) {
    let response = axios.put(
      `http://localhost:8010/api/app/putpatientmedicineData/${id}`,
      data
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }

  DeletepatientmedicineData(id) {
    let response = axios.delete(
      `http://localhost:8010/api/app/DeletepatientmedicineData/${id}`
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  }
}
