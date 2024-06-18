import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,ListGroup, CardHeader, Col, Container, Alert, ListGroupItem, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addFournisseur, deleteFournisseur, getAllFournisseur, getFournisseureDetails, updateFournisseur } from '../../store/fournisseur/gitFournisseurSlice';
import List from 'list.js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const FournisseurListTable = () => {
    

    const dispatch = useDispatch();
    const fournisseurs = useSelector(state => state.gitFournisseur.fournisseurs);
    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitFournisseur.Success,
      errorMessage: state.gitFournisseur.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  
    const [errors, setErrors] = useState({});

    const [modal_list, setmodal_list] = useState(false);
    const [editFournisseur, setEditFournisseur] = useState(null);

    const [editedNameFournisseur, setEditedNameFournisseur] = useState('');
    const [editedEmailFournisseur, setEditedEmailFournisseur] = useState('');
    const [editedNumFournisseur, setEditedNumFournisseur] = useState('');

    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedFournisseur, setSelectedFournisseur] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddFournisseur, setModalAddFournisseur] = useState(false);
    
    
    const [newFournisseurData, setNewFournisseurData] = useState({
        nom: '',
        email: '',
        num_telephone: '', // Store the file itself, initialize as null
        photo:null,
        
       
    });
    const validate = (data) => {
        const errors = {};

        if (!data.nom) {
            errors.nom = "Le nom est requis.";
        }
        if (!data.email) {
            errors.email = "L'email est requis.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "L'email est invalide.";
        }
        if (!data.num_telephone) {
            errors.num_telephone = "Le numéro de téléphone est requis.";
        } else if (!/^\d+$/.test(data.num_telephone)) {
            errors.num_telephone = "Le numéro de téléphone doit contenir uniquement des chiffres.";
          }

        return errors;
    };
    


        const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(fournisseurs.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateFournisseur = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return fournisseurs.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };
        
        const id = useSelector(state => state.login.user.id);

    
    useEffect(() => {
        dispatch(getAllFournisseur(id));
    }, [dispatch,id]);



    
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

useEffect(() => {
    if (fournisseurs.length > 0) { // Vérifiez si la liste contient des éléments
        new List('pagination-list', {
            valueNames: ['pagi-list'],
        });
    }
}, [fournisseurs]);
 

    
    const toggleAddFournisseurModal = () => {
        setModalAddFournisseur(!modalAddFournisseur);
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
    
    
  const toggleConfirmAdd = isOpen => {
    setModalConfirmAdd(isOpen);
}


const toggleConfirmEdit = (isOpen) => {
    setModalConfirmEdit(isOpen);
}
    
    
    
    
    const openDeleteModal = (fournisseur) => {
        setSelectedFournisseur(fournisseur);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteFournisseur(selectedFournisseur.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }





    const openEditModal = (fournisseurs) => {
        setEditFournisseur(fournisseurs);
        setEditedNameFournisseur(fournisseurs.nom);
        setEditedEmailFournisseur(fournisseurs.email);
        setEditedNumFournisseur(fournisseurs.num_telephone);

        setEditedPhoto(''); 
        setSelectedFournisseur(fournisseurs);

        
        toggleListModal();

    };

    const handleUpdate = () => {
        const errors = validate({ nom: editedNameFournisseur, email: editedEmailFournisseur, num_telephone: editedNumFournisseur });
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        // Clear previous errors if any
        setErrors({});
    
        const formData = new FormData();
        formData.append('nom', editedNameFournisseur);
        formData.append('num_telephone', editedNumFournisseur);
        formData.append('email', editedEmailFournisseur);
        formData.append('photo', editedPhoto);
    
        dispatch(updateFournisseur({ id: editFournisseur.id, fournisseurData: formData }))
            .then(() => {
                setEditFournisseur({ nom: '', email: '', num_telephone: '', photo: null });
                toggleListModal();
                toggleConfirmEdit(true);
            })
            .catch(error => {
                console.error("Error updating Fournisseur:", error);
            });
    };


   
const openShowModal = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    dispatch(getFournisseureDetails(fournisseur.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddPackaging = () => {
    const errors = validate(newFournisseurData);
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    // Clear previous errors if any
    setErrors({});

    const formData = new FormData();
    formData.append('nom', newFournisseurData.nom);
    formData.append('num_telephone', newFournisseurData.num_telephone);
    formData.append('email', newFournisseurData.email);
    formData.append('photo', newFournisseurData.photo);

    dispatch(addFournisseur({ id, formData }))
        .then(() => {
            setNewFournisseurData({ nom: '', email: '', num_telephone: '', photo: null });
            toggleAddFournisseurModal();
            toggleConfirmAdd(true);
        })
        .catch(error => {
            console.error("Error updating Fournisseur:", error);
        });
};




return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Fournisseur" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Fournisseurs</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddFournisseurModal}
                                                                                                    onMouseEnter={() => setHover(true)}
                                                                                                      onMouseLeave={() => setHover(false)}
                                                                                                        id="create-btn">
                                                                                                        <i className={hover ? "ri-add-fill align-bottom me-1" : "ri-add-line align-bottom me-1"}></i>
                                                                                                        {/* {hover ? "Ajouter" : ""} */}

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
                                                        {/* <th className="sort" data-sort="Packaging-Id">ID</th> */}
                                                        <th className="sort" data-sort="Packaging-photo">Photo</th> 

                                                        <th className="sort" data-sort="Packaging-name_packaging">Nom </th>
                                                        <th className="sort" data-sort="Packaging-nombre_package">Email</th> 
                                                        <th className="sort" data-sort="Packaging-nombre_package">Numero de telephone</th> 
    
                                                        <th class="d-flex align-items flex-column" data-sort="action" >
                                                        Action
                                                        
                                                        
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                    {paginateFournisseur().length > 0 ? (
                                        paginateFournisseur().map((fournisseur, index) => (
                                            <tr key={fournisseur.id}>
                                                <th scope="row" >
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" onClick={() => openShowModal(fournisseur)} name="chk_child" value="option1" />
                                                    </div>
                                                </th>
                                                {/* <td onClick={() => openShowModal(fournisseur)}>{fournisseur.id}</td> */}
                                                <td onClick={() => openShowModal(fournisseur)}>
  {fournisseur.photo ? (
    <img
      src={`${fournisseur.photo.replace('fournisseurs', '')}`} // Supprimer le préfixe 'fournisseurs'
      alt={fournisseur.nom}
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
                                                <td onClick={() => openShowModal(fournisseur)}>{fournisseur.nom}</td>
                                                <td onClick={() => openShowModal(fournisseur)}>{fournisseur.email}</td>
                                                <td onClick={() => openShowModal(fournisseur)}>
              <PhoneInput
                value={fournisseur.num_telephone}
                disabled // Rend le composant non modifiable
                inputStyle={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
                buttonStyle={{
                  display: true, // Cache le bouton du drapeau
                }}
              />   
              </td>                                            

                                                <td>
                                                <div className="d-flex justify-content">

                                                    <div className=" d-flex gap-4">
                                                        <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(fournisseur)}
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
                                                            onClick={() => openEditModal(fournisseur)}
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
                                                            onClick={() => openDeleteModal(fournisseur)}
                                                            onMouseEnter={() => setHoverRemove(true)}
                                                            onMouseLeave={() => setHoverRemove(false)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                            {/* {hoverRemove ? " Supprimer" : ""} */}
                                                        </Button>
                                                    </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Rupture de Fournisseur</td>
                                        </tr>
                                    )}
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
            {/* Add Packaging Modal */}
            <Modal isOpen={modalAddFournisseur} toggle={toggleAddFournisseurModal} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleAddFournisseurModal}>Ajout </ModalHeader>
                <ModalBody>
                    <form className="tablelist-form">
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Nom</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newFournisseurData.nom} onChange={(e) => setNewFournisseurData({ ...newFournisseurData, nom: e.target.value })} required />
                            {errors.nom && <div className="text-danger">{errors.nom}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email_packaging-field" className="form-label">Email</label>
                            <input type="email" id="email_packaging-field" className="form-control" placeholder="Enter Email" value={newFournisseurData.email} onChange={(e) => setNewFournisseurData({ ...newFournisseurData, email: e.target.value })} required />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="num_telephone_packaging-field" className="form-label">Numero de telephone </label>
                            <PhoneInput
                                country={'tn'} // Default country (Tunisia)
                                value={newFournisseurData.num_telephone}
                                onChange={(phone) => setNewFournisseurData({ ...newFournisseurData, num_telephone: phone })}
                                inputProps={{
                                    name: 'num_telephone',
                                    required: true,
                                    autoFocus: true
                                }}
                                inputClass="form-control"
                                containerClass="mb-3"
                            />
                            {errors.num_telephone && <div className="text-danger">{errors.num_telephone}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo_packaging-field" className="form-label">Photo</label>
                            <input type="file" id="photo_packaging-field" className="form-control" onChange={(e) => setNewFournisseurData({ ...newFournisseurData, photo: e.target.files[0] })} required />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggleAddFournisseurModal}>Close</Button>
                    <Button color="primary" onClick={handleAddPackaging}>Ajouter</Button>
                </ModalFooter>
            </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered>
      <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}>
        Modification 
      </ModalHeader>
      <form className="tablelist-form">
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="name_packaging-field" className="form-label">Nom</label>
            <input
              type="text"
              id="name_packaging-field"
              className="form-control"
              placeholder="Enter Name"
              value={editedNameFournisseur}
              onChange={(e) => setEditedNameFournisseur(e.target.value)}
              required
            />
            {errors.nom && <div className="text-danger">{errors.nom}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email_packaging-field" className="form-label">Email</label>
            <input
              type="text"
              id="email_packaging-field"
              className="form-control"
              placeholder="Enter Email"
              value={editedEmailFournisseur}
              onChange={(e) => setEditedEmailFournisseur(e.target.value)}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="num_telephone_packaging-field" className="form-label">Numero de telephone</label>
            <PhoneInput
              value={editedNumFournisseur}
              onChange={(phone) => setEditedNumFournisseur(phone)}
              inputProps={{
                name: 'num_telephone',
                required: true,
                autoFocus: true
              }}
              inputClass="form-control"
              containerClass="mb-3"
            />
            {errors.num_telephone && <div className="text-danger">{errors.num_telephone}</div>}
          </div>
          <div className="mb-3 row align-items-center">
            <div className="col-md-9">
              <label htmlFor="photo-field" className="form-label">Photo</label>
              <input
                type="file"
                id="photo-field"
                className="form-control"
                onChange={(e) => setEditedPhoto(e.target.files[0])}
                name="photo"
              />
            </div>
            <div className="col-md-2">
              {editedPhoto && (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  src={URL.createObjectURL(editedPhoto)}
                  alt="Profile picture"
                  style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                />
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <Button type="button"color="light"  className="btn btn-light" onClick={toggleListModal}>Fermer</Button>
            <Button type="button" color="primary" className="btn btn" onClick={handleUpdate}>Mettre à jour</Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>




             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail </ModalHeader>
                <ModalBody>
  {selectedFournisseur && (
    <form className="tablelist-form">
        <div className="d-flex flex-column align-items-center" >
        {selectedFournisseur.photo ? (
          <img
            src={`${selectedFournisseur.photo.replace('fournisseurs', '')}`} // Supprimer le préfixe 'fournisseurs'
            alt={selectedFournisseur.nom}
            style={{ width: "50px", height: "50px" ,
            borderRadius: "50%", // Appliquer une bordure en cercle
            objectFit: "cover",
            }}
            className="mb-3"
          />
        ) : (
          <p className="mb-3">Pas de photo</p>
        )}
        <p className="mb-0">{selectedFournisseur.nom}</p>
      </div>
      <div className="mb-3">
        <label htmlFor="name_packaging-field" className="form-label">Nom</label>
        <input type="text" id="name_packaging-field" className="form-control" value={selectedFournisseur.nom} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Email</label>
        <input type="text" id="nombre_package-field" className="form-control" value={selectedFournisseur.email} readOnly />
      </div>
      <div className="mb-3">
              <label htmlFor="nombre_package-field" className="form-label">Numero de telephone</label>
              <PhoneInput
                value={selectedFournisseur.num_telephone}
                disabled 
                inputClass="form-control"
                containerClass="mb-3"
              />
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



            
            {/* confirm add Modal */}

            <Modal isOpen={modal_confirm_add} toggle={() => toggleConfirmAdd(false)} centered>
    <ModalHeader className="bg-light p-3" toggle={() => toggleConfirmAdd(false)}>Confirmer l'ajout</ModalHeader>            <ModalBody>
        
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







            
             {/* confirm edit Modal */}

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







            {/* Remove Modal */}
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
        
{selectedFournisseur && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedFournisseur.nom}?</p>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleDeleteModal}>Retour</Button>
                    <Button color="danger" onClick={handleRemove}>Supprimer</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
);










    
}
    
    
    
    



















    
    
    
    
    
    
    
   

export default FournisseurListTable;
