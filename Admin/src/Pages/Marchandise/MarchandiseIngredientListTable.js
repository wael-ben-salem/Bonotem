import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Alert,Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import {  getAllDataIngredient } from '../../store/ingredient/GitIngredientSlice';
import { getAllUnite } from '../../store/Unite/gitUniteSlice';
import { getAllFournisseur } from '../../store/fournisseur/gitFournisseurSlice';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addMarchandiseIngredient, deleteMarchandise, getAllMarchandiseData, updateMarchandiseingredient } from '../../store/marchandise/gitMarchandiseIngredientSlice';





const MarchandiseIngredientListTable = () => {
    

    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.gitIngredient.ingredients);
    const marchandisesingredient = useSelector(state => state.gitMarchandiseIngredient.marchandisesingredient);
    const fournisseurs = useSelector(state => state.gitFournisseur.fournisseurs);
    const unites = useSelector((state) => state.gitUnite.unites);
    
    
    
   

      const { Success, errorMessage } = useSelector(state => ({
        Success: state.gitMarchandiseIngredient.Success,
        errorMessage: state.gitMarchandiseIngredient.errorMessage,
        
      }));
      const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state

      const [hover, setHover] = useState(false);
    const [modal_list, setmodal_list] = useState(false);
    const [editMarchandise, setEditMarchandise] = useState(null);
    const [editedNameIngredient, setEditedNameIngredient] = useState('');
    const [editedUnitIngredient, setEditedUnitIngredient] = useState(null);
    const [editedNameMarchandise, setEditedNameMarchandise] = useState(null);
    const [editedRefMarchandise, setEditedRefMarchandise] = useState('');
    const [editedNameFournisseur, setEditedNameFournisseur] = useState('');
    const [editedQuantiteAcheteeMarchandise, setEditedQuantiteAcheteeMarchandise] = useState(null);
    const [editedQuantiteConsomeeMarchandise, setEditedQuantiteConsomeeMarchandise] = useState(null);
    const [editedQuantiteEnStockMarchandise, setEditedQuantiteEnStockMarchandise] = useState(null);

    const [editedPrixMarchandise, setEditedPrixMarchandise] = useState(null);
    const [editedDateMarchandise, setEditedDateMarchandise] = useState(null);
    
    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedIngredientMarchandise, setSelectedIngredientMarchandise] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddIngredientMarchandise, setModalAddIngredientMarchandise] = useState(false);



    
    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add_marchandise, setModalConfirmAddMarchandise] = useState(false);



    

    const [newIngredientMarchandiseData, setNewIngredientMarchandiseData] = useState({
        nom: '',
        reference: '',
        id_ingredient:'',
        id_fournisseur:'',
        quantite_achetee: null, 
        quantite_en_stock: null, 
        quantite_consomee: null, 

        unite_id:'',
        prix:'',
        date_achat:'',
          
         
      });





      const [currentPage, setCurrentPage] = useState(0);


      // Filtrage des éléments non nuls
      const filteredMarchandises = marchandisesingredient
        .filter(marchandise => marchandise.ingredient !== null);
      
      // Fonction de pagination pour obtenir les éléments de la page actuelle
      const paginateMarchandise = (marchandisesingredient, page, pageSize) => {
        const startIndex = page * pageSize;
        return filteredMarchandises.slice(startIndex, startIndex + pageSize);
      };
      
      // Définition de la taille de la page
      const pageSize = 4;
      
      // Calcul du nombre total de pages en fonction de la taille de la page
      const totalPages = Math.ceil(filteredMarchandises.length / pageSize);
      
      // Obtention des éléments de la page actuelle
      const currentPageData = paginateMarchandise(filteredMarchandises, currentPage, pageSize);
      
          



    // Fonction pour changer de page
    const changePage = (page) => {
        setCurrentPage(page);
    };




        
        useEffect(() => {
            dispatch(getAllDataIngredient());
            dispatch(getAllUnite());
            dispatch(getAllMarchandiseData());
            dispatch(getAllFournisseur());



        }, [dispatch]);

       
useEffect(() => {
    if (errorMessage) {

    setTimeout(() => {
        window.location.reload()

    }, 3000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
    }
}, [errorMessage]);



        useEffect(() => {
            if (Success) {
        
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload()
        
            }, 3000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
            }
        }, [Success]);


        
        


        const toggleAddIngredientMarchandiseModal = () => {
            setModalAddIngredientMarchandise(!modalAddIngredientMarchandise);
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

        

        const toggleConfirmAddMarchandise = (isOpen) => {
            setModalConfirmAddMarchandise(isOpen);
        }
        const toggleConfirmEdit = (isOpen) => {
            setModalConfirmEdit(isOpen);
        }
        
        
        
        
        
        
        
        const openDeleteModal = (marchandiseingredient) => {
            setSelectedIngredientMarchandise(marchandiseingredient);
        toggleDeleteModal(); // Open the delete modal
        }

        const handleRemove = () => {
            dispatch(deleteMarchandise(selectedIngredientMarchandise.id)); // Dispatch deleteUser action with the selected user's ID
            setTimeout(() => {
                toggleDeleteModal();
                window.location.reload()

            },  3000);    }


        
        const openEditModal = (marchandisesingredient) => {
            setEditMarchandise(marchandisesingredient);
            setEditedNameMarchandise(marchandisesingredient.nom);
            setEditedRefMarchandise(marchandisesingredient.reference)
            setEditedNameFournisseur(marchandisesingredient.id_fournisseur);
            setEditedNameIngredient(marchandisesingredient.id_ingredient);
            setEditedUnitIngredient(marchandisesingredient.unite_id);
            setEditedQuantiteAcheteeMarchandise(marchandisesingredient.quantite_achetee);
            setEditedQuantiteConsomeeMarchandise(marchandisesingredient.quantite_consomee);
            setEditedQuantiteEnStockMarchandise(marchandisesingredient.quantite_en_stock);

            setEditedPrixMarchandise(marchandisesingredient.prix);
            setEditedDateMarchandise(marchandisesingredient.date_achat)
            
            toggleListModal();

        };

        const handleUpdate = () => {
            const updateIngredientMarchandise = {
                id: editMarchandise.id,
                nom:editedNameMarchandise,
                reference:editedRefMarchandise,
                id_fournisseur: editedNameFournisseur,
                id_ingredient: editedNameIngredient,
                unite_id: editedUnitIngredient,
                quantite_achetee: editedQuantiteAcheteeMarchandise,
                prix: editedPrixMarchandise,
                date_achat: editedDateMarchandise,
                
            };
        
            dispatch(updateMarchandiseingredient({ id: editMarchandise.id, ingredientMarchandiseData: updateIngredientMarchandise }))
            .then(() => {
                // Réinitialiser l'état
                setEditMarchandise({
                    nom: '',
                    reference: '',
                    id_ingredient:'',
                    id_fournisseur:'',
                    quantite_achetee: null, 
                    quantite_en_stock: null, 
                    quantite_consomee: null, 
            
                    unite_id:'',
                    prix:'',
                    date_achat:'',
                });
    
                // Fermer le modal
                toggleListModal();
    
                // Ouvrir le modal de confirmation
                toggleConfirmEdit(true);
            })
            .catch(error => {
                // Gérer l'erreur
                console.error("Error updating Marchandise:", error);
            })
            .finally(() => {
                // Désactiver le chargement après l'achèvement de l'action
            });

             
        };


    
        const openShowModal = (marchandiseingredient) => {
            setSelectedIngredientMarchandise(marchandiseingredient); 
            setModalShow(true); // Open the show modal
        }




            
            const handleAddIngredientMarchandise = () => {
                const formData = new FormData();
                formData.append('id_ingredient', newIngredientMarchandiseData.id_ingredient); // Utiliser id_ingredient au lieu de name_ingredient
                formData.append('unite_id', newIngredientMarchandiseData.unite_id);
                formData.append('nom', newIngredientMarchandiseData.nom);
                formData.append('quantite_achetee', newIngredientMarchandiseData.quantite_achetee);
                formData.append('prix', newIngredientMarchandiseData.prix);
                formData.append('reference', newIngredientMarchandiseData.reference);
                formData.append('id_fournisseur', newIngredientMarchandiseData.id_fournisseur);
                formData.append('date_achat', newIngredientMarchandiseData.date_achat);
                
                dispatch(addMarchandiseIngredient(formData)) 

                .then(() => {
        
    
                    // Réinitialiser l'état
                    setNewIngredientMarchandiseData({
                        nom: '',
                        reference: '',
                        id_ingredient: '', // Utiliser id_ingredient au lieu de name_ingredient
                        unite_id: '',
                        id_fournisseur: '',
                        quantite_achetee: null, 
                        quantite_consomee: null, 
                        quantite_en_stock: null, 
    
                        prix: '',
                        date_achat: '',
                    });
                
                        // Fermer le modal
                        toggleAddIngredientMarchandiseModal();
                
                        // Ouvrir le modal de confirmation
                        toggleConfirmAddMarchandise(true);
                    })
                    .catch(error => {
                        // Gérer l'erreur
                        console.error("Error updating Marchandise:", error);
                    })
                    .finally(() => {
                        // Désactiver le chargement après l'achèvement de l'action
                    });
                
                
                
               

                
                
            };


            const [hoverShow, setHoverShow] = useState(false);
            const [hoverEdit, setHoverEdit] = useState(false);
            const [hoverRemove, setHoverRemove] = useState(false);
        
            


    return(

        <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Tables" breadcrumbItem="Marchandise" />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Gérer des Marchandises</h4>
                                    </CardHeader>

                                    <CardBody>
                                        <div id="customerList">
                                            <Row className="g-4 mb-3">
                                                <Col className="col-sm-auto">
                                                    <div className="d-flex gap-1">
                                                    <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddIngredientMarchandiseModal}
                                                                                                    onMouseEnter={() => setHover(true)}
                                                                                                      onMouseLeave={() => setHover(false)}
                                                                                                        id="create-btn">
                                                                                                        <i className={hover ? "ri-add-fill align-bottom me-1" : "ri-add-line align-bottom me-1"}></i>
                                                                                                        {/* {hover ? "Ajouter" : ""} */}

                                                                                                  </Button>
                                                                                                  


                                                        <Button color="soft-danger">
                                                            {/* onClick="deleteMultiple()" */}
                                                            <i className="ri-delete-bin-2-line"></i>
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
                                                            {/* <th className="sort" data-sort="Marchandise-Id">ID</th> */}
                            <th className="sort" data-sort="Marchandise-name_marchandise">Nom Marchandise</th>
                            <th className="sort" data-sort="Marchandise-ref">Referance</th>
                            <th className="sort" data-sort="Marchandise-name_ingredient">Nom ingredient</th>
                            <th className="sort" data-sort="Marchandise-unite_id">Unite de mésure </th>

                            <th className="sort" data-sort="Marchandise-name_fournisseur">Name fournisseur</th>
                            <th className="sort" data-sort="Marchandise-quantite">Quantité Achetée</th>
                            <th className="sort" data-sort="Marchandise-quantite">Quantité En Stock</th>
                            <th className="sort" data-sort="Marchandise-quantite">Quantité Consomée</th>


                            <th className="sort" data-sort="Marchandise-prix">Prix</th>
                            <th className="sort" data-sort="Marchandise-date">Date achat</th>
                                                            
                                                            <th className="sort" data-sort="action">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="list form-check-all">
                                                    
                                                             {currentPageData.length > 0 ? (
        currentPageData.map((marchandiseingredient, index) => (
            <tr key={marchandiseingredient.id}>
                     <th scope="row">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={() => openShowModal(marchandiseingredient)}
            name="chk_child"
            value="option1"
          />
        </div>
      </th> 
                                                                    {/* <td onClick={() => openShowModal(marchandise)}>{marchandise.id}</td> */}
                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.nom}</td>
                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.reference}</td>

                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.ingredient ? marchandiseingredient.ingredient.name_ingredient : 'No'}</td> 
                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.unite ? marchandiseingredient.unite.name_unite : 'No'}</td> 
                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.fournisseur ? marchandiseingredient.fournisseur.nom : 'No'}</td> 

                                    
                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.quantite_achetee }</td>
                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.quantite_en_stock|| "0" }</td>

                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.quantite_consomee || "0"}</td>

                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.prix }</td>
                                    <td onClick={() => openShowModal(marchandiseingredient)}>{marchandiseingredient.date_achat }</td>




                                                                    
                                                                    
                                                                    
                                    <td>
                                                             <div className=" d-flex  gap-4">

                                                                         <Button
                                                                            color="soft-dark"
                                                                            size="sm"
                                                                            className="show-item-btn"
                                                                            onClick={() => openShowModal(marchandiseingredient)}
                                                                            onMouseEnter={() => setHoverShow(true)}
                                                                            onMouseLeave={() => setHoverShow(false)}
                                                                        >
                                                                            <FontAwesomeIcon icon={faEye} />
                                                                        </Button>
                                                                        <Button
                                                                            color="soft-primary"
                                                                            size="sm"
                                                                            className="edit-item-btn"
                                                                            onClick={() => openEditModal(marchandiseingredient)}
                                                                            onMouseEnter={() => setHoverEdit(true)}
                                                                            onMouseLeave={() => setHoverEdit(false)}
                                                                        >
                                                                            <FontAwesomeIcon icon={faEdit} />
                                                                        </Button>

                                                                        <Button
                                                                            color="soft-danger"
                                                                            size="sm"
                                                                            className="remove-item-btn"
                                                                            onClick={() => openDeleteModal(marchandiseingredient)}
                                                                            onMouseEnter={() => setHoverRemove(true)}
                                                                            onMouseLeave={() => setHoverRemove(false)}
                                                                        >
                                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                                        </Button>
                                                                    </div>
                                                                </td>
            </tr>
        ))
    ) : (
        <tr><td colSpan="7">Répture de stock</td></tr>
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
           

         {/* Add Ingredient-Marchandise Modal */}
            <Modal isOpen={modalAddIngredientMarchandise} toggle={toggleAddIngredientMarchandiseModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddIngredientMarchandiseModal}>Ajout</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                            <div className="mb-3">
                                                    <label htmlFor="name_marchandise-field" className="form-label">Nom Marchandise</label>
                                                    <input type="text" id="name_marchandise-field" className="form-control" placeholder="Enter Name" value={newIngredientMarchandiseData.nom} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, nom: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_ref-field" className="form-label">Referance</label>
                                                    <input type="text" id="name_ref-field" className="form-control" placeholder="Enter Referance" value={newIngredientMarchandiseData.reference} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, reference: e.target.value })} required />
                                                </div>
                                                                                              
                                                <div className="mb-3">
                <label htmlFor="name_ingredient-field" className="form-label">nom Ingredient :</label>
                <select
    id="name_ingredient-field"
    className="form-control"
    value={newIngredientMarchandiseData.id_ingredient} // Utiliser id_ingredient au lieu de name_ingredient
    onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, id_ingredient: e.target.value })} // Utiliser id_ingredient au lieu de name_ingredient
>
    <option value="">Sélectionner un ingredient </option>
   
    {ingredients.map((ingredient) => (
        <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name_ingredient ? ingredient.name_ingredient : 'No'}
        </option>
    ))}
</select>
            </div>
                                                <div className="mb-3">
                <label htmlFor="unite_id-field" className="form-label">Mesure unite :</label>
                <select
                    id="unite_id-field"
                    className="form-control"
                    value={newIngredientMarchandiseData.unite_id}
                    onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, unite_id: e.target.value })}
                >
                    <option value="">Sélectionner une Unite de mesure </option>
                   
                    {unites.map((unite) => (
                          <option key={unite.id} value={unite.id}>
                          {unite.name_unite ? unite.name_unite : 'No'}
                      </option>

                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="id_founisseur-field" className="form-label">Nom du fournisseur :</label>
                <select
                    id="id_founisseur-field"
                    className="form-control"
                    value={newIngredientMarchandiseData.id_fournisseur}
                    onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, id_fournisseur: e.target.value })}
                >
                    <option value="">Sélectionner un fournisseur</option>
                   
                    {fournisseurs.map((fournisseur) => (
                          <option key={fournisseur.id} value={fournisseur.id}>
                          {fournisseur.nom ? fournisseur.nom : 'No'}
                      </option>

                    ))}
                </select>
            </div>
            <div className="mb-3">
             <label htmlFor="qunatite-field" className="form-label">Quantite Achetée</label>
            <input type="number" id="qunatite-field" className="form-control" placeholder="Enter Quantite" value={newIngredientMarchandiseData.quantite_achetee} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, quantite_achetee: e.target.value })} required />
            </div>
            <div className="mb-3">
             <label htmlFor="prix-field" className="form-label">Prix</label>
            <input type="number" id="prix-field" className="form-control" placeholder="Enter Prix" value={newIngredientMarchandiseData.prix} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, prix: e.target.value })} required />
            </div>
            <div className="mb-3">
             <label htmlFor="date-field" className="form-label">Date d'achat</label>
            <input type="date" id="date-field" className="form-control" placeholder="Enter date" value={newIngredientMarchandiseData.date_achat} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, date_achat: e.target.value })} required />
            </div>   
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="secondary" onClick={toggleAddIngredientMarchandiseModal}>Fermer</Button>
                                                <Button type="button" color="primary" onClick={handleAddIngredientMarchandise}>Ajouter </Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier Ingredient </ModalHeader>
                <form className="tablelist-form">
                
                <ModalBody>
                    <div className="mb-3">
                        <label htmlFor="name_marchandise-field" className="form-label">Nom Marchandise</label>
                        <input type="text" id="name_marchandise-field" className="form-control" placeholder="Entrer Nom" value={editedNameMarchandise} onChange={(e) => setEditedNameMarchandise(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ref-field" className="form-label">Referance</label>
                        <input type="text" id="ref-field" className="form-control" placeholder="Entrer Referance" value={editedRefMarchandise} onChange={(e) => setEditedRefMarchandise(e.target.value)} required />
                    </div>
                    <div className="mb-3">
            <label htmlFor="name_ingredient-field" className="form-label">Ingredient:</label>
            <select
                id="name_ingredient-field"
                className="form-control"
                value={editedNameIngredient}
                onChange={(e) => setEditedNameIngredient(e.target.value)}
            >
                {ingredients.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name_ingredient}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-3">
            <label htmlFor="unite_id-field" className="form-label">Unite de mesuure:</label>
            <select
                id="unite_id-field"
                className="form-control"
                value={editedUnitIngredient}
                onChange={(e) => setEditedUnitIngredient(e.target.value)}
            >
                {unites.map((unite) => (
                    <option key={unite.id} value={unite.id}>
                        {unite.name_unite}
                    </option>
                ))}
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="name_fournisseur-field" className="form-label">Fournisseur:</label>
            <select
                id="name_fournisseur-field"
                className="form-control"
                value={editedNameFournisseur}
                onChange={(e) => setEditedNameFournisseur(e.target.value)}
            >
                {fournisseurs.map((fournisseur) => (
                    <option key={fournisseur.id} value={fournisseur.id}>
                        {fournisseur.nom}
                    </option>
                ))}
            </select>
        </div>

                    <div className="mb-3">
                        <label htmlFor="quantite-field" className="form-label">Quantité Achetée</label>
                        <input type="number" id="quantite-field" className="form-control" placeholder="Enter la =quatité" value={editedQuantiteAcheteeMarchandise} onChange={(e) => setEditedQuantiteAcheteeMarchandise(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantite-field" className="form-label">Quantité En stock</label>
                        <input type="number" id="quantite-field" className="form-control" placeholder="Enter la =quatité" value={editedQuantiteEnStockMarchandise|| "0"} onChange={(e) => setEditedQuantiteEnStockMarchandise(e.target.value)} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantite-field" className="form-label">Quantité Consomée</label>
                        <input type="number" id="quantite-field" className="form-control" placeholder="Enter la =quatité" value={editedQuantiteConsomeeMarchandise|| "0"} onChange={(e) => setEditedQuantiteConsomeeMarchandise(e.target.value)} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="prix-field" className="form-label">Prix</label>
                        <input type="number" id="prix-field" className="form-control" placeholder="Enter la prix" value={editedPrixMarchandise} onChange={(e) => setEditedPrixMarchandise(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date-field" className="form-label">Date d'achat</label>
                        <input type="date" id="date-field" className="form-control" placeholder="Enter la date" value={editedDateMarchandise} onChange={(e) => setEditedDateMarchandise(e.target.value)} required />
                    </div>
                     
                    



                   
                </ModalBody>
                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-secondary" onClick={toggleListModal}>Fermer</button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Mettre à jour</button>
                    </div>
                </ModalFooter>
            </form>
            </Modal>




             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Ingredient</ModalHeader>
                <ModalBody>
                    {selectedIngredientMarchandise && (
                        <form className="tablelist-form">
                            <div className="mb-3">
                                <label htmlFor="name_marchandise-field" className="form-label">Nom Marchandise</label>
                                <input type="text" id="name_marchandise-field" className="form-control" value={selectedIngredientMarchandise.nom} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ref-field" className="form-label">Referance</label>
                                <input type="text" id="ref-field" className="form-control" value={selectedIngredientMarchandise.reference} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name_ingredient-field" className="form-label">Nom Ingredient</label>
                                <input type="text" id="name_ingredient-field" className="form-control" value={selectedIngredientMarchandise.ingredient ? selectedIngredientMarchandise.ingredient.name_ingredient: 'No'} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="unite_id-field" className="form-label">Unite de mesure </label>
                                <input type="text" id="unite_id-field" className="form-control" value={selectedIngredientMarchandise.unite ? selectedIngredientMarchandise.unite.name_unite : 'No'} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name_fournisseur-field" className="form-label">Foufnisseur </label>
                                <input type="text" id="name_fournisseur-field" className="form-control" value={selectedIngredientMarchandise.fournisseur ? selectedIngredientMarchandise.fournisseur.nom : 'No'} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantite-field" className="form-label">Quantite Achetée</label>
                                <input type="text" id="quantite-field" className="form-control" value={selectedIngredientMarchandise.quantite_achetee} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantite-field" className="form-label">Quantite En stock</label>
                                <input type="text" id="quantite-field" className="form-control" value={selectedIngredientMarchandise.quantite_en_stock|| "0"} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantite-field" className="form-label">Quantite Consomée</label>
                                <input type="text" id="quantite-field" className="form-control" value={selectedIngredientMarchandise.quantite_consomee|| "0"} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prix-field" className="form-label">Prix</label>
                                <input type="text" id="prix-field" className="form-control" value={selectedIngredientMarchandise.prix} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date-field" className="form-label">Date d'achat</label>
                                <input type="text" id="date-field" className="form-control" value={selectedIngredientMarchandise.date_achat} readOnly />
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

            <Modal isOpen={modal_confirm_add_marchandise} toggle={() => toggleConfirmAddMarchandise(false)} centered>
    <ModalHeader className="bg-light p-3" toggle={() => toggleConfirmAddMarchandise(false)}>Confirmer l'ajout</ModalHeader>
    <ModalBody>
        
        {Success ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '3em' }} />
                <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                    Marchandise ajoutée avec succès
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
                <Button color="secondary" onClick={() => toggleConfirmAddMarchandise(false)}>Retour</Button>
                </ModalFooter>
            </Modal>








            <Modal isOpen={modal_confirm_edit} toggle={() => toggleConfirmEdit(false)} centered>
    <ModalHeader className="bg-light p-3" toggle={() => toggleConfirmEdit(false)}>Confirmer la modification</ModalHeader>
    <ModalBody>
        
        {Success ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '3em' }} />
                <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                    Marchandise modifiée avec succès
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
                    Marchandise suprimée avec succès
                </Alert>
            </div>
        ) : null}
        {errorMessage  ? (
            <div className="text-center">
                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
                <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>{errorMessage}</div>
            </div>
        ) : null}
        

                    {selectedIngredientMarchandise && (
                        <p>Êtes-vous sûr de vouloir supprimer cette marchandise: {selectedIngredientMarchandise.nom}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default MarchandiseIngredientListTable;
