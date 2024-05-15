import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Alert,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { addPackaging, deletePackaging, getAllPackaging, getPackagingDetails, updatePackaging } from '../../store/Packagings/gitPackagingSlice';

import Breadcrumbs from "../../components/Common/Breadcrumb";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';



const Packagings = () => {
    

    const dispatch = useDispatch();
    const packagings = useSelector(state => state.gitPackaging.packagings);
    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitPackaging.Success,
      errorMessage: state.gitPackaging.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  

    const [modal_list, setmodal_list] = useState(false);
    const [editPackaging, setEditPackaging] = useState(null);
    const [editedNamePackaging, setEditedNamePackaging] = useState('');
    const [editedDimension, setEditedDimension] = useState('');
    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedPackaging, setSelectedPackaging] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddPackaging, setModalAddPackaging] = useState(false);
    
    
    const [newPackagingData, setNewPackagingData] = useState({
        name_Packaging: '',
        dimension: '',
        photo: null, // Store the file itself, initialize as null

        
       
    });
    


        const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(packagings.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginatePackagings = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return packagings.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };
        
    
    
    useEffect(() => {
        dispatch(getAllPackaging());
    }, [dispatch]);



    useEffect(() => {
        if (errorMessage) {
    
        setTimeout(() => {
            window.location.reload()
    
        }, 2000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
        }
    }, [errorMessage]);
    
    
        
    
    
  useEffect(() => {
    if (Success) {

    setShowSuccessMessage(true);
    setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload()

    }, 2000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
    }
}, [Success]);


    
    const toggleAddPackagingModal = () => {
        setModalAddPackaging(!modalAddPackaging);
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
    
    
    
    
    const openDeleteModal = (packaging) => {
        setSelectedPackaging(packaging);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deletePackaging(selectedPackaging.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }





    const openEditModal = (packagings) => {
        setEditPackaging(packagings);
        setEditedNamePackaging(packagings.name_packaging);
        setEditedDimension(packagings.dimension);
        setEditedPhoto(packagings.photo); 
        setSelectedPackaging(packagings);

        
        toggleListModal();

    };

   const handleUpdate = () => {
    
    const formData = new FormData();
    formData.append('name_packaging', editedNamePackaging);
    formData.append('dimension', editedDimension);
    formData.append('photo', editedPhoto); // Append the file to the form data

    dispatch(updatePackaging({ id: editPackaging.id, packagingData: formData }))
    .then(() => {
        // Réinitialiser l'état
        setEditPackaging({
            name_packaging: '',
            dimension: '',
            photo: null,
        });

        // Fermer le modal
        toggleListModal();

        // Ouvrir le modal de confirmation
        toggleConfirmEdit(true);
    })
    .catch(error => {
        // Gérer l'erreur
        console.error("Error updating Package :", error);
    })
    .finally(() => {
        // Désactiver le chargement après l'achèvement de l'action
    });
     // Reset the state
     
   
   }


   
const openShowModal = (packaging) => {
    setSelectedPackaging(packaging);
    dispatch(getPackagingDetails(packaging.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddPackaging = () => {
    const formData = new FormData();
    formData.append('name_packaging', newPackagingData.name_packaging);
    formData.append('dimension', newPackagingData.dimension);
    formData.append('', newPackagingData.photo); // Append the file to the form data
    

    dispatch(addPackaging(newPackagingData))
    .then(() => {
        
    
        // Réinitialiser l'état
        setNewPackagingData({
            name_packaging: '',
            dimension: '',
            photo:'',
            
        });
    
            // Fermer le modal
            toggleAddPackagingModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Package :", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });

   

};



return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Packagings" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Packagings</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddPackagingModal}
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
                                                        <th className="sort" data-sort="Packaging-Id">ID</th>
                                                        <th className="sort" data-sort="Packaging-name_packaging">Nom Packaging</th>
                                                        <th className="sort" data-sort="Packaging-nombre_package">Dimension</th> 
                                                        <th className="sort" data-sort="Packaging-photo">Photo</th> 
    
                                                        <th class="d-flex align-items-end flex-column" data-sort="action" >
                                                        <div class="d-flex flex-row-reverse">
                            
                                                        <div class="p-2"></div>
                                                        <div class="p-2"></div>

                                                        <div class="p-2"></div>
                                                        <div class="p-2"></div>
                                                        <div class="p-2"></div>
                                                        <div class="p-2">Action</div>
                                                        </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                    {paginatePackagings().length > 0 ? (
                                        paginatePackagings().map((packaging, index) => (
                                            <tr key={packaging.id}>
                                                <th scope="row" >
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" onClick={() => openShowModal(packaging)} name="chk_child" value="option1" />
                                                    </div>
                                                </th>
                                                <td onClick={() => openShowModal(packaging)}>{packaging.id}</td>
                                                <td onClick={() => openShowModal(packaging)}>{packaging.name_packaging}</td>
                                                <td onClick={() => openShowModal(packaging)}>{packaging.dimension}</td>
                                                <td onClick={() => openShowModal(packaging)}>
                                  {packaging.photo ? (
                                    <img
                                    src={`${packaging.photo.replace('packagings', '')}`} // Remove the 'categories' prefix
                                    alt={packaging.name}
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                  ) : (
                                    "No photo"
                                  )}
                                </td>
                                                <td>
                                                <div className="d-flex justify-content-end">

                                                    <div className=" d-flex gap-4">
                                                        <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(packaging)}
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
                                                            onClick={() => openEditModal(packaging)}
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
                                                            onClick={() => openDeleteModal(packaging)}
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
                                            <td colSpan="5">Rupture de Packaging</td>
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
            <Modal isOpen={modalAddPackaging} toggle={toggleAddPackagingModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddPackagingModal}>Ajout Packaging</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Nom Packaging</label>
                                                    <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newPackagingData.name_packaging} onChange={(e) => setNewPackagingData({ ...newPackagingData, name_packaging: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="nombre_package-field" className="form-label">Dimension</label>
                                                    <input type="text" id="nombre_package-field" className="form-control" placeholder="Enter Le nombre du package" value={newPackagingData.dimension} onChange={(e) => setNewPackagingData({ ...newPackagingData, dimension: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                <label htmlFor="photo-field" className="form-label">
                                                  Photo
                                                </label>
                                                <input
                                                  type="file"
                                                  id="photo-field"
                                                  className="form-control"
                                                  onChange={(e) => setNewPackagingData({ ...newPackagingData, photo: e.target.files[0] })} // Handle file selection
                                                  name="photo"
                                                />
                                              </div>
                                               
                                                     
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddPackagingModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={handleAddPackaging}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier Packaging </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Nom</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedNamePackaging} onChange={(e) => setEditedNamePackaging(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dimension-field" className="form-label">Dimension </label>
                            <input type="text" id="dimension-field" className="form-control" placeholder="Enter Nombre de Package" value={editedDimension} onChange={(e) => setEditedDimension(e.target.value)} required />
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
    <div className="col-md-2    ">
        {selectedPackaging && selectedPackaging.photo && (
                <img
                    src={`${selectedPackaging.photo.replace('packagings', '')}`}
                    alt={selectedPackaging.name}
                    style={{ width: "50px", height: "50px" }}
                />
        )}
    </div>
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
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Packaging</ModalHeader>
                <ModalBody>
                    {selectedPackaging && (
                        <form className="tablelist-form">
                            <div className="mb-3">
                                <label htmlFor="name_packaging-field" className="form-label">Nom</label>
                                <input type="text" id="name_packaging-field" className="form-control" value={selectedPackaging.name_packaging} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre_package-field" className="form-label">Dimension</label>
                                <input type="text" id="nombre_package-field" className="form-control" value={selectedPackaging.dimension} readOnly />
                            </div>
                            {selectedPackaging && selectedPackaging.photo && (
    <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
        {selectedPackaging.photo && (
            <img
                src={`${selectedPackaging.photo.replace('packagings', '')}`} // Remove the 'categories' prefix
                alt={selectedPackaging.name}
                style={{ width: "50px", height: "50px" }}
                className="mb-3"
            />
        )}
        <p className="mb-0">{selectedPackaging.name}</p>
    </div>
)}

                           
                            
                           
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
                    Package  ajoutée avec succès
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
                    Package  modifiée avec succès
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
                    Package  suprimée avec succès
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
        

                    {selectedPackaging && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedPackaging.name_packaging}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default Packagings;