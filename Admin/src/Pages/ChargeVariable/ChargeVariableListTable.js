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
import { addChargeVariable, deleteChargeVariable, getAllChargeVariable, getChargeVariableDetails, updateChargeVariable } from '../../store/chargevariable/gitChargeVariableSlice';



const ChargeVariableListTable = () => {
    

    const dispatch = useDispatch();
    const chargesvariables = useSelector(state => state.gitChargeVariable.chargesvariables);
    const [errors, setErrors] = useState({});


    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitChargeVariable.Success,
      errorMessage: state.gitChargeVariable.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  

    const [modal_list, setmodal_list] = useState(false);
    const [editChargeVariable, setEditChargeVariable] = useState(null);

    const [editedNameChargeVariable, setEditedNameChargeVariable] = useState('');
    const [editedChiffreChargeVariable, setEditedChiffreChargeVariable] = useState('');

    const [editedDate, setEditedDate] = useState(""); // Store the file itself, initialize as null

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedChargeVariable, setSelectedChargeVariable] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddChargeVariable, setModalAddChargeVariable] = useState(false);
    
    
    const [newChargeVariableData, setNewChargeVariableData] = useState({
        nom: '',
        date: '',
        chiffre: null, // Store the file itself, initialize as null
        
       
    });
    


        const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(chargesvariables.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateFournisseur = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return chargesvariables.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };
        
        const id = useSelector(state => state.login.user.id);

    
    useEffect(() => {
        dispatch(getAllChargeVariable(id));
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
    if (chargesvariables.length > 0) { // Vérifiez si la liste contient des éléments
        new List('pagination-list', {
            valueNames: ['pagi-list'],
        });
    }
}, [chargesvariables]);



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
if (!data.date) {
    errors.date = "La date est requise.";
} else {
    const inputDate = new Date(data.date);
    
    if (isNaN(inputDate)) {
        errors.date = "La date est invalide.";
    } else if (inputDate < startOfMonth || inputDate > endOfMonth) {
        errors.date = `La date doit être comprise entre le ${startOfMonth.toLocaleDateString()} et le ${endOfMonth.toLocaleDateString()}.`;
    }
}

if (!data.chiffre) {
    errors.chiffre = "Le chiffre Détail est requis.";
}  else if (isNaN(data.chiffre) || data.chiffre < 0) {
    errors.chiffre = "Le chiffre doit être un nombre entier positif.";


}

if (!data.nom) {
    errors.nom = "Le Nom est requis.";
} 




return errors;
};
    
    const toggleAddChargeVariableModal = () => {
        setModalAddChargeVariable(!modalAddChargeVariable);
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
    

    
    
    
    const openDeleteModal = (chargevariable) => {
        setSelectedChargeVariable(chargevariable);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteChargeVariable(selectedChargeVariable.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }





    const openEditModal = (chargesvariables) => {
        console.log(chargesvariables);  
        setEditChargeVariable(chargesvariables);
        setEditedNameChargeVariable(chargesvariables.nom);
        setEditedChiffreChargeVariable(chargesvariables.chiffre);
        setEditedDate(chargesvariables.date);

        setSelectedChargeVariable(chargesvariables);

        
        toggleListModal();

    };

   const handleUpdate = () => {
    const errors = validate({ date: editedDate, chiffre: editedChiffreChargeVariable, nom: editedNameChargeVariable });
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setErrors({});
    const ChargeVarialble ={
        nom:editedNameChargeVariable,
        chiffre:editedChiffreChargeVariable,
        date:editedDate,
    }

    dispatch(updateChargeVariable({ id: editChargeVariable.id,  ChargeVarialble })).then(() => {
        // Réinitialiser l'état
     setEditChargeVariable({
        nom: '',
        chiffre: null,
        date: '', // Store the file itself, initialize as null
        
    });

        // Fermer le modal
        toggleListModal();

        // Ouvrir le modal de confirmation
        toggleConfirmEdit(true);
    })
    .catch(error => {
        // Gérer l'erreur
        console.error("Error updating Fournisseur:", error);
    })
    .finally(() => {
        // Désactiver le chargement après l'achèvement de l'action
    });

     
   }


   
const openShowModal = (chargevariable) => {
    setSelectedChargeVariable(chargevariable);
    dispatch(getChargeVariableDetails(chargevariable.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddPackaging = () => {
    const errors = validate({ date: newChargeVariableData.date, nom: newChargeVariableData.nom, chiffre: newChargeVariableData.chiffre});
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    setErrors({});
    const formData = new FormData();
    formData.append('nom', newChargeVariableData.nom);
    formData.append('chiffre', newChargeVariableData.chiffre);
    formData.append('date', newChargeVariableData.date);
    

    dispatch(addChargeVariable({ id: id, formData}))
    .then(() => {
        
    
        // Réinitialiser l'état
        setNewChargeVariableData({
            nom: '',
            date: '',
            chiffre:null,
        });
    
        toggleAddChargeVariableModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Fournisseur:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });



};



return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Charge Variable" />

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
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddChargeVariableModal}
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
                                                        <th className="sort" data-sort="Packaging-nombre_package">Date</th> 
                                                        <th className="sort" data-sort="Packaging-nombre_package">Chiffre</th> 
    
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
                                                <td  onClick={() => openShowModal(chargevariable)}>{chargevariable.date }</td>

                                                <td onClick={() => openShowModal(chargevariable)}>
  {parseFloat(chargevariable.chiffre).toFixed(2)} TND
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
        {chargevariable.nom !== "Marchandise" && (
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
            <Modal isOpen={modalAddChargeVariable} toggle={toggleAddChargeVariableModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddChargeVariableModal}>Ajout</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Nom </label>
                                                    <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newChargeVariableData.nom} onChange={(e) => setNewChargeVariableData({ ...newChargeVariableData, nom: e.target.value })} required />
                                                    {errors.nom && <div className="text-danger">{errors.nom}</div>}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Date </label>
                                                    <input type="datetime-local" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newChargeVariableData.date} onChange={(e) => setNewChargeVariableData({ ...newChargeVariableData, date: e.target.value })} required />
                                                    {errors.date && <div className="text-danger">{errors.date}</div>}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Chiffre </label>
                                                    <input type="number" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newChargeVariableData.chiffre} onChange={(e) => setNewChargeVariableData({ ...newChargeVariableData, chiffre: e.target.value })} required />
                                                    {errors.chiffre && <div className="text-danger">{errors.chiffre}</div>}

                                                </div>
                                               
                                               
                                                     
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddChargeVariableModal}>Fermer</Button>
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
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedNameChargeVariable} onChange={(e) => setEditedNameChargeVariable(e.target.value)} required />
                            {errors.nom && <div className="text-danger">{errors.nom}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Date</label>
                            <input type="date" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} required />
                            {errors.date && <div className="text-danger">{errors.date}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Chiffre</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedChiffreChargeVariable} onChange={(e) => setEditedChiffreChargeVariable(e.target.value)} required />
                            {errors.chiffre && <div className="text-danger">{errors.chiffre}</div>}

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
  {selectedChargeVariable && (
    <form className="tablelist-form">
        <div className="mb-3" >
        <label htmlFor="name_packaging-field" className="form-label">Nom</label>
        <input type="text" id="name_packaging-field" className="form-control" value={selectedChargeVariable.nom} readOnly />

      </div>
      
      <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Date</label>
        <input type="date" id="nombre_package-field" className="form-control" value={selectedChargeVariable.date} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Chiffre</label>
        <input type="number" id="nombre_package-field" className="form-control" value={selectedChargeVariable.chiffre} readOnly />
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
                Ajout effectué avec succés                </Alert>

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
        
{selectedChargeVariable && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedChargeVariable.nom}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default ChargeVariableListTable;
