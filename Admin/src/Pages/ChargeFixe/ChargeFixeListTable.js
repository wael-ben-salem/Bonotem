import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,ListGroup, CardHeader, Col, Container, Alert, ListGroupItem, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import List from 'list.js';
import { addChargeFixe, deleteChargeFixe, getAllChargeFixe, getChargeFixeDetails, updateChargeFixe } from '../../store/chargefixe/gitChargeFixeSlice';



const ChargeFixeTables = () => {
    

    const dispatch = useDispatch();
    const chargesfixes = useSelector(state => state.gitChargeFixe.chargesfixes);


    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitChargeFixe.Success,
      errorMessage: state.gitChargeFixe.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  

    const [modal_list, setmodal_list] = useState(false);
    const [editChargeFixe, setEditChargeFixe] = useState(null);

    const [editedNameChargeFixe, setEditedNameChargeFixe] = useState('');
    const [editedMontantChargeFixe, setEditedMontantChargeFixe] = useState('');

    const [editedDate, setEditedDate] = useState(""); // Store the file itself, initialize as null
    const [editedFrequence, setEditedFrequence] = useState(""); // Store the file itself, initialize as null

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedChargeFixe, setSelectedChargeFixe] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddChargeFixe, setModalAddChargeFixe] = useState(false);
    
    const [errors, setErrors] = useState({});

    const [newChargeFixeData, setNewChargeFixeData] = useState({
        nom: '',
        date_paiement: '',
        montant: null, // Store the file itself, initialize as null
        frequence:'',
       
    });
    


        const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(chargesfixes.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateFournisseur = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return chargesfixes.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };
        
        const id = useSelector(state => state.login.user.id);

    
    useEffect(() => {
        dispatch(getAllChargeFixe(id));
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
    if (chargesfixes.length > 0) { // Vérifiez si la liste contient des éléments
        new List('pagination-list', {
            valueNames: ['pagi-list'],
        });
    }
}, [chargesfixes]);


const validate = (data) => {
    const errors = {};
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // Mois actuel (0-indexed)

// Début du mois en cours
const startOfMonth = new Date(year, month, 1);
// Fin du mois en cours
const endOfMonth = new Date(year, month + 1, 0);

// Vérifier que la date est fournie et est valide
if (!data.date_paiement) {
    errors.date_paiement = "La date est requise.";
} else {
    const inputDate = new Date(data.date_paiement);
    
    if (isNaN(inputDate)) {
        errors.date_paiement = "La date est invalide.";
    } else if (inputDate < startOfMonth || inputDate > endOfMonth) {
        errors.date_paiement = `La date doit être comprise entre le ${startOfMonth.toLocaleDateString()} et le ${endOfMonth.toLocaleDateString()}.`;
    }
}
    if (!data.nom) {
        errors.nom = "Le nom est requise.";
    }
   
    if (!data.montant) {
        errors.montant = "Le Montant est requis.";
    } 
   
    if (!data.frequence) {
        errors.frequence = "La frequence est requis.";
    } 

   


    return errors;
};

    
    const toggleAddChargeFixeModal = () => {
        setModalAddChargeFixe(!modalAddChargeFixe);
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
    
    
    
    
    const openDeleteModal = (chargefixe) => {
        setSelectedChargeFixe(chargefixe);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteChargeFixe(selectedChargeFixe.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }





    const openEditModal = (chargesfixes) => {
        setEditChargeFixe(chargesfixes);
        setEditedNameChargeFixe(chargesfixes.nom);
        setEditedMontantChargeFixe(chargesfixes.montant);
        setEditedDate(chargesfixes.date_paiement);
        setEditedFrequence(chargesfixes.frequence);



        setSelectedChargeFixe(chargesfixes);

        
        toggleListModal();

    };

   const handleUpdate = () => {
    const errors = validate({ date_paiement: editedDate, nom: editedNameChargeFixe, montant: editedMontantChargeFixe, frequence: editedFrequence });
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setErrors({});

    const ChargeFixe ={
        nom:editedNameChargeFixe,
        montant:editedMontantChargeFixe,
        date_paiement:editedDate,
        frequence:editedFrequence
    }

    dispatch(updateChargeFixe({ id: editChargeFixe.id,  ChargeFixe })).then(() => {
        // Réinitialiser l'état
     setEditChargeFixe({
        nom: '',
        montant: null,
        date_paiement: '', 
        frequence: '', 

    });

        // Fermer le modal
        toggleListModal();

        // Ouvrir le modal de confirmation
        toggleConfirmEdit(true);
    })
    .catch(error => {
        // Gérer l'erreur
        console.error("Error updating Chargeù:", error);
    })
    .finally(() => {
        // Désactiver le chargement après l'achèvement de l'action
    });

     
   }


   
const openShowModal = (chargefixe) => {
    setSelectedChargeFixe(chargefixe);
    dispatch(getChargeFixeDetails(chargefixe.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddPackaging = () => {
    const errors = validate({ date_paiement: newChargeFixeData.date_paiement,frequence: newChargeFixeData.frequence, nom: newChargeFixeData.nom, montant: newChargeFixeData.montant});
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    setErrors({});

    const formData= new FormData();
    formData.append('nom', newChargeFixeData.nom);
    formData.append('montant', newChargeFixeData.montant);
    formData.append('date_paiement', newChargeFixeData.date_paiement);
    formData.append('frequence', newChargeFixeData.frequence);


    dispatch(addChargeFixe({ id: id, formData}))
    .then(() => {
        
    
        // Réinitialiser l'état
        setNewChargeFixeData({
            nom: '',
            date_paiement: '',
            montant:null,
            frequence:''
        });
    
        toggleAddChargeFixeModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Charge:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });



};



return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Charge Fixe" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Charges</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddChargeFixeModal}
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

                                                        <th className="sort" data-sort="Packaging-name_packaging">Nom </th>
                                                        <th className="sort" data-sort="Packaging-name_packaging">Frequence </th>

                                                        <th className="sort" data-sort="Packaging-nombre_package">Date_paiement</th> 
                                                        <th className="sort" data-sort="Packaging-nombre_package">Montant</th> 
    
                                                        <th class="d-flex align-items flex-column" data-sort="action" >
                                                        Action
                                                        
                                                        
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                    {paginateFournisseur().length > 0 ? (
                                        paginateFournisseur().map((chargevariable, index) => (
                                            <tr key={chargevariable.id}>
                                                <th scope="row" >
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" onClick={() => openShowModal(chargevariable)} name="chk_child" value="option1" />
                                                    </div>
                                                </th>
                                                {/* <td onClick={() => openShowModal(fournisseur)}>{fournisseur.id}</td> */}
                                                
                                                <td onClick={() => openShowModal(chargevariable)}>{chargevariable.nom}</td>
                                                <td  onClick={() => openShowModal(chargevariable)}>{chargevariable.frequence}</td>
                                                <td  onClick={() => openShowModal(chargevariable)}>{chargevariable.date_paiement }</td>
                                                <td onClick={() => openShowModal(chargevariable)}>
  {parseFloat(chargevariable.montant).toFixed(2)} TND
</td>

                                               

                                                <td>
                                                <div className="d-flex justify-content">
    <div className="d-flex gap-4">
        <Button
            color="soft-dark"
            size="sm"
            className="show-item-btn"
            onClick={() => openShowModal(chargevariable)}
            onMouseEnter={() => setHoverShow(true)}
            onMouseLeave={() => setHoverShow(false)}
        >
            <FontAwesomeIcon icon={faEye} />
            {/* {hoverShow ? " Consulter" : ""} */}
        </Button>
        {chargevariable.nom !== "Personnel"  && (
            <>
                <Button
                    color="soft-success"
                    size="sm"
                    className="edit-item-btn"
                    onClick={() => openEditModal(chargevariable)}
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
                    onClick={() => openDeleteModal(chargevariable)}
                    onMouseEnter={() => setHoverRemove(true)}
                    onMouseLeave={() => setHoverRemove(false)}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    {/* {hoverRemove ? " Supprimer" : ""} */}
                </Button>
            </>
        )}
    </div>
</div>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Pas de Charge</td>
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
            <Modal isOpen={modalAddChargeFixe} toggle={toggleAddChargeFixeModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddChargeFixeModal}>Ajout </ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Nom </label>
                                                    <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newChargeFixeData.nom} onChange={(e) => setNewChargeFixeData({ ...newChargeFixeData, nom: e.target.value })} required />
                                                    {errors.nom && <div className="text-danger">{errors.nom}</div>}

                                                </div>
                                                <div className="mb-3">
                                                <label htmlFor="frequence" className="form-label">Fréquence</label>
                                                <select className="form-control" id="frequence" value={newChargeFixeData.frequence} onChange={(e) => setNewChargeFixeData({...newChargeFixeData, frequence: e.target.value})} required>
                                                  <option value="">Sélectionner la fréquence</option>
                                                  <option value="journalière">Journalière</option>
                                                  <option value="hebdomadaire">Hebdomadaire</option>
                                                  <option value="mensuelle">Mensuelle</option>
                                                  <option value="annuelle">Annuelle</option>
                                                </select>
                                                {errors.frequence && <div className="text-danger">{errors.frequence}</div>}


                                              </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Date de Paiement</label>
                                                    <input type="date" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newChargeFixeData.date_paiement} onChange={(e) => setNewChargeFixeData({ ...newChargeFixeData, date_paiement: e.target.value })} required />
                                                    {errors.date_paiement && <div className="text-danger">{errors.date_paiement}</div>}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Montant </label>
                                                    <input type="number" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newChargeFixeData.montant} onChange={(e) => setNewChargeFixeData({ ...newChargeFixeData, montant: e.target.value })} required />
                                                    {errors.montant && <div className="text-danger">{errors.montant}</div>}

                                                </div>
                                               
                                               
                                                     
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddChargeFixeModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={handleAddPackaging}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modification </ModalHeader>
                
                <form className="tablelist-form">
                    <ModalBody>
                    
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Nom</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedNameChargeFixe} onChange={(e) => setEditedNameChargeFixe(e.target.value)} required />
                            {errors.nom && <div className="text-danger">{errors.nom}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Fréquence</label>
                            <select className="form-control" id="frequence" value={editedFrequence} onChange={(e) => setEditedFrequence(e.target.value)} required>
                                                  <option value="">Sélectionner la fréquence</option>
                                                  <option value="journalière">Journalière</option>
                                                  <option value="hebdomadaire">Hebdomadaire</option>
                                                  <option value="mensuelle">Mensuelle</option>
                                                  <option value="annuelle">Annuelle</option>
                                                </select>
                                                {errors.frequence && <div className="text-danger">{errors.frequence}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Date de Paiement</label>
                            <input type="datetime-local" id="name_packaging-field" className="form-control" placeholder="Enter Date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} required />
                            {errors.date_paiement && <div className="text-danger">{errors.date_paiement}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Montant</label>
                            <input type="number" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedMontantChargeFixe} onChange={(e) => setEditedMontantChargeFixe(e.target.value)} required />
                            {errors.montant && <div className="text-danger">{errors.montant}</div>}

                        </div>

                       
                        
                        

                       
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={toggleListModal}>Fermer</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Mettre à jour</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>




             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail </ModalHeader>
                <ModalBody>
  {selectedChargeFixe && (
    <form className="tablelist-form">
        <div className="mb-3" >
        <label htmlFor="name_packaging-field" className="form-label">Nom</label>
        <input type="text" id="name_packaging-field" className="form-control" value={selectedChargeFixe.nom} readOnly />

      </div>
      <div className="mb-3" >
        <label htmlFor="name_packaging-field" className="form-label">Fréquence</label>
        <input type="text" id="name_packaging-field" className="form-control" value={selectedChargeFixe.frequence} readOnly />

      </div>
      
      <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Date de Paiement</label>
        <input type="datetime-local" id="nombre_package-field" className="form-control" value={selectedChargeFixe.date_paiement} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Montant</label>
        <input type="number" id="nombre_package-field" className="form-control" value={selectedChargeFixe.montant} readOnly />
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
        
{selectedChargeFixe && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedChargeFixe.nom}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default ChargeFixeTables;
