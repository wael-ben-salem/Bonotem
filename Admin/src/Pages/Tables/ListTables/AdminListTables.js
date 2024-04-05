import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Button, Card, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Flatpickr from "react-flatpickr";

import { getAllData, updateUser } from '../../../features/gitUserSlice';

const AdminListTables = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.gitUser.users);
    const loading = useSelector(state => state.gitUser.loading);
    const error = useSelector(state => state.gitUser.error);

    const [modal_list, setmodal_list] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedAdresse, setEditedAdresse] = useState('');
    const [editedNumero, setEditedNumero] = useState('');
    const [editedStatus, setEditedStatus] = useState('');

    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);

    const toggleListModal = () => {
        setmodal_list(!modal_list);
    }

    const toggleDeleteModal = () => {
        setmodal_delete(!modal_delete);
    }

    const openEditModal = (user) => {
        setEditUser(user);
        setEditedName(user.name);
        setEditedEmail(user.email);
        setEditedAdresse(user.adresse);
        setEditedNumero(user.numero);
        setEditedStatus(user.statut);
        toggleListModal();
    }

   const handleUpdate = () => {
    const updatedUser = {
        id: editUser.id,
        name: editedName,
        email: editedEmail,
        adresse: editedAdresse,
        numero: editedNumero,
        statut: editedStatus
    };
    dispatch(updateUser({ id: editUser.id, userData: updatedUser }));
    toggleListModal();
}

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Listjs" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Add, Edit & Remove</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button color="success" className="add-btn" onClick={toggleListModal} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                    <Button color="soft-danger">
                                                        {/* onClick="deleteMultiple()" */}
                                                        <i className="ri-delete-bin-2-line"></i>
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Search..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th className="sort" data-sort="User-Id">Id</th>
                                                        <th className="sort" data-sort="User-name">Name</th>
                                                        <th className="sort" data-sort="User-email">Email</th>
                                                        <th className="sort" data-sort="User-adresse">Adresse</th>
                                                        <th className="sort" data-sort="User-numero">Numero de telephone</th>
                                                        <th className="sort" data-sort="User-statut">Statut</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {users && users.length > 0 ? 
                                                        users.map(user => (
                                                            <tr key={user.id}>
                                                                <th scope="row">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                <td>{user.id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.adresse}</td>
                                                                <td>{user.numero && `+216 ${user.numero}`}</td>
                                                                <td className="status">
                                                                    <span className={`badge badge-soft-${user.statut === 'Activé' ? 'success' : 'danger'} text-uppercase`}>
                                                                        {user.statut}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="show">
                                                                            <button className="btn btn-sm btn-dark show-item-btn" data-bs-toggle="modal" data-bs-target="#ShowRecordModal">Show</button>
                                                                        </div>
                                                                        <div className="edit">
                                                                            <button className="btn btn-sm btn-success edit-item-btn" onClick={() => openEditModal(user)}>Edit</button>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) 
                                                        : 
                                                        <tr><td colSpan="7">No users available</td></tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Edit Customer </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Customer Name</label>
                            <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Email</label>
                            <input type="email" id="email-field" className="form-control" placeholder="Enter Email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="adresse-field" className="form-label">Adresse</label>
                            <input type="text" id="adresse-field" className="form-control" placeholder="Enter Adresse" value={editedAdresse} onChange={(e) => setEditedAdresse(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="numero-field" className="form-label">Phone Number</label>
                            <input type="text" id="numero-field" className="form-control" placeholder="Enter Phone Number" value={editedNumero} onChange={(e) => setEditedNumero(e.target.value)} required />
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Status</label>
                            <select className="form-control" data-trigger name="status-field" id="status-field" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="Block">Block</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={toggleListModal}>Close</button>
                            <button type="button" className="btn btn-success" onClick={handleUpdate}>Update Customer</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={toggleDeleteModal} className="modal fade zoomIn" id="deleteRecordModal" centered >
                <div className="modal-header">
                    <Button type="button" onClick={toggleDeleteModal} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={toggleDeleteModal}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default AdminListTables;
