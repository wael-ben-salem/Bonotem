import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";

// action
import {  RegisterAuthAction, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch, connect } from "react-redux";

import { Link , useNavigate} from "react-router-dom";

// import images
import logolight from '../../assets/images/logo-light.png';
import logodark from '../../assets/images/logo-dark.png';

function Register  (props)  {
    document.title = "Register | Upzet - React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const {register} = props ;
  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(RegisterAuthAction(values));
    }
  });
  
  
  const { user, registrationError } = useSelector(state => ({
    user: state.account.user,
    registrationError: state.account.registrationError,
  }));
  const [userState ,setUserstate] = useState({

  });

  // handleValidSubmit
  // const handleValidSubmit = values => {
  //   dispatch(registerUser(values));
  // };

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/");
      }, 3000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
    }
  }, [user, navigate]);
  
  return (
    <div className="bg-pattern" style={{height:"110vh"}}>
    <div className="bg-overlay"></div>
    <div className="account-pages pt-5">
        <Container>
            <Row className="justify-content-center">
                <Col lg={6} md={8} xl={4}>
                    <Card className='mt-5'>
                        <CardBody className="p-4">
                            <div className="text-center">
                                <Link to="/" className="">
                                    <img src={logodark} alt="" height="24" className="auth-logo logo-dark mx-auto" />
                                    <img src={logolight} alt="" height="24" className="auth-logo logo-light mx-auto" />
                                </Link>
                            </div>

                            <h4 className="font-size-18 text-muted text-center mt-2">Free Register</h4>
                            <p className="text-muted text-center mb-4">Get your free Upzet account now.</p>
                            <Form
                                className="form-horizontal"
                                onSubmit={(e) => {
                                    e.preventDefault();
    props.register(userState, navigate); // Pass history here
    return false;
                                    
                                }}
                                >
                                {showSuccessMessage && user ? (
                                    <Alert color="success">
                                    Register User Successfully
                                    </Alert>
                                    
                                ) : null}

                                {registrationError && registrationError ? (
                                    <Alert color="danger">An error occurred</Alert>

                                ) : true}

                                <Row>
                                    <Col md={12}>
                                        <div className="mb-4">
                                        <Label className="form-label">Email</Label>
                                            <Input
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            type="email"
                                            onChange={(event)=> {
                                                const email = event.target.value ; 

                                                setUserstate({...userState, ...{ email }});
                                                validation.handleChange(event); // Handle change for validation

                                            }}                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.email && validation.errors.email ? true : false
                                            }
                                            />
                                            {validation.touched.email && validation.errors.email ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-4">
                                        <Label className="form-label">Username</Label>
                                            <Input
                                            name="username"
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={(event)=> {
                                                const name = event.target.value ; 

                                                setUserstate({...userState, ...{ name }});
                                                validation.handleChange(event); // Handle change for validation

                                            }}                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.username && validation.errors.username ? true : false
                                            }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.username}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-4">
                                        <Label className="form-label">Password</Label>
                                            <Input
                                            name="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            onChange={(event)=> {
                                                const password = event.target.value ; 

                                                setUserstate({...userState, ...{ password }});
                                                validation.handleChange(event); // Handle change for validation

                                            }}                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.password && validation.errors.password ? true : false
                                            }
                                            />
                                            {validation.touched.password && validation.errors.password ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.password}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="term-conditionCheck" />
                                            <label className="form-check-label fw-normal" htmlFor="term-conditionCheck">I accept <Link to="#" className="text-primary">Terms and Conditions</Link></label>
                                        </div>
                                        <div className="d-grid mt-4">
                                            <button className="btn btn-primary waves-effect waves-light" type="submit">Register</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                    <div className="mt-5 text-center">
                        <p className="text-white-50">Already have an account ?<Link to="/login" className="fw-medium text-primary"> Login </Link> </p>
                        <p className="text-white-50">© {new Date().getFullYear()} Upzet. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
</div>
  );
};
const mapDispatchToProps = (dispatch) => {
    return {
      register: (userState, navigate) => {
        dispatch(RegisterAuthAction(userState, navigate));
      },
    };
  };
  
const mapStateToProps = (authstate) => {
    return {
        user: authstate,
    };
};


  export default connect(mapStateToProps,mapDispatchToProps)(Register);
Register.propTypes = {
  history: PropTypes.object,
};
