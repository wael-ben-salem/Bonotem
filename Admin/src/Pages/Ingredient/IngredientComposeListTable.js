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
import { getAllData } from '../../store/categorie/gitCategorySlice';





const IngredientComposeListTable = () => {
    

    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.gitIngredient.ingredients);
    const ingredientcomposes = useSelector(state => state.gitIngredientCompose.ingredientcomposes);
    const categories = useSelector((state) => state.gitCategory.categories);

    
    



    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [ hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitIngredientCompose.Success,
      errorMessage: state.gitIngredientCompose.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  





    const [errors, setErrors] = useState({});

    const [editedIdCategorieProduit, setEditedIdCategorieProduit] = useState(null); // Store the file itself, initialize as null

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
        id_categorie:'',
        
       
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
const id = useSelector(state => state.login.user.id);

    
    useEffect(() => {
        dispatch(getAllIngCompose(id));
        dispatch(getAllDataIngredient(id));
        dispatch(getAllData(id));

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

const validate = (data) => {
    const errors = {};

    
    if (!data.name_ingredient_compose) {
        errors.name_ingredient_compose = "Le nom est requis.";
    } else if (!/^[A-Za-z\s]+$/.test(data.name_ingredient_compose)) {
        errors.name_ingredient_compose = "Le nom doit contenir uniquement des lettres et des espaces.";
    }

    if (!data.id_categorie) {
        errors.id_categorie = "La catégorie est requise.";
    }

    if (!data.photo) {
        errors.photo = "La photo est requise.";
    }

    if (!data.id_ingredient) {
        errors.id_ingredient = "La sélection des ingrédients est requise.";
    }

    if (!data.quantite) {
        errors.quantite = "La quantité des ingrédients sélectionnés est requise.";
    }

    return errors;
};



    
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


    const updateQuantiteAutomatique = (ingredientId) => {
        const selectedIngredient = editingredientcompose.ingredients.find(ingredient => ingredient.pivot.id_ingredient === parseInt(ingredientId));
        if (selectedIngredient) {
            setEditedQuantite(selectedIngredient.pivot.quantite);
        }
    };


    const openEditModal = (ingredientcomposes) => {
        setEditingredientcompose(ingredientcomposes);
        setEditedName(ingredientcomposes.name_ingredient_compose);
        setEditedIdCategorieProduit(ingredientcomposes.id_categorie);

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
        const errors = validate({ id_categorie: editedIdCategorieProduit, name_ingredient_compose: editedName, photo: editedPhoto, id_ingredient: editedNameingredientcompose, quantite: editedQuantite });
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    // Clear previous errors if any
    setErrors({});

   
        const selectedIngredientId = editedNameingredientcompose;
        const quantity = editedQuantite;
        const photoIngredient = editedPhotoIngredient;


        if (!selectedIngredientId || !quantity  || !photoIngredient) {
            return;
        }

        const insertedProduitIngredient = {
            id: editingredientcompose ? editingredientcompose.id : null,
            id_categorie: editedIdCategorieProduit,

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
        formData.append('id_categorie', editedIdCategorieProduit);

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
            id_categorie:'',
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

    const defaultQuantite = "";


   
const openShowModal = (ingredientcompose) => {
    setSelectedingredientcompose(ingredientcompose);
    dispatch(getAllIngCompose(ingredientcompose.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}


function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}


const existingIngredientCompose = ingredientcomposes.find((ingredientcompose) => ingredientcompose.name_ingredient_compose === newIngComposeData.name_ingredient_compose);



const handleAddCategorie = () => {
    const errors = validate({ 
        name_ingredient_compose: newIngComposeData.name_ingredient_compose, 
        id_categorie: newIngComposeData.id_categorie, 
        photo: newIngComposeData.photo, 
        id_ingredient: editedNameingredientcompose, 
        quantite: editedQuantite 
    });
    
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    // Clear previous errors if any
    setErrors({});

    const selectedIngredientId = editedNameingredientcompose;
    const quantity = editedQuantite;

    if (existingIngredientCompose) {
        setNewIngComposeData({ ...newIngComposeData, id_categorie: existingIngredientCompose.id_categorie });

    }

    if (!selectedIngredientId || !quantity  ) {
        return;
    }
   

    const insertedProduitIngredient = {
        id: editingredientcompose ? editingredientcompose.id : null,
        id_categorie: existingIngredientCompose ? existingIngredientCompose.id_categorie : newIngComposeData.id_categorie,

        
       
    };
     const formData = new FormData();
        Object.entries(insertedProduitIngredient).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (selectedIngredientId && quantity) {
            const ingredientData = {
                id_ingredient: selectedIngredientId,
                quantite: quantity,
            };
    
            formData.append('ingredientsComposes[0][id_ingredient]', ingredientData.id_ingredient);
            formData.append('ingredientsComposes[0][quantite]', ingredientData.quantite);
        }

    formData.append('name_ingredient_compose', newIngComposeData.name_ingredient_compose);
    formData.append('photo', newIngComposeData.photo); // Append the file to the form data
    
    dispatch(addIngCompose({ id: id, newIngComposeData: formData, insertedProduitIngredient: null, rejectWithValue: null }))

    .then(() => {
        
    
        // Réinitialiser l'état
        setNewIngComposeData({
            name_ingredient_compose: '',
            photo: null,
            id_categorie:'',
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
                                                        {/* <th className="sort" data-sort="Categorie-Id">ID</th> */}
                                                        <th className="sort" data-sort="Categorie-name">Nom</th>
                                                        <th className="sort" data-sort="Categorie-photo">photo</th>
                                                        <th className="sort" data-sort="Produit-id_categorie">Nom categorie</th>

                                                        <th className="sort" data-sort="Categorie-photo">Ingredients</th>


                                                        
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
                                                                {/* <td onClick={() => openShowModal(ingredientcompose)}>{ingredientcompose.id}</td> */}
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
                               
                               
<td onClick={() => openShowModal(ingredientcompose)}>{ingredientcompose.categorie ? ingredientcompose.categorie.name : 'No'}</td> 

<td onClick={() => openShowModal(ingredientcompose)}>
    {ingredientcompose.ingredients && ingredientcompose.ingredients.length > 0 ? (
        <div className="d-flex flex-line">
            {ingredientcompose.ingredients.slice(0, 3).map((ingredient, index) => (
                <div key={ingredient.id} className="text-center mb-2">
                    {ingredient.photo ? (
                        <div className="mb-1">

                        <img
                            src={ingredient.photo.replace('ingredients', '')}
                            alt={ingredient.name_ingredient}
                            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                        />
                        <p className="mb-0" style={{ fontSize: "10px" }}>{ingredient.pivot.quantite}</p>
                        </div>

                    ) : (
                        "Pas de photo"
                    )}
                </div>
            ))}
            <div className="ms-4">
            {ingredientcompose.ingredients.length > 3 && (
                <p className="text-center mt-3"><strong>+{ingredientcompose.ingredients.length - 3} </strong></p>
            )}
            </div>
        </div>
    ) : 'Pas d\'ingredient'}
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
                                                    <label htmlFor="name-field" className="form-label">Nom </label>
                                                    <input type="text" id="naem-field" className="form-control" placeholder="Enter Name" value={newIngComposeData.name_ingredient_compose} onChange={(e) => setNewIngComposeData({ ...newIngComposeData, name_ingredient_compose: e.target.value })} required />
                                                    {errors.name_ingredient_compose && <div className="text-danger">{errors.name_ingredient_compose}</div>}

                                                </div>
                                                {existingIngredientCompose ? (
                <div className="mb-3">
                    <label htmlFor="categorie-field" className="form-label">Catégorie:</label>
                    <input type="text" className="form-control" onChange={(e) => setNewIngComposeData({ ...newIngComposeData, id_categorie: e.target.value })} value={existingIngredientCompose.categorie.name} readOnly />
                    {errors.id_categorie && <div className="text-danger">{errors.id_categorie}</div>}

                </div>
            ) : (
                <div className="mb-3">
                    <label htmlFor="categorie-field" className="form-label">Catégorie:</label>
                    <select
                        id="categorie-field"
                        className="form-control"
                        value={newIngComposeData.id_categorie}
                        onChange={(e) => setNewIngComposeData({ ...newIngComposeData, id_categorie: e.target.value })}
                    >

                        <option value="">Sélectionner une catégorie</option>
                        {categories.map((categorie) => (
                            <option key={categorie.id} value={categorie.id}>
                                {categorie.name ? categorie.name : 'Pas de Categorie'}
                            </option>
                        ))}

                    </select>
                    {errors.id_categorie && <div className="text-danger">{errors.id_categorie}</div>}

                </div>
            )}



                                                
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
                                                                    {errors.photo && <div className="text-danger">{errors.photo}</div>}

                                              </div>
                                               {/* Ajouter Ingrédient */}
            <hr />
            <div className="mb-3">
                <div className="mb-3">
                    <label htmlFor="name_ingredient-field" className="form-label">Ingrédient:</label>
                    <select
                        id="name_ingredient-field"
                        className="form-control"
                        value={editedNameingredientcompose || ""}
                        onChange={(e) => setEditedNameingredientcompose(e.target.value)}
                    >

                        {/* Options d'ingrédients */}
                        <option value="">Sélectionner un ingrédient</option>

                        {ingredients.map((ingredient) => (
                            <option key={ingredient.id} value={ingredient.id}>
                                {ingredient.name_ingredient}
                            </option>
                        ))}
                    </select>
                    {errors.id_ingredient && <div className="text-danger">{errors.id_ingredient}</div>}

                </div>
                <div className="mb-3">
                    <label htmlFor="quantite-field" className="form-label">Quantité</label>
                    <input type="number" id="quantite-field" className="form-control" placeholder="Entrez la quantité" value={editedQuantite || ""} onChange={(e) => setEditedQuantite(e.target.value)} required />
                    {errors.quantite && <div className="text-danger">{errors.quantite}</div>}

                </div>
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
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modification </ModalHeader>
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
                            {errors.name_ingredient_compose && <div className="text-danger">{errors.name_ingredient_compose}</div>}

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
                                    {errors.photo && <div className="text-danger">{errors.photo}</div>}

    </div>
                        <div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">Catégorie:</label>
                <select
                    id="categorie-field"
                    className="form-control"
                    value={editedIdCategorieProduit}
                    onChange={(e) => setEditedIdCategorieProduit(e.target.value)}
                >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.id_categorie && <div className="text-danger">{errors.id_categorie}</div>}

            </div>

                        

                       
                       
        
{/* Ingrédients */}
                       
{editingredientcompose && (
    <div className="mb-3">
        <label htmlFor="ingredient-field" className="form-label">Ingrédient:</label>
        <select
            id="ingredient-field"
            className="form-control"
            value={editedNameingredientcompose}
            onChange={(e) => {
                setEditedNameingredientcompose(e.target.value);
                   const selected = ingredients.find(ingredient => ingredient.id === parseInt(e.target.value));
        setSelectedIngredient(selected);
        if (selected && selected.photo) {
            setEditedPhotoIngredient(selected.photo);
        }else{
            setEditedPhotoIngredient(null); // Set photo to null when "No photo" option is selected

        }
                if (e.target.value !== "") {
                    updateQuantiteAutomatique(e.target.value);
                } else {
                    // Utiliser la valeur par défaut si aucune option n'est sélectionnée
                    setEditedQuantite(defaultQuantite);
                }
            }}
        >
            <option value="">Sélectionner un ingrédient</option>
            {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name_ingredient}
                </option>
            ))}
        </select>
        {errors.id_ingredient && <div className="text-danger">{errors.id_ingredient}</div>}

    </div>
)}
 
 
            <div className="mb-3">
                            <label htmlFor="quantite-field" className="form-label">Quantite</label>
                            <input type="text" id="quantite-field" className="form-control" placeholder="Enter la marge" value={editedQuantite} onChange={(e) => setEditedQuantite(e.target.value)} required />
                            {errors.quantite && <div className="text-danger">{errors.quantite}</div>}

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
   
    <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail</ModalHeader>
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
                <div>
                <h5>Ingrédients</h5>
                <div className="d-flex flex-wrap gap-3">
                    {selectedingredientcompose.ingredients && selectedingredientcompose.ingredients.length > 0 ? (
                        chunkArray(selectedingredientcompose.ingredients, 7).map((chunk, index) => (
                            <div key={index} className="d-flex flex-wrap w-100">
                                {chunk.map(ingredient => (
                                    <div key={ingredient.id} className="text-center mb-2">
                                        {ingredient.photo && (
                                            <div className="mb-1">
                                                <img
                                                    src={ingredient.photo.replace('ingredients', '')}
                                                    alt={ingredient.name_ingredient}
                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                />
                                                <p className="mb-0" style={{ fontSize: "10px" }}>{ingredient.pivot.quantite}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: "10px" }}>Aucun ingrédient trouvé</p>
                    )}
                </div>
            </div>
            <hr />
                
                
                
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