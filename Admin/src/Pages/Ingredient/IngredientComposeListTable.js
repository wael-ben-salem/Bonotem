import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,Alert, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addIngCompose, deleteIngCompose, getAllIngCompose, updateIngCompose } from '../../store/ingredient/GitIngredientComposerSlice';
import { getAllDataIngredient } from '../../store/ingredient/gitIngredientSlice';





const IngredientComposeListTable = () => {
    

    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.gitIngredient.ingredients);
    const ingredientcomposes = useSelector(state => state.gitIngredientCompose.ingredientcomposes);

    
    



    const [ setHoverShow] = useState(false);
    const [ setHoverEdit] = useState(false);
    const [ setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitIngredientCompose.Success,
      errorMessage: state.gitIngredientCompose.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  







    const [modal_list, setmodal_list] = useState(false);
    const [editingredientcompose, setEditingredientcompose] = useState(null);
    const [editedNameingredientcompose, setEditedNameingredientcompose] = useState('');
    const [editedName, setEditedName] = useState('');

    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null
    const [editedQuantite, setEditedQuantite] = useState(null);
    const [editedPhotoIngredient, setEditedPhotoIngredient] = useState(""); // Store the file itself, initialize as null
    const [selectedIngredient, setSelectedIngredient] = useState(null); // State to store selected 

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedingredientcompose, setSelectedingredientcompose] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddCategorie, setModalAddCategorie] = useState(false);
    
    
    const [newIngComposeData, setNewIngComposeData] = useState({
        name_ingredient_compose: '',
        photo: null, // Store the file itself, initialize as null
        
       
    });


    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(ingredientcomposes.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateingredientcomposes = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return ingredientcomposes.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };

//
    
    useEffect(() => {
        dispatch(getAllIngCompose());
        dispatch(getAllDataIngredient())
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




    
    
    
    const openDeleteModal = (ingredientcompose) => {
        setSelectedingredientcompose(ingredientcompose);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteIngCompose(selectedingredientcompose.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }





    const openEditModal = (ingredientcomposes) => {
        setEditingredientcompose(ingredientcomposes);
        setEditedName(ingredientcomposes.name_ingredient_compose);
        setEditedPhoto(editedPhoto); 
        setSelectedingredientcompose(ingredientcomposes);
        if (ingredientcomposes.ingredients.length > 0) {
            const ingredient = ingredientcomposes.ingredients[0];
            setEditedNameingredientcompose(ingredient.pivot.id_ingredient);
            setEditedQuantite(ingredient.pivot.quantite);
            setEditedPhotoIngredient(ingredient.photo);
        }
        
        
        
        toggleListModal();

    };

    const handleUpdate = () => {
        const selectedIngredientId = editedNameingredientcompose;
        const quantity = editedQuantite;
        const photoIngredient = editedPhotoIngredient;


        if (!selectedIngredientId || !quantity  || !photoIngredient) {
            return;
        }

        const insertedProduitIngredient = {
            id: editingredientcompose ? editingredientcompose.id : null,
            name_ingredient_compose:editedName,
            ingredientsComposes: [
            {
                id_ingredient: selectedIngredientId,
                quantite: quantity,
            }
        ]
           
        };
        
        // Append each ingredient separately to formData
        const formData = new FormData();
        formData.append('id', editingredientcompose.id);

        formData.append('name_ingredient_compose', editedName);
        formData.append('photo', editedPhoto); // Append the file to the form data
        insertedProduitIngredient.ingredientsComposes.forEach((ingredient, index) => {
            formData.append(`ingredientsComposes[${index}][id_ingredient]`, ingredient.id_ingredient);
            formData.append(`ingredientsComposes[${index}][quantite]`, ingredient.quantite);

        });


        
       
        dispatch(updateIngCompose({ id: editingredientcompose.id, formData ,insertedProduitIngredient}))

        .then(() => {
            // Reset the state
            setNewIngComposeData({
            name_ingredient_compose: '',
            photo: null,
            selectedIngredientId:'',
            quantity:''
        });

            // Fermer le modal
            toggleListModal();

            // Ouvrir le modal de confirmation
            toggleConfirmEdit(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Ingrédient Composé:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });

        
        
        
       
    };

   

   
const openShowModal = (ingredientcompose) => {
    setSelectedingredientcompose(ingredientcompose);
    dispatch(getAllIngCompose(ingredientcompose.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddCategorie = () => {
    const selectedIngredientId = editedNameingredientcompose;
    const quantity = editedQuantite;



    if (!selectedIngredientId || !quantity  ) {
        return;
    }
   

    const insertedProduitIngredient = {
        id: editingredientcompose ? editingredientcompose.id : null,
        ingredientsComposes: [
        {
            id_ingredient: selectedIngredientId,
            quantite: quantity,
        }
    ]
       
    };


    const formData = new FormData();
    formData.append('name_ingredient_compose', newIngComposeData.name_ingredient_compose);
    formData.append('photo', newIngComposeData.photo); // Append the file to the form data
    insertedProduitIngredient.ingredientsComposes.forEach((ingredient, index) => {
        formData.append(`ingredientsComposes[${index}][id_ingredient]`, ingredient.id_ingredient);
        formData.append(`ingredientsComposes[${index}][quantite]`, ingredient.quantite);
    });
    
    dispatch(addIngCompose(formData)) // Pass the formData to your addCategorie action
    .then(() => {
        
    
        // Réinitialiser l'état
        setNewIngComposeData({
            name_ingredient_compose: '',
            photo: null,
            selectedIngredientId:'',
            quantity:''
        });
    
            // Fermer le modal
            toggleAddCategorieModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Ingrédient Composé:", error);
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
                                    <h4 className="card-title mb-0">Gérer les Ingredient Composés</h4>
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
                                                        <th className="sort" data-sort="Categorie-name">Nom Ingredient Composé</th>
                                                        <th className="sort" data-sort="Categorie-photo">photo</th>
                                                        <th className="sort" data-sort="Categorie-photo">Nom Ingredient</th>
                                                        <th className="sort" data-sort="Categorie-photo">photo</th>
                                                        <th className="sort" data-sort="Categorie-photo">Quantite</th>


                                                        
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                {paginateingredientcomposes().length > 0 ? (
                                                     paginateingredientcomposes().map(ingredientcompose => (
                                                            <tr key={ingredientcompose.id} >
                                                                <th scope="row" >
                                                                    <div className="form-check">
                                                                        <input className="form-check-input"onClick={() => openShowModal(ingredientcompose)}  type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                <td onClick={() => openShowModal(ingredientcompose)}>{ingredientcompose.id}</td>
                                                                <td onClick={() => openShowModal(ingredientcompose)}>{ingredientcompose.name_ingredient_compose}</td>
                                                                <td onClick={() => openShowModal(ingredientcompose)}>
                                  {ingredientcompose.photo ? (
                                    <img
                                    src={`${ingredientcompose.photo.replace('ingredientscompose', '')}`} // Remove the 'categories' prefix
                                    alt={ingredientcompose.name_ingredient_compose}
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                  ) : (
                                    "No photo"
                                  )}
                                </td>
                                <td onClick={() => openShowModal(ingredientcompose)}>
                                {ingredientcompose.ingredients && ingredientcompose.ingredients.length > 0 ? ingredientcompose.ingredients[0].name_ingredient : 'No'}
                                </td>
                                <td onClick={() => openShowModal(ingredientcompose)}>
  {ingredientcompose.ingredients && ingredientcompose.ingredients.length > 0 ? 
    ingredientcompose.ingredients[0].photo ? (
      <img
        src={ingredientcompose.ingredients[0].photo.replace('ingredients', '')} // Remove the 'ingredients' prefix
        alt={ingredientcompose.ingredients[0].name_ingredient}
        style={{ width: "50px", height: "50px" }}
      />
    ) : (
      "No photo"
    )
  : 'No'}
</td>
<td onClick={() => openShowModal(ingredientcompose)}>
                                {ingredientcompose.ingredients && ingredientcompose.ingredients.length > 0 ? ingredientcompose.ingredients[0].pivot.quantite : 'No'}
                                </td>
                                                                
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                    <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(ingredientcompose)}
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
                                                            onClick={() => openEditModal(ingredientcompose)}
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
                                                            onClick={() => openDeleteModal(ingredientcompose)}
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
                                                        <tr><td colSpan="7">Pas de Ingreidient Composé pour le moment</td></tr>
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
                                                    <label htmlFor="name-field" className="form-label">Nom Ingredient Composé</label>
                                                    <input type="text" id="naem-field" className="form-control" placeholder="Enter Name" value={newIngComposeData.name_ingredient_compose} onChange={(e) => setNewIngComposeData({ ...newIngComposeData, name_ingredient_compose: e.target.value })} required />
                                                </div>
                                                
                                                <div className="mb-3">
                                                <label htmlFor="photo-field" className="form-label">
                                                  Photo
                                                </label>
                                                <input
                                                  type="file"
                                                  id="photo-field"
                                                  className="form-control"
                                                  onChange={(e) => setNewIngComposeData({ ...newIngComposeData, photo: e.target.files[0] })} // Handle file selection
                                                  name="photo"
                                                />
                                              </div>
                                              <div className="mb-3">
                <label htmlFor="name_ingredient-field" className="form-label">Ingredient:</label>
                <select
                    id="name_ingredient-field"
                    className="form-control"
                    value={editedNameingredientcompose}
                    onChange={(e) => setEditedNameingredientcompose(e.target.value)}
                >
                    <option value="">Sélectionner des ingredients</option>
                    {ingredients.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name_ingredient}
                        </option>
                    ))}
                </select>
            </div>

                        <div className="mb-3">
                            <label htmlFor="quantite-field" className="form-label">Quantite</label>
                            <input type="text" id="quantite-field" className="form-control" placeholder="Enter la marge" value={editedQuantite} onChange={(e) => setEditedQuantite(e.target.value)} required />
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
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier Ingredient Composé </ModalHeader>
                <div className="d-flex flex-column align-items-center" >
        {selectedingredientcompose && selectedingredientcompose.photo && (
                <img
                    src={`${selectedingredientcompose.photo.replace('ingredientscompose', '')}`}
                    alt={selectedingredientcompose.name_ingredient_compose}
                    style={{ width: "50px", height: "50px" ,marginTop:"3px" }}
                />
        )}
    </div>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="name-field" className="form-label">Nom </label>
                            <input type="text" id="name-field" className="form-control" placeholder="Entrer Nom" value={editedName} onChange={(e) => setEditedName(e.target.value)} required />
                        </div>

                        

                       
                       
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
<div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">Ingredient:</label>
<div className="row">
  <div className="col-md-9">
    <select
      id="ingredient-field"
      className="form-control"
      value={editedNameingredientcompose}
      onChange={(e) => {
        setEditedNameingredientcompose(e.target.value);
        const selected = ingredients.find(ingredient => ingredient.id === parseInt(e.target.value));
        setSelectedIngredient(selected);
      }}
    >
      <option value="">Sélectionner un ingrédient</option>
      {ingredients.map((ingredient) => (
        <option key={ingredient.id} value={ingredient.id}>
          {ingredient.name_ingredient}
        </option>
      ))}
    </select>
  </div>
  
</div>

            </div>
            <div className="mb-3">
                            <label htmlFor="quantite-field" className="form-label">Quantite</label>
                            <input type="text" id="quantite-field" className="form-control" placeholder="Enter la marge" value={editedQuantite} onChange={(e) => setEditedQuantite(e.target.value)} required />
             </div>
             <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
             <div class="d-flex justify-content-between">
    {editedPhotoIngredient ? (

        <div className="d-flex align-items-center">
            <img
                src={editedPhotoIngredient.replace('ingredients', '')}
                alt={setEditedNameingredientcompose.name_ingredient}
                style={{ width: "50px", height: "50px", marginTop: "5px", marginLeft: "18px" }}
                className="align-self-center"
            />
        </div>
         ) : (
            <div  style={{  marginRight: "30px" , marginTop:"20px"}}>No photo</div>
        )}
        <span style={{ fontWeight: "bold", marginLeft: "10px" ,marginTop:"20px"}}>➔</span>

        
        {selectedIngredient && selectedIngredient.photo ? (
            <div className="d-flex align-items-center">
                <img
                    src={selectedIngredient.photo.replace('ingredients', '')}
                    alt={selectedIngredient.name_ingredient}
                    style={{ width: "50px", height: "50px", marginTop: "5px", marginLeft: "20px" }}
                    className="align-self-center"
                />
            </div>
        ) : (
            <div style={{ marginLeft: "30px" , marginTop:"20px"}}>No photo</div>
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
                    Ingredient Composée ajoutée avec succès
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
                Ingredient Composée modifiée avec succès
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
   
    <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Packaging</ModalHeader>
    <ModalBody>
    <div className="d-flex flex-column align-items-center" >
        {selectedingredientcompose && selectedingredientcompose.photo && (
                <img
                    src={`${selectedingredientcompose.photo.replace('ingredientscompose', '')}`}
                    alt={selectedingredientcompose.name_ingredient_compose}
                    style={{ width: "50px", height: "50px" ,marginTop:"3px" }}
                />
        )}
    </div>
        {selectedingredientcompose && (
            <form className="tablelist-form">
                <div className="mb-3">
                    <label htmlFor="nom-field" className="form-label">Nom </label>
                    <input type="text" id="name_packaging-field" className="form-control" value={selectedingredientcompose.name_ingredient_compose} readOnly />
                </div>
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
    {selectedingredientcompose.ingredients && selectedingredientcompose.ingredients.length > 0 && (
        <div style={{ marginRight: '10px' }}>
            <label htmlFor="ingredient-field" className="form-label">Ingrédient</label>
            <input type="text" id="ingredient-field" className="form-control" value={selectedingredientcompose.ingredients[0].name_ingredient} readOnly />
        </div>
    )}

{selectedingredientcompose.ingredients && selectedingredientcompose.ingredients.length > 0 && selectedingredientcompose.ingredients[0].pivot.quantite && (
        <div style={{ marginRight: '10px' }}>
            <label htmlFor="quantite-field" className="form-label">Quantite</label>
            <input type="text" id="quantite-field" className="form-control" value={selectedingredientcompose.ingredients[0].pivot.quantite} readOnly />
        </div>
    )}
    
</div>
<div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
    
<div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px'}}>

    {selectedingredientcompose.ingredients && selectedingredientcompose.ingredients.length > 0 && selectedingredientcompose.ingredients[0].photo && (
        <div>
            <img
                src={selectedingredientcompose.ingredients[0].photo.replace('ingredients', '')} // Remove the 'ingredients' prefix
                alt={selectedingredientcompose.ingredients[0].name_ingredient}
                style={{ width: "50px", height: "50px"}} // Adjust size as needed
            />
        </div>
    )}
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
                    Ingrédient Composé suprimée avec succès
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
        




                    {selectedingredientcompose && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedingredientcompose.name_ingredient_compose}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default IngredientComposeListTable;