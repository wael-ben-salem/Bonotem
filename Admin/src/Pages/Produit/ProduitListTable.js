import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addProduit, deleteProduit, getProduitDetails, updateProduit,getAllProduit } from '../../store/produit/gitProduitSlice';
import { getAllData} from '../../store/categorie/gitCategorySlice';






const CategoryTables = () => {
    

    const dispatch = useDispatch();
    const produits = useSelector(state => state.gitProduit.produits);
    const categories = useSelector((state) => state.gitCategory.categories);



    const [modal_list, setmodal_list] = useState(false);
    const [editProduit, setEditProduit] = useState(null);
    const [editedNameProduit, setEditedNameProduit] = useState('');
    const [editedMargeProduit, setEditedMargeProduit] = useState('');
    const [editedIdCategorieProduit, setEditedIdCategorieProduit] = useState(null); // Store the file itself, initialize as null
    
    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedProduit, setSelectedProduit] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddProduit, setModalAddProduit] = useState(false);

    
    const [newProduitData, setNewProduitData] = useState({
        name_produit: '',
        marge: '',
        id_categorie: '', 
        
       
    });
    

//
    
    useEffect(() => {
        dispatch(getAllProduit());
        dispatch(getAllData());
    }, [dispatch]);



    
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
    
    
    
    
    
    
    const openDeleteModal = (produit) => {
        setSelectedProduit(produit);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteProduit(selectedProduit.id)); // Dispatch deleteUser action with the selected user's ID
        toggleDeleteModal();
    }





    const openEditModal = (produits) => {
        setEditProduit(produits);
        setEditedNameProduit(produits.name_produit);
        setEditedMargeProduit(produits.marge);
        setEditedIdCategorieProduit(produits.id_categorie); 
        
        toggleListModal();

    };

    const handleUpdate = () => {
        const updatedProduit = {
            id: editProduit.id,
            name_produit: editedNameProduit,
            marge: editedMargeProduit,
            id_categorie: editedIdCategorieProduit,
            
        };
    
        dispatch(updateProduit({ id: editProduit.id, produitData: updatedProduit }));
    
        toggleListModal();
    };


   
    const openShowModal = (produit) => {
        setSelectedProduit(produit); // Set the selected product
        const category = categories.find(c => c.id === produit.id_categorie); // Find the category corresponding to the product's category ID
        setSelectedProduit({
            ...produit,
            categoryName: category ? category.name : 'Catégorie inconnue' // Add categoryName property to selected product
        });
        setModalShow(true); // Open the show modal
    }






const handleAddProduit = () => {
    const formData = new FormData();
    formData.append('name_produit', newProduitData.name_produit);
    formData.append('marge', newProduitData.marge);
    formData.append('id_categorie', newProduitData.id_categorie); // Append the file to the form data
    
    dispatch(addProduit(formData)); 
    
    // Reset the state
    setNewProduitData({
        name_produit: '',
        marge: '',
        id_categorie: '',
    });
    toggleAddProduitModal();
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
                                    <h4 className="card-title mb-0">Gérer les Produits</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button color="success" className="add-btn"  onClick={toggleAddProduitModal} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Ajouter</Button>
                                                
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
                                                        <th className="sort" data-sort="Produit-Id">ID</th>
                                                        <th className="sort" data-sort="Produit-name_produit">Nom Produit</th>
                                                        <th className="sort" data-sort="Produit-marge">Marge</th>
                                                        <th className="sort" data-sort="Produit-id_categorie">Name categorie</th>
                                                        
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {produits && produits.length > 0 ? 
                                                        produits.map(produit => (
                                                            <tr key={produit.id} >
                                                                <th scope="row" onClick={() => openShowModal(produits)}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                <td onClick={() => openShowModal(produit)}>{produit.id}</td>
                                                                <td onClick={() => openShowModal(produit)}>{produit.name_produit}</td>
                                                                <td onClick={() => openShowModal(produit)}>{produit.marge }</td>
                                                                <td onClick={() => openShowModal(produit)}>{produit.categorie ? produit.categorie.name : 'No'}</td> 


                                                                
                                                                
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="show">
                                                                            <button className="btn btn-sm btn-dark show-item-btn" onClick={() => openShowModal(produit)}>Details</button>
                                                                        </div>
                                                                        <div className="edit">
                                                                            <button className="btn btn-sm btn-success edit-item-btn" onClick={() => openEditModal(produit)}>Modifier</button>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <button className="btn btn-sm btn-danger remove-item-btn"onClick={() => { openDeleteModal(produit); }} >Supprimer</button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) 
                                                        : 
                                                        <tr><td colSpan="7">No Produits available</td></tr>
                                                    }
                                                </tbody>
                                            </table>
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
                                                


                                                
                                               
                                                
                                                
                                               
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddProduitModal}>Fermer</Button>
                                                <Button type="button" color="success" onClick={handleAddProduit}>Ajouter </Button>
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
                         
                        



                       
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={toggleListModal}>Fermer</button>
                            <button type="button" className="btn btn-success" onClick={handleUpdate}>Mettre à jour</button>
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
                            
                        
    



                            
                           
                        </form>
                    )}
                </ModalBody>
                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-light" onClick={toggleShowModal}>Fermer</button>
                        
                    </div>
                </ModalFooter>
            </Modal>


            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleDeleteModal}>Confirmer la suppression</ModalHeader>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default CategoryTables;
