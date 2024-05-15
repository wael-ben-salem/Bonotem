import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,Alert, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addCategorie, deleteCategorie, getAllData, getCategorieeDetails, updateCategorie } from '../../store/categorie/gitCategorySlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';





const CategoryTables = () => {
    

    const dispatch = useDispatch();
    const categories = useSelector(state => state.gitCategory.categories);




    const [ setHoverShow] = useState(false);
    const [ setHoverEdit] = useState(false);
    const [ setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitCategory.Success,
      errorMessage: state.gitCategory.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  







    const [modal_list, setmodal_list] = useState(false);
    const [editCategorie, setEditCategorie] = useState(null);
    const [editedNameCategorie, setEditedNameCategorie] = useState('');
    const [editedDescriptionCategorie, setEditedDescriptionCategorie] = useState('');
    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null
    
    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedCategorie, setSelectedCategorie] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddCategorie, setModalAddCategorie] = useState(false);
    
    
    const [newCategorieData, setNewCategorieData] = useState({
        name: '',
        description: '',
        photo: null, // Store the file itself, initialize as null
        
       
    });


    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(categories.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateCategories = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return categories.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };

//
    
    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);




      
  useEffect(() => {
    if (Success) {

    setShowSuccessMessage(true);
    setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload()

    }, 3000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
    }
}, [Success]);



useEffect(() => {
    if (errorMessage) {

    setTimeout(() => {
        window.location.reload()

    }, 3000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
    }
}, [errorMessage]);


    

    

    
    const toggleAddCategorieModal = () => {
        setModalAddCategorie(!modalAddCategorie);
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




    
    
    
    const openDeleteModal = (categorie) => {
        setSelectedCategorie(categorie);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteCategorie(selectedCategorie.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  4000); 
    }





    const openEditModal = (categories) => {
        setEditCategorie(categories);
        setEditedNameCategorie(categories.name);
        setEditedDescriptionCategorie(categories.description);
        setEditedPhoto(categories.photo); 
        setSelectedCategorie(categories);

        
        toggleListModal();

    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('id', editCategorie.id);
        formData.append('name', editedNameCategorie);

        formData.append('description', editedDescriptionCategorie);
        formData.append('photo', editedPhoto); // Append the file to the form data

        dispatch(updateCategorie({ id: editCategorie.id, categorieData: formData }))

        .then(() => {
            // Réinitialiser l'état
            setEditCategorie({
                name: '',
                description: '',
                photo: null,
            });

            // Fermer le modal
            toggleListModal();

            // Ouvrir le modal de confirmation
            toggleConfirmEdit(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Catégorie:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });


        
        
    };

   

   
const openShowModal = (categorie) => {
    setSelectedCategorie(categorie);
    dispatch(getCategorieeDetails(categorie.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddCategorie = () => {
    const formData = new FormData();
    formData.append('name', newCategorieData.name);
    formData.append('description', newCategorieData.description);
    formData.append('photo', newCategorieData.photo); // Append the file to the form data
    
    dispatch(addCategorie(formData))
    
    .then(() => {
        
    
        // Réinitialiser l'état
        setNewCategorieData({
            name: '',
            description: '',
            photo: null,
        });
    
            // Fermer le modal
            toggleAddCategorieModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Catégorie:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });
   
};





return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Categories" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Categories</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddCategorieModal}
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
                                                        <th className="sort" data-sort="Categorie-Id">ID</th>
                                                        <th className="sort" data-sort="Categorie-name">Nom Categorie</th>
                                                        <th className="sort" data-sort="Categorie-description">description</th>
                                                        <th className="sort" data-sort="Categorie-photo">photo</th>
                                                        
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                {paginateCategories().length > 0 ? (
                                                     paginateCategories().map(categorie => (
                                                            <tr key={categorie.id} >
                                                                <th scope="row" >
                                                                    <div className="form-check">
                                                                        <input className="form-check-input"onClick={() => openShowModal(categorie)}  type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                <td onClick={() => openShowModal(categorie)}>{categorie.id}</td>
                                                                <td onClick={() => openShowModal(categorie)}>{categorie.name}</td>
                                                                <td onClick={() => openShowModal(categorie)}>{categorie.description }</td>
                                                                <td onClick={() => openShowModal(categorie)}>
                                  {categorie.photo ? (
                                    <img
                                    src={`${categorie.photo.replace('categories', '')}`} // Remove the 'categories' prefix
                                    alt={categorie.name}
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                  ) : (
                                    "No photo"
                                  )}
                                </td>
                                                                
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                    <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(categorie)}
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
                                                            onClick={() => openEditModal(categorie)}
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
                                                            onClick={() => openDeleteModal(categorie)}
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
                                                    )
                                                        : 
                                                    (
                                                        <tr><td colSpan="7">Pas de Catégories pour le moment</td></tr>
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
            <Modal isOpen={modalAddCategorie} toggle={toggleAddCategorieModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddCategorieModal}>Ajout</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name-field" className="form-label">Nom Categorie</label>
                                                    <input type="text" id="naem-field" className="form-control" placeholder="Enter Name" value={newCategorieData.name} onChange={(e) => setNewCategorieData({ ...newCategorieData, name: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="description-field" className="form-label">Description</label>
                                                    <input type="text" id="description-field" className="form-control" placeholder="Enter La description" value={newCategorieData.description} onChange={(e) => setNewCategorieData({ ...newCategorieData, description: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                <label htmlFor="photo-field" className="form-label">
                                                  Photo
                                                </label>
                                                <input
                                                  type="file"
                                                  id="photo-field"
                                                  className="form-control"
                                                  onChange={(e) => setNewCategorieData({ ...newCategorieData, photo: e.target.files[0] })} // Handle file selection
                                                  name="photo"
                                                />
                                              </div>
                                               
                                                
                                                
                                               
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddCategorieModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={handleAddCategorie}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier Categorie </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="name-field" className="form-label">Nom Description</label>
                            <input type="text" id="name-field" className="form-control" placeholder="Entrer Nom" value={editedNameCategorie} onChange={(e) => setEditedNameCategorie(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description-field" className="form-label">Description</label>
                            <input type="text" id="description-field" className="form-control" placeholder="Enter la description" value={editedDescriptionCategorie} onChange={(e) => setEditedDescriptionCategorie(e.target.value)} required />
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
        {selectedCategorie && selectedCategorie.photo && (
                <img
                    src={`${selectedCategorie.photo.replace('categories', '')}`}
                    alt={selectedCategorie.name}
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



            
           {/* confirm add Modal */}

           <Modal isOpen={modal_confirm_add} toggle={() => toggleConfirmAdd(false)} centered>
    <ModalHeader className="bg-light p-3" toggle={() => toggleConfirmAdd(false)}>Confirmer l'ajout</ModalHeader>
    <ModalBody>
        
        {Success ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '3em' }} />
                <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                    Categorie ajoutée avec succès
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
                    Catégorie modifiée avec succès
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

















            <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
   
    <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Categorie</ModalHeader>
    <ModalBody>
        {selectedCategorie && (
            <form className="tablelist-form">
                <div className="mb-3">
                    <label htmlFor="nom-field" className="form-label">Nom Description</label>
                    <input type="text" id="name_packaging-field" className="form-control" value={selectedCategorie.name} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="description-field" className="form-label">Description</label>
                    <input type="text" id="description-field" className="form-control" value={selectedCategorie.description} readOnly />
                </div>
                
                <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
        <img
            src={`${selectedCategorie.photo.replace('categories', '')}`} // Remove the 'categories' prefix
            alt={selectedCategorie.name}
            style={{ width: "50px", height: "50px" }}
            className="mb-3"
        />
        <p className="mb-0">{selectedCategorie.name}</p>
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
                    Catégorie suprimée avec succès
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
        
                    {selectedCategorie && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedCategorie.name}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default CategoryTables;