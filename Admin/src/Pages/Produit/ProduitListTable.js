import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card,Alert, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addProduit, deleteProduit, updateProduit,getAllProduit } from '../../store/produit/gitProduitSlice';
import { getAllData} from '../../store/categorie/gitCategorySlice';
import { getAllPackaging} from '../../store/Packagings/gitPackagingSlice';
import { getAllDataIngredient } from '../../store/ingredient/gitIngredientSlice';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';






const ProduitTables = () => {
    

    const dispatch = useDispatch();
    const produits = useSelector(state => state.gitProduit.produits);
    const categories = useSelector((state) => state.gitCategory.categories);
    const ingredients = useSelector(state => state.gitIngredient.ingredients);
    const packagings = useSelector(state => state.gitPackaging.packagings);


    const [HoverShow ,setHoverShow] = useState(false);
    const [HoverEdit, setHoverEdit] = useState(false);
    const [HoverRemove , setHoverRemove] = useState(false);
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
    const [editedIdCategorieProduit, setEditedIdCategorieProduit] = useState(null); // Store the file itself, initialize as null
    
    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const [errors, setErrors] = useState({});


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
        id_categorie: '', 
        id_ingredient: '', 

        
        
       
    });

   
    

 const id = useSelector(state => state.login.user.id);

    
 useEffect(() => {
    dispatch(getAllProduit(id));
    dispatch(getAllData(id));
    dispatch(getAllPackaging(id));
    dispatch(getAllDataIngredient(id));
  }, [dispatch, id]);
    

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
    const toggleConfirmAdd = (isOpen) => {
        setModalConfirmAdd(isOpen);
    }
    const toggleConfirmEdit = (isOpen) => {
        setModalConfirmEdit(isOpen);
    }
    
    const resetEditModal = () => {
      
        setEditedNameIngredient("");
        setEditedQuantite("");
        setEditedPhotoIngredient("");
        setEditedNamePackaging("");
        setEditedNombrePackage("");
        setEditedPhotoPackaging("");
    };
    
    const validate = (data) => {
        const errors = {};
    
        if (!data.name_produit) {
            errors.name_produit = "Le nom est requis.";
        } else if (!/^[A-Za-z\s]+$/.test(data.name_produit)) {
            errors.name_produit = "Le nom doit contenir uniquement des lettres et des espaces.";
        }
    
        if (!data.id_categorie) {
            errors.id_categorie = "La Catégorie est requise.";
        }
    
        if (!data.quantite) {
            errors.quantite = "La quantité des ingrédients sélectionnés est requise.";
        }
       
    
        if (!(data.id_ingredient || data.id_packaging)) {
            errors.id_packaging = "La sélection des packagings est requise.";
            errors.id_ingredient = "La sélection des ingrédients est requise.";

        }
      
        if (!(data.nombre_package || data.quantite)) {
            errors.quantite = "La quantité des ingrédients sélectionnés est requise.";
            errors.nombre_package = "Le nombre de package des packaging ingrédients est requise.";
        }
    
        return errors;
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

        },  2000);  
    }


    const updateQuantiteAutomatique = (ingredientId) => {
        const selectedIngredient = editProduit.ingredients.find(ingredient => ingredient.pivot.id_ingredient === parseInt(ingredientId));
        if (selectedIngredient) {
            setEditedQuantite(selectedIngredient.pivot.quantite);
        }
    };
    
    // Fonction pour mettre à jour le nombre de package automatiquement
    const updateNombrePackageAutomatique = (packagingId) => {
        const selectedPackaging = editProduit.packagings.find(packaging => packaging.pivot.id_packaging === parseInt(packagingId));
        if (selectedPackaging) {
            setEditedNombrePackage(selectedPackaging.pivot.nombre_package);
        }
    };




    // const openEditModal = (produit) => {
    //     setEditProduit(produit);
    //     setEditedNameProduit(produit.name_produit);
    //     setEditedMargeProduit(produit.marge);
    //     setEditedIdCategorieProduit(produit.id_categorie);
        
    //     // Assuming there's only one ingredient and packaging for each product
    //     if (produit.ingredients.length > 0) {
    //         const ingredient = produit.ingredients[0];
    //         setEditedNameIngredient(ingredient.pivot.id_ingredient);
    //         setEditedQuantite(ingredient.pivot.quantite);
    //         setEditedPhotoIngredient(ingredient.photo);

    //     }
    
    //     if (produit.packagings.length > 0) {
    //         const packaging = produit.packagings[0];
    //         setEditedNamePackaging(packaging.pivot.id_packaging);
    //         setEditedNombrePackage(packaging.pivot.nombre_package);
    //         setEditedPhotoPackaging(packaging.photo);

    //     }

    
    //     toggleListModal();
        
    // };



        const openEditModal = (produit) => {
            setEditProduit(produit);
            setEditedNameProduit(produit.name_produit);
            setEditedIdCategorieProduit(produit.id_categorie);
            

            // Filtrer les ingrédients pour ne récupérer que ceux liés au produit avec l'ID 2
            const filteredIngredients = produit.ingredients.filter((ingredient) => ingredient.pivot.id_produit );
            if (filteredIngredients.length > 0) {
                const ingredient = filteredIngredients[0];
                setEditedNameIngredient(ingredient.pivot.id_ingredient);
                setEditedQuantite(ingredient.pivot.quantite);
                setEditedPhotoIngredient(ingredient.photo);
            }
        
            // Filtrer les packagings pour ne récupérer que ceux liés au produit avec l'ID 2
            const filteredPackagings = produit.packagings.filter((packaging) => packaging.pivot.id_produit);
            if (filteredPackagings.length > 0) {
                const packaging = filteredPackagings[0];
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
    

    
    const existingProduit = produits.find((produit) => produit.name_produit === newProduitData.name_produit);


    // const handleUpdate = () => {
    //     const selectedIngredientId = editedNameIngredient;
    //     const selectedPackagingId = editedNamePackaging;
    //     const nombrePackage = editedNombrePackage;
    //     const quantity = editedQuantite;
    //     const photoIngredient = editedPhotoIngredient;
    //     const photoPackaging = editedPhotoPackaging;

    
       
        

    
    //     if (!selectedIngredientId || !quantity || !selectedPackagingId || !nombrePackage) {
    //         return;
    //     }
    
    //     const updatedData = {
    //         name_produit: editedNameProduit,
    //         marge: editedMargeProduit,
    //         id_categorie: editedIdCategorieProduit,
    //         ingredients: [
    //             {
    //                 id_ingredient: selectedIngredientId, // Assuming selectedIngredientId contains the selected ingredient's ID
    //                 quantite: editedQuantite,
    //                 photo:photoIngredient,
    //             }
    //         ],
    //         packagings: [
    //             {
    //                 id_packaging: selectedPackagingId, // Assuming selectedPackagingId contains the selected packaging's ID
    //                 nombre_package: parseInt(editedNombrePackage), // Ensure nombre_package is an integer
    //                 photo:photoPackaging,
    //             }
    //         ]
    //     };
    
    //     // Dispatch the action to update the product
    //     dispatch(updateProduit({ id: editProduit.id, produitData: updatedData }));
    
    //     // Close modal and refresh page after a delay
    //     setTimeout(() => {
    //         toggleListModal();
    //         toggleConfirmEdit();
    //         window.location.reload();
    //     }, 4000);
    // };
    

    const handleUpdate = () => {
        const errors = validate({ 
            id_categorie: editedIdCategorieProduit, 
            name_produit: editedNameProduit, 
            id_packaging: editedNamePackaging, 
            id_ingredient: editedNameIngredient, 
            quantite: editedQuantite, 
            nombre_package: editedNombrePackage 
        });
        
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        setErrors({});
    
        const selectedIngredientId = editedNameIngredient;
        const selectedPackagingId = editedNamePackaging;
        const nombrePackage = editedNombrePackage;
        const quantity = editedQuantite;
        const photoIngredient = editedPhotoIngredient;
        const photoPackaging = editedPhotoPackaging;
    
        const updatedData = {
            name_produit: editedNameProduit,
            id_categorie: editedIdCategorieProduit
        };
    
        if (selectedIngredientId) {
            updatedData.ingredients = [
                {
                    id_ingredient: selectedIngredientId,
                    quantite: quantity,
                    photo: photoIngredient,
                }
            ];
        }
    
        if (selectedPackagingId) {
            updatedData.packagings = [
                {
                    id_packaging: selectedPackagingId,
                    nombre_package: parseInt(nombrePackage),
                    photo: photoPackaging,
                }
            ];
        }
    
        // Dispatch the action to update the product
        dispatch(updateProduit({ id: editProduit.id, produitData: updatedData }))
            .then(() => {
                // Réinitialiser l'état
                setEditProduit({
                    name_produit: '',
                    id_categorie: '', 
                    id_ingredient: '', 
                });
    
                // Fermer le modal
                toggleListModal();
    
                // Ouvrir le modal de confirmation
                toggleConfirmEdit(true);
            })
            .catch(error => {
                // Gérer l'erreur
                console.error("Error updating Produit:", error);
            })
            .finally(() => {
                // Désactiver le chargement après l'achèvement de l'action
            });
    };
    




    function chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }



   
    const openShowModal = (produit) => {
        setSelectedProduit(produit); // Set the selected product
       
        
        setModalShow(true); // Open the show modal
    }

    const defaultQuantite = "";
const defaultNombrePackage = "";


    const handleAddProduit = () => {
        const errors = validate({ 
            name_produit: newProduitData.name_produit, 
            id_categorie: newProduitData.id_categorie, 
            id_packaging: editedNamePackaging, 
            id_ingredient: editedNameIngredient, 
            quantite: editedQuantite, 
            nombre_package: editedNombrePackage 

        });
        
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        // Clear previous errors if any
        setErrors({});



        const selectedIngredientId = editedNameIngredient;
        const selectedPackagingId = editedNamePackaging;
        const nombrePackage = editedNombrePackage;
        const quantity = editedQuantite;
         // Si un produit correspondant est trouvé, mettre à jour l'ID de catégorie dans le state du nouveau produit
         if (existingProduit) {
            setNewProduitData({ ...newProduitData, id_categorie: existingProduit.id_categorie });

        }
    
        if ((!selectedIngredientId || !quantity) && (!selectedPackagingId || !nombrePackage)) {
            return; // Empêche l'ajout si aucune sélection n'est faite
        }
    
        const insertedProduitData = {
            name_produit: newProduitData.name_produit,
            
            id_categorie: existingProduit ? existingProduit.id_categorie : newProduitData.id_categorie,
        };
        
    
        const formData = new FormData();
        Object.entries(insertedProduitData).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
        if (selectedIngredientId && quantity) {
            const ingredientData = {
                id_ingredient: selectedIngredientId,
                quantite: quantity,
            };
    
            formData.append('ingredients[0][id_ingredient]', ingredientData.id_ingredient);
            formData.append('ingredients[0][quantite]', ingredientData.quantite);
        }
    
        if (selectedPackagingId && nombrePackage) {
            const packagingData = {
                id_packaging: selectedPackagingId,
                nombre_package: nombrePackage,
            };
    
            formData.append('packagings[0][id_packaging]', packagingData.id_packaging);
            formData.append('packagings[0][nombre_package]', packagingData.nombre_package);
        }
    
        dispatch(addProduit({ id: id, newProduitData: formData, insertedProduitIngredient: null, rejectWithValue: null }))
        .then(() => {
        
    
            // Réinitialiser l'état
            setNewProduitData({
                name_produit: '',
                id_categorie: '',
            });
        
                // Fermer le modal
                toggleAddProduitModal();
        
                // Ouvrir le modal de confirmation
                toggleConfirmAdd(true);
            })
            .catch(error => {
                // Gérer l'erreur
                console.error("Error updating Produit:", error);
            })
            .finally(() => {
                // Désactiver le chargement après l'achèvement de l'action
            });
        
        
    };
    


return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Produit" />

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
                        {/* <th className="sort" data-sort="Produit-Id">ID</th> */}
                        <th className="sort" data-sort="Produit-name_produit">Nom </th>
                        <th className="sort" data-sort="Produit-id_categorie">Nom categorie</th>
                        <th className="sort" data-sort="Produit-id_categorie">ingredients</th>

                        <th className="sort" data-sort="Produit-id_categorie">Packagings</th>




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
                {/* <td onClick={() => openShowModal(produit)}>{produit.id}</td> */}
                <td onClick={() => openShowModal(produit)}>{produit.name_produit}</td>
                <td onClick={() => openShowModal(produit)}>{produit.categorie ? produit.categorie.name : 'No'}</td> 
                <td onClick={() => openShowModal(produit)}>
    {produit.ingredients && produit.ingredients.length > 0 ? (
        <div className="d-flex flex-line">
            {produit.ingredients.slice(0, 3).map((ingredient, index) => (
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
            {produit.ingredients.length > 3 && (
                <p className="text-center mt-3"><strong>+{produit.ingredients.length - 3} </strong></p>
            )}
            </div>
        </div>
    ) : 'Pas d\'ingredient'}
</td>


<td onClick={() => openShowModal(produit)}>
    {produit.packagings && produit.packagings.length > 0 ? (
        <div className="d-flex flex-line">
            {produit.packagings.slice(0, 3).map((packaging, index) => (
                <div key={packaging.id} className="text-center mb-2">
                    {packaging.photo ? (
                        <div className="mb-1">

                        <img
                            src={packaging.photo.replace('packagings', '')}
                            alt={packaging.name_packaging}
                            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                        />
                        <p className="mb-0" style={{ fontSize: "10px" }}>{packaging.pivot.nombre_package}</p>
                        </div>
                    ) : (
                        "Pas de photo"
                    )}
                </div>
            ))}
            <div className="ms-4">

            {produit.packagings.length > 3 && (
                <p className="text-center mt-3"><strong>+{produit.packagings.length - 3} </strong></p>
            )}
            </div>
        </div>
    ) : 'Pas de Package'}
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
                <label htmlFor="name_produit-field" className="form-label">Nom </label>
                <input type="text" id="name_produit-field" className="form-control" placeholder="Enter Name" value={newProduitData.name_produit} onChange={(e) => setNewProduitData({ ...newProduitData, name_produit: e.target.value })} required />
                {errors.name_produit && <div className="text-danger">{errors.name_produit}</div>}

            </div>
            {existingProduit ? (
                <div className="mb-3">
                    <label htmlFor="categorie-field" className="form-label">Catégorie:</label>
                    <input type="text" className="form-control" onChange={(e) => setNewProduitData({ ...newProduitData, marge: e.target.value })} value={existingProduit.categorie.name} readOnly />
                    {errors.id_categorie && <div className="text-danger">{errors.id_categorie}</div>}

                </div>
            ) : (
                <div className="mb-3">
                    <label htmlFor="categorie-field" className="form-label">Nom Catégorie:</label>
                    <select
                        id="categorie-field"
                        className="form-control"
                        value={newProduitData.id_categorie}
                        onChange={(e) => setNewProduitData({ ...newProduitData, id_categorie: e.target.value })}
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






            
            {/* Ajouter Ingrédient */}
            <hr />
            <div className="mb-3">
                <div className="mb-3">
                    <label htmlFor="name_ingredient-field" className="form-label">Ingrédients:</label>
                    <select
                        id="name_ingredient-field"
                        className="form-control"
                        value={editedNameIngredient || ""}
                        onChange={(e) => setEditedNameIngredient(e.target.value)}
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
            {/* Ajouter Packaging */}
            <hr />
            <div className="mb-3">
                <div className="mb-3">
                    <label htmlFor="name_packaging-field" className="form-label">Packagings:</label>
                    <select
                        id="name_packaging-field"
                        className="form-control"
                        value={editedNamePackaging || ""}
                        onChange={(e) => setEditedNamePackaging(e.target.value)}
                    >
                        <option value="">Sélectionner un packagings</option>

                        {/* Options de packaging */}
                        {packagings.map((packaging) => (
                            <option key={packaging.id} value={packaging.id}>
                                {packaging.name_packaging}
                            </option>
                        ))}
                    </select>
                    {errors.id_packaging && <div className="text-danger">{errors.id_packaging}</div>}

                </div>
                <div className="mb-3">
                    <label htmlFor="nombre_package-field" className="form-label">Nombre Package</label>
                    <input type="number" id="nombre_package-field" className="form-control" placeholder="Entrez le nombre de packages" value={editedNombrePackage || ""} onChange={(e) => setEditedNombrePackage(e.target.value)} required />
                    {errors.nombre_package && <div className="text-danger">{errors.nombre_package}</div>}

                </div>
            </div>
        </form>
    </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddProduitModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={handleAddProduit}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







{/* Edit Modal */}
<Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modification </ModalHeader>
                <form className="tablelist-form">
               
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="name-field" className="form-label">Nom </label>
                            <input type="text" id="name_produit-field" className="form-control" placeholder="Entrer Nom" value={editedNameProduit} onChange={(e) => setEditedNameProduit(e.target.value)} required />
                            {errors.name_produit && <div className="text-danger">{errors.name_produit}</div>}

                        </div>
                        <div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">Nom Catégorie:</label>
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
                       
                       {editProduit && (
    <div className="mb-3">
        <label htmlFor="ingredient-field" className="form-label">Ingrédients:</label>
        <select
            id="ingredient-field"
            className="form-control"
            value={editedNameIngredient}
            onChange={(e) => {
                setEditedNameIngredient(e.target.value);
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
 
             {editProduit && (
    <div className="mb-3">
        <label htmlFor="packaging-field" className="form-label">Packagings:</label>
        <select
            id="packaging-field"
            className="form-control"
            value={editedNamePackaging}
            onChange={(e) => {
                setEditedNamePackaging(e.target.value);
                const selected = packagings.find(packaging => packaging.id === parseInt(e.target.value));
                setSelectedPackaging(selected);
                if (selected && selected.photo) {
                    setEditedPhotoPackaging(selected.photo);
                }else{
                    setEditedPhotoPackaging(null); // Set photo to null when "No photo" option is selected
        
                }
                if (e.target.value !== "") {
                    updateNombrePackageAutomatique(e.target.value);
                } else {
                    // Utiliser la valeur par défaut si aucune option n'est sélectionnée
                    setEditedNombrePackage(defaultNombrePackage);
                }
            }}
        >
            <option value="">Sélectionner un packaging</option>
            {packagings.map((packaging) => (
                <option key={packaging.id} value={packaging.id}>
                    {packaging.name_packaging}
                </option>
            ))}
        </select>
        {errors.id_packaging && <div className="text-danger">{errors.id_packaging}</div>}

    </div>
)}
<div className="mb-3">
                            <label htmlFor="quantite-field" className="form-label">Nombre de package</label>
                            <input type="text" id="quantite-field" className="form-control" placeholder="Enter le nombre de package" value={editedNombrePackage} onChange={(e) => setEditedNombrePackage(e.target.value)} required />
                            {errors.nombre_package && <div className="text-danger">{errors.nombre_package}</div>}

             </div>
 
 
 
             <div className="d-flex flex-column align-items-center" style={{ border: '2px solid rgba(0, 0, 0, 0.15)', padding: '10px', borderRadius: '8px' }}>
    <div className="d-flex justify-content-between align-items-center">
        {editedPhotoIngredient ? (
            <div className="d-flex align-items-center">
                <img
                    src={editedPhotoIngredient.replace('ingredients', '')}
                    alt=''
                    style={{ width: "50px", height: "50px",marginBottom: "2px", marginTop: "3px", marginLeft: "30px" }}
                    className="align-self-center"
                />
            </div>
        ) : (
            <div style={{ marginLeft: "30px", marginTop: "20px" }}>Pas de photo</div>
        )}
        {editedPhotoPackaging ? (
            <div className="d-flex align-items-center">
                <img
                    src={editedPhotoPackaging.replace('packagings', '')}
                    alt=''
                    style={{ width: "50px", height: "50px",  marginTop: "3px", marginBottom: "2px", marginRight: "20px" }}
                    className="align-self-center"
                />
            </div>
        ) : (
            <div style={{ marginLeft: "30px", marginTop: "20px" }}>Pas de photo</div>
        )}


    </div>

   
</div>

                         
                       
 
 
 
                       
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={closeEditModal}>Fermer</button>
                            <button type="button" className="btn btn-success" onClick={handleUpdate}>Mettre à jour</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
 
 
 
             








             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
    <ModalHeader className="bg-light p-3" toggle={toggleShowModal}>Détails</ModalHeader>
    <ModalBody>
    {selectedProduit && (
        <div>
            <div className="mb-3">
                <label htmlFor="nom_produit-field" className="form-label">Nom</label>
                <input type="text" id="name_produit-field" className="form-control" value={selectedProduit.name_produit} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="categorie-field" className="form-label">Nom Catégorie</label>
                <input type="text" id="categorie-field" className="form-control" value={selectedProduit.categorie ? selectedProduit.categorie.name : 'Pas de Categorie'} readOnly />
            </div>
            
            <hr />
            <div>
                <h5>Ingrédients</h5>
                <div className="d-flex flex-wrap gap-3">
                    {selectedProduit.ingredients && selectedProduit.ingredients.length > 0 ? (
                        chunkArray(selectedProduit.ingredients, 7).map((chunk, index) => (
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
            <div>
                <h5>Packagings</h5>
                <div className="d-flex flex-wrap gap-3">
                    {selectedProduit.packagings && selectedProduit.packagings.length > 0 ? (
                        chunkArray(selectedProduit.packagings, 7).map((chunk, index) => (
                            <div key={index} className="d-flex flex-wrap w-100">
                                {chunk.map(packaging => (
                                    <div key={packaging.id} className="text-center mb-2">
                                        {packaging.photo && (
                                            <div className="mb-1">
                                                <img
                                                    src={packaging.photo.replace('packagings', '')}
                                                    alt={packaging.name_packaging}
                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                />
                                                <p className="mb-0" style={{ fontSize: "10px" }}>{packaging.pivot.nombre_package}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>Aucun packaging trouvé</p>
                    )}
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
