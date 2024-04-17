import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { addPackaging, deletePackaging, getAllData, getPackagingDetails, updatePackaging } from '../../store/Packagings/gitPackagingSlice';

import Breadcrumbs from "../../components/Common/Breadcrumb";





const Packagings = () => {
    

    const dispatch = useDispatch();
    const packagings = useSelector(state => state.gitPackaging.packagings);



    const [modal_list, setmodal_list] = useState(false);
    const [editPackaging, setEditPackaging] = useState(null);
    const [editedNamePackaging, setEditedNamePackaging] = useState('');
    const [editedNombrePackage, setEditedNombrePackage] = useState('');
    const [editedValidate, setEditedValidate] = useState('');
    
    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedPackaging, setSelectedPackaging] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddPackaging, setModalAddPackaging] = useState(false);
    
    
    const [newPackagingData, setNewPackagingData] = useState({
        name_Packaging: '',
        nombre_Package: '',
        validate: '',
        
       
    });
    
    
    
    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);



    
    const toggleAddPackagingModal = () => {
        setModalAddPackaging(!modalAddPackaging);
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
    
    
    
    
    
    
    const openDeleteModal = (packaging) => {
        setSelectedPackaging(packaging);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deletePackaging(selectedPackaging.id)); // Dispatch deleteUser action with the selected user's ID
        toggleDeleteModal();
    }





    const openEditModal = (packagings) => {
        setEditPackaging(packagings);
        setEditedNamePackaging(packagings.name_packaging);
        setEditedNombrePackage(packagings.nombre_package);
        setEditedValidate(packagings.validate);
        
        toggleListModal();

    };

   const handleUpdate = () => {
    const updatedPackaging = {
        id: editPackaging.id,
        name_packaging: editedNamePackaging,
        nombre_package: editedNombrePackage,
        validate: editedValidate,
        
    };
    dispatch(updatePackaging({ id: editPackaging.id, packagingData: updatedPackaging }));
    toggleListModal();
   }


   
const openShowModal = (packaging) => {
    setSelectedPackaging(packaging);
    dispatch(getPackagingDetails(packaging.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddPackaging = () => {
    dispatch(addPackaging(newPackagingData));
    setNewPackagingData({
        name_packaging: '',
        nombre_package: '',
        validate: '',
        
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
                                                        <th className="sort" data-sort="Packaging-name_packaging">Nom Packaging</th>
                                                        <th className="sort" data-sort="Packaging-nombre_package">Nombre Packaging</th>
                                                        <th className="sort" data-sort="Packaging-validate">Validate</th>
                                                        
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {packagings && packagings.length > 0 ? 
                                                        packagings.map(packaging => (
                                                            <tr key={packaging.id} >
                                                                <th scope="row" onClick={() => openShowModal(packaging)}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                    </div>
                                                                </th>
                                                                <td onClick={() => openShowModal(packaging)}>{packaging.id}</td>
                                                                <td onClick={() => openShowModal(packaging)}>{packaging.name_packaging}</td>
                                                                <td onClick={() => openShowModal(packaging)}>{packaging.nombre_package }</td>
                                                                <td onClick={() => openShowModal(packaging)} >
    {packaging.validate === 1 ? (
        <button className="btn btn-sm btn-success">
            True <span className="visually-hidden">true</span>
        </button>
    ) : (
        <button className="btn btn-sm btn-danger">
            False <span className="visually-hidden">false</span>
        </button>
    )}
</td>
                                                                
                                                                
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="show">
                                                                            <button className="btn btn-sm btn-dark show-item-btn" onClick={() => openShowModal(packaging)}>Details</button>
                                                                        </div>
                                                                        <div className="edit">
                                                                            <button className="btn btn-sm btn-success edit-item-btn" onClick={() => openEditModal(packaging)}>Modifier</button>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <button className="btn btn-sm btn-danger remove-item-btn"onClick={() => { openDeleteModal(packaging); }} >Supprimer</button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) 
                                                        : 
                                                        <tr><td colSpan="7">No Packagings available</td></tr>
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
            <Modal isOpen={modalAddPackaging} toggle={toggleAddPackagingModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddPackagingModal}>Ajout Packaging</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Nom Packaging</label>
                                                    <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newPackagingData.name_packaging} onChange={(e) => setNewPackagingData({ ...newPackagingData, name_packaging: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="nombre_package-field" className="form-label">Nombre Packaging</label>
                                                    <input type="text" id="nombre_package-field" className="form-control" placeholder="Enter Le nombre du package" value={newPackagingData.nombre_package} onChange={(e) => setNewPackagingData({ ...newPackagingData, nombre_package: e.target.value })} required />
                                                </div>
                                               
                                                <div className="mb-3">
    <label htmlFor="validate-field" className="form-label">Validate:</label>
    </div>  
    <div className="mb-3">

    <div className="form-check form-switch">
        <input
            type="checkbox"
            id="validate-field"
            className="form-check-input"
            checked={newPackagingData.validate}
            onChange={(e) => setNewPackagingData({ ...newPackagingData, validate: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="validate-field">{newPackagingData.validate ? 'True' : 'False'}</label>
    </div>
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
                            <label htmlFor="name_packaging-field" className="form-label">Nom</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedNamePackaging} onChange={(e) => setEditedNamePackaging(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="nombre_package-field" className="form-label">Nombre de Package</label>
                            <input type="text" id="nombre_package-field" className="form-control" placeholder="Enter Nombre de Package" value={editedNombrePackage} onChange={(e) => setEditedNombrePackage(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="validate-field" className="form-label">Validate :</label>
                        </div>
                        

                        <div className="mb-3">
    <div className="form-check form-switch">
        <input
            type="checkbox"
            id="validate-field"
            className="form-check-input"
            checked={editedValidate}
            onChange={(e) => setEditedValidate(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="validate-field">{editedValidate ? 'True' : 'False'}</label>
    </div>
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
                    {selectedPackaging && (
                        <form className="tablelist-form">
                            <div className="mb-3">
                                <label htmlFor="name_packaging-field" className="form-label">Nom</label>
                                <input type="text" id="name_packaging-field" className="form-control" value={selectedPackaging.name_packaging} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre_package-field" className="form-label">Nombre de Package</label>
                                <input type="text" id="nombre_package-field" className="form-control" value={selectedPackaging.nombre_package} readOnly />
                            </div>
                            <div className="mb-3">
    <label className="form-label">Validate:</label>
    </div>
    <div className="mb-3">
    <div className="form-check form-switch">
        <input
            type="checkbox"
            id="validate-field"
            className="form-check-input"
            checked={selectedPackaging.validate}
            readOnly
        />
        <label className="form-check-label" htmlFor="validate-field">{selectedPackaging.validate ? 'True' : 'False'}</label>
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


            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleDeleteModal}>Confirmer la suppression</ModalHeader>
                <ModalBody>
                    {selectedPackaging && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedPackaging.name_packaging}?</p>
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
