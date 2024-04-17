import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { addPackaging_categorie, deletePackaging_categorie, getAllData, getPackaging_categorieDetails, updatePackaging_categorie } from '../../store/Packagings/gitPackagingCategorie';

import Breadcrumbs from "../../components/Common/Breadcrumb";





const Packagings = () => {
    

    const dispatch = useDispatch();
    const packagingsCategorie = useSelector(state => state.gitPackagingCategorie.packagings_categorie);



    const [modal_list, setmodal_list] = useState(false);
    const [editPackaging_categorie, setEditPackaging_categorie] = useState(null);
    const [editedId_packaging_categorie, setEditedId_packaging_categorie] = useState('');
    
    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedPackaging_categorie, setSelectedPackaging_categorie] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddPackaging_categorie, setModalAddPackaging_categorie] = useState(false);
    
    
    const [newPackaging_categorieData, setNewPackaging_categorieData] = useState({
        id_packaging: '',
        
        

    });
    
    
    
    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);



    
    const toggleAddPackagingModal = () => {
        setModalAddPackaging_categorie(!modalAddPackaging_categorie);
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
    
    
    
    
    
    
    const openDeleteModal = (packaging_categorie) => {
        setSelectedPackaging_categorie(packaging_categorie);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deletePackaging_categorie(selectedPackaging_categorie.id)); // Dispatch deleteUser action with the selected user's ID
        toggleDeleteModal();
    }





    const openEditModal = (packagings_categorie) => {
        setEditPackaging_categorie(packagings_categorie); 
        setEditedId_packaging_categorie  (packagings_categorie.id_packaging)
        toggleListModal();
        


    };

   const handleUpdate = () => {
    const updatedPackaging_categorie = {
        id: editPackaging_categorie.id,
        id_packaging:editedId_packaging_categorie,
        
        
        
    };
    dispatch(updatePackaging_categorie({ id: editPackaging_categorie.id, packaging_categorieData: updatedPackaging_categorie }));
    toggleListModal();
   }


   
const openShowModal = (packaging_categorie) => {
    setSelectedPackaging_categorie(packaging_categorie);
    dispatch(getPackaging_categorieDetails(packaging_categorie.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddPackaging = () => {
    dispatch(addPackaging_categorie(newPackaging_categorieData));
    setNewPackaging_categorieData({
        id_packaging: '',
        
        
    });
    toggleAddPackagingModal();

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
                                    <h4 className="card-title mb-0">Gérer les Packagings</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button color="success" className="add-btn"  onClick={toggleAddPackagingModal} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Ajouter Packagings</Button>
                                                
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
                                            <table className="table align-middle table-nowrap" id="userTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th className="sort" data-sort="Packaging-Id">ID</th>
                                                        <th className="sort" data-sort="Packaging-name_packaging">Id Packaging</th>
                                                        
                                                        
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {packagingsCategorie && packagingsCategorie.length > 0 ? 
                                                        packagingsCategorie.map(packaging_categorie => (
                                                            <tr key={packaging_categorie.id} >
                                                                <th scope="row" onClick={() => openShowModal(packaging_categorie)}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                <td onClick={() => openShowModal(packaging_categorie)}>{packaging_categorie.id}</td>
                                                                <td onClick={() => openShowModal(packaging_categorie)}>{packaging_categorie.id_packaging}</td>
                                                                
                                                                
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="show">
                                                                            <button className="btn btn-sm btn-dark show-item-btn" onClick={() => openShowModal(packaging_categorie)}>Details</button>
                                                                        </div>
                                                                        <div className="edit">
                                                                            <button className="btn btn-sm btn-success edit-item-btn" onClick={() => openEditModal(packaging_categorie)}>Modifier</button>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <button className="btn btn-sm btn-danger remove-item-btn"onClick={() => { openDeleteModal(packaging_categorie); }} >Supprimer</button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) 
                                                        : 
                                                        <tr><td colSpan="7">No Packagings Category available</td></tr>
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
            <Modal isOpen={modalAddPackaging_categorie} toggle={toggleAddPackagingModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddPackagingModal}>Ajout Packaging</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="id_packaging-field" className="form-label">Id Packaging</label>
                                                    <input type="text" id="id_packaging-field" className="form-control" placeholder="Enter Name" value={newPackaging_categorieData.id_packaging} onChange={(e) => setNewPackaging_categorieData({ ...newPackaging_categorieData, id_packaging: e.target.value })} required />
                                                </div>
                                                
                                                
                                               
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddPackagingModal}>Fermer</Button>
                                                <Button type="button" color="success" onClick={handleAddPackaging}>Ajouter </Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier Packaging </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="id_packaging-field" className="form-label">Id Categorie</label>
                            <input type="text" id="id_packaging-field" className="form-control" placeholder="Enter Name" value={editedId_packaging_categorie} onChange={(e) => setEditedId_packaging_categorie(e.target.value)} required />
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
                    {selectedPackaging_categorie && (
                        <form className="tablelist-form">
                            <div className="mb-3">
                                <label htmlFor="id_packaging-field" className="form-label">Id Packaging</label>
                                <input type="text" id="id_packaging-field" className="form-control" value={selectedPackaging_categorie.id_packaging} readOnly />
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
                    {selectedPackaging_categorie && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedPackaging_categorie.id_packaging}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default Packagings;
