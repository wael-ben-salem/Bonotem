import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,Alert, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Breadcrumbs from "../../components/Common/Breadcrumb";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addCout, deleteCout, getCoutDetails, getAllCoutData, updateCout } from '../../store/Cout/gitCoutSlice';



const CoutListTable = () => {
    

    const dispatch = useDispatch();
    const couts = useSelector(state => state.gitCout.couts);


    const [errors, setErrors] = useState({});


    const [hoverShow, setHoverShow] = useState(false); 
    const [hoverEdit, setHoverEdit] = useState(false); 
    const [hoverRemove, setHoverRemove] = useState(false); 
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitCout.Success,
      errorMessage: state.gitCout.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 








    const [modal_list, setmodal_list] = useState(false);

    const [editedCout, setEditedCout] = useState('');


    const [editedDetailCout, setEditedDetailCout] = useState('');
    const [editedDateCout, setEditedDateCout] = useState('');

    const [editedMontantCout, setEditedMontantCout] = useState('');
    const [editedTypeCout, setEditedTypeCout] = useState('');








    const [modal_show, setModalShow] = useState(false); 
    const [selectedCout, setSelectedCout] = useState(null); 
    const [modal_delete, setModalDelete] = useState(false); 
    const [modalAddCout, setModalAddCout] = useState(false);
    
    
    const [newCoutDate, setNewCoutDate] = useState({
        detail: '',
        montant: null,
        date:'',
        type:'',
        

       
    });


    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(couts.length / itemsPerPage);
    
       
       const paginateCouts = () => {
    
    if (!Array.isArray(couts)) {
        return [];
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return couts.slice(startIndex, endIndex);
};

    
       
        const changePage = (page) => {
            setCurrentPage(page);
        };

//
const id = useSelector(state => state.login.user.id);

    useEffect(() => {
        dispatch(getAllCoutData(id));
       

    }, [dispatch,id]);

    useEffect(() => {
        if (errorMessage) {
    
        setTimeout(() => {
            window.location.reload()
    
        }, 2000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
        }
    }, [errorMessage]);
    
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
    
        if (!data.detail) {
            errors.detail = "Le champ Détail est requis.";
        } 
        if (!data.montant) {
            errors.montant = "Le Montant est requis.";
        } 
        if (!data.type) {
            errors.type = "Le Type est requis.";
        } 
    
        return errors;
    };
    
    


      
  useEffect(() => {
    if (Success) {

    setShowSuccessMessage(true);
    setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload()

    }, 2000); 
    }
}, [Success]);


    

    
    const toggleAddCoutModal = () => {
        setModalAddCout(!modalAddCout);
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




    
    
    
    
    const openDeleteModal = (cout) => {
        setSelectedCout(cout);
    toggleDeleteModal(); 
    }

    const handleRemove = () => {
        dispatch(deleteCout(selectedCout.id)); 
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }





    const openEditModal = (couts) => {
        
        setEditedCout(couts);
        setEditedDateCout(couts.date)
        setEditedDetailCout(couts.detail)
        setEditedMontantCout(couts.montant)
        setEditedTypeCout(couts.type)
        toggleListModal();

    }
    
    

    const handleUpdate = () => {
        const errors = validate({ date: editedDateCout, detail: editedDetailCout, type: editedTypeCout, montant:editedMontantCout });
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setErrors({});
        const updatedCout = {
            id: editedCout.id,
            date:editedDateCout,
            detail:editedDetailCout,
            montant:editedMontantCout,
            type:editedTypeCout,
          
            
        };
        dispatch(updateCout({ id: editedCout.id,  updatedCout }))
        .then(() => {
          
        setEditedCout({
            detail: '',
            montant: null,
            date:'',
            type:'',
            
        });

           
            toggleListModal();

          
            toggleConfirmEdit(true);
        })
        .catch(error => {
          
            console.error("Error updating Cout:", error);
        })
        .finally(() => {
            
        });
        
        
        
    };

   

   
const openShowModal = (cout) => {
    setSelectedCout(cout);
    dispatch(getCoutDetails(cout.id)); 
    toggleShowModal();
}





const handleAdd = () => {
    const errors = validate({ date: newCoutDate.date, detail: newCoutDate.detail, type: newCoutDate.type, montant:newCoutDate.montant });
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    setErrors({});
    const formData = new FormData();


        formData.append('type', newCoutDate.type);
        formData.append('date', newCoutDate.date);
        formData.append('detail', newCoutDate.detail);
        formData.append('montant', newCoutDate.montant);
        dispatch(addCout({ id: id, formData }))

    .then(() => {
        
    
       
        setNewCoutDate({
            detail: '',
            montant: null,
            date:'',
            type:'',
        });
        
    
           
            toggleAddCoutModal();
    
            
            toggleConfirmAdd(true);
        })
        .catch(error => {
           
            console.error("Error updating Cout:", error);
        })
        .finally(() => {
            
        });
  
    
    
};






return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Dépense" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Dépenses</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddCoutModal}
                                                                                                    onMouseEnter={() => setHover(true)}
                                                                                                      onMouseLeave={() => setHover(false)}
                                                                                                        id="create-btn">
                                                                                                        <i className={hover ? "ri-add-fill align-bottom me-1" : "ri-add-line align-bottom me-1"}></i>
                                                                                                        {hover ? "Ajouter" : ""}

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
                                        <table className="table align-middle table-nowrap" id="categorieTable">
    <thead className="table-light">
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                </div>
            </th>
            {/* <th className="sort" data-sort="Categorie-Id">ID</th> */}
            <th className="sort" data-sort="Categorie-name">Type</th>
            <th className="sort" data-sort="Categorie-photo">detail</th>
            <th className="sort" data-sort="Categorie-name">date</th>
            <th className="sort" data-sort="Categorie-description">Montant</th>
            <th className="sort" data-sort="action">Action</th>
        </tr>
    </thead>
    <tbody className="list form-check-all">
        {paginateCouts().length > 0 ? (
            paginateCouts().map(cout => (
                <tr key={cout.id}>
                    <th scope="row">
                        <div className="form-check">
                            <input className="form-check-input" onClick={() => openShowModal(cout)} type="checkbox" name="chk_child" value="option1" />
                        </div>
                    </th>
                    {/* <td onClick={() => openShowModal(cout)}>{cout.id}</td> */}
                    <td onClick={() => openShowModal(cout)}>{cout.type}</td>
                    <td onClick={() => openShowModal(cout)}>{cout.detail}</td>
                    <td onClick={() => openShowModal(cout)}>{cout.date}</td>

                    <td onClick={() => openShowModal(cout)}>{cout.montant} TND</td>
                    {/* D'autres colonnes */}
                    <td>
                    <div className="d-flex gap-2">
                        <Button
                            color="soft-dark"
                            size="sm"
                            className="show-item-btn"
                            onClick={() => openShowModal(cout)}
                            onMouseEnter={() => setHoverShow(true)}
                            onMouseLeave={() => setHoverShow(false)}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                        <Button
                            color="soft-success"
                            size="sm"
                            className="edit-item-btn"
                            onClick={() => openEditModal(cout)}
                            onMouseEnter={() => setHoverEdit(true)}
                            onMouseLeave={() => setHoverEdit(false)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            color="soft-danger"
                            size="sm"
                            className="remove-item-btn"
                            onClick={() => openDeleteModal(cout)}
                            onMouseEnter={() => setHoverRemove(true)}
                            onMouseLeave={() => setHoverRemove(false)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>                    </td>
                </tr>
            ))
        ) : (
            <tr><td colSpan="7">Pas de Décaissement pour le moment</td></tr>
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

            

            {/* Add Cout Modal */}
            <Modal isOpen={modalAddCout} toggle={toggleAddCoutModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddCoutModal}>Ajout</ModalHeader>
                                        <ModalBody>
        <form className="tablelist-form">
        
        
        <div className="mb-3">
    <div className="mb-3">
        <label htmlFor="name_ingredient-field" className="form-label">Type:</label>
        <select
            id="name_ingredient-field"
            className="form-control"
            value={newCoutDate.type}
            onChange={(e) => setNewCoutDate({ ...newCoutDate, type: e.target.value })}
            >
            <option value="">Sélectionner un Type</option>
            <option value="ventilation">Ventilation</option>
            <option value="depense">Dépense</option>

        </select>
        {errors.type && <div className="text-danger">{errors.type}</div>}

    </div>
    <div className="mb-3">
        <label htmlFor="quantite-field" className="form-label">Detail</label>
        <input
            type="text"
            id="quantite-field"
            className="form-control"
            placeholder="Detail"
            value={newCoutDate.detail}
            onChange={(e) => setNewCoutDate({ ...newCoutDate, detail: e.target.value })}
            required
        />
                {errors.detail && <div className="text-danger">{errors.detail}</div>}

    </div>
</div>

<div className="mb-3">
                            <label htmlFor="adresse-field" className="form-label">Date </label>
                            <input type="datetime-local" id="adresse-field" className="form-control" placeholder="Enter Adresse"value={newCoutDate.date}
            onChange={(e) => setNewCoutDate({ ...newCoutDate, date: e.target.value })} required />
                    {errors.date && <div className="text-danger">{errors.date}</div>}

    </div>
    <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Montant</label>
        <input
            type="number"
            id="nombre_package-field"
            className="form-control"
            placeholder="Entrez le Montant"
            value={newCoutDate.montant}
            onChange={(e) => setNewCoutDate({ ...newCoutDate, montant: e.target.value })}
            required
        />
                {errors.montant && <div className="text-danger">{errors.montant}</div>}

    </div>
        </form>
    </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddCoutModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={handleAdd}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>


                                    
                                    <Modal isOpen={modal_list} toggle={toggleListModal} centered>
    <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}>
        Modification
    </ModalHeader>
    <form className="tablelist-form">
        <ModalBody>
        <div className="mb-3">
                <label htmlFor="type-field" className="form-label">Type</label>
                <select
                    id="type-field"
                    className="form-control"
                    value={editedTypeCout}
                    onChange={(e) => setEditedTypeCout(e.target.value)}
                    required
                >
                    <option value="depense">Dépense</option>
                    <option value="ventilation">Ventilation</option>
                </select>
                {errors.type && <div className="text-danger">{errors.type}</div>}

            </div>
            <div className="mb-3 row align-items-center">
            <div className="mb-3">
                <label htmlFor="quantite_apres-field" className="form-label">Detail</label>
                <input
                    type="description"
                    id="quantite_apres-field"
                    className="form-control"
                    placeholder=""
                    value={editedDetailCout}
                    onChange={(e) => setEditedDetailCout(e.target.value)}
                    required
                />
                        {errors.detail && <div className="text-danger">{errors.detail}</div>}

            </div>
            </div>
            <div className="mb-3">
                <label htmlFor="quantite_apres-field" className="form-label">Date</label>
                <input
                    type="datetime-local"
                    id="quantite_apres-field"
                    className="form-control"
                    placeholder="Entrez la Date"
                    value={editedDateCout}
                    onChange={(e) => setEditedDateCout(e.target.value)}
                    required
                />
                        {errors.date && <div className="text-danger">{errors.date}</div>}

            </div>
            <div className="mb-3">
                <label htmlFor="quantite_apres-field" className="form-label">Montant</label>
                <input
                    type="number"
                    id="quantite_apres-field"
                    className="form-control"
                    placeholder="Entrez le montant"
                    value={editedMontantCout}
                    onChange={(e) => setEditedMontantCout(e.target.value)}
                    required
                />
                        {errors.montant && <div className="text-danger">{errors.montant}</div>}

            </div>
           
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggleListModal}>
                Annuler
            </Button>
            <Button color="primary" onClick={handleUpdate}>
                Mettre à jour
            </Button>
        </ModalFooter>
    </form>
</Modal>




             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Décaissement</ModalHeader>
                <ModalBody>
    {selectedCout && (
        <form className="tablelist-form">
             

            <div className="mb-3">
                <label htmlFor="nom_produit-field" className="form-label">Type</label>
                <input type="text" id="name_produit-field" className="form-control" value={selectedCout.type} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="nom_produit-field" className="form-label">Detail</label>
                <input type="description" id="name_produit-field" className="form-control" value={selectedCout.detail} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="nom_produit-field" className="form-label">Date</label>
                <input type="datetime-local" id="name_produit-field" className="form-control" value={selectedCout.date} readOnly />
            </div>

            <div className="mb-3">
                <label htmlFor="nom_produit-field" className="form-label">Montant</label>
                <input type="text" id="name_produit-field" className="form-control" value={selectedCout.montant} readOnly />
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
    <ModalHeader className="bg-light p-3" toggle={() => toggleConfirmAdd(false)}>Confirmer l'ajout</ModalHeader>
    <ModalBody>
        
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
          {selectedCout && (
            <p>
              Voulez vous supprimer Cette
              {selectedCout.type}?
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Annuler
          </Button>
          <Button color="danger" onClick={handleRemove}>
            Supprimer
          </Button>
        </ModalFooter>
      </Modal>












            
           




        </React.Fragment>
);










    
}
    
    
    
    



















    
    
    
    
    
    















    
    
    
    
    
    
    
   

export default CoutListTable;