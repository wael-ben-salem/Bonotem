import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addProduit, deleteProduit, getProduitDetails, updateProduit,getAllProduit } from '../../store/produit/gitProduitSlice';
import { getAllData} from '../../store/categorie/gitCategorySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';





const CategoryTables = () => {
    

    const dispatch = useDispatch();
    const produits = useSelector(state => state.gitProduit.produits);
    const categories = useSelector((state) => state.gitCategory.categories);



    const [modal_list, setmodal_list] = useState(false);
    const [editProduit, setEditProduit] = useState(null);
    const [editedNameProduit, setEditedNameProduit] = useState('');
    const [editedMargeProduit, setEditedMargeProduit] = useState('');
    const [editedIdCategorieProduit, setEditedIdCategorieProduit] = useState(null);
    
    const [modal_show, setModalShow] = useState(false); 
    const [selectedProduit, setSelectedProduit] = useState(null); 
    const [modal_delete, setModalDelete] = useState(false); 
    const [modalAddProduit, setModalAddProduit] = useState(false);

    
    const [newProduitData, setNewProduitData] = useState({
        name_produit: '',
        marge: '',
        id_categorie: '', 
        
       
    });
    


const [hover, setHover] = useState(false);
const [hoverShow, setHoverShow] = useState(false);
   const [hoverEdit, setHoverEdit] = useState(false);
   const [hoverRemove, setHoverRemove] = useState(false); 
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
    toggleDeleteModal(); 
    }

    const handleRemove = () => {
        dispatch(deleteProduit(selectedProduit.id)); 
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
                                    <h4 className="card-title mb-0">Gérer Produit</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                          <div className="d-flex gap-1">

                                           <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddProduitModal}
                                                onMouseEnter={() => setHover(true)}
                                                  onMouseLeave={() => setHover(false)}
                                                    id="create-btn">
                                                    <i className={hover ? "ri-add-fill align-bottom me-1" : "ri-add-line align-bottom me-1"}></i>
                                                    {hover ? "Ajouter" : ""}

                                              </Button>


                                              </div>

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
                                                        <th className="sort" data-sort="Produit-id_categorie">Nom categorie</th>
                                                        
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
                                                             <div className=" d-flex  gap-4">

                                                                         <Button
                                                                            color="soft-dark"
                                                                            size="sm"
                                                                            className="show-item-btn"
                                                                            onClick={() => openShowModal(produit)}
                                                                            onMouseEnter={() => setHoverShow(true)}
                                                                            onMouseLeave={() => setHoverShow(false)}
                                                                        >
                                                                            <FontAwesomeIcon icon={faEye} />
                                                                            {hoverShow ? " Consulter" : ""}
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
                                                                            {hoverEdit ? " Modifier" : ""}
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
                                                                            {hoverRemove ? " Supprimer" : ""}
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) 
                                                        : 
                                                        <tr><td colSpan="7">No Categories available</td></tr>
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
