import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,Alert, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import moment from 'moment';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addCategorie, deleteCategorie, getAllData, getCategorieeDetails, updateCategorie } from '../../store/categorie/gitCategorySlice';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addCarte, deleteCarte, getAllCarteData, updateCarte } from '../../store/carte/gitCarteSlice';
import { getAllProduit} from '../../store/produit/gitProduitSlice';
import { addVente, deleteVente, getAllVenteData, getVenteDetails, updateVente } from '../../store/vente/gitVenteSlice';
import { getAllIngCompose } from '../../store/ingredient/GitIngredientComposerSlice';





const VentesListTable = () => {
    

    const dispatch = useDispatch();
    const ventes = useSelector(state => state.gitVente.ventes);
    const cartes = useSelector(state => state.gitCarte.cartes);
    const produits = useSelector(state => state.gitProduit.produits);
    const ingredientcomposes = useSelector(state => state.gitIngredientCompose.ingredientcomposes);




    const [hoverShow, setHoverShow] = useState(false); // Changer setHoverShow à useState
    const [hoverEdit, setHoverEdit] = useState(false); // Changer setHoverEdit à useState
    const [hoverRemove, setHoverRemove] = useState(false); // Changer setHoverRemove à useState
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitVente.Success,
      errorMessage: state.gitVente.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
    const [selectedProduit, setSelectedProduit] = useState(null); // State to store selected 
    const [selectedCarte, setSelectedCarte] = useState(null); // State to store selected 







    const [selectedIngredientCompose, setSelectedIngredientCompose] = useState(null);
    const [modal_list, setmodal_list] = useState(false);
    const [editVente, setEditVente] = useState(null);
    const [editedPrixVente, setEditedPrixVente] = useState('');
    const [editedQuantiteVente, setEditedQuantiteVente] = useState('');
    const [editedQuantiteApres, setEditedQuantiteApres] = useState(ventes.quantite_apres);
    const [errors, setErrors] = useState({});

    const [editedNameCarteVente, setEditedNameCarteVente] = useState('');

    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null
    const [editedNameProduitVente, setEditedNameProduitVente] = useState('');
    const [editedNameCategorieVente, setEditedNameCategorieVente] = useState('');

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedVente, setSelectedVente] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddVente, setModalAddVente] = useState(false);
    
    
    const [newVenteData, setNewVenteData] = useState({
        name: '',
        prixTTC: '',
        quantite:'',
        id_ingredient_compose:'',
        id_carte: '', // Store the file itself, initialize as null
        id_categorie: '', // Store the file itself, initialize as null
        photo: null, // Store the file itself, initialize as null

       
    });


    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(ventes.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateCategories = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return ventes.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };

//
const id = useSelector(state => state.login.user.id);

    useEffect(() => {
        dispatch(getAllCarteData(id));
        dispatch(getAllVenteData(id));
        dispatch(getAllIngCompose(id));

        dispatch(getAllProduit(id));

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

const validate = (data) => {
    const errors = {};

   
    if (!data.id_carte) {
        errors.id_carte = "La sélection des Cartes  est requise.";
    }
    if (data.quantite && (isNaN(data.quantite) || data.quantite < 0)) {
        errors.quantite = "La quantité doit être un nombre entier positif.";
    }
   

   


    return errors;
};



    

    
    const toggleAddVenteModal = () => {
        setModalAddVente(!modalAddVente);
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




    
    
    
    const openDeleteModal = (vente) => {
        setSelectedVente(vente);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteVente(selectedVente.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }


    const openEditModal = (ventes) => {
        setEditVente(ventes);
        setEditedNameCarteVente(ventes.id_carte)

        setEditedPrixVente(ventes.prixTTC);
        setEditedQuantiteVente(ventes.quantite);
    
        if (ventes.produit === null) {
            // Si le produit est nul, c'est un ingrédient composé
            setEditedNameCategorieVente(ventes.categorie.name);
            if (ventes.ingredient_composee) {
                setEditedNameProduitVente(ventes.ingredient_composee.name_ingredient_compose);
                setEditedPhoto(ventes.ingredient_composee.photo);
            } else {
                // Gérer le cas où ingredient_composee est null
                setEditedNameProduitVente("");
                setEditedPhoto("");
            }
        } else {
            // Sinon, c'est un produit
            setEditedNameCategorieVente(ventes.categorie.name);
            if (ventes.produit) {
                setEditedNameProduitVente(ventes.produit.name_produit);
                setEditedPhoto(ventes.categorie.photo);
            } else {
                // Gérer le cas où produit est null
                setEditedNameProduitVente("");
                setEditedPhoto("");
            }
        }
        
        setSelectedVente(ventes);
        toggleListModal();
    };
    

    const handleUpdate = () => {
        

        setErrors({});
        const updatedVente = {
            id: editVente.id,
            id_carte:editedNameCarteVente,
            id_produit:editedNameProduitVente,
            quantite:editedQuantiteVente,
            quantite_apres: editedQuantiteApres // Ajoutez la quantité après ici

            
        };
        dispatch(updateVente({ id: editVente.id,  updatedVente }))
        .then(() => {
            // Réinitialiser l'état
           

        
        // Reset the state
        setEditVente({
            name: '',
            
            quantite: '',
    
            id_carte: '', // Store the file itself, initialize as null
            });

            // Fermer le modal
            toggleListModal();

            // Ouvrir le modal de confirmation
            toggleConfirmEdit(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Vente:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });
        
    };

   

   
const openShowModal = (vente) => {
    setSelectedVente(vente);
    dispatch(getVenteDetails(vente.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddCategorie = () => {

    const errors = validate({ id_carte: newVenteData.id_carte, quantite: newVenteData.quantite  });
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    setErrors({});
    const formData = new FormData();

    formData.append('quantite', newVenteData.quantite);
    formData.append('id_carte', newVenteData.id_carte);
    dispatch(addVente({ id: id, formData}))
    .then(() => {
        
    
       

    
    // Reset the state
    setNewVenteData({
        quantite: '',
        id_carte: '',
        id_produit: '',
        id_ingredient_compose: '',
    });

    setSelectedProduit(null);
    setSelectedIngredientCompose(null);

    
            // Fermer le modal
            toggleAddVenteModal();
    
            // Ouvrir le modal de confirmation
            toggleConfirmAdd(true);
        })
        .catch(error => {
            // Gérer l'erreur
            console.error("Error updating Vente:", error);
        })
        .finally(() => {
            // Désactiver le chargement après l'achèvement de l'action
        });
    
     
   
};





return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Vente" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Ventes</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddVenteModal}
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
                                                        <th className="sort" data-sort="Categorie-name">Nom Categorie</th>
                                                        <th className="sort" data-sort="Categorie-photo">photo</th>
                                                        <th className="sort" data-sort="Categorie-name">Nom Produit</th>
                                                        <th className="sort" data-sort="Categorie-description">Quantite</th>
                                                        <th className="sort" data-sort="Categorie-description">PrixTTC</th>
                                                        <th className="sort" data-sort="Categorie-description">PrixTVA</th>
                                                        <th className="sort" data-sort="Categorie-description">Marge</th>
                                                        <th className="sort" data-sort="Categorie-description">Date de vente</th>


                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                {paginateCategories().length > 0 ? (
                                                     paginateCategories().map(vente => (
                                                            <tr key={vente.id} >
                                                                <th scope="row" >
                                                                    <div className="form-check">
                                                                        <input className="form-check-input"onClick={() => openShowModal(vente)}  type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                {/* <td onClick={() => openShowModal(vente)}>{vente.id}</td> */}
                                                                <td onClick={() => openShowModal(vente)}>{vente.categorie.name}</td>
                                                                <td onClick={() => openShowModal(vente)}>
    {vente.produit ? (
        vente.categorie.photo ? (
            <img
                src={`${vente.categorie.photo.replace('categories', '')}`} // Remove the 'categories' prefix
                alt={vente.categorie.name}
                style={{ width: "50px", height: "50px" }}
            />
        ) : (
            "No photo"
        )
    ) : (
        vente.ingredient_composee ? (
            vente.ingredient_composee.photo ? (
                <img
                    src={`${vente.ingredient_composee.photo.replace('ingredientscompose', '')}`} // Remove the 'ingredientscompose' prefix
                    alt={vente.ingredient_composee.name_ingredient_compose}
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

                                                                    <td onClick={() => openShowModal(vente)}>
                                                                    {vente.produit ? vente.produit.name_produit : vente.ingredient_composee ? vente.ingredient_composee.name_ingredient_compose : 'Nom non disponible'}
                                                                        </td>
                                                                <td onClick={() => openShowModal(vente)}>{vente.quantite }</td>
                                                                <td onClick={() => openShowModal(vente)}>
  {vente.prixTTc.toFixed(2)} TND
</td>

<td onClick={() => openShowModal(vente)}>
  {vente.prixTVA.toFixed(2)} TND
</td>
<td onClick={() => openShowModal(vente)}>
  {vente.marge.toFixed(2)} TND
</td>
                                                             
                                                                <td onClick={() => openShowModal(vente)}>
  {moment(vente.created_at).format('YYYY-MM-DD')}
</td>
                                                                

                                                                
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                    <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(vente)}
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
                                                            onClick={() => openEditModal(vente)}
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
                                                            onClick={() => openDeleteModal(vente)}
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
                                                        <tr><td colSpan="7">Pas de Ventes pour le moment</td></tr>
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
<Modal isOpen={modalAddVente} toggle={toggleAddVenteModal} centered>
    <ModalHeader className="bg-light p-3" toggle={toggleAddVenteModal}>Ajout</ModalHeader>
    <ModalBody>
        <form className="tablelist-form">
            <div className="d-flex flex-column align-items-center">
                {/* Vérification de nullité avant d'accéder à selectedProduit.categorie */}
                {selectedProduit && selectedProduit.categorie && selectedProduit.categorie.photo ? (
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

            {/* Vérification de nullité avant d'accéder à selectedProduit et selectedIngredientCompose */}
            <div className="mb-3">
                <label htmlFor="produit-field" className="form-label">Nom Produit:</label>
                <select
                    id="produit-field"
                    className="form-control"
                    value={newVenteData.id_carte}
                    onChange={(e) => {
                        const { value } = e.target;
                        const selected = cartes.find(carte => carte.id === parseInt(value));
                        setNewVenteData(prevData => ({
                            ...prevData,
                            id_carte: value,
                            id_produit: selected ? selected.id_produit : '',
                            id_ingredient_compose: selected ? selected.id_ingredient_compose : ''
                        }));
                        setSelectedProduit(selected ? selected : null);
                        setSelectedIngredientCompose(selected ? selected.ingredient_compose : null);
                    }}
                >
                    <option value="">Sélectionner une Carte</option>
                    {cartes.map((carte) => (
                        <option key={carte.id} value={carte.id}>
                            {carte.produit ? carte.produit.name_produit : (carte.ingredient_compose ? carte.ingredient_compose.name_ingredient_compose : 'No')}
                        </option>
                    ))}
                </select>
                {errors.id_carte && <div className="text-danger">{errors.id_carte}</div>}

            </div>

            <div className="mb-3">
                <label htmlFor="name-field" className="form-label">Quantite</label>
                <input type="number" id="naem-field" className="form-control" placeholder="Ajouter quantité " value={newVenteData.quantite} onChange={(e) => setNewVenteData({ ...newVenteData, quantite: e.target.value })} required />
                {errors.quantite && <div className="text-danger">{errors.quantite}</div>}

            </div>
        </form>
    </ModalBody>
    <ModalFooter>
        <div className="hstack gap-2 justify-content-end">
            <Button type="button" color="light" onClick={toggleAddVenteModal}>Fermer</Button>
            <button type="button" className="btn btn-primary" onClick={handleAddCategorie}>Ajouter</button>
        </div>
    </ModalFooter>
</Modal>

<Modal isOpen={modal_list} toggle={toggleListModal} centered>
    {selectedVente && (
        <>
            <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}>Modification</ModalHeader>
            <form className="tablelist-form">
                <ModalBody>
                    <div className="mb-3">
                        {selectedVente.produit === null ? (
                            // Si le produit est nul, afficher les détails de l'ingrédient composé
                            <>
                                {selectedVente.ingredient_composee && selectedVente.ingredient_composee.photo && (
                                    <div className="d-flex justify-content-center">
                                        <img
                                            src={selectedVente.ingredient_composee.photo.replace('ingredientscompose', '')}
                                            alt={selectedVente.ingredient_composee.name_ingredient_compose}
                                            style={{ width: "50px", height: "50px", marginTop: "5px", marginLeft: "20px" }}
                                            className="align-self-center"
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="ingredient-field" className="form-label">Ingrédient Composé:</label>
                                    <input
                                        id="ingredient-field"
                                        className="form-control"
                                        value={editedNameProduitVente}
                                        disabled
                                    />
                                </div>
                            </>
                        ) : (
                            // Si le produit n'est pas nul, afficher les détails du produit
                            <>
                                {selectedVente.categorie && selectedVente.categorie.photo && (
                                    <div className="d-flex justify-content-center">
                                        <img
                                            src={selectedVente.categorie.photo.replace('categories', '')}
                                            alt={selectedVente.categorie.name}
                                            style={{ width: "50px", height: "50px", marginTop: "5px", marginLeft: "20px" }}
                                            className="align-self-center"
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="produit-field" className="form-label">Produit:</label>
                                    <input
                                        id="produit-field"
                                        className="form-control"
                                        value={editedNameProduitVente}
                                        disabled
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categorie-field" className="form-label">Nom Catégorie:</label>
                        <input
                            id="categorie-field"
                            className="form-control"
                            value={selectedVente.categorie ? selectedVente.categorie.name : ''}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description-field" className="form-label">Quantité Actuelle</label>
                        <input type="number" id="description-field" className="form-control" placeholder="Entrez la quantité actuelle" value={editedQuantiteVente} onChange={(e) => setEditedQuantiteVente(e.target.value)} disabled />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantite_apres-field" className="form-label">Nouvelle Quantité</label>
                        <input type="number" id="quantite_apres-field" className="form-control" placeholder="Entrez la nouvelle quantité" value={editedQuantiteApres} onChange={(e) => setEditedQuantiteApres(e.target.value)} required />

                    </div>

                    {selectedVente.prixTTc ? (
                        <div className="mb-3">
                            <label htmlFor="prixTTC-field" className="form-label">Prix TTC</label>
                            <input
                                id="prixTTC-field"
                                className="form-control"
                                type="text"
                                value={selectedVente.prixTTc}
                                disabled // Make the input readOnly if you don't want users to edit it
                            />
                        </div>
                    ) : null}
                </ModalBody>
                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-light" onClick={toggleListModal}>Fermer</button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Mettre à jour</button>
                    </div>
                </ModalFooter>
            </form>
        </>
    )}
</Modal>

<Modal isOpen={modal_show} toggle={toggleShowModal} centered>
    <ModalHeader className="bg-light p-3" toggle={toggleShowModal}>Détail </ModalHeader>
    <ModalBody>
        {selectedVente && (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="d-flex align-items-center justify-content-center">
                            {selectedVente.produit ? (
                                <img
                                    src={selectedVente.categorie.photo.replace('categories', '')}
                                    alt={selectedVente.categorie.name}
                                    style={{ width: "100px", height: "100px" }}
                                    className="align-self-center"
                                />
                            ) : (
                                <img
                                    src={selectedVente.ingredient_composee.photo.replace('ingredientscompose', '')}
                                    alt={selectedVente.ingredient_composee.name_ingredient_compose}
                                    style={{ width: "100px", height: "100px" }}
                                    className="align-self-center"
                                />
                            )}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="nom_produit-field" className="form-label">Nom {selectedVente.produit ? "Produit" : "Ingrédient Composé"}</label>
                            <input type="text" className="form-control" value={selectedVente.produit ? selectedVente.produit.name_produit : selectedVente.ingredient_composee.name_ingredient_compose} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nom_categorie-field" className="form-label">Nom Catégorie</label>
                            <input type="text" className="form-control" value={selectedVente.categorie.name} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantite-field" className="form-label">Quantité</label>
                            <input type="text" className="form-control" value={selectedVente.quantite} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prix_ttc-field" className="form-label">Prix TTC</label>
                            <input type="text" className="form-control" value={selectedVente.prixTTc} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prix_ttc-field" className="form-label">Prix TVA</label>
                            <input type="text" className="form-control" value={selectedVente.prixTVA} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prix_ttc-field" className="form-label">Marge</label>
                            <input type="text" className="form-control" value={selectedVente.marge} readOnly />
                        </div>
                    </div>
                </div>
            </div>
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
                        <p>Êtes-vous sûr de vouloir supprimer cette Vente</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default VentesListTable;