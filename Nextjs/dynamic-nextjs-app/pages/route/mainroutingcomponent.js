// import React, { Component, Suspense } from "react";
// // import classes for defining the Routing INfrastructure
// import { Route, Redirect, Link, Switch } from "react-router-dom";
// import CreateDepartmentComponent from "./createdepartment";
// import EditDepartmentComponent from "./editdepartment";
// import ListDepartmentsComponent from "./listdepartmentscomponent";


import Link from "next/link";
const MainSPAComponent = () => {
    return (
      <div className="container-lg">
        <h1>Nextjs App for React Routing</h1>

        {/* Define Links for Routing */}

        <table className="table table-bordered table-striped">
            <tbody>
                <tr>
                    <td>
                        {/* By Default the  LIstDepartmentsComponent will be loaded*/}
                        <Link href="/">List of Departments</Link>
                    </td>
                    <td>
                    <Link  href="/route/createdepartment">Create Department</Link>
                    </td>
                </tr>
            </tbody>
        </table>


        
        {/* <Switch>
            <Route exact path="/" component={ListDepartmentsComponent}></Route>
            <Route exact path="/create" component={CreateDepartmentComponent}></Route>
            <Route exact path="/edit/:id" component={EditDepartmentComponent}></Route>
            <Redirect to="/"></Redirect>
        </Switch> */}
      </div>
    );
  
}

export default MainSPAComponent;
