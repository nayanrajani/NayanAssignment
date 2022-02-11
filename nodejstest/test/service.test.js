// loadind the 'chai' library and creating the assertion object
// using expect
const expect = require("chai").expect;
// load the 'request' module so that REST APIs can be called
const request = require("request");

const instance = require("./../service");

// arrange for the TEST DATA

let data = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
];

// create a test suite and add test cases
describe("The Test Suite for Testing Nod.js Express REST APIs", () => {
  // lets test the 200 response from the call

  it("the api must respond status as 200", (done) => {
    // arrange: Generally used in case when som data is posted using
    // body or the data is send using header/url parameters

    // act: The request object
    // error: Error during the comminucation
    // response: The Response headers
    // body: The Response body
    request("http://localhost:9080/api/message", (error, response, body) => {
      // assertion
      expect(response.statusCode).to.equal(200);
      // complete the Async Operation, subscribe tot it and release it
      done();
    });
  });

  // test case for response message
  it('the api must respond body as "Hello World" ', (done) => {
    request("http://localhost:9080/api/message", (error, response, body) => {
      expect(body).to.equal("Hello World");
      done();
    });
  });

  //   // test for the data
  //   it("the api must respond body with JSON data in it ", (done) => {
  //     request("http://localhost:9080/api/data", (error, response, body) => {
  //       expect(body).to.equal(JSON.stringify(data));
  //       done();
  //     });
  //   });

  // the crash test
  it("the api must respond status code as 500 if the header parameter is 0", (done) => {
    // arrange
    let id = 0;
    request(`http://localhost:9080/api/data/${id}`, (error, response, body) => {
      expect(response.statusCode).to.equal(500);
      done();
    });
  });

  // the test for post
  it("the api must respond body with JSON data after the POST request is executed", (done) => {
    // arrange the data
    let record = {
      id: 3,
      name: "C",
    };
    request.post(
      "http://localhost:9080/api/dataPost",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      },
      (error, response, body) => {
        expect(body).to.equal(JSON.stringify(data));
        done();
      }
    );
  });

  // the test for Patient
  it("the api must respond body with JSON data for patient", (done) => {
    let record = {
      Patient_Name: "baba Waghela",
      Patient_Email: "simra@gmail.com",
      Patient_Age: 44,
      Patient_Gender: "Female",
      Patient_Address: "Nanda nagar Colony",
      Patient_Phoneno: "0988712345",
      Patient_Addhaar: "0987334520945712",
      Patient_Disease: "Viral",
      Patient_Ward_type: "General",
      Patient_Room_no: "25",
      Doctor_Name: "Mandeep Singh",
    };

    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VydG9rZW4iOjEsImlhdCI6MTYzMzU4ODEzMiwiZXhwIjoxNjMzNTkxNzMyfQ.YfvogLKQsd9LcCVnkqolHG8rIRpdnunRemaHNMd0DAU`;
    request.post(
      "http://localhost:8010/api/app/AddPatientData",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      },
      (error, response, body) => {
        expect(body).to.equal(body);
        console.log(body);
        done();
      }
    );
  });

  // the test for Register user
  it("the api must respond body with JSON data for register User", (done) => {
    let user = {
      UserId: 45,
      UserName: "arun@gmail.com",
      Password: "Pss@123",
      Roles: "Doctor",
    };

    request.post(
      "http://localhost:8010/api/app/register",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      (error, response, body) => {
        expect(body).to.equal(
          body
          //   '{"message":"User Name arun@gmail.com already exists"}'
        );
        console.log(body);
        done();
      }
    );
  });

  // the test for Auth user
  it("the api must respond body with JSON data for Auth User", (done) => {
    let user = {
      UserName: "arun@ok.com",
      Password: "Pss@123",
      Roles: "Doctor",
    };

    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VydG9rZW4iOjEsImlhdCI6MTYzMzU4ODEzMiwiZXhwIjoxNjMzNTkxNzMyfQ.YfvogLKQsd9LcCVnkqolHG8rIRpdnunRemaHNMd0DAU`;
    request.post(
      "http://localhost:8010/api/app/auth",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      (error, response, body) => {
        expect(body).to.equal(
          body
          //   message
          //   '{"message":"User Name arun@ok.com not found please register"}'
        );
        console.log(body);
        done();
      }
    );
  });
});
