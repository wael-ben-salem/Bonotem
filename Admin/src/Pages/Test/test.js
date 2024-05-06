import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Button, Card, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { deleteUser ,getAllData,updateUser,getUserDetails,addUser} from '../../store/user/gitUserSlice';


const AdminListTables = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.gitUser.users);
    

    const [modal_list, setmodal_list] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedAdresse, setEditedAdresse] = useState('');
    const [editedNumero, setEditedNumero] = useState('');
    const [editedStatus, setEditedStatus] = useState('');
    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedUser, setSelectedUser] = useState(null); // State to store selected user details
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddUser, setModalAddUser] = useState(false);
    const [modalAddAdmin, setModalAddAdmin] = useState(false);

    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        adresse: '',
        numero: '',
        statut: '',
        role_id : '',
        password:''
       
    });




    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);







    const toggleAddUserModal = () => {
        setModalAddUser(!modalAddUser);
    };
    const toggleAddAdminModal = () => {
        setModalAddAdmin(!modalAddAdmin);
    };

    const toggleListModal = () => {
        setmodal_list(!modal_list);
    }

    const toggleDeleteModal = () => {
        setModalDelete(!modal_delete);
    }
    const toggleShowModal = () => {
        setModalShow(!modal_show);
    }





    const openDeleteModal = (user) => {
        setSelectedUser(user);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteUser(selectedUser.id)); // Dispatch deleteUser action with the selected user's ID
        toggleDeleteModal();
    }





    const openEditModal = (user) => {
        setEditUser(user);
        setEditedName(user.name);
        setEditedEmail(user.email);
        setEditedAdresse(user.adresse);
        setEditedNumero(user.numero);
        setEditedStatus(user.statut);
        toggleListModal();

    };

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




const openShowModal = (user) => {
    setSelectedUser(user);
    dispatch(getUserDetails(user.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}





const handleAddUser = () => {
    dispatch(addUser(newUserData));
    setNewUserData({
        name: '',
        email: '',
        adresse: '',
        numero: '',
        statut: '',
        role_id : '',
        password:''
    });
    toggleAddUserModal();

};


const handleAddAdmin = () => {
    dispatch(addUser(newUserData));
    setNewUserData({
        name: '',
        email: '',
        adresse: '',
        numero: '',
        statut: '',
        role_id : '',
        password:''
    });
    toggleAddAdminModal();

};



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Utilisateur" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Utilisateurs</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button color="success" className="add-btn"  onClick={toggleAddUserModal} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Ajouter Restaurateur</Button>
                                                <Button color="info" className="add-btn"  onClick={toggleAddAdminModal} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Ajouter Admin</Button>
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
                                            <table className="table align-middle table-nowrap" id="userTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th className="sort" data-sort="User-Id">ID</th>
                                                        <th className="sort" data-sort="User-name">Nom</th>
                                                        <th className="sort" data-sort="User-email">Email</th>
                                                        <th className="sort" data-sort="User-role">Role</th>
                                                        <th className="sort" data-sort="User-adresse">Adresse</th>
                                                        <th className="sort" data-sort="User-numero">Numéro de téléphone</th>
                                                        <th className="sort" data-sort="User-statut">Statut</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {users && users.length > 0 ? 
                                                        users
                                                        .filter(user => user.role && user.role.name_role === 'restaurateur')
                                                        .map(user => (
                                                            <tr key={user.id} >
                                                                <th scope="row" onClick={() => openShowModal(user)}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                <td onClick={() => openShowModal(user)}>{user.id}</td>
                                                                <td onClick={() => openShowModal(user)}>{user.name}</td>
                                                                <td onClick={() => openShowModal(user)}>{user.email }</td>
                                                                <td onClick={() => openShowModal(user)}>{user.role ? user.role.name_role : 'No'}</td> 
                                                                <td onClick={() => openShowModal(user)}>{user.adresse}</td>
                                                                <td>{user.numero && `+216 ${user.numero}`}</td>
                                                                <td className="status" onClick={() => openShowModal(user)}>
                                                                    <span className={`badge badge-soft-${user.statut === 'activé' ? 'success' : 'danger'} text-uppercase`}>
                                                                        {user.statut}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="show">
                                                                            <button className="btn btn-sm btn-dark show-item-btn" onClick={() => openShowModal(user)}>Details</button>
                                                                        </div>
                                                                        <div className="edit">
                                                                            <button className="btn btn-sm btn-success edit-item-btn" onClick={() => openEditModal(user)}>Modifier</button>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <button className="btn btn-sm btn-danger remove-item-btn"onClick={() => { openDeleteModal(user); }} >Supprimer</button>
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
            {/* Add User Modal */}
            <Modal isOpen={modalAddUser} toggle={toggleAddUserModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddUserModal}>Ajout restaurateur</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name-field" className="form-label">Nom</label>
                                                    <input type="text" id="name-field" className="form-control" placeholder="Enter Name" value={newUserData.name} onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email-field" className="form-label">Email</label>
                                                    <input type="email" id="email-field" className="form-control" placeholder="Enter Email" value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password-field" className="form-label">Mot de passe</label>
                                                    <input type="password" id="password-field" className="form-control" placeholder="Enter Password" value={newUserData.password} onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="adresse-field" className="form-label">Adresse</label>
                                                    <input type="text" id="adresse-field" className="form-control" placeholder="Enter Adresse" value={newUserData.adresse} onChange={(e) => setNewUserData({ ...newUserData, adresse: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="numero-field" className="form-label">Numéro de téléphone</label>
                                                    <input type="text" id="numero-field" className="form-control" placeholder="Enter Phone Number" value={newUserData.numero} onChange={(e) => setNewUserData({ ...newUserData, numero: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="role_id-field" className="form-label">Role</label>
                                                    <select className="form-control" id="role_id-field" value={newUserData.role_id} onChange={(e) => setNewUserData({ ...newUserData, role_id: e.target.value })} required>
                                                        <option value="">Sélectionner Role</option>
                                                        <option value="2">restaurateur</option>
                                                      
                                                    </select>
                                                
                                                </div>

                                                
                                                <div className="mb-3">
                                                    <label htmlFor="statut-field" className="form-label">Statut</label>
                                                    <select className="form-control" id="statut-field" value={newUserData.statut} onChange={(e) => setNewUserData({ ...newUserData, statut: e.target.value })} required>
                                                        <option value="">Statut</option>
                                                        <option value="activé">activé</option>
                                                        <option value="désactivé">désactivé</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddUserModal}>Fermer</Button>
                                                <Button type="button" color="success" onClick={handleAddUser}>Ajouter </Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>



{/* Add Admin Modal */}
<Modal isOpen={modalAddAdmin} toggle={toggleAddAdminModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddAdminModal}>Ajout Admin</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name-field" className="form-label">Nom</label>
                                                    <input type="text" id="name-field" className="form-control" placeholder="Enter Name" value={newUserData.name} onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email-field" className="form-label">Email</label>
                                                    <input type="email" id="email-field" className="form-control" placeholder="Enter Email" value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password-field" className="form-label">Mot de passe</label>
                                                    <input type="password" id="password-field" className="form-control" placeholder="Enter Password" value={newUserData.password} onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="adresse-field" className="form-label">Adresse</label>
                                                    <input type="text" id="adresse-field" className="form-control" placeholder="Enter Adresse" value={newUserData.adresse} onChange={(e) => setNewUserData({ ...newUserData, adresse: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="numero-field" className="form-label">Numéro de téléphone</label>
                                                    <input type="text" id="numero-field" className="form-control" placeholder="Enter Phone Number" value={newUserData.numero} onChange={(e) => setNewUserData({ ...newUserData, numero: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="role_id-field" className="form-label">Role</label>
                                                    <select className="form-control" id="role_id-field" value={newUserData.role_id} onChange={(e) => setNewUserData({ ...newUserData, role_id: e.target.value })} required>
                                                        <option value="">Sélectionner Role</option>
                                                        <option value="1">admin</option>
                                                      
                                                    </select>
                                                
                                                </div>

                                                
                                                <div className="mb-3">
                                                    <label htmlFor="statut-field" className="form-label">Statut</label>
                                                    <select className="form-control" id="statut-field" value={newUserData.statut} onChange={(e) => setNewUserData({ ...newUserData, statut: e.target.value })} required>
                                                        <option value="">Statut</option>
                                                        <option value="activé">activé</option>
                                                        <option value="désactivé">désactivé</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddAdminModal}>Fermer</Button>
                                                <Button type="button" color="success" onClick={handleAddAdmin}>Ajouter</Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>









             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier restaurateur </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="username-field" className="form-label">Nom</label>
                            <input type="text" id="username-field" className="form-control" placeholder="Enter Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} required />
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
                            <label htmlFor="numero-field" className="form-label">Numéro de téléphone</label>
                            <input type="text" id="numero-field" className="form-control" placeholder="Enter Phone Number" value={editedNumero} onChange={(e) => setEditedNumero(e.target.value)} required />
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Statut</label>
                            <select className="form-control" data-trigger name="status-field" id="status-field" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                                <option value="">Statut</option>
                                <option value="activé">activé</option>
                                <option value="désactivé">désactivé</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={toggleListModal}>Fermer</button>
                            <button type="button" className="btn btn-success" onClick={handleUpdate}>Mettre à jour</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>




             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Restaurateur</ModalHeader>
                <ModalBody>
                    {selectedUser && (
                        <form className="tablelist-form">
                            <div className="mb-3">
                                <label htmlFor="username-field" className="form-label">Nom</label>
                                <input type="text" id="username-field" className="form-control" value={selectedUser.name} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email-field" className="form-label">Email</label>
                                <input type="email" id="email-field" className="form-control" value={selectedUser.email} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="adresse-field" className="form-label">Adresse</label>
                                <input type="text" id="adresse-field" className="form-control" value={selectedUser.adresse} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numero-field" className="form-label">Numéro de téléphone</label>
                                <input type="text" id="numero-field" className="form-control" value={selectedUser.numero} readOnly />
                            </div>
                            <div>
                                <label htmlFor="status-field" className="form-label">Statut</label>
                                <div className="status">
                        <span className={`badge badge-soft-${selectedUser.statut === 'activé' ? 'success' : 'danger'} text-uppercase`}>
                            {selectedUser.statut}
                        </span>
                    </div>
                               
                            </div>
                           
                        </form>
                    )}
                </ModalBody>
                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-light" onClick={toggleShowModal}>Fermer</button>
                        
                    </div>
                </ModalFooter>
            </Modal>


            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleDeleteModal}>Confirmer la suppression</ModalHeader>
                <ModalBody>
                    {selectedUser && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser.name}?</p>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleDeleteModal}>Retour</Button>
                    <Button color="danger" onClick={handleRemove}>Supprimer</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default AdminListTables;
