import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Alert, Form, Input, FormFeedback, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect, useDispatch, useSelector } from "react-redux";
import { LoginAuthAction, socialLogin, loginSuccess } from "../../store/actions";
import { facebook, google } from "../../config";
import logodark from "../../assets/images/Group 2.png";

const Login = ({ login, user }) => {
  document.title = "Login | Upzet - React Admin & Dashboard Template";
  const dispatch = useDispatch();
  const history = useNavigate();

  const [loginState, setLoginState] = useState({});
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "admin@Themesdesign.com" || "",
      password: "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
  });

  const { error } = useSelector((state) => ({
    error: state.login.error,
  }));

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, history, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, history, type));
    }
  };

  const googleResponse = (response) => {
    signIn(response, "google");
  };

  const facebookResponse = (response) => {
    signIn(response, "facebook");
  };

  useEffect(() => {
    const backgrounds = ["bg-pattern-light", "bg-pattern-dark"];
    let currentIndex = 0;
    
    const changeBackground = () => {
      document.body.classList.remove("bg-pattern-light", "bg-pattern-dark");
      document.body.classList.add("bg-pattern", backgrounds[currentIndex]);
      currentIndex = (currentIndex + 1) % backgrounds.length;
    };
    
    changeBackground();
    const intervalId = setInterval(changeBackground, 15000);
    
    return () => {
      clearInterval(intervalId);
      document.body.className = "";
    };
  }, []);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const userData = JSON.parse(authUser);
      dispatch(loginSuccess(userData));
      if (userData.role === "admin") {
        history("/admindashboard");
      } else if (userData.role === "restaurateur") {
        history("/dashboard");
      } else if (userData.role === "manager") {
        history("/test");
      }
    }
  }, [dispatch, history]);

  return (
    <React.Fragment>
      <div className="bg-overlay"></div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xl={4}>
              <Card>
                <CardBody className="p-4" style={{ backgroundColor: "rgba(255,255,244,255)" }}>
                  <div>
                    <div className="text-center">
                      <Link to="/">
                        <img src={logodark} alt="" height="190" className="auth-logo logo-dark mx-auto" />
                      </Link>
                    </div>
                    
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (validation.isValid) {
                          login(loginState, history);
                        }
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <Row>
                        <Col md={12}>
                          <div className="mb-4">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={(event) => {
                                const email = event.target.value;
                                setLoginState({ ...loginState, ...{ email } });
                                validation.handleChange(event);
                              }}
                              onBlur={validation.handleBlur}
                              invalid={validation.touched.email && (validation.errors.email || !loginState.email)}
                            />
                            {validation.touched.email && (validation.errors.email || !loginState.email) ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email ? validation.errors.email : 'Please enter your email'}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-4">
                            <Label className="form-label">Mot de Passe</Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={(event) => {
                                const password = event.target.value;
                                setLoginState({ ...loginState, ...{ password } });
                                validation.handleChange(event);
                              }}
                              onBlur={validation.handleBlur}
                              invalid={validation.touched.password && (validation.errors.password || !loginState.password)}
                            />
                            {validation.touched.password && (validation.errors.password || !loginState.password) ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password ? validation.errors.password : 'Please enter your password'}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="d-grid mt-4">
                            <button style={{ backgroundColor: "rgba(60,60,60,255)" }} className="btn btn-primary waves-effect waves-light" type="submit">
                              Log In
                            </button>
                            
                          </div>
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3"> </h5>
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                
                              </li>
                              
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
               
                
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (authstate) => {
  return {
    user: authstate,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (loginState, history) => {
    dispatch(LoginAuthAction(loginState, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
