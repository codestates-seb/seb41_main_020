import React from "react";
import { Outlet } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <div>Signup</div>
      <h1>This is Signup Page</h1>
      <Outlet></Outlet>
    </>
  );
}
