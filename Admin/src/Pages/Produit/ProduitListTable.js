import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card,Alert, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addProduit, deleteProduit, updateProduit,getAllProduit } from '../../store/produit/gitProduitSlice';
import { getAllData} from '../../store/categorie/gitCategorySlice';
import { getAllPackaging} from '../../store/Packagings/gitPackagingSlice';
import { getAllDataIngredient } from '../../store/ingredient/GitIngredientSlice';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';






const ProduitTables = () => {
    

    const dispatch = useDispatch();
    const produits = useSelector(state => state.gitProduit.produits);
    const categories = useSelector((state) => state.gitCategory.categories);
    const ingredients = useSelector(state => state.gitIngredient.ingredients);
    const packagings = useSelector(state => state.gitPackaging.packagings);


    const [ setHoverShow] = useState(false);
    const [ setHoverEdit] = useState(false);
    const [ setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(produits.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateProduits = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return produits.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };


    const [modal_list, setmodal_list] = useState(false);
    const [editProduit, setEditProduit] = useState(null);
    const [editedNameProduit, setEditedNameProduit] = useState('');
    const [editedNameIngredient, setEditedNameIngredient] = useState('');
    const [editedNamePackaging, setEditedNamePackaging] = useState('');
    const [editedNombrePackage, setEditedNombrePackage] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null); // State to store selected 
    
    const [selectedPackaging, setSelectedPackaging] = useState(null); // State to store selected 
    const [editedPhotoIngredient, setEditedPhotoIngredient] = useState(""); // Store the file itself, initialize as null
    const [editedPhotoPackaging, setEditedPhotoPackaging] = useState(""); // Store the file itself, initialize as null


    const [editedQuantite, setEditedQuantite] = useState(null);
    const [editedMargeProduit, setEditedMargeProduit] = useState('');
    const [editedIdCategorieProduit, setEditedIdCategorieProduit] = useState(null); // Store the file itself, initialize as null
    
    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);


    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedProduit, setSelectedProduit] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddProduit, setModalAddProduit] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
        Success: state.gitProduit.Success,
        errorMessage: state.gitProduit.errorMessage,
        produits
      }));
     

      const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
    
    

    
    const [newProduitData, setNewProduitData] = useState({
        name_produit: '',
        marge: '',
        id_categorie: '', 
        id_ingredient: '', 

        
        
       
    });

   
    

//
    
    useEffect(() => {
        dispatch(getAllProduit());
        dispatch(getAllData());
        dispatch(getAllPackaging());
        dispatch(getAllDataIngredient());

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

    
    const toggleAddProduitModal = () => {
        setModalAddProduit(!modalAddProduit);
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
    const toggleConfirmAdd = () => {
        setModalConfirmAdd(!modal_confirm_add);
    }
    const toggleConfirmEdit = () => {
        setModalConfirmEdit(!modal_confirm_edit);
    }
    
    const resetEditModal = () => {
      
        setEditedNameIngredient("");
        setEditedQuantite("");
        setEditedPhotoIngredient("");
        setEditedNamePackaging("");
        setEditedNombrePackage("");
        setEditedPhotoPackaging("");
    };
    
    
    
    
    
    const openDeleteModal = (produit) => {
        setSelectedProduit(produit);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteProduit(selectedProduit.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
            window.location.reload()

        },  3000);  
    }





    const openEditModal = (produit) => {
        setEditProduit(produit);
        setEditedNameProduit(produit.name_produit);
        setEditedMargeProduit(produit.marge);
        setEditedIdCategorieProduit(produit.id_categorie);
        
        // Assuming there's only one ingredient and packaging for each product
        if (produit.ingredients.length > 0) {
            const ingredient = produit.ingredients[0];
            setEditedNameIngredient(ingredient.pivot.id_ingredient);
            setEditedQuantite(ingredient.pivot.quantite);
            setEditedPhotoIngredient(ingredient.photo);

        }
    
        if (produit.packagings.length > 0) {
            const packaging = produit.packagings[0];
            setEditedNamePackaging(packaging.pivot.id_packaging);
            setEditedNombrePackage(packaging.pivot.nombre_package);
            setEditedPhotoPackaging(packaging.photo);

        }

    
        toggleListModal();
        
    };


    const closeEditModal = () => {
        resetEditModal();
        toggleListModal();
    };
    

    


    const handleUpdate = () => {
        const selectedIngredientId = editedNameIngredient;
        const selectedPackagingId = editedNamePackaging;
        const nombrePackage = editedNombrePackage;
        const quantity = editedQuantite;
        const photoIngredient = editedPhotoIngredient;
        const photoPackaging = editedPhotoPackaging;

        

    
        if (!selectedIngredientId || !quantity || !selectedPackagingId || !nombrePackage) {
            return;
        }
    
        const updatedData = {
            name_produit: editedNameProduit,
            marge: editedMargeProduit,
            id_categorie: editedIdCategorieProduit,
            ingredients: [
                {
                    id_ingredient: selectedIngredientId, // Assuming selectedIngredientId contains the selected ingredient's ID
                    quantite: editedQuantite,
                    photo:photoIngredient,
                }
            ],
            packagings: [
                {
                    id_packaging: selectedPackagingId, // Assuming selectedPackagingId contains the selected packaging's ID
                    nombre_package: parseInt(editedNombrePackage), // Ensure nombre_package is an integer
                    photo:photoPackaging,
                }
            ]
        };
    
        // Dispatch the action to update the product
        dispatch(updateProduit({ id: editProduit.id, produitData: updatedData }));
    
        // Close modal and refresh page after a delay
        setTimeout(() => {
            toggleListModal();
            toggleConfirmEdit();
            window.location.reload();
        }, 4000);
    };
    
    



   
    const openShowModal = (produit) => {
        setSelectedProduit(produit); // Set the selected product
       
        
        setModalShow(true); // Open the show modal
    }




    const handleAddProduit = () => {
        const selectedIngredientId = editedNameIngredient;
        const selectedPackagingId = editedNamePackaging;
        const nombrePackage = editedNombrePackage;

        const quantity = editedQuantite;
        
        if (!selectedIngredientId || !quantity) {
            return;
        }
        if (!selectedPackagingId || !nombrePackage) {
            return;
        }
    
        const insertedProduitIngredient = {
            id: editProduit ? editProduit.id : null,
            ingredients: [
                {
                    id_ingredient: selectedIngredientId,
                    quantite: quantity
                }
            ],
            packagings: [
                {
                    id_packaging: selectedPackagingId,
                    nombre_package: nombrePackage
                }
            ]
        };
    
        const formData = new FormData();
        formData.append('name_produit', newProduitData.name_produit);
        formData.append('marge', newProduitData.marge);
        formData.append('id_categorie', newProduitData.id_categorie);
    
        // Append each ingredient separately to formData
        insertedProduitIngredient.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][id_ingredient]`, ingredient.id_ingredient);
            formData.append(`ingredients[${index}][quantite]`, ingredient.quantite);
        });
        insertedProduitIngredient.packagings.forEach((packaging, index) => {
            formData.append(`packagings[${index}][id_packaging]`, packaging.id_packaging);
            formData.append(`packagings[${index}][nombre_package]`, packaging.nombre_package);
        });
    
        dispatch(addProduit(formData))
        
        setNewProduitData({
            name_produit: '',
            marge: '',
            id_categorie: '',
        });
        setTimeout(() => {
            toggleAddProduitModal();
            toggleConfirmAdd();
        }, 3000);    };
    


return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Packagings" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Produits</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddProduitModal}
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
                        <th className="sort" data-sort="Produit-Id">ID</th>
                        <th className="sort" data-sort="Produit-name_produit">Nom Produit</th>
                        <th className="sort" data-sort="Produit-marge">Marge</th>
                        <th className="sort" data-sort="Produit-id_categorie">Name categorie</th>
                        <th className="sort" data-sort="Produit-id_categorie">Name ingredient</th>
                        <th className="sort" data-sort="Produit-id_categorie">Photo</th>

                        <th className="sort" data-sort="Produit-id_categorie">Quantite</th>
                        <th className="sort" data-sort="Produit-id_categorie">Name Packaging</th>
                        <th className="sort" data-sort="Produit-id_categorie">Photo</th>

                        <th className="sort" data-sort="Produit-id_categorie">Nombre package</th>



                        <th className="sort" data-sort="action">Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="list form-check-all">
                    {/* Display current items */}
                    {paginateProduits().length > 0 ? (
                        paginateProduits().map(produit => (
                            <tr key={produit.id}>
                                <th scope="row" onClick={() => openShowModal(produit)}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                    </div>
                                </th>
                                <td onClick={() => openShowModal(produit)}>{produit.id}</td>
                                <td onClick={() => openShowModal(produit)}>{produit.name_produit}</td>
                                <td onClick={() => openShowModal(produit)}>{produit.marge }</td>
                                <td onClick={() => openShowModal(produit)}>{produit.categorie ? produit.categorie.name : 'No'}</td> 
                                <td onClick={() => openShowModal(produit)}>
                                {produit.ingredients && produit.ingredients.length > 0 ? produit.ingredients[0].name_ingredient : 'No'}
                                </td>
                                <td onClick={() => openShowModal(produit)}>
  {produit.ingredients && produit.ingredients.length > 0 ? 
    produit.ingredients[0].photo ? (
      <img
        src={produit.ingredients[0].photo.replace('ingredients', '')} // Remove the 'ingredients' prefix
        alt={produit.ingredients[0].name_ingredient}
        style={{ width: "50px", height: "50px" }}
      />
    ) : (
      "No photo"
    )
  : 'No'}
</td>

                                <td onClick={() => openShowModal(produit)}>
                                {produit.ingredients && produit.ingredients.length > 0 ? produit.ingredients[0].pivot.quantite : 'No'}
                                </td>
                                <td onClick={() => openShowModal(produit)}>
                                {produit.ingredients && produit.ingredients.length > 0 ? produit.packagings[0].name_packaging : 'No'}
                                </td>
                                <td onClick={() => openShowModal(produit)}>
  {produit.packagings && produit.packagings.length > 0 ? 
    produit.packagings[0].photo ? (
      <img
        src={produit.packagings[0].photo.replace('packagings', '')} // Remove the 'ingredients' prefix
        alt={produit.packagings[0].name_ingredient}
        style={{ width: "50px", height: "50px" }}
      />
    ) : (
      "No photo"
    )
  : 'No'}
</td>
                                <td onClick={() => openShowModal(produit)}>
                                {produit.ingredients && produit.ingredients.length > 0 ? produit.packagings[0].pivot.nombre_package : 'No'}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                    <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(produit)}
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
                                                            onClick={() => openEditModal(produit)}
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
                                                            onClick={() => openDeleteModal(produit)}
                                                            onMouseEnter={() => setHoverRemove(true)}
                                                            onMouseLeave={() => setHoverRemove(false)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                            {/* {hoverRemove ? " Supprimer" : ""} */}
                                                        </Button>
                                                                            </div>
                                                                        </td>
                                                                    <td> </td>
                                                                    </tr>
                                                                )) 
                                                            )
                                                                : 
                                                               ( <tr><td colSpan="7">Pas de produit pour l'instant</td></tr>
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
            <Modal isOpen={modalAddProduit} toggle={toggleAddProduitModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddProduitModal}>Ajout</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                           


                                                
                                                
                                                <div className="mb-3">
                                                    <label htmlFor="name_produit-field" className="form-label">Nom Produit</label>
                                                    <input type="text" id="name_produit-field" className="form-control" placeholder="Enter Name" value={newProduitData.name_produit} onChange={(e) => setNewProduitData({ ...newProduitData, name_produit: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">Catégorie:</label>
                <select
                    id="categorie-field"
                    className="form-control"
                    value={newProduitData.id_categorie}
                    onChange={(e) => setNewProduitData({ ...newProduitData, id_categorie: e.target.value })}
                >
                    <option value="">Sélectionner une catégorie</option>
                   
                    {categories.map((categorie) => (
                          <option key={categorie.id} value={categorie.id}>
                          {categorie.name ? categorie.name : 'No'}
                      </option>

                    ))}
                </select>
            </div>
                                                <div className="mb-3">
                                                    <label htmlFor="marge-field" className="form-label">Marge</label>
                                                    <input type="text" id="marge-field" className="form-control" placeholder="Enter La description" value={newProduitData.marge} onChange={(e) => setNewProduitData({ ...newProduitData, marge: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                <label htmlFor="name_ingredient-field" className="form-label">Ingredient:</label>
                <select
                    id="name_ingredient-field"
                    className="form-control"
                    value={editedNameIngredient}
                    onChange={(e) => setEditedNameIngredient(e.target.value)}
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
                        <div className="mb-3">
                <label htmlFor="name_packaging-field" className="form-label">Packaging:</label>
                <select
                    id="name_packaging-field"
                    className="form-control"
                    value={editedNamePackaging}
                    onChange={(e) => setEditedNamePackaging(e.target.value)}
                >
                    <option value="">Sélectionner des packagings</option>
                    {packagings.map((packaging) => (
                        <option key={packaging.id} value={packaging.id}>
                            {packaging.name_packaging}
                        </option>
                    ))}
                </select>
            </div>     
            <div className="mb-3">
                            <label htmlFor="nombre_package-field" className="form-label">Nombre Package</label>
                            <input type="text" id="nombre_package-field" className="form-control" placeholder="Enter la marge" value={editedNombrePackage} onChange={(e) => setEditedNombrePackage(e.target.value)} required />
                        </div>                                                                            
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddProduitModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={toggleConfirmAdd}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier Produit </ModalHeader>
                <form className="tablelist-form">
                
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="name-field" className="form-label">Nom Produit</label>
                            <input type="text" id="name_produit-field" className="form-control" placeholder="Entrer Nom" value={editedNameProduit} onChange={(e) => setEditedNameProduit(e.target.value)} required />
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
            </div>

                        <div className="mb-3">
                            <label htmlFor="marge-field" className="form-label">Marge</label>
                            <input type="text" id="marge-field" className="form-control" placeholder="Enter la marge" value={editedMargeProduit} onChange={(e) => setEditedMargeProduit(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">Ingredient:</label>
<div className="row">
  <div className="col-md-9">
    <select
      id="ingredient-field"
      className="form-control"
      value={editedNameIngredient}
      onChange={(e) => {
        setEditedNameIngredient(e.target.value);
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

             <div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">packaging:</label>
<div className="row">
  <div className="col-md-9">
    <select
      id="ingredient-field"
      className="form-control"
      value={editedNamePackaging}
      onChange={(e) => {
        setEditedNamePackaging(e.target.value);
        const selected = packagings.find(packaging => packaging.id === parseInt(e.target.value));
        setSelectedPackaging(selected);
      }}
    >
      <option value="">Sélectionner un package</option>
      {packagings.map((packaging) => (
        <option key={packaging.id} value={packaging.id}>
          {packaging.name_packaging}
        </option>
      ))}
    </select>
  </div>
  <div className="col-md-3 d-flex align-items-center justify-content-center">
   
  </div>
</div>

</div>
<div className="mb-3">
                            <label htmlFor="quantite-field" className="form-label">Nombre package</label>
                            <input type="text" id="quantite-field" className="form-control" placeholder="Enter le nombre de package" value={editedNombrePackage} onChange={(e) => setEditedNombrePackage(e.target.value)} required />
             </div>



             <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
             <div class="d-flex justify-content-between">
    {editedPhotoIngredient ? (

        <div className="d-flex align-items-center">
            <img
                src={editedPhotoIngredient.replace('ingredients', '')}
                alt={setEditedNameIngredient.name_ingredient}
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
             
             
             
             
             
             
             
             
             
             
             
             
             <div class="d-flex justify-content-between">
             {editedPhotoPackaging ? (

             <div className="d-flex align-items-center">
            <img
                src={editedPhotoPackaging.replace('packagings', '')}
                alt={setEditedNamePackaging.name_packaging}
                style={{ width: "50px", height: "50px", marginTop: "5px", marginLeft: "18px" }}
                className="align-self-center"
            />
        </div>
        ) : (
            <div  style={{  marginRight: "30px"  , marginTop:"20px"}}>No photo</div>
        )}
        <span style={{ fontWeight: "bold", marginLeft: "10px" ,marginTop:"20px"}}>➔</span>


    {selectedPackaging && selectedPackaging.photo ? (
        <div className="d-flex align-items-center">
            <img
                src={selectedPackaging.photo.replace('packagings', '')}
                alt={selectedPackaging.name_packaging}
                style={{ width: "50px", height: "50px", marginBottom: "5px", marginRight: "20px" }} // Increased margin to the right side
                className="align-self-center" // Centering the image horizontally within the flex container
            />
        </div>
    ) : (
        <div  style={{ marginLeft: "30px" , marginTop:"20px"}}>No photo</div>
    )}
</div>



</div>


             
            
                         
                        



                       
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={closeEditModal}>Fermer</button>
                            <button type="button" className="btn btn-success" onClick={toggleConfirmEdit}>Mettre à jour</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>







             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Packaging</ModalHeader>
                <ModalBody>
    {selectedProduit && (
        <form className="tablelist-form">
            <div className="mb-3">
                <label htmlFor="nom_produit-field" className="form-label">Nom Produit</label>
                <input type="text" id="name_produit-field" className="form-control" value={selectedProduit.name_produit} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">Catégorie</label>
                <input type="text" id="categorie-field" className="form-control" value={selectedProduit.categorie ? selectedProduit.categorie.name : 'No'} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="marge-field" className="form-label">Marge</label>
                <input type="text" id="marge-field" className="form-control" value={selectedProduit.marge} readOnly />
            </div>
            <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
    {selectedProduit.ingredients && selectedProduit.ingredients.length > 0 && (
        <div style={{ marginRight: '10px' }}>
            <label htmlFor="ingredient-field" className="form-label">Ingrédient</label>
            <input type="text" id="ingredient-field" className="form-control" value={selectedProduit.ingredients[0].name_ingredient} readOnly />
        </div>
    )}
    {selectedProduit.packagings && selectedProduit.packagings.length > 0 && (
        <div>
            <label htmlFor="packaging-field" className="form-label">Packaging</label>
            <input type="text" id="packaging-field" className="form-control" value={selectedProduit.packagings[0].name_packaging} readOnly />
        </div>
    )}
</div>

<div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
    {selectedProduit.ingredients && selectedProduit.ingredients.length > 0 && selectedProduit.ingredients[0].pivot.quantite && (
        <div style={{ marginRight: '10px' }}>
            <label htmlFor="quantite-field" className="form-label">Quantite</label>
            <input type="text" id="quantite-field" className="form-control" value={selectedProduit.ingredients[0].pivot.quantite} readOnly />
        </div>
    )}
    {selectedProduit.packagings && selectedProduit.packagings.length > 0 && selectedProduit.packagings[0].pivot.nombre_package && (
        <div>
            <label htmlFor="nombre-package-field" className="form-label">Nombre package</label>
            <input type="text" id="nombre-package-field" className="form-control" value={selectedProduit.packagings[0].pivot.nombre_package} readOnly />
        </div>
    )}
</div>

{/* Display photos */}

<div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
    
<div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>

    {selectedProduit.ingredients && selectedProduit.ingredients.length > 0 && selectedProduit.ingredients[0].photo && (
        <div>
            <img
                src={selectedProduit.ingredients[0].photo.replace('ingredients', '')} // Remove the 'ingredients' prefix
                alt={selectedProduit.ingredients[0].name_ingredient}
                style={{ width: "50px", height: "50px"}} // Adjust size as needed
            />
        </div>
    )}
    </div>
    <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' ,marginRight: "25%"}}>

    {selectedProduit.packagings && selectedProduit.packagings.length > 0 && selectedProduit.packagings[0].photo && (
        <div>
            <img
                src={selectedProduit.packagings[0].photo.replace('packagings', '')} // Remove the 'packagings' prefix
                alt={selectedProduit.packagings[0].name_packaging}
                style={{ width: "50px", height: "50px" }} // Adjust size as needed
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




 {/* confirm edit Modal */}

 <Modal isOpen={modal_confirm_edit} toggle={toggleConfirmEdit} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleConfirmEdit}>Confirmer l'ajout</ModalHeader>
                {showSuccessMessage && Success ? (
                                    <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                                    Produit modifié avec succès...
                                    </Alert>
                                    
                                ) : null}

{errorMessage && <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>Une erreur s'est produite,Ressayez ultirierement</div>}

                <ModalBody>
                    
                        <p>Êtes-vous sûr de vouloir editer ce produit </p>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleConfirmEdit}>Retour</Button>
                    <Button color="primary" onClick={handleUpdate}>Modifier</Button>
                </ModalFooter>
            </Modal>





            {/* confirm add Modal */}

            <Modal isOpen={modal_confirm_add} toggle={toggleConfirmAdd} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleConfirmAdd}>Confirmer l'ajout</ModalHeader>

                {showSuccessMessage && Success ? (

                                    <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                                    Produit ajouté avec succès                                    
                                    </Alert>
                                                                ) : null}
    

{errorMessage && <div className="alert alert-danger"  style={{ width:'80%' , margin: '20px auto 0'}}>Une erreur s'est produite, Ressayez ultirierement</div>}

                <ModalBody>
                    
                        <p>Êtes-vous sûr de vouloir ajouter ce produit </p>
                   
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleConfirmAdd}>Retour</Button>
                    <Button color="primary" onClick={handleAddProduit}>Ajouer</Button>
                </ModalFooter>
            </Modal>




            {/* Remove Modal */}
            
            <Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleDeleteModal}>Confirmer la suppression</ModalHeader>
                {showSuccessMessage && Success ? (
                                    <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                                    Produit supprimé avec succès                                    
                                    </Alert>
                                    
                                ) : null}

{errorMessage && <div className="alert alert-danger"  style={{ width:'80%' , margin: '20px auto 0'}}>Une erreur s'est produite, Ressayez ultirierement</div>}

                <ModalBody>
                    {selectedProduit && (
                        <p>Êtes-vous sûr de vouloir supprimer le produit {selectedProduit.name_produit}?</p>
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
    
    
    
    






    
   

export default ProduitTables;
