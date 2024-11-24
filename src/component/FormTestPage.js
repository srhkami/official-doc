import {Form, Row, Col} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {MDBBtn} from "mdb-react-ui-kit";

export default function FormTestPage() {

  const {
    formState: {errors},
    register,
    handleSubmit
  } = useForm()

  const onSubmit = (formData) => {
    console.log(formData);
    // submit your data here
  }

  return (
    <Row>
      <Col xs={6}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" {...register("name", {
              value: true, message: '此欄位必填',
            })} />
            {/*<span className='text-danger'>{errors['name'].message}</span>*/}
            {/*{errors['name'] &&}*/}
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" {...register("email", {
              value: true, message: '此欄位必填',
            })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} {...register("message")} />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Remember me" {...register("rememberMe")} />
          </Form.Group>
          <MDBBtn type="submit">送出</MDBBtn>
        </Form>
      </Col>
    </Row>
  )
}