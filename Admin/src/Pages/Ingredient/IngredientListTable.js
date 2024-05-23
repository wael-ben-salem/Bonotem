import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {
  Button,
  Card,
  CardBody,
  Alert,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
} from "reactstrap";

import {
    getAllDataIngredient,
    updateingredient,
  deleteIngredient,
  addIngredient,
} from "../../store/ingredient/gitIngredientSlice";

const IngredientTables = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.gitIngredient.ingredients);
  const [modal_list, setmodal_list] = useState(false);
  const [editIngredient, setEditIngredient] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null

  const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
  const [modal_confirm_add, setModalConfirmAdd] = useState(false);
  const { Success, errorMessage } = useSelector(state => ({
    Success: state.gitIngredient.Success,
    errorMessage: state.gitIngredient.errorMessage,
    
  }));
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state


  const [modal_show, setModalShow] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [modal_delete, setModalDelete] = useState(false);
  const [modalAddIngredient, setModalAddIngredient] = useState(false);
  const [newIngredientData, setNewIngredientData] = useState({
    name_ingredient: "",
    unit_measure: "",
    id_fournisseur: "",
    photo: null, // Store the file itself, initialize as null

  });
  const [errors, setErrors] = useState({});

  const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(ingredients.length / itemsPerPage);

  // Fonction pour diviser les éléments en pages
  const paginateIngredient = () => {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return ingredients.slice(startIndex, endIndex);
  };

  // Fonction pour changer de page
  const changePage = (page) => {
      setCurrentPage(page);
  };
  const id = useSelector(state => state.login.user.id);


  useEffect(() => {
    dispatch(getAllDataIngredient(id));
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


  const toggleAddIngredientModal = () => {
    setModalAddIngredient(!modalAddIngredient);
  };
  const toggleListModal = () => {
    setmodal_list(!modal_list);
  };

  const toggleDeleteModal = () => {
    setModalDelete(!modal_delete);
  };

  const openShowModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    toggleModal(modal_show, setModalShow);
  };

  const toggleConfirmAdd = (isOpen) => {
    setModalConfirmAdd(isOpen);
}


const toggleConfirmEdit = (isOpen) => {
    setModalConfirmEdit(isOpen);
}



  /*const toggleShowModal = () => {
        setModalShow(!modal_show);
    }*/

  const openDeleteModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    toggleDeleteModal();
  };

  const handleRemove = () => {
    dispatch(deleteIngredient(selectedIngredient.id));
    setTimeout(() => {
        toggleDeleteModal();

        window.location.reload();

    },  2000); 
  };

  const openEditModal = (ingredient) => {
    setEditIngredient(ingredient);
    setEditedName(ingredient.name_ingredient);
    setEditedPhoto(ingredient.photo); 
    setSelectedIngredient(ingredient);

    toggleListModal();
  };
  const validate = (data) => {
    const errors = {};

    if (!data.name_ingredient) {
      errors.name_ingredient = "Le nom de l'ingrédient est requis.";
  } else if (!/^[A-Za-z\s]+$/.test(data.name_ingredient)) {
      errors.name_ingredient = "Le nom de l'ingrédient doit contenir uniquement des lettres et des espaces.";
  }
    if (!data.photo) {
        errors.photo = "La photo de l'ingrédient est requise.";
    }

    return errors;
};

  const handleUpdate = () => {
    const errors = validate({ name_ingredient: editedName, photo: editedPhoto });
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    // Clear previous errors if any
    setErrors({});

   
    const formData = new FormData();
    formData.append('id', editIngredient.id);
    formData.append('name_ingredient', editedName);
    formData.append('photo', editedPhoto); // Append the file to the form data

    
    dispatch(updateingredient({
        id: editIngredient.id, 
        ingredientData: formData,
    }))

    .then(() => {
      // Réinitialiser l'état
      
    setEditIngredient({
      name_ingredient: '',
      photo: null,
  });

      // Fermer le modal
      toggleListModal();

      // Ouvrir le modal de confirmation
      toggleConfirmEdit(true);
  })
  .catch(error => {
      // Gérer l'erreur
      console.error("Error updating Ingrédient :", error);
  })
  .finally(() => {
      // Désactiver le chargement après l'achèvement de l'action
  });
   
};

  const toggleModal = (modal, setModal) => setModal(!modal);

  const handleAddIngredient = () => {
    const errors = validate({ name_ingredient: newIngredientData.name_ingredient, photo: newIngredientData.photo });
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    // Clear previous errors if any
    setErrors({});



    const formData = new FormData();

    formData.append('name_ingredient', newIngredientData.name_ingredient);
    formData.append('photo', newIngredientData.photo); // Append the file to the form data

    dispatch(addIngredient({ id: id, newIngredientData: formData }))

    .then(() => {
        
    
      // Réinitialiser l'état
       
    setNewIngredientData({
      name_ingredient: "",
      photo: '',

    });
  
          // Fermer le modal
          toggleAddIngredientModal();
  
          // Ouvrir le modal de confirmation
          toggleConfirmAdd(true);
      })
      .catch(error => {
          // Gérer l'erreur
          console.error("Error updating Ingrédient :", error);
      })
      .finally(() => {
          // Désactiver le chargement après l'achèvement de l'action
      });
      
    
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="Ingredients" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Gestion des Ingredients</h4>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-1">
                        <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddIngredientModal}
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
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Chercher..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="ingredientTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            {/* <th className="sort" data-sort="User-Id">
                              Id
                            </th> */}
                            <th className="sort" data-sort="User-name">
                              Nom 
                            </th>
                            <th className="sort" data-sort="Categorie-photo">photo</th>

                            <th class="d-flex align-items-end flex-column" data-sort="action" >
                            <div class="d-flex flex-row-reverse">
  <div class="p-2"></div>
  <div class="p-0.5"></div>


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
                          {paginateIngredient().length > 0 ? (
        paginateIngredient().map((ingredient, index) => (
                              <tr key={ingredient.id}>
                                <th
                                  scope="row"
                                  onClick={() => openShowModal(ingredient)}
                                >
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                {/* <td onClick={() => openShowModal(ingredient)}>
                                  {ingredient.id}
                                </td> */}
                                <td onClick={() => openShowModal(ingredient)}>
                                  {ingredient.name_ingredient}
                                </td>
                                <td onClick={() => openShowModal(ingredient)}>
                                  {ingredient.photo ? (
                                    <img
                                    src={`${ingredient.photo.replace('ingredients', '')}`} // Remove the 'categories' prefix
                                    alt={ingredient.name}
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
                            onClick={() => openShowModal(ingredient)}
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
                            onClick={() => openEditModal(ingredient)}
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
                            onClick={() => openDeleteModal(ingredient)}
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
                              <td colSpan="7">Ingredient non disponibles</td>
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
      {/* Ajout Modal */}
      <Modal isOpen={modalAddIngredient} toggle={toggleAddIngredientModal} centered>
    <ModalHeader className="bg-light p-3" toggle={toggleAddIngredientModal}>
        Ajout
    </ModalHeader>
    <ModalBody>
        <form className="tablelist-form">
            <div className="mb-3">
                <label htmlFor="name-field" className="form-label">
                    Nom 
                </label>
                <input
                    type="text"
                    id="name-field"
                    className="form-control"
                    placeholder="Enter Name"
                    value={newIngredientData.name_ingredient}
                    onChange={(e) => setNewIngredientData({ ...newIngredientData, name_ingredient: e.target.value })}
                    required
                />
                {errors.name_ingredient && <div className="text-danger">{errors.name_ingredient}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="photo-field" className="form-label">Photo</label>
                <input
                    type="file"
                    id="photo-field"
                    className="form-control"
                    onChange={(e) => setNewIngredientData({ ...newIngredientData, photo: e.target.files[0] })}
                    name="photo"
                    required
                />
                {errors.photo && <div className="text-danger">{errors.photo}</div>}
            </div>
        </form>
    </ModalBody>
    <ModalFooter>
        <Button type="button" color="secondary" onClick={toggleAddIngredientModal}>Annuler</Button>
        <button type="button" className="btn btn-primary" onClick={handleAddIngredient}>Ajouter</button>
    </ModalFooter>
</Modal>

      {/* Modification Modal */}
      <Modal isOpen={modal_list} toggle={toggleListModal} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={toggleListModal}
        >
          {" "}
          Modification{" "}
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="username-field" className="form-label">
                Nom {" "}
              </label>
              <input
                type="text"
                id="username-field"
                className="form-control"
                placeholder="Enter Name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
              />
            {errors.name_ingredient && <div className="text-danger">{errors.name_ingredient}</div>}

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
    {errors.photo && <div className="text-danger">{errors.photo}</div>}

    </div>
    <div className="col-md-2    ">
        {selectedIngredient && selectedIngredient.photo && (
                <img
                    src={`${selectedIngredient.photo.replace('ingredients', '')}`}
                    alt={selectedIngredient.name}
                    style={{ width: "50px", height: "50px" }}
                />
        )}
    </div>
</div>

          
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleListModal}>
              Annuler
            </Button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Mettre à jour</button>

          </ModalFooter>
        </form>
      </Modal>







 {/* Show Modal */}
 <Modal  isOpen={modal_show}
        toggle={() => toggleModal(modal_show, setModalShow)}
        centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel"  toggle={() => toggleModal(modal_show, setModalShow)}>Detail</ModalHeader>
                <ModalBody>
                    {selectedIngredient && (
                        <form className="tablelist-form">
                            <div className="mb-3">
                                <label htmlFor="name_ingredient-field" className="form-label">Nom </label>
                                <input type="text" id="name_ingredient-field" className="form-control"value={selectedIngredient.name_ingredient} readOnly />
                            </div>
                            {selectedIngredient && selectedIngredient.photo && (
    <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
        {selectedIngredient.photo && (
            <img
                src={`${selectedIngredient.photo.replace('ingredients', '')}`} // Remove the 'ingredients' prefix
                alt={selectedIngredient.name}
                style={{ width: "50px", height: "50px" }}
                className="mb-3"
            />
        )}
        <p className="mb-0">{selectedIngredient.name}</p>
    </div>
)}

                            

                            
                           
                        </form>
                    )}
                </ModalBody>
                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-light" onClick={() => toggleModal(modal_show, setModalShow)}>Fermer</button>
                        
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
                    Ingrédient  ajoutée avec succès
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
                    Ingrédient  modifiée avec succès
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
                    Ingrédient  suprimée avec succès
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
        

          {selectedIngredient && (
            <p>
              Voulez vous supprimer ingredient{" "}
              {selectedIngredient.name}?
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
};

export default IngredientTables;