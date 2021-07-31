import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Card,
  CardBody,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { scheduleSubject } from "../../../redux/asesoria";
import { useForm } from "../../../components/hooks/useForm";

export function CardSubjects() {
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state.asesoria);
  
  const [formValues, changeValues] = useForm({
    subject: null
  });
  const {subject} = formValues;

  // actions 
  useEffect(() => {
    if(subject) {
      dispatch(scheduleSubject(subject));
    }
  }, [subject, dispatch]);

  return (
    <Col xs={8} xl={100} className="dashboard-sec box-col-12">
      <Card className="earning-card">
        <CardBody>
          <Row className="m-0">
            <Col className="earning-content">
              <Form>
                <FormGroup>
                  <Label name='subject' for='subject'>
                    <h3>Materias </h3>
                  </Label>
                  <Input type="select" name="subject" id="subject" onChange={changeValues}>
                    <option>[Seleccione la materia]</option>
                    {
                      subjects.map((item, index) => {
                        return <option key={`${index}-${item.materia}`} value={item.materia}>{item.nommate}</option>
                      })
                    }
                  </Input>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
}
