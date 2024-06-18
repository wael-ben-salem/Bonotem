import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,Alert, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addCarte, deleteCarte, getAllCarteData, getCarteDetails, updateCarte } from '../../store/carte/gitCarteSlice';
import { getAllProduit} from '../../store/produit/gitProduitSlice';

import { getAllIngCompose } from '../../store/ingredient/GitIngredientComposerSlice';




const CartesListTable = () => {
    

    const dispatch = useDispatch();
    const cartes = useSelector(state => state.gitCarte.cartes);
    const produits = useSelector(state => state.gitProduit.produits);
    const ingredientcomposes = useSelector(state => state.gitIngredientCompose.ingredientcomposes);





    const [hoverShow, setHoverShow] = useState(false); // Changer setHoverShow à useState
    const [hoverEdit, setHoverEdit] = useState(false); // Changer setHoverEdit à useState
    const [hoverRemove, setHoverRemove] = useState(false); // Changer setHoverRemove à useState
    const [hover, setHover] = useState(false);

    const [editedPhotoIngredient, setEditedPhotoIngredient] = useState(""); // Store the file itself, initialize as null

    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitCarte.Success,
      errorMessage: state.gitCarte.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
    const [selectedProduit, setSelectedProduit] = useState(null); // State to store selected 







    const [selectedIngredientCompose, setSelectedIngredientCompose] = useState(null);

    const [modal_list, setmodal_list] = useState(false);
    const [editCarte, setEditCarte] = useState(null);
    const [editedNameCarte, setEditedNameCarte] = useState('');
    const [editedPrixCarte, setEditedPrixCarte] = useState('');
    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null
    const [editedNameProduitCarte, setEditedNameProduitCarte] = useState('');
    const [editedNameCategorieCarte, setEditedNameCategorieCarte] = useState('');
    const [editedNameIngredientComposeCarte, setEditedNameIngredientComposeCarte] = useState('');

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedCarte, setSelectedCarte] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddCarte, setModalAddCarte] = useState(false);
    
    const [errors, setErrors] = useState({});

    const [newCarteData, setNewCarteData] = useState({
        name: '',
        prix: '',
        id_produit: '', // Store the file itself, initialize as null
        id_categorie: '', // Store the file itself, initialize as null
        photo: null, // Store the file itself, initialize as null
        id_ingredient_compose:'',
       
    });


    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(cartes.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateCategories = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return cartes.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };

//
const id = useSelector(state => state.login.user.id);

    useEffect(() => {
        dispatch(getAllCarteData(id));
        dispatch(getAllProduit(id));
        dispatch(getAllIngCompose(id));


    }, [dispatch,id]);

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


    

    
    const toggleAddCarteModal = () => {
        setModalAddCarte(!modalAddCarte);
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




    
    
    
    const openDeleteModal = (carte) => {
        setSelectedCarte(carte);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteCarte(selectedCarte.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }



    const openEditModal = (cartes) => {
        setEditCarte(cartes);
        setEditedPrixCarte(cartes.prix || '');
        setEditedNameIngredientComposeCarte(cartes.id_ingredient_compose || '');
        
        // Accessing properties from nested objects safely
        setEditedNameCategorieCarte(cartes.categorie?.name || '');
        setEditedNameProduitCarte(cartes.id_produit || '');
        setEditedPhoto(cartes.categorie?.photo || '');
        setEditedPhotoIngredient(cartes.ingredient_compose?.photo || '');
        
        setSelectedCarte(cartes);
        toggleListModal();
    };
    
    
       
    const validate = (data) => {
        const errors = {};
    
        // Vérifier que au moins un des champs id_produit ou id_ingredient_compose est présent
        if (!data.id_produit && !data.id_ingredient_compose) {
            errors.id_produit = "La sélection d'un produit ou d'un ingrédient composé est requise.";
            errors.id_ingredient_compose = "La sélection d'un produit ou d'un ingrédient composé est requise.";
        }
    
        // Vérifier si le prix est présent et valide
        if (!data.prix) {
            errors.prix = "Le prix est requis.";
        } else if (isNaN(data.prix) || data.prix < 0) {
            errors.prix = "Le prix doit être un nombre positif.";
        }
    
        return errors;
    };
    
    



    const handleUpdate = () => {
        const errors = validate({ id_produit: editedNameProduitCarte, id_ingredient_compose: editedNameIngredientComposeCarte, prix: editedPrixCarte });
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setErrors({});

        const updatedCarte = {
            id: editCarte.id,
            id_produit:editedNameProduitCarte,
            prix:editedPrixCarte,
            id_ingredient_compose:editedNameIngredientComposeCarte,

            
            
            
        };
        dispatch(updateCarte({ id: editCarte.id,  updatedCarte }))
        .then(() => {
            // Réinitialiser l'état
            setEditCarte({
                name: '',
               prix: '',
               id_produit: '', // Store the file itself, initialize as null
               id_categorie: '', // Store the file itself, initialize as null
               photo: null, // Store the file itself, initialize as null
               id_ingredient_compose:'',
            });

            // Fermer le modal
            toggleListModal();

            // Ouvrir le modal de confirmation
            toggleConfirmEdit(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Produit Carte:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });

        
        // Reset the state
       
    };

   

   
const openShowModal = (carte) => {
    setSelectedCarte(carte);
    dispatch(getCarteDetails(carte.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddCategorie = () => {
    const errors = validate({ id_produit: newCarteData.id_produit, id_ingredient_compose: newCarteData.id_ingredient_compose, prix: newCarteData.prix });
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    setErrors({});

    const formData = new FormData();

    formData.append('prix', newCarteData.prix);
    formData.append('id_ingredient_compose', newCarteData.id_ingredient_compose);
    formData.append('id_produit', newCarteData.id_produit);


    dispatch(addCarte({ id: id, formData }))

     // Pass the formData to your addCategorie action
    .then(() => {
        
    
        // Réinitialiser l'état
        setNewCarteData({
            name: '',
            prix: '',
            id_ingredient_compose:'',
            id_produit: '', // Store the file itself, initialize as null
            id_categorie: '', // Store the file itself, initialize as null
            photo: null, // Store the file itself, initialize as null
        });
    
            // Fermer le modal
            toggleAddCarteModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Produit Carte:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });
    
    
   
};





return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Carte" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Cartes</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddCarteModal}
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
                                                        <th className="sort" data-sort="Categorie-name">Nom Catégorie</th>
                                                        <th className="sort" data-sort="Categorie-photo">photo Catégorie</th>
                                                        <th className="sort" data-sort="Categorie-name">Nom Produit</th>
                                                        <th className="sort" data-sort="Categorie-description">Prix</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                {paginateCategories().length > 0 ? (
                                                     paginateCategories().map(carte => (
                                                            <tr key={carte.id} >
                                                                <th scope="row" >
                                                                    <div className="form-check">
                                                                        <input className="form-check-input"onClick={() => openShowModal(carte)}  type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                {/* <td onClick={() => openShowModal(carte)}>{carte.id}</td> */}
                                                                <td onClick={() => openShowModal(carte)}>{carte.categorie.name}</td>
                                                                <td onClick={() => openShowModal(carte)}>
    {carte.produit ? (
        carte.categorie.photo ? (
            <img
                src={`${carte.categorie.photo.replace('categories', '')}`} // Remove the 'categories' prefix
                alt={carte.categorie.name}
                style={{ width: "50px", height: "50px" }}
            />
        ) : (
            "No photo"
        )
    ) : (
        carte.ingredient_compose ? (
            carte.categorie.photo ? (
                <img
                    src={`${carte.categorie.photo.replace('categories', '')}`} // Remove the 'categories' prefix
                    alt={carte.categorie.name}
                    style={{ width: "50px", height: "50px" }}
                />
            ) : (
                "No photo"
            )
        ) : (
            "No photo"
        )
    )}
</td>

                                                                    <td onClick={() => openShowModal(carte)}>
                                                                    {carte.produit ? carte.produit.name_produit : carte.ingredient_compose ? carte.ingredient_compose.name_ingredient_compose : 'Nom non disponible'}
                                                                        </td>
                                                                <td onClick={() => openShowModal(carte)}>
  {carte.prix.toFixed(2)} TND
</td>

                                                                
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                    <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(carte)}
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
                                                            onClick={() => openEditModal(carte)}
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
                                                            onClick={() => openDeleteModal(carte)}
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
                                                        <tr><td colSpan="7">Pas de Carte pour le moment</td></tr>
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
            <Modal isOpen={modalAddCarte} toggle={toggleAddCarteModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddCarteModal}>Ajout</ModalHeader>
                                        <ModalBody>
                <form className="tablelist-form">
                    <div className="d-flex flex-column align-items-center">
                        {selectedProduit && selectedProduit.categorie.photo ? (
                            <div className="d-flex align-items-center">
                                <img
                                    src={selectedProduit.categorie.photo.replace('categories', '')}
                                    alt={selectedProduit.categorie.name}
                                    style={{ width: "50px", height: "50px", marginTop: "5px", marginLeft: "20px" }}
                                    className="align-self-center"
                                />
                            </div>
                        ) : selectedIngredientCompose && selectedIngredientCompose.photo ? (
                            <div className="d-flex align-items-center">
                                <img
                                    src={selectedIngredientCompose.photo.replace('ingredientscompose', '')}
                                    alt={selectedIngredientCompose.name_ingredient_compose}
                                    style={{ width: "50px", height: "50px", marginTop: "5px", marginLeft: "20px" }}
                                    className="align-self-center"
                                />
                            </div>
                        ) : null}
                    </div>

                    {!newCarteData.id_ingredient_compose && (
                        <div className="mb-3">
                            <label htmlFor="produit-field" className="form-label">Nom Produit:</label>
                            <select
                                id="produit-field"
                                className="form-control"
                                value={newCarteData.id_produit}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setNewCarteData(prevData => ({
                                        ...prevData,
                                        id_produit: value,
                                        id_ingredient_compose: '' // reset ingredient_compose if a produit is selected
                                    }));
                                    const selected = produits.find(produit => produit.id === parseInt(value));
                                    setSelectedProduit(selected);
                                    setSelectedIngredientCompose(null); // reset ingredient_compose selection
                                }}
                            >
                                <option value="">Sélectionner un Produit</option>
                                {produits.map((produit) => (
                                    <option key={produit.id} value={produit.id}>
                                        {produit.name_produit ? produit.name_produit : 'No'}
                                    </option>
                                ))}
                            </select>
                            {errors.id_produit && <div className="text-danger">{errors.id_produit}</div>}

                        </div>
                    )}

                    {!newCarteData.id_produit && (
                        <div className="mb-3">
                            <label htmlFor="ingredient-compose-field" className="form-label">Nom Ingrédient Composé:</label>
                            <select
                                id="ingredient-compose-field"
                                className="form-control"
                                value={newCarteData.id_ingredient_compose}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setNewCarteData(prevData => ({
                                        ...prevData,
                                        id_ingredient_compose: value,
                                        id_produit: '' // reset produit if an ingredient_compose is selected
                                    }));
                                    const selected = ingredientcomposes.find(ingredient => ingredient.id === parseInt(value));
                                    setSelectedIngredientCompose(selected);
                                    setSelectedProduit(null); // reset produit selection
                                }}
                            >
                                <option value="">Sélectionner un Ingrédient Composé</option>
                                {ingredientcomposes.map((ingredient) => (
                                    <option key={ingredient.id} value={ingredient.id}>
                                        {ingredient.name_ingredient_compose}
                                    </option>
                                ))}
                            </select>
                            {errors.id_ingredient_compose && <div className="text-danger">{errors.id_ingredient_compose}</div>}

                        </div>
                    )}

                    {selectedProduit && selectedProduit.categorie.name ? (
                        <div className="mb-3">
                            <label htmlFor="categorie-field" className="form-label">Nom Categorie:</label>
                            <input
                                id="categorie-field"
                                className="form-control"
                                value={selectedProduit.categorie.name}
                                disabled
                            />
                        </div>
                    ) : selectedIngredientCompose && selectedIngredientCompose.name_ingredient_compose ? (
                        <div className="mb-3">
                            <label htmlFor="ingredient-categorie-field" className="form-label">Nom Categorie:</label>
                            <input
                                id="ingredient-categorie-field"
                                className="form-control"
                                value={selectedIngredientCompose.categorie.name}
                                disabled
                            />
                        </div>
                    ) : null}

                    <div className="mb-3">
                        <label htmlFor="prix-field" className="form-label">Prix</label>
                        <input
                            type="number"
                            id="prix-field"
                            className="form-control"
                            placeholder="Proposez le prix"
                            value={newCarteData.prix}
                            onChange={(e) => setNewCarteData({ ...newCarteData, prix: e.target.value })}
                            required
                        />
                                        {errors.prix && <div className="text-danger">{errors.prix}</div>}

                    </div>
                </form>
            </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddCarteModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={handleAddCategorie}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>



                                     {/* Edit Modal */}
                                     <Modal isOpen={modal_list} toggle={toggleListModal} centered>
    <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}>Modification</ModalHeader>
    <form className="tablelist-form">
    <ModalBody>
    {/* Vérifier si selectedCarte est défini et n'est pas null */}
    {selectedCarte && (
        // Afficher le contenu du modal si selectedCarte est défini
        <div>
            {/* Affichage conditionnel en fonction de si le produit est nul ou non */}
            {selectedCarte.produit === null ? (
                <div>
                    {/* Contenu pour l'ingrédient composé */}
                    <div className="mb-3">
                        <label htmlFor="ingredientcompose-field" className="form-label">Nom Ingredient Composé:</label>
                        <div className="row">
                            <div className="col-md-9">
                                <select
                                    id="ingredientcompose-field"
                                    className="form-control"
                                    value={editedNameIngredientComposeCarte}
                                    onChange={(e) => {
                                        setEditedNameIngredientComposeCarte(e.target.value);
                                        setEditedNameProduitCarte('');
                                        const selected = ingredientcomposes.find(ingredient => ingredient.id === parseInt(e.target.value));
                                        setSelectedIngredientCompose(selected);
                                        setSelectedProduit(null);
                                        if (selected && selected.photo) {
                                            setEditedPhotoIngredient(selected.photo);
                                        }else{
                                            setEditedPhotoIngredient(null); // Set photo to null when "No photo" option is selected
                                
                                        }
                                        
                                    }}
                                >
                                    <option value="">Sélectionner un ingrédient composé</option>
                                    {ingredientcomposes.map((ingredient) => (
                                        <option key={ingredient.id} value={ingredient.id}>
                                            {ingredient.name_ingredient_compose}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_ingredient_compose && <div className="text-danger">{errors.id_ingredient_compose}</div>}

                            </div>
                        </div>
                    </div>
                    {/* Affichage du champ pour le prix */}
                    <div className="mb-3">
                        <label htmlFor="prix-field" className="form-label">Prix</label>
                        <input type="number" id="prix-field" className="form-control" placeholder="Entrez le prix" value={editedPrixCarte} onChange={(e) => setEditedPrixCarte(e.target.value)} required />
                        {errors.prix && <div className="text-danger">{errors.prix}</div>}

                    </div>
                    {/* Affichage de la photo de l'ingrédient */}
                    <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
    <div className="d-flex justify-content-between align-items-center">
        {editedPhotoIngredient ? (
            <div className="d-flex align-items-center">
                <img
                    src={editedPhotoIngredient.replace('ingredientscompose', '')}
                    alt=''
                    style={{ width: "50px", height: "50px",marginBottom: "2px", marginTop: "3px", marginLeft: "30px" }}
                    className="align-self-center"
                />
            </div>
        ) : (
            <div style={{ marginLeft: "30px", marginTop: "20px" }}>Pas de photo</div>
        )}
       


    </div>

   
</div>
                </div>
            ) : (
                <div>
                    {/* Contenu pour le produit */}
                    <div className="mb-3">
                        <label htmlFor="produit-field" className="form-label">Nom Produit:</label>
                        <div className="row">
                            <div className="col-md-9">
                            <select
                                    id="ingredientcompose-field"
                                    className="form-control"
                                    value={editedNameProduitCarte}
                                    onChange={(e) => {
                                        setEditedNameProduitCarte(e.target.value);
                                        setEditedNameIngredientComposeCarte('');
                                        const selected = produits.find(produit => produit.id === parseInt(e.target.value));
                                        setSelectedProduit(selected);
                                        setSelectedIngredientCompose(null);
                                        if (selected && selected.categorie.photo) {
                                            setEditedPhoto(selected.categorie.photo);
                                        }else{
                                            setEditedPhoto(null); // Set photo to null when "No photo" option is selected
                                
                                        }
                                        
                                    }}
                                >
                                     <option value="">Sélectionner un produit</option>
                                    {produits.map((produit) => (
                                        <option key={produit.id} value={produit.id}>
                                            {produit.name_produit}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_produit && <div className="text-danger">{errors.id_produit}</div>}

                
                            </div>
                        </div>
                    </div>
                    
                    {/* Affichage du prix */}
                    <div className="mb-3">
                        <label htmlFor="prix-field" className="form-label">Prix</label>
                        <input type="number" id="prix-field" className="form-control" placeholder="Entrez le prix" value={editedPrixCarte} onChange={(e) => setEditedPrixCarte(e.target.value)} required />
                        {errors.prix && <div className="text-danger">{errors.prix}</div>}

                    </div>
                    <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
    <div className="d-flex justify-content-between align-items-center">
        {editedPhoto ? (
            <div className="d-flex align-items-center">
                <img
                    src={editedPhoto.replace('categories', '')}
                    alt=''
                    style={{ width: "50px", height: "50px",marginBottom: "2px", marginTop: "3px", marginLeft: "30px" }}
                    className="align-self-center"
                />
            </div>
        ) : (
            <div style={{ marginLeft: "30px", marginTop: "20px" }}>Pas de photo</div>
        )}
        


    </div>

   
</div>
                </div>
            )}
        </div>
    )}
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
    <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>
        Detail
    </ModalHeader>
    <ModalBody>
        {selectedCarte && (
            <form className="tablelist-form">
                <div className="d-flex align-items-center justify-content-center">
                    {selectedCarte.produit ? (
                        <img
                            src={selectedCarte.categorie.photo.replace('categories', '')}
                            alt={selectedCarte.categorie.name}
                            style={{ width: "50px", height: "50px" }}
                            className="align-self-center"
                        />
                    ) : selectedCarte.ingredient_compose ? (
                        <img
                            src={selectedCarte.ingredient_compose.photo.replace('ingredientscompose', '')}
                            alt={selectedCarte.ingredient_compose.name_ingredient_compose}
                            style={{ width: "50px", height: "50px" }}
                            className="align-self-center"
                        />
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="nom_produit-field" className="form-label">Nom Produit</label>
                    <input
                        type="text"
                        id="nom_produit-field"
                        className="form-control"
                        value={selectedCarte.produit ? selectedCarte.produit.name_produit : selectedCarte.ingredient_compose ? selectedCarte.ingredient_compose.name_ingredient_compose : ''}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nom_categorie-field" className="form-label">Nom Catégorie</label>
                    <input
                        type="text"
                        id="nom_categorie-field"
                        className="form-control"
                        value={selectedCarte.categorie.name}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="prix-field" className="form-label">Prix</label>
                    <input
                        type="text"
                        id="prix-field"
                        className="form-control"
                        value={selectedCarte.prix}
                        readOnly
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
        

                    {selectedCarte && (
                        <p>Êtes-vous sûr de vouloir supprimer la Carte</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default CartesListTable;