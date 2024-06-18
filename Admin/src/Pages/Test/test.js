import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from "../../components/Common/Breadcrumb.js";
import { Button, Card,Alert, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


import { getAllData , getUserDetails , deleteUser , updateManagerUser, addManagerUser} from '../../store/user/gitUserSlice';

const AdminListTables = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.gitUser.users);
    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    




        const id = useSelector(state => state.login.user.id);

        // Fonction pour paginer les produits
const paginateProduits = () => {
    // Filtrage des utilisateurs par rôle 'manager'
    const filteredUsers = users.filter(user => id === user.id_creator);

    // Calcul des index de pagination pour les utilisateurs filtrés
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Retourner les utilisateurs filtrés paginés
    return filteredUsers.slice(startIndex, endIndex);
};

// Filtrage des utilisateurs par rôle 'manager'
const filteredUsers = users.filter(user => id === user.id_creator);

// Calcul du nombre total de pages basé sur le nombre d'utilisateurs filtrés
const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };


        const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);



    const { Success, errorMessage } = useSelector(state => ({
        Success: state.gitUser.Success,
        errorMessage: state.gitUser.errorMessage,
        
      }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state

    const [modal_list, setmodal_list] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedAdresse, setEditedAdresse] = useState('');
    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null

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


    useEffect(() => {
        if (Success) {
    
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            window.location.reload()
    
          }, 2000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
        }
      }, [Success]);


      useEffect(() => {
        if (errorMessage) {
    
        setTimeout(() => {
            window.location.reload()
    
        }, 2000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
        }
    }, [errorMessage]);
    
    
    

    


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
    const toggleConfirmAdd = (isOpen) => {
        setModalConfirmAdd(isOpen);
    }
    const toggleConfirmEdit = (isOpen) => {
        setModalConfirmEdit(isOpen);
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
        setEditedPhoto(user.photo); 

        setEditedNumero(user.numero);
        setEditedStatus(user.statut);
        toggleListModal();

    };

   const handleUpdate = () => {


    const formData = new FormData();
    formData.append('id', editUser.id); // Append the file to the form data
    formData.append('name', editedName); // Append the file to the form data
    formData.append('email', editedEmail); // Append the file to the form data
    formData.append('adresse', editedAdresse); // Append the file to the form data
    formData.append('numero', editedNumero); // Append the file to the form data
    formData.append('photo', editedPhoto); // Append the file to the form data


    
    dispatch(updateManagerUser({ id: editUser.id, userData: formData }))
    .then(() => {
        // Réinitialiser l'état
        

    setEditUser({
        nom: '',
        email: '',
        adresse: '', // Store the file itself, initialize as null
        

        photo:null,
        
    });

        // Fermer le modal
        toggleListModal();

        // Ouvrir le modal de confirmation
        toggleConfirmEdit(true);
    })
    .catch(error => {
        // Gérer l'erreur
        console.error("Error updating Restaurateur:", error);
    })
    .finally(() => {
        // Désactiver le chargement après l'achèvement de l'action
    });
    
}




const openShowModal = (user) => {
    setSelectedUser(user);
    dispatch(getUserDetails(user.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddUser = () => {

    const formData = new FormData();
    formData.append('name', newUserData.name); // Append the file to the form data
    formData.append('email', newUserData.email); // Append the file to the form data
    formData.append('adresse', newUserData.adresse); // Append the file to the form data
    formData.append('numero', newUserData.numero); // Append the file to the form data
    formData.append('photo', newUserData.photo); // Append the file to the form data
    formData.append('password', newUserData.password); // Append the file to the form data





    dispatch(addManagerUser({ id, formData }))
    .then(() => {
        
    
        // Réinitialiser l'état
       
    
    setNewUserData({
        name: '',
        email: '',
        adresse: '',
        numero: '',
        
        password:'',
        photo:''
    });
    
            // Fermer le modal
            toggleAddUserModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Restaurateur:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });
    

};





    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Restaurateur </h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-10">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddUserModal}
                                                  onMouseEnter={() => setHover(true)}
                                                  onMouseLeave={() => setHover(false)}
                                                  id="create-btn">
                                                 <i className={hover ? "ri-add-fill align-bottom me-1" : "ri-add-line align-bottom me-1"}></i>
                                                  {hover ? "Restaurateur" : ""}

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
                                                        {/* <th className="sort" data-sort="User-Id">ID</th> */}
                                                        <th className="sort" data-sort="User-name">Photo</th>

                                                        <th className="sort" data-sort="User-name">Nom</th>


                                                        <th className="sort" data-sort="User-email">Email</th>
                                                        <th className="sort" data-sort="User-adresse">Adresse</th>
                                                        <th className="sort" data-sort="User-numero">Numéro de téléphone</th>
                                                        <th className="sort" data-sort="User-adresse">Statut</th>


                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {paginateProduits() && users.length > 0 ? 
                                                       paginateProduits()

                                                        .map(user => (
                                                            <tr key={user.id} >
                                                                <th scope="row" onClick={() => openShowModal(user)}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                {/* <td onClick={() => openShowModal(user)}>{user.id}</td> */}
                                                                <td onClick={() => openShowModal(user)}>
                                                                    {user.photo ? (
                                                                        <img
                                                                        src={`${user.photo.replace('users', '')}`} // Supprimer le préfixe 'fournisseurs'
                                                                        alt={user.name}
                                                                        style={{
                                                                            width: "50px",
                                                                            height: "50px",
                                                                            borderRadius: "50%", // Appliquer une bordure en cercle
                                                                            objectFit: "cover", // S'assurer que l'image remplit correctement le cercle
                                                                        }}
                                                                        />
                                                                    ) : (
                                                                        "Pas de photo"
                                                                    )}
                                                                    </td>
                                                                <td onClick={() => openShowModal(user)}>{user.name}</td>
                                                                <td onClick={() => openShowModal(user)}>{user.email }</td>
                                                                <td onClick={() => openShowModal(user)}>{user.adresse}</td>
                                                                <td>{user.numero && `+216 ${user.numero}`}</td>
                                                                <td className="status" onClick={() => openShowModal(user)}>

                                                                    <span className={`badge badge-soft-${user.statut === 'activé' ? 'success' : 'danger'} text-uppercase`}>
                                                                        {user.statut}
                                                                    </span>
                                                                </td>
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                    <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(user)}
                                                            onMouseEnter={() => setHoverShow(true)}
                                                            onMouseLeave={() => setHoverShow(false)}
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                            {/* {hoverShow ? " Consulter" : ""} */}
                                                        </Button>
                                                        <Button
                                                            color="soft-success"
                                                            size="sm"
                                                            className="edit-item-btn"
                                                            onClick={() => openEditModal(user)}
                                                            onMouseEnter={() => setHoverEdit(true)}
                                                            onMouseLeave={() => setHoverEdit(false)}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                            {/* {hoverEdit ? " Modifier" : ""} */}
                                                        </Button>
                                                        <Button
                                                            color="soft-danger"
                                                            size="sm"
                                                            className="remove-item-btn"
                                                            onClick={() => openDeleteModal(user)}
                                                            onMouseEnter={() => setHoverRemove(true)}
                                                            onMouseLeave={() => setHoverRemove(false)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                            {/* {hoverRemove ? " Supprimer" : ""} */}
                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) 
                                                        : 
                                                        <tr><td colSpan="7">No users available</td></tr>
                                                    }
                                                </tbody>
                                            </table>

                                             {/* Pagination */}
                                             <ul className="pagination">
                                                            {/* Générer les boutons de pagination */}
                                                    {Array.from({ length: Math.ceil(totalPages) }, (_, index) => (
                                                        <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => changePage(index)}>{index + 1}</button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                           
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
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddUserModal}>Ajout </ModalHeader>
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
                                                    <input type="tel" id="numero-field" className="form-control" placeholder="Entrez le numéro de téléphone" value={newUserData.numero} onChange={(e) => setNewUserData({ ...newUserData, numero: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                <label htmlFor="photo-field" className="form-label">
                                                  Photo
                                                </label>
                                                <input
                                                  type="file"
                                                  id="photo-field"
                                                  className="form-control"
                                                  onChange={(e) => setNewUserData({ ...newUserData, photo: e.target.files[0] })} // Handle file selection
                                                  name="photo"
                                                />
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






             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modification </ModalHeader>
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
                            <div className="mb-3 row align-items-center">
    <div className="col-md-9">
        <label htmlFor="photo-field" className="form-label">Photo</label>
        <input
            type="file"
            id="photo-field"
            className="form-control"
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    setEditedPhoto(file);
                }
            }}
            name="photo"
        />
    </div>
    <div className="col-md-2">
        {editedPhoto && editedPhoto instanceof File && (
            <img
                src={URL.createObjectURL(editedPhoto)}
                alt="Profile"
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
            />
        )}
    </div>
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






        
            {/* confirm add Modal */}

            <Modal isOpen={modal_confirm_add} toggle={() => toggleConfirmAdd(false)} centered>
    <ModalHeader className="bg-light p-3" toggle={() => toggleConfirmAdd(false)}>Confirmer l'ajout</ModalHeader>
    <ModalBody>
        
        {Success ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '3em' }} />
                <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                Ajout effectué avec succés      
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
    </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={() => toggleConfirmAdd(false)}>Retour</Button>
                </ModalFooter>
            </Modal>








            <Modal isOpen={modal_confirm_edit} toggle={() => toggleConfirmEdit(false)} centered>
    <ModalHeader className="bg-light p-3" toggle={() => toggleConfirmEdit(false)}>Confirmer la modification</ModalHeader>
    <ModalBody>
        
        {Success ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '3em' }} />
                <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                Modification effectué avec succés
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={() => toggleConfirmEdit(false)}>Retour</Button>
    </ModalFooter>
</Modal>






             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Restaurateur</ModalHeader>
                <ModalBody>

                     {selectedUser && (
                        <form className="tablelist-form">
                             <div className="d-flex flex-column align-items-center" >
        {selectedUser.photo ? (
          <img
            src={`${selectedUser.photo.replace('users', '')}`} // Supprimer le préfixe 'fournisseurs'
            alt={selectedUser.name}
            style={{ width: "50px", height: "50px" ,
            borderRadius: "50%", // Appliquer une bordure en cercle
            objectFit: "cover",
            }}
            className="mb-3"
          />
        ) : (
          <p className="mb-3">Pas de photo</p>
        )}
        <p className="mb-0">{selectedUser.name}</p>
      </div>
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


            
      {/* Suppression Modal */}
      <Modal isOpen={modal_delete} toggle={() => toggleDeleteModal(false)} centered>
        <ModalHeader className="bg-light p-3"toggle={() => toggleDeleteModal(false)} >
          Confirmer la suppression
        </ModalHeader>
        <ModalBody>
        {Success ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '3em' }} />
                <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                Suppression effectué avec succés
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
        

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
