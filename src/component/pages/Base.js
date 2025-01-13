import Nav from "../tools/Nav";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import AuthLayout from "../tools/AuthLayout";
import {ToastContainer} from "react-toastify";
import React from "react";

export default function Base({content}) {
  return (
    <>
      <Nav></Nav>
      <Container fluid='xl' className='pt-4'>

        <AuthLayout content={
          <>
            <ToastContainer
              position="bottom-right"
              autoClose={4000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {content}
            <Outlet/>
          </>
        }/>
      </Container>
    </>
  )
}