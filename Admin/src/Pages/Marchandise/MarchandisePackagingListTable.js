import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Alert,Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import {  getAllPackaging } from '../../store/Packagings/gitPackagingSlice';

import { getAllUnite } from '../../store/Unite/gitUniteSlice';
import { getAllFournisseur } from '../../store/fournisseur/gitFournisseurSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addMarchandisePackaging, deleteMarchandise, getAllMarchandiseData, updateMarchandisepackaging } from '../../store/marchandise/gitMarchandisePackagingSlice';





const MarchandisePackagingListTable = () => {
    

    const dispatch = useDispatch();
    const packagings = useSelector(state => state.gitPackaging.packagings);
    const marchandisespackaging = useSelector(state => state.gitMarchandisePackaging.marchandisespackaging);
    const fournisseurs = useSelector(state => state.gitFournisseur.fournisseurs);
    const unites = useSelector((state) => state.gitUnite.unites);
    
    
    
    

      const { Success, errorMessage } = useSelector(state => ({
        Success: state.gitMarchandisePackaging.Success,
        errorMessage: state.gitMarchandisePackaging.errorMessage,
        
      }));
      const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state

    const [modal_list, setmodal_list] = useState(false);
    const [editMarchandise, setEditMarchandise] = useState(null);
    const [editedNamePackaging, setEditedNamePackaging] = useState('');
    const [editedDimension, setEditedDimension] = useState('');

    const [editedUnitIngredient, setEditedUnitIngredient] = useState(null);
    const [editedNameMarchandise, setEditedNameMarchandise] = useState(null);
    const [editedRefMarchandise, setEditedRefMarchandise] = useState('');
    const [editedNameFournisseur, setEditedNameFournisseur] = useState('');
    const [editedQuantiteAcheteeMarchandise, setEditedQuantiteAcheteeMarchandise] = useState(null);
    const [editedQuantiteConsomeeMarchandise, setEditedQuantiteConsomeeMarchandise] = useState(null);
    const [editedQuantiteEnStockMarchandise, setEditedQuantiteEnStockMarchandise] = useState(null);

    const [editedPrixMarchandise, setEditedPrixMarchandise] = useState(null);
    const [editedDateMarchandise, setEditedDateMarchandise] = useState(null);
    
    const [modal_show, setModalShow] = useState(false)
    const [selectedPackagingMarchandise, setSelectedPackagingMarchandise] = useState(null); 
    const [modal_delete, setModalDelete] = useState(false); 
    const [modalAddPackagingMarchandise, setModalAddPackagingMarchandise] = useState(false);


    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);

    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const [modal_confirm_add_marchandise, setModalConfirmAddMarchandise] = useState(false);


    const [errors, setErrors] = useState({});

    
    
    const [newIngredientMarchandiseData, setNewIngredientMarchandiseData] = useState({
        nom: '',
        reference: '',
        id_packaging:'',
        dimension:'',
        id_fournisseur:'',
        quantite_achetee: null, 
        quantite_en_stock: null, 
        quantite_consomee: null,
         unite_id:'',
        prix:'',
        date_achat:'',
          
        
      });
      const [currentPage, setCurrentPage] = useState(0);


      



    // Fonction pour changer de page
    const changePage = (page) => {
        setCurrentPage(page);
    };



    useEffect(() => {
        if (errorMessage) {
    
        setTimeout(() => {
            window.location.reload()
    
        }, 2000); 
        }
    }, [errorMessage]);
    
    const id = useSelector(state => state.login.user.id);


        
        useEffect(() => {
            dispatch(getAllPackaging(id));
            dispatch(getAllUnite());
            dispatch(getAllMarchandiseData(id));
            dispatch(getAllFournisseur(id));



        }, [dispatch,id]);

        useEffect(() => {
            if (Success) {
        
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload()
        
            }, 2000); 
            }
        }, [Success]);


        


        const toggleAddPackagingMarchandiseModal = () => {
            setModalAddPackagingMarchandise(!modalAddPackagingMarchandise);
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
        
        
       
        const validate = (data) => {
            const errors = {};
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); 
        
        // Début du mois en cours
        const startOfMonth = new Date(year, month, 1);
        // Fin du mois en cours
        const endOfMonth = new Date(year, month + 1, 0);
    
        // Vérifier que la date est fournie et est valide
        if (!data.date_achat) {
            errors.date_achat = "La date est requise.";
        } else {
            const inputDate = new Date(data.date_achat);
            
            if (isNaN(inputDate)) {
                errors.date_achat = "La date est invalide.";
            } else if (inputDate < startOfMonth || inputDate > endOfMonth) {
                errors.date_achat = `La date doit être comprise entre le ${startOfMonth.toLocaleDateString()} et le ${endOfMonth.toLocaleDateString()}.`;
            }
        }
        
            if (!data.nom) {
                errors.nom = "Le nom est requis.";
            } else if (!/^[A-Za-z0-9\s]+$/.test(data.nom)) {
                errors.nom = "Le nom doit contenir uniquement des lettres, des chiffres et des espaces.";
            }
        
            if (!data.reference) {
                errors.reference = "La Référence est requise.";
            }
        
            if (!data.quantite_achetee) {
                errors.quantite_achetee = "La quantité achetée est requise.";
            } else if (isNaN(data.quantite_achetee) || data.quantite_achetee < 0) {
                errors.quantite_achetee = "La quantité achetée doit être un nombre entier positif.";
            }
        
           
        
            if (!data.id_fournisseur) {
                errors.id_fournisseur = "La sélection des fournisseurs est requise.";
            }
        
            if (!data.unite_id) {
                errors.unite_id = "La sélection des Unités est requise.";
            }
        
            if (!data.prix) {
                errors.prix = "Le prix est requis.";
            } else if (isNaN(data.prix) || data.prix < 0) {
                errors.prix = "Le prix doit être un nombre positif.";
            }
        
            if (!data.id_packaging) {
                errors.id_packaging = "La sélection des ingrédients est requise.";
            }
        
            return errors;
        };
        
    
    
        
        
        const openDeleteModal = (marchandisepackaging) => {
            setSelectedPackagingMarchandise(marchandisepackaging);
        toggleDeleteModal(); 
        }

        const handleRemove = () => {
            dispatch(deleteMarchandise(selectedPackagingMarchandise.id)); // Dispatch deleteUser action with the selected user's ID
            setTimeout(() => {
                toggleDeleteModal();
                window.location.reload()

            },  2000);    }


        
        const openEditModal = (marchandisespackaging) => {
            setEditMarchandise(marchandisespackaging);
            setEditedNameMarchandise(marchandisespackaging.nom);
            setEditedRefMarchandise(marchandisespackaging.reference)
            setEditedNameFournisseur(marchandisespackaging.id_fournisseur);
            setEditedNamePackaging(marchandisespackaging.id_packaging);
            setEditedDimension( marchandisespackaging.packaging.dimension);

            setEditedUnitIngredient(marchandisespackaging.unite_id);
            setEditedQuantiteAcheteeMarchandise(marchandisespackaging.quantite_achetee);
            setEditedQuantiteConsomeeMarchandise(marchandisespackaging.quantite_consomee);
            setEditedQuantiteEnStockMarchandise(marchandisespackaging.quantite_en_stock);

            setEditedPrixMarchandise(marchandisespackaging.prix);
            setEditedDateMarchandise(marchandisespackaging.date_achat)
            
            toggleListModal();

        };

        const handleUpdate = () => {
            const errors = validate({date_achat: editedDateMarchandise, prix: editedPrixMarchandise,quantite_achetee: editedQuantiteAcheteeMarchandise, id_packaging: editedNamePackaging, nom: editedNameMarchandise, reference: editedRefMarchandise, id_fournisseur: editedNameFournisseur, unite_id: editedUnitIngredient });
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
        
            // Clear previous errors if any
            setErrors({});


            const updatePackagingMarchandise = {
                id: editMarchandise.id,
                nom:editedNameMarchandise,
                reference:editedRefMarchandise,
                id_fournisseur: editedNameFournisseur,
                id_packaging: editedNamePackaging,

                unite_id: editedUnitIngredient,
                quantite_achetee: editedQuantiteAcheteeMarchandise,
                prix: editedPrixMarchandise,
                date_achat: editedDateMarchandise,
                
            };
        
            dispatch(updateMarchandisepackaging({ id: editMarchandise.id, packagingMarchandiseData: updatePackagingMarchandise }))

            .then(() => {
                // Réinitialiser l'état
                setEditMarchandise({
                    nom: '',
                    reference: '',
                    id_packaging:'',
                    dimension:'',
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


    
        const openShowModal = (marchandisepackaging) => {
            setSelectedPackagingMarchandise(marchandisepackaging); 
           
            setModalShow(true); 
        }

        // Calcul du nombre total d'éléments de marchandises


const filteredMarchandises = marchandisespackaging
  .filter(marchandise => marchandise.packaging !== null);


const paginateMarchandise = (marchandisespackaging, page, pageSize) => {
  const startIndex = page * pageSize;
  return filteredMarchandises.slice(startIndex, startIndex + pageSize);
};


const pageSize = 4;


const totalPages = Math.ceil(filteredMarchandises.length / pageSize);

// Obtention des éléments de la page actuelle
const currentPageData = paginateMarchandise(filteredMarchandises, currentPage, pageSize);

    


            
            const handleAddIngredientMarchandise = () => {
                const errors = validate({date_achat: newIngredientMarchandiseData.date_achat, prix: newIngredientMarchandiseData.prix,quantite_achetee: newIngredientMarchandiseData.quantite_achetee, id_packaging: newIngredientMarchandiseData.id_packaging, nom: newIngredientMarchandiseData.nom, reference: newIngredientMarchandiseData.reference, id_fournisseur: newIngredientMarchandiseData.id_fournisseur, unite_id: newIngredientMarchandiseData.unite_id });
                if (Object.keys(errors).length > 0) {
                    setErrors(errors);
                    return;
                }
            
                // Clear previous errors if any
                setErrors({});
    
                
                const formData = new FormData();

                formData.append('id_packaging', newIngredientMarchandiseData.id_packaging); // Utiliser id_ingredient au lieu de name_ingredient

                formData.append('unite_id', newIngredientMarchandiseData.unite_id);
                formData.append('nom', newIngredientMarchandiseData.nom);
                formData.append('quantite_achetee', newIngredientMarchandiseData.quantite_achetee);
                formData.append('prix', newIngredientMarchandiseData.prix);
                formData.append('reference', newIngredientMarchandiseData.reference);
                formData.append('id_fournisseur', newIngredientMarchandiseData.id_fournisseur);
                formData.append('date_achat', newIngredientMarchandiseData.date_achat);
                
                dispatch(addMarchandisePackaging({ id: id, formData }))


                .then(() => {
        
    
                    // Réinitialiser l'état
                    setNewIngredientMarchandiseData({
                        nom: '',
                        reference: '',
                        id_packaging: '', 
    
                        unite_id: '',
                        id_fournisseur: '',
                        quantite_achetee: null, 
                        quantite_consomee: null, 
                        quantite_en_stock: null, 
                        prix: '',
                        date_achat: '',
                    });
                
                
                       
                        toggleAddPackagingMarchandiseModal();
                
                      
                        toggleConfirmAddMarchandise(true);
                    })
                    .catch(error => {
                       
                        console.error("Error updating Marchandise:", error);
                    })
                    .finally(() => {
                       
                    });
                
               
               
               
            };


            
        
            


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
                                                    <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddPackagingMarchandiseModal}
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
                            <th className="sort" data-sort="Marchandise-name_ingredient">Nom packaging</th>
                            <th className="sort" data-sort="Marchandise-dimension">Dimension</th>

                            <th className="sort" data-sort="Marchandise-unite_id">Unite de mesure </th>

                            <th className="sort" data-sort="Marchandise-name_fournisseur">Nom fournisseur</th>
                            <th className="sort" data-sort="Marchandise-quantite">Nombre de package Achetee</th>
                            <th className="sort" data-sort="Marchandise-quantite">Nombre de package En Stock</th>
                            <th className="sort" data-sort="Marchandise-quantite">Nombre de package Utilisés</th>

                            <th className="sort" data-sort="Marchandise-prix">Prix Unitaire</th>
                            <th className="sort" data-sort="Marchandise-date">Date achat</th>
                                                            
                                                            <th className="sort" data-sort="action">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="list form-check-all">
  


{currentPageData.length > 0 ? (
        currentPageData.map((marchandisepackaging, index) => (
            <tr key={marchandisepackaging.id}>
<th scope="row">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={() => openShowModal(marchandisepackaging)}
            name="chk_child"
            value="option1"
          />
        </div>
      </th>
      {/* <td onClick={() => openShowModal(marchandise)}>{marchandise.id}</td> */}
      <td onClick={() => openShowModal(marchandisepackaging)}>{marchandisepackaging.nom}</td>
      <td onClick={() => openShowModal(marchandisepackaging)}>{marchandisepackaging.reference}</td>
      <td onClick={() => openShowModal(marchandisepackaging)}>
        {marchandisepackaging.packaging ? marchandisepackaging.packaging.name_packaging : 'No'}
      </td> 
      <td onClick={() => openShowModal(marchandisepackaging)}>
        {marchandisepackaging.packaging ? marchandisepackaging.packaging.dimension : 'No'}
      </td> 
      <td onClick={() => openShowModal(marchandisepackaging)}>
        {marchandisepackaging.unite ? marchandisepackaging.unite.name_unite : 'No'}
      </td> 
      <td onClick={() => openShowModal(marchandisepackaging)}>
        {marchandisepackaging.fournisseur ? marchandisepackaging.fournisseur.nom : 'No'}
      </td> 
      <td onClick={() => openShowModal(marchandisepackaging)}>{marchandisepackaging.quantite_achetee|| "0" }</td>
      <td onClick={() => openShowModal(marchandisepackaging)}>{marchandisepackaging.quantite_en_stock|| "0" }</td>
      <td onClick={() => openShowModal(marchandisepackaging)}>{marchandisepackaging.quantite_consomee|| "0" }</td>

      <td onClick={() => openShowModal(marchandisepackaging)}>
  {marchandisepackaging.prix.toFixed(2)} TND
</td>
      <td onClick={() => openShowModal(marchandisepackaging)}>{marchandisepackaging.date_achat}</td>
      <td>
        <div className=" d-flex gap-4">
          <Button
            color="soft-dark"
            size="sm"
            className="show-item-btn"
            onClick={() => openShowModal(marchandisepackaging)}
            onMouseEnter={() => setHoverShow(true)}
            onMouseLeave={() => setHoverShow(false)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            color="soft-primary"
            size="sm"
            className="edit-item-btn"
            onClick={() => openEditModal(marchandisepackaging)}
            onMouseEnter={() => setHoverEdit(true)}
            onMouseLeave={() => setHoverEdit(false)}
          >
            <FontAwesomeIcon icon={faEdit} />
            
          </Button>
          <Button
            color="soft-danger"
            size="sm"
            className="remove-item-btn"
            onClick={() => openDeleteModal(marchandisepackaging)}
            onMouseEnter={() => setHoverRemove(true)}
            onMouseLeave={() => setHoverRemove(false)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
      </td>            </tr>
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
          



                                     {/* Add Packaging-Marchandise Modal */}
            <Modal isOpen={modalAddPackagingMarchandise} toggle={toggleAddPackagingMarchandiseModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddPackagingMarchandiseModal}>Ajout</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                            <div className="mb-3">
                                                    <label htmlFor="name_marchandise-field" className="form-label">Nom Marchandise</label>
                                                    <input type="text" id="name_marchandise-field" className="form-control" placeholder="Enter Name" value={newIngredientMarchandiseData.nom} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, nom: e.target.value })} required />
                                                    {errors.nom && <div className="text-danger">{errors.nom}</div>}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_ref-field" className="form-label">Referance</label>
                                                    <input type="text" id="name_ref-field" className="form-control" placeholder="Enter Referance" value={newIngredientMarchandiseData.reference} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, reference: e.target.value })} required />
                                                    {errors.reference && <div className="text-danger">{errors.reference}</div>}

                                                </div>
                                                                                              
                                                <div className="mb-3">
                <label htmlFor="name_packaging-field" className="form-label">nom Packaging :</label>
                <select
    id="name_packaging-field"
    className="form-control"
    value={newIngredientMarchandiseData.id_packaging} // Utiliser id_ingredient au lieu de name_ingredient
    onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, id_packaging: e.target.value })} // Utiliser id_ingredient au lieu de name_ingredient
>
    <option value="">Sélectionner une packaging </option>
   
    {packagings.map((packaging) => (
        <option key={packaging.id} value={packaging.id}>
            {packaging.name_packaging ? packaging.name_packaging : 'No'}
        </option>
    ))}
</select>
{errors.id_packaging && <div className="text-danger">{errors.id_packaging}</div>}


            </div>
            {/* <div className="mb-3">
            <label htmlFor="dimension-field" className="form-label">Dimension :</label>
            <select
    id="name_packaging-field"
    className="form-control"
    value={newIngredientMarchandiseData.dimension} // Utiliser id_ingredient au lieu de name_ingredient
    onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, dimension: e.target.value })} // Utiliser id_ingredient au lieu de name_ingredient
>
    <option value="">Sélectionner une packaging </option>
   
    {packagings.map((packaging) => (
        <option key={packaging.dimension} value={packaging.dimension}>
            {packaging.dimension ? packaging.dimension : 'No'}
        </option>
    ))}
</select>        </div> */}
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
                {errors.unite_id && <div className="text-danger">{errors.unite_id}</div>}

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
                {errors.id_fournisseur && <div className="text-danger">{errors.id_fournisseur}</div>}

            </div>
            <div className="mb-3">
             <label htmlFor="qunatite-field" className="form-label">Quantite Achetée</label>
            <input type="number" id="qunatite-field" className="form-control" placeholder="Enter Quantite" value={newIngredientMarchandiseData.quantite_achetee} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, quantite_achetee: e.target.value })} required />
            {errors.quantite_achetee && <div className="text-danger">{errors.quantite_achetee}</div>}

            </div>
            <div className="mb-3">
             <label htmlFor="prix-field" className="form-label">Prix</label>
            <input type="number" id="prix-field" className="form-control" placeholder="Enter Prix" value={newIngredientMarchandiseData.prix} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, prix: e.target.value })} required />
            {errors.prix && <div className="text-danger">{errors.prix}</div>}

            
            </div>
            <div className="mb-3">
             <label htmlFor="date-field" className="form-label">Date d'achat</label>
            <input type="date" id="date-field" className="form-control" placeholder="Enter date" value={newIngredientMarchandiseData.date_achat} onChange={(e) => setNewIngredientMarchandiseData({ ...newIngredientMarchandiseData, date_achat: e.target.value })} required />
            {errors.date_achat && <div className="text-danger">{errors.date_achat}</div>}

            </div>
                                                

                                               
                                                


                                                
                                               
                                                
                                                
                                               
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="secondary" onClick={toggleAddPackagingMarchandiseModal}>Fermer</Button>
                                                <Button type="button" color="primary" onClick={handleAddIngredientMarchandise}>Ajouter </Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modification </ModalHeader>
                <form className="tablelist-form">
                
                <ModalBody>
                    <div className="mb-3">
                        <label htmlFor="name_marchandise-field" className="form-label">Nom Marchandise</label>
                        <input type="text" id="name_marchandise-field" className="form-control" placeholder="Entrer Nom" value={editedNameMarchandise} onChange={(e) => setEditedNameMarchandise(e.target.value)} required />
                        {errors.nom && <div className="text-danger">{errors.nom}</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="ref-field" className="form-label">Referance</label>
                        <input type="text" id="ref-field" className="form-control" placeholder="Entrer Referance" value={editedRefMarchandise} onChange={(e) => setEditedRefMarchandise(e.target.value)} required />
                        {errors.reference && <div className="text-danger">{errors.reference}</div>}

                    </div>
                    <div className="mb-3">
            <label htmlFor="name_ingredient-field" className="form-label">Packaging:</label>
            <select
                id="name_ingredient-field"
                className="form-control"
                value={editedNamePackaging}
                onChange={(e) => setEditedNamePackaging(e.target.value)}
            >
                {packagings.map((packaging) => (
                    <option key={packaging.id} value={packaging.id}>
                        {packaging.name_packaging}
                    </option>
                ))}
            </select>
            {errors.id_packaging && <div className="text-danger">{errors.id_packaging}</div>}

        </div>
        <div className="mb-3">
            <label htmlFor="dimension-field" className="form-label">Dimension:</label>
            
            <input   
            id="dimension-field"
            className="form-control"
            value={editedDimension}
            onChange={(e) => setEditedDimension(e.target.value)}
            disabled
            
            />
            
        </div>


        <div className="mb-3">
            <label htmlFor="unite_id-field" className="form-label">Unite de mesuure:</label>
            <select
                id="unite_id-field"
                className="form-control"
                value={editedUnitIngredient}
                onChange={(e) => setEditedUnitIngredient(e.target.value)}
            >
                 <option value="">Sélectionner une Unité</option>

                {unites.map((unite) => (
                    <option key={unite.id} value={unite.id}>
                        {unite.name_unite}
                    </option>
                ))}
            </select>
            {errors.unite_id && <div className="text-danger">{errors.unite_id}</div>}

        </div>
        <div className="mb-3">
            <label htmlFor="name_fournisseur-field" className="form-label">Fournisseur:</label>
            <select
                id="name_fournisseur-field"
                className="form-control"
                value={editedNameFournisseur}
                onChange={(e) => setEditedNameFournisseur(e.target.value)}
            >
                  <option value="">Sélectionner un fournisseur</option>

                {fournisseurs.map((fournisseur) => (
                    <option key={fournisseur.id} value={fournisseur.id}>
                        {fournisseur.nom}
                    </option>
                ))}
            </select>
            {errors.id_fournisseur && <div className="text-danger">{errors.id_fournisseur}</div>}

        </div>

                    <div className="mb-3">
                        <label htmlFor="quantite-field" className="form-label">Quantité Achetée</label>
                        <input type="number" id="quantite-field" className="form-control" placeholder="Enter la =quatité" value={editedQuantiteAcheteeMarchandise || "0" } onChange={(e) => setEditedQuantiteAcheteeMarchandise(e.target.value)} required />
                        {errors.quantite_achetee && <div className="text-danger">{errors.quantite_achetee}</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantite-field" className="form-label">Nombre de Package En Stock</label>
                        <input type="number" id="quantite-field" className="form-control" placeholder="Enter la =quatité" value={editedQuantiteEnStockMarchandise || "0" } onChange={(e) => setEditedQuantiteEnStockMarchandise(e.target.value)} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantite-field" className="form-label">Nombre de Package Utilisés</label>
                        <input type="number" id="quantite-field" className="form-control" placeholder="Enter la =quatité" value={editedQuantiteConsomeeMarchandise || "0" } onChange={(e) => setEditedQuantiteConsomeeMarchandise(e.target.value)} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="prix-field" className="form-label">Prix</label>
                        <input type="number" id="prix-field" className="form-control" placeholder="Enter la prix" value={editedPrixMarchandise} onChange={(e) => setEditedPrixMarchandise(e.target.value)} required />
                        {errors.prix && <div className="text-danger">{errors.prix}</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="date-field" className="form-label">Date d'achat</label>
                        <input type="date" id="date-field" className="form-control" placeholder="Enter la date" value={editedDateMarchandise} onChange={(e) => setEditedDateMarchandise(e.target.value)} required />
                        {errors.date_achat && <div className="text-danger">{errors.date_achat}</div>}

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
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail </ModalHeader>
                <ModalBody>
                    {selectedPackagingMarchandise && (
                        <form className="tablelist-form">
                            <div className="mb-3">
                                <label htmlFor="name_marchandise-field" className="form-label">Nom Marchandise</label>
                                <input type="text" id="name_marchandise-field" className="form-control" value={selectedPackagingMarchandise.nom} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ref-field" className="form-label">Referance</label>
                                <input type="text" id="ref-field" className="form-control" value={selectedPackagingMarchandise.reference} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name_packaging-field" className="form-label">Nom Packaging</label>
                                <input type="text" id="name_packaging-field" className="form-control" value={selectedPackagingMarchandise.packaging ? selectedPackagingMarchandise.packaging.name_packaging: 'No'} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dimension-field" className="form-label">Dimension</label>
                                <input type="text" id="dimension-field" className="form-control" value={selectedPackagingMarchandise.packaging ? selectedPackagingMarchandise.packaging.dimension: 'No'} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="unite_id-field" className="form-label">Unite de mesure </label>
                                <input type="text" id="unite_id-field" className="form-control" value={selectedPackagingMarchandise.unite ? selectedPackagingMarchandise.unite.name_unite : 'No'} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name_fournisseur-field" className="form-label">Foufnisseur </label>
                                <input type="text" id="name_fournisseur-field" className="form-control" value={selectedPackagingMarchandise.fournisseur ? selectedPackagingMarchandise.fournisseur.nom : 'No'} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantite-field" className="form-label">Quantite Achetées</label>
                                <input type="text" id="quantite-field" className="form-control" value={selectedPackagingMarchandise.quantite_achetee || "0" } readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantite-field" className="form-label">Nombre de Package En Stock</label>
                                <input type="text" id="quantite-field" className="form-control" value={selectedPackagingMarchandise.quantite_en_stock || "0" } readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantite-field" className="form-label">Nombre de Package Utilisés</label>
                                <input type="text" id="quantite-field" className="form-control" value={selectedPackagingMarchandise.quantite_consomee || "0" } readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prix-field" className="form-label">Prix</label>
                                <input type="text" id="prix-field" className="form-control" value={selectedPackagingMarchandise.prix} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date-field" className="form-label">Date d'achat</label>
                                <input type="text" id="date-field" className="form-control" value={selectedPackagingMarchandise.date_achat} readOnly />
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
        

                    {selectedPackagingMarchandise && (
                        <p>Êtes-vous sûr de vouloir supprimer cette marchandise: {selectedPackagingMarchandise.nom}?</p>
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
    
    
    
    
 


















    
    
    
    
    
    
    
   

export default MarchandisePackagingListTable;
