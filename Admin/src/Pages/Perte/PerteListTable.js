import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,Alert, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addPerte, deletePerte, getAllPerteData, getPerteDetails, updatePerte } from '../../store/perte/gitPerteSlice';

import {  getAllMarchandiseData } from '../../store/marchandise/gitMarchandiseIngredientSlice';

import { getAllPackaging} from '../../store/Packagings/gitPackagingSlice';
import { getAllDataIngredient } from '../../store/ingredient/gitIngredientSlice';


const PerteListTable = () => {
    

    const dispatch = useDispatch();
    const pertes = useSelector(state => state.gitPerte.pertes);
    const marchandisesingredient = useSelector(state => state.gitMarchandiseIngredient.marchandisesingredient);
    const ingredients = useSelector(state => state.gitIngredient.ingredients);
    const packagings = useSelector(state => state.gitPackaging.packagings);




    const [hoverShow, setHoverShow] = useState(false); // Changer setHoverShow à useState
    const [hoverEdit, setHoverEdit] = useState(false); // Changer setHoverEdit à useState
    const [hoverRemove, setHoverRemove] = useState(false); // Changer setHoverRemove à useState
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitPerte.Success,
      errorMessage: state.gitPerte.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state








    const [modal_list, setmodal_list] = useState(false);
    const [editPerte, setEditPerte] = useState(null);



    const [editedNameIngredient, setEditedNameIngredient] = useState('');
    const [editedNamePackaging, setEditedNamePackaging] = useState('');

    const [editedQuantite, setEditedQuantite] = useState('');
    const [editedQuantiteApres, setEditedQuantiteApres] = useState('');




    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null
    const [editedMontant, setEditedMontant] = useState('');




    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedPerte, setSelectedPerte] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddPerte, setModalAddPerte] = useState(false);
    
    
    const [newPerteData, setNewPerteData] = useState({
        quantiteIngredient: null,
        quantitePackaging: null,
        id_packaging:'',
        id_ingredient:'',
        montant: null,
        id_marchandise: '', 
        photo: null, 

       
    });


    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(pertes.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginatePertes = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return pertes.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };

//
    
    useEffect(() => {
        dispatch(getAllPerteData());
        dispatch(getAllMarchandiseData());
        dispatch(getAllPackaging());
        dispatch(getAllDataIngredient());

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


    

    
    const toggleAddPerteModal = () => {
        setModalAddPerte(!modalAddPerte);
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




    
    
    
    
    const openDeleteModal = (perte) => {
        setSelectedPerte(perte);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deletePerte(selectedPerte.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  2000); 
    }





    const openEditModal = (perte) => {
        // Définir les données de perte à éditer dans l'état
        setEditPerte(perte);
    
        // Vérifier si l'ingrédient est présent
        if (perte.ingredient !== null) {
            // Si oui, mettre à jour l'état avec les détails de l'ingrédient
            setEditedNameIngredient(perte.ingredient.name_ingredient);
            setEditedPhoto(perte.ingredient.photo)
        } else {
            // Sinon, réinitialiser l'état de l'ingrédient
            setEditedNameIngredient(null);
            setEditedPhoto(null);

        }
    
        // Vérifier si l'emballage est présent
        if (perte.packaging !== null) {
            // Si oui, mettre à jour l'état avec les détails de l'emballage
            setEditedNamePackaging(perte.packaging.name_packaging);
            setEditedPhoto(perte.packaging.photo)

        } else {
            // Sinon, réinitialiser l'état de l'emballage
            setEditedNamePackaging(null);
            setEditedPhoto(null);

        }
    
        // Définir les valeurs de montant et de quantité à éditer dans l'état
        setEditedMontant(perte.montant);
        setEditedQuantite(perte.quantite);

        toggleListModal();
    }

    
    
    const handleUpdate = () => {
        // Activer le chargement
    
        const updatedPerte = {
            id: editPerte.id,
            quantite: editedQuantite,
            quantite_apres: editedQuantiteApres
        };
    
        dispatch(updatePerte({ id: editPerte.id, updatedPerte }))
            .then(() => {
                // Réinitialiser l'état
                setEditPerte({
                    name: '',
                    photo: null,
                    quantite: '',
                    quantite_apres: '',
                });
    
                // Fermer le modal
                toggleListModal();
    
                // Ouvrir le modal de confirmation
                toggleConfirmEdit(true);
            })
            .catch(error => {
                // Gérer l'erreur
                console.error("Error updating perte:", error);
            })
            .finally(() => {
                // Désactiver le chargement après l'achèvement de l'action
            });
    };
    

   

   
const openShowModal = (perte) => {
    setSelectedPerte(perte);
    dispatch(getPerteDetails(perte.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}





const handleAdd = () => {
    const formData = new FormData();

    // Cas où les deux id et quantités sont présents
    if (newPerteData.id_ingredient !== '' && newPerteData.id_packaging !== '') {
        formData.append('quantitePackaging', newPerteData.quantitePackaging);
        formData.append('quantiteIngredient', newPerteData.quantiteIngredient);
        formData.append('id_ingredient', newPerteData.id_ingredient);
        formData.append('id_packaging', newPerteData.id_packaging);
    }
    // Cas où seul l'id d'ingrédient est présent
    else if (newPerteData.id_ingredient !== '') {
        formData.append('quantiteIngredient', newPerteData.quantiteIngredient);
        formData.append('id_ingredient', newPerteData.id_ingredient);
    }
    // Cas où seul l'id de l'emballage est présent
    else if (newPerteData.id_packaging !== '') {
        formData.append('quantitePackaging', newPerteData.quantitePackaging);
        formData.append('id_packaging', newPerteData.id_packaging);
    }

    dispatch(addPerte(formData))
    .then(() => {
        
    
    // Réinitialiser l'état
    setNewPerteData({
        quantiteIngredient: null,
        quantitePackaging: null,
        id_packaging: '',
        id_ingredient: '',
        montant: null,
        id_marchandise: '', 
        photo: null, 
    });

        // Fermer le modal
        toggleAddPerteModal();

        // Ouvrir le modal de confirmation
        toggleConfirmAdd(true);
    })
    .catch(error => {
        // Gérer l'erreur
        console.error("Error updating perte:", error);
    })
    .finally(() => {
        // Désactiver le chargement après l'achèvement de l'action
    });
    
   
};






return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Perte" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Pertes</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddPerteModal}
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
            <th className="sort" data-sort="Categorie-name">Nom</th>
            <th className="sort" data-sort="Categorie-photo">Photo</th>
            <th className="sort" data-sort="Categorie-name">Quantité</th>
            <th className="sort" data-sort="Categorie-description">Montant</th>
            <th className="sort" data-sort="action">Action</th>
        </tr>
    </thead>
    <tbody className="list form-check-all">
        {paginatePertes().length > 0 ? (
            paginatePertes().map(perte => (
                <tr key={perte.id}>
                    <th scope="row">
                        <div className="form-check">
                            <input className="form-check-input" onClick={() => openShowModal(perte)} type="checkbox" name="chk_child" value="option1" />
                        </div>
                    </th>
                    <td onClick={() => openShowModal(perte)}>{perte.id}</td>
                    <td onClick={() => openShowModal(perte)}>
                        {/* Condition pour afficher le nom de l'ingrédient ou de l'emballage */}
                        {perte.id_ingredient !== null ? perte.ingredient.name_ingredient : perte.packaging.name_packaging}
                    </td>
                    <td onClick={() => openShowModal(perte)}>
                        {/* Condition pour afficher la photo de l'ingrédient ou de l'emballage */}
                        {perte.id_ingredient !== null ? (
                            <img src={perte.ingredient.photo.replace('ingredients', '')} alt="Ingredient" style={{ width: "50px", height: "50px" }} />
                        ) : (
                            <img src={perte.packaging.photo.replace('packagings', '')} alt="Packaging" style={{ width: "50px", height: "50px" }} />
                        )}
                    </td>
                    <td onClick={() => openShowModal(perte)}>{perte.quantite}</td>
                    <td onClick={() => openShowModal(perte)}>{perte.montant}</td>
                    {/* D'autres colonnes */}
                    <td>
                    <div className="d-flex gap-2">
                        <Button
                            color="soft-dark"
                            size="sm"
                            className="show-item-btn"
                            onClick={() => openShowModal(perte)}
                            onMouseEnter={() => setHoverShow(true)}
                            onMouseLeave={() => setHoverShow(false)}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                        <Button
                            color="soft-success"
                            size="sm"
                            className="edit-item-btn"
                            onClick={() => openEditModal(perte)}
                            onMouseEnter={() => setHoverEdit(true)}
                            onMouseLeave={() => setHoverEdit(false)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            color="soft-danger"
                            size="sm"
                            className="remove-item-btn"
                            onClick={() => openDeleteModal(perte)}
                            onMouseEnter={() => setHoverRemove(true)}
                            onMouseLeave={() => setHoverRemove(false)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>                    </td>
                </tr>
            ))
        ) : (
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
            <Modal isOpen={modalAddPerte} toggle={toggleAddPerteModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddPerteModal}>Ajout</ModalHeader>
                                        <ModalBody>
        <form className="tablelist-form">
        
        
        <div className="mb-3">
    <h5>Ajouter Ingrédient</h5>
    <div className="mb-3">
        <label htmlFor="name_ingredient-field" className="form-label">Ingrédient:</label>
        <select
            id="name_ingredient-field"
            className="form-control"
            value={newPerteData.id_ingredient}
            onChange={(e) => setNewPerteData({ ...newPerteData, id_ingredient: e.target.value })}
        >
            {/* Options d'ingrédients */}
            <option value="">Sélectionner un ingrédient</option>
            {Array.from(new Set(marchandisesingredient.filter(m => m.id_ingredient !== null).map(m => m.id_ingredient))).map(ingredientId => {
                const ingredient = marchandisesingredient.find(m => m.id_ingredient === ingredientId).ingredient;
                return (
                    <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name_ingredient}
                    </option>
                );
            })}
        </select>
    </div>
    <div className="mb-3">
        <label htmlFor="quantite-field" className="form-label">Quantité Ingredient</label>
        <input
            type="number"
            id="quantite-field"
            className="form-control"
            placeholder="Entrez la quantité"
            value={newPerteData.quantiteIngredient}
            onChange={(e) => setNewPerteData({ ...newPerteData, quantiteIngredient: e.target.value })}
            required
        />
    </div>
</div>

{/* Ajouter Packaging */}
<div className="mb-3">
    <h5>Ajouter Packaging</h5>
    <div className="mb-3">
        <label htmlFor="name_packaging-field" className="form-label">Packaging:</label>
        <select
            id="name_packaging-field"
            className="form-control"
            value={newPerteData.id_packaging}
            onChange={(e) => setNewPerteData({ ...newPerteData, id_packaging: e.target.value })}
        >
            <option value="">Sélectionner un packaging</option>
            {/* Options de packaging */}
            {Array.from(new Set(marchandisesingredient.filter(m => m.id_packaging !== null).map(m => m.id_packaging))).map(packagingId => {
                const packaging = marchandisesingredient.find(m => m.id_packaging === packagingId).packaging;
                return (
                    <option key={packaging.id} value={packaging.id}>
                        {packaging.name_packaging}
                    </option>
                );
            })}
        </select>
    </div>
    <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Nombre Package</label>
        <input
            type="number"
            id="nombre_package-field"
            className="form-control"
            placeholder="Entrez le nombre de packages"
            value={newPerteData.quantitePackaging}
            onChange={(e) => setNewPerteData({ ...newPerteData, quantitePackaging: e.target.value })}
            required
        />
    </div>
</div>
        </form>
    </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddPerteModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={handleAdd}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>


                                    
            <Modal isOpen={modal_list} toggle={toggleListModal} centered>
            <ModalHeader className="bg-light p-3" toggle={toggleListModal}>Modifier Perte</ModalHeader>
            <ModalBody>
                <form className="tablelist-form">
                    <div className="mb-3">
                        {editPerte && editPerte.ingredient !== null ? (
                            <div>
                                <label htmlFor="editedName" className="form-label">Nom de l'Ingrédient:</label>
                                <input
                                    type="text"
                                    id="editedName"
                                    className="form-control"
                                    value={editedNameIngredient}
                                    onChange={(e) => setEditedNameIngredient(e.target.value)}
                                disabled
                                />
                                
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="editedName" className="form-label">Nom du Packaging:</label>
                                <input
                                    type="text"
                                    id="editedName"
                                    className="form-control"
                                    value={editedNamePackaging}
                                    onChange={(e) => setEditedNamePackaging(e.target.value)}
                               disabled
                               />
                                
                            </div>
                        )}
                    </div>

                    <div className="mb-3">

                    <label htmlFor="editedQuantite" className="form-label">Quantité:</label>
                                <input
                                    type="number"
                                    id="editedQuantite"
                                    className="form-control"
                                    value={editedQuantite}
                                    onChange={(e) => setEditedQuantite(e.target.value)}
                               disabled
                               />
                                                    </div>

                    <div className="mb-3">

                    <label htmlFor="editedQuantiteApres" className="form-label">Nouvelle Quantité :</label>
                                <input
                                    type="number"
                                    id="editedQuantiteApres"
                                    className="form-control"
                                    value={editedQuantiteApres}
                                    onChange={(e) => setEditedQuantiteApres(e.target.value)}
                                />
                     </div>

                </form>
            </ModalBody>
            <ModalFooter>
                <div className="hstack gap-2 justify-content-end">
                    <Button type="button" color="light" onClick={toggleListModal}>Fermer</Button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Enregistrer</button>
                </div>
            </ModalFooter>
        </Modal>




       {/* Show Modal */}
<Modal isOpen={modal_show} toggle={toggleShowModal} centered>
    <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Packaging</ModalHeader>
    <ModalBody>
        {selectedPerte && (
            <form className="tablelist-form">
                <div className="">
                    {selectedPerte.ingredient ? (
                        <div className="d-flex justify-content-center">
                            <img
                                src={selectedPerte.ingredient.photo.replace('ingredients', '')}
                                alt={selectedPerte.ingredient.name_ingredient}
                                style={{ width: "50px", height: "50px" }}
                                className="align-self-center"
                            />
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center">
                            <img
                                src={selectedPerte.packaging.photo.replace('packagings', '')}
                                alt={selectedPerte.packaging.name_packaging}
                                style={{ width: "50px", height: "50px" }}
                                className="align-self-center"
                            />
                        </div>
                    )}
                </div>
                <div className="">
                    <div className="mb-3">
                        <label htmlFor="editedName" className="form-label">Nom:</label>
                        <input
                            type="text"
                            id="editedName"
                            className="form-control"
                            value={selectedPerte.ingredient ? selectedPerte.ingredient.name_ingredient : selectedPerte.packaging.name_packaging}
                            readOnly
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="nom_produit-field" className="form-label">Quantité</label>
                    <input type="text" id="name_produit-field" className="form-control" value={selectedPerte.quantite} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="nom_produit-field" className="form-label">Montant</label>
                    <input type="text" id="name_produit-field" className="form-control" value={selectedPerte.montant} readOnly />
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
                    Perte ajoutée avec succès
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
                    Perte modifiée avec succès
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
                    Perte suprimée avec succès
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
        


        {selectedPerte && (selectedPerte.ingredient !== null ? (
    <p>
        Voulez-vous supprimer {selectedPerte.ingredient.name_ingredient}?
    </p>
) : selectedPerte.packacging !== null ? (
    <p>
        Voulez-vous supprimer {selectedPerte.packaging.name_packaging}?
    </p>
) : null)}

        </ModalBody>

        <ModalFooter>
        <Button color="secondary" onClick={() => toggleConfirmEdit(false)}>Retour</Button>
           
          <Button color="danger" onClick={handleRemove}>
            Supprimer
          </Button>
        </ModalFooter>
      </Modal>
















            
           




        </React.Fragment>
);










    
}
    
    
    
    



















    
    
    
    
    
    















    
    
    
    
    
    
    
   

export default PerteListTable;