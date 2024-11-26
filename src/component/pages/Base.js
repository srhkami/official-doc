import Nav from "../tools/Nav";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";


export default function Base({content}) {
  return (
    <>
      <Nav></Nav>
      <Container fluid='xl' className='pt-4 '>
        {content}
        <Outlet/>
      </Container>
    </>
  )
}