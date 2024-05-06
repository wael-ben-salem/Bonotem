import React from 'react';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody,ListGroup, CardHeader, Col, Container, Alert, ListGroupItem, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

import Breadcrumbs from "../../components/Common/Breadcrumb";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { addFournisseur, deleteFournisseur, getAllFournisseur, getFournisseureDetails, updateFournisseur } from '../../store/fournisseur/gitFournisseurSlice';
import List from 'list.js';



const FournisseurListTable = () => {
    

    const dispatch = useDispatch();
    const fournisseurs = useSelector(state => state.gitFournisseur.fournisseurs);
    const [hoverShow, setHoverShow] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverRemove, setHoverRemove] = useState(false);
    const [hover, setHover] = useState(false);


    const [modal_confirm_edit, setModalConfirmEdit] = useState(false);
    const [modal_confirm_add, setModalConfirmAdd] = useState(false);
    const { Success, errorMessage } = useSelector(state => ({
      Success: state.gitFournisseur.Success,
      errorMessage: state.gitFournisseur.errorMessage,
      
    }));
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  

    const [modal_list, setmodal_list] = useState(false);
    const [editFournisseur, setEditFournisseur] = useState(null);

    const [editedNameFournisseur, setEditedNameFournisseur] = useState('');
    const [editedEmailFournisseur, setEditedEmailFournisseur] = useState('');
    const [editedNumFournisseur, setEditedNumFournisseur] = useState('');

    const [editedPhoto, setEditedPhoto] = useState(""); // Store the file itself, initialize as null

    const [modal_show, setModalShow] = useState(false); // State for Show Modal
    const [selectedFournisseur, setSelectedFournisseur] = useState(null); // State to store selected 
    const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
    const [modalAddFournisseur, setModalAddFournisseur] = useState(false);
    
    
    const [newFournisseurData, setNewFournisseurData] = useState({
        nom: '',
        email: '',
        num_telephone: '', // Store the file itself, initialize as null
        photo:null,
        
       
    });
    


        const [currentPage, setCurrentPage] = useState(0);
        const itemsPerPage = 4;
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(fournisseurs.length / itemsPerPage);
    
        // Fonction pour diviser les éléments en pages
        const paginateFournisseur = () => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return fournisseurs.slice(startIndex, endIndex);
        };
    
        // Fonction pour changer de page
        const changePage = (page) => {
            setCurrentPage(page);
        };
        
    
    
    useEffect(() => {
        dispatch(getAllFournisseur());
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

useEffect(() => {
    if (fournisseurs.length > 0) { // Vérifiez si la liste contient des éléments
        new List('pagination-list', {
            valueNames: ['pagi-list'],
        });
    }
}, [fournisseurs]);
 

    
    const toggleAddFournisseurModal = () => {
        setModalAddFournisseur(!modalAddFournisseur);
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
    
    
    
    
    const openDeleteModal = (fournisseur) => {
        setSelectedFournisseur(fournisseur);
    toggleDeleteModal(); // Open the delete modal
    }

    const handleRemove = () => {
        dispatch(deleteFournisseur(selectedFournisseur.id)); // Dispatch deleteUser action with the selected user's ID
        setTimeout(() => {
            toggleDeleteModal();
    
            window.location.reload();
    
        },  4000); 
    }





    const openEditModal = (fournisseurs) => {
        setEditFournisseur(fournisseurs);
        setEditedNameFournisseur(fournisseurs.nom);
        setEditedEmailFournisseur(fournisseurs.email);
        setEditedNumFournisseur(fournisseurs.num_telephone);

        setEditedPhoto(''); 
        setSelectedFournisseur(fournisseurs);

        
        toggleListModal();

    };

   const handleUpdate = () => {
    
    const formData = new FormData();
    formData.append('nom', editedNameFournisseur);
    formData.append('num_telephone', editedNumFournisseur);

    formData.append('email', editedEmailFournisseur);
    formData.append('photo', editedPhoto); // Append the file to the form data

    dispatch(updateFournisseur({ id: editFournisseur.id, fournisseurData: formData }));

     // Reset the state
     setEditFournisseur({
        nom: '',
        email: '',
        num_telephone: '', // Store the file itself, initialize as null
        photo:null,
        
    });
    setTimeout(() => {
        toggleListModal();
        toggleConfirmEdit();

        window.location.reload();

    },  4000); 
   }


   
const openShowModal = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    dispatch(getFournisseureDetails(fournisseur.id)); // Fetch user details when the Show button is clicked
    toggleShowModal();
}






const handleAddPackaging = () => {
    const formData = new FormData();
    formData.append('nom', newFournisseurData.nom);
    formData.append('num_telephone', newFournisseurData.num_telephone);

    formData.append('email', newFournisseurData.email);
    formData.append('photo', newFournisseurData.photo); // Append the file to the form data
    

    dispatch(addFournisseur(formData));
    setNewFournisseurData({
        nom: '',
        email: '',
        num_telephone: '', // Store the file itself, initialize as null
        photo:null,
    });
    setTimeout(() => {
        toggleAddFournisseurModal();
        toggleConfirmAdd();

        window.location.reload();

    },  4000); 

};



return(

    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Fournisseur" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Gérer les Fournisseur</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  color="soft-info" className="btn btn-sm btn-info" onClick={toggleAddFournisseurModal}
                                                                                                    onMouseEnter={() => setHover(true)}
                                                                                                      onMouseLeave={() => setHover(false)}
                                                                                                        id="create-btn">
                                                                                                        <i className={hover ? "ri-add-fill align-bottom me-1" : "ri-add-line align-bottom me-1"}></i>
                                                                                                        {/* {hover ? "Ajouter" : ""} */}

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
                                                        <th className="sort" data-sort="Packaging-photo">Photo</th> 

                                                        <th className="sort" data-sort="Packaging-name_packaging">Nom </th>
                                                        <th className="sort" data-sort="Packaging-nombre_package">Email</th> 
                                                        <th className="sort" data-sort="Packaging-nombre_package">Numero de telephone</th> 
    
                                                        <th class="d-flex align-items flex-column" data-sort="action" >
                                                        Action
                                                        
                                                        
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                    {paginateFournisseur().length > 0 ? (
                                        paginateFournisseur().map((fournisseur, index) => (
                                            <tr key={fournisseur.id}>
                                                <th scope="row" >
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" onClick={() => openShowModal(fournisseur)} name="chk_child" value="option1" />
                                                    </div>
                                                </th>
                                                <td onClick={() => openShowModal(fournisseur)}>{fournisseur.id}</td>
                                                <td onClick={() => openShowModal(fournisseur)}>
  {fournisseur.photo ? (
    <img
      src={`${fournisseur.photo.replace('fournisseurs', '')}`} // Supprimer le préfixe 'fournisseurs'
      alt={fournisseur.nom}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%", // Appliquer une bordure en cercle
        objectFit: "cover", // S'assurer que l'image remplit correctement le cercle
      }}
    />
  ) : (
    "Pas de photo"
  )}
</td>
                                                <td onClick={() => openShowModal(fournisseur)}>{fournisseur.nom}</td>
                                                <td onClick={() => openShowModal(fournisseur)}>{fournisseur.email}</td>
                                                <td  onClick={() => openShowModal(fournisseur)}>{fournisseur.num_telephone && `+216 ${fournisseur.num_telephone}`}</td>
                                               

                                                <td>
                                                <div className="d-flex justify-content">

                                                    <div className=" d-flex gap-4">
                                                        <Button
                                                            color="soft-dark"
                                                            size="sm"
                                                            className="show-item-btn"
                                                            onClick={() => openShowModal(fournisseur)}
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
                                                            onClick={() => openEditModal(fournisseur)}
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
                                                            onClick={() => openDeleteModal(fournisseur)}
                                                            onMouseEnter={() => setHoverRemove(true)}
                                                            onMouseLeave={() => setHoverRemove(false)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                            {/* {hoverRemove ? " Supprimer" : ""} */}
                                                        </Button>
                                                    </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Rupture de Fournisseur</td>
                                        </tr>
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
                <Container>
                <Row>
     <Col xl={4}>
        <Card>
        <CardBody>
    <p className="text-muted">Exemple d'utilisation du plugin de pagination</p>

    <div id="pagination-list">
        <div className="mb-2">
            <input className="search form-control" placeholder="Rechercher" />
        </div>

        <div className="mx-n3">
            <ListGroup className="list mb-0" flush> {/* Utilisez ListGroup ici */}
                {paginateFournisseur().length > 0 && (
                    paginateFournisseur().map((fournisseur, index) => (
                        <ListGroupItem key={fournisseur.id}>
                            <div className="d-flex align-items-center pagi-list">
                                <div className="flex-shrink-0 me-3">
                                    <div>
                                        {fournisseur.photo ? (
                                            <img
                                                className="avatar-xs rounded-circle"
                                                alt={fournisseur.nom}
                                                src={`${fournisseur.photo.replace('fournisseurs', '')}`}
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            "Pas de photo"
                                        )}
                                    </div>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="fs-14 mb-1">
                                        <Link to="#" className="link text-dark">{fournisseur.nom}</Link>
                                    </h5>
                                    <p className="born timestamp text-muted mb-0">{fournisseur.email}</p>
                                </div>
                                <div className="flex-shrink-0 ms-2">
                                    <div>
                                        <button type="button" className="btn btn-sm btn-light">
                                            <i className="ri-mail-line align-bottom"></i> Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ListGroupItem>
                    ))
                )}
            </ListGroup> {/* Fermez ListGroup ici */}

            <div className="d-flex justify-content-center">
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
    </div>
</CardBody>
</Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Add Packaging Modal */}
            <Modal isOpen={modalAddFournisseur} toggle={toggleAddFournisseurModal} centered>
                                        <ModalHeader className="bg-light p-3" toggle={toggleAddFournisseurModal}>Ajout Fournisseur</ModalHeader>
                                        <ModalBody>
                                            <form className="tablelist-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Nom </label>
                                                    <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newFournisseurData.nom} onChange={(e) => setNewFournisseurData({ ...newFournisseurData, nom: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Email </label>
                                                    <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newFournisseurData.email} onChange={(e) => setNewFournisseurData({ ...newFournisseurData, email: e.target.value })} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="name_packaging-field" className="form-label">Numero de telephone </label>
                                                    <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={newFournisseurData.num_telephone} onChange={(e) => setNewFournisseurData({ ...newFournisseurData, num_telephone: e.target.value })} required />
                                                </div>
                                               
                                                <div className="mb-3">
                                                <label htmlFor="photo-field" className="form-label">
                                                  Photo
                                                </label>
                                                <input
                                                  type="file"
                                                  id="photo-field"
                                                  className="form-control"
                                                  onChange={(e) => setNewFournisseurData({ ...newFournisseurData, photo: e.target.files[0] })} // Handle file selection
                                                  name="photo"
                                                />
                                              </div>
                                               
                                                     
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <Button type="button" color="light" onClick={toggleAddFournisseurModal}>Fermer</Button>
                                                <button type="button" className="btn btn-primary" onClick={toggleConfirmAdd}>Ajouter</button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>







             {/* Edit Modal */}
             <Modal isOpen={modal_list} toggle={toggleListModal} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleListModal}> Modifier Fournisseur </ModalHeader>
                <div className="d-flex flex-column align-items-center" >
        {selectedFournisseur && selectedFournisseur.photo && (
                <img
                    src={`${selectedFournisseur.photo.replace('fournisseurs', '')}`}
                    alt={selectedFournisseur.nom}
                    style={{ width: "50px", height: "50px" ,marginTop:"3px",
                    borderRadius: "50%", // Appliquer une bordure en cercle
                    objectFit: "cover", 
                     }}
                />
        )}
    </div>
                <form className="tablelist-form">
                    <ModalBody>
                    
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Nom</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedNameFournisseur} onChange={(e) => setEditedNameFournisseur(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Email</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedEmailFournisseur} onChange={(e) => setEditedEmailFournisseur(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_packaging-field" className="form-label">Numero de telephone</label>
                            <input type="text" id="name_packaging-field" className="form-control" placeholder="Enter Name" value={editedNumFournisseur} onChange={(e) => setEditedNumFournisseur(e.target.value)} required />
                        </div>

                       
                        <div className="mb-3 row align-items-center">
    <div className="col-md-9">
        <label htmlFor="photo-field" className="form-label">Photo</label>
        <input
    type="file"
    id="photo-field"
    className="form-control"
    onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedPhoto(file);
        }
    }}
    name="photo"
/>

    </div>
    <div className="col-md-2">
        {editedPhoto && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
                src={URL.createObjectURL(editedPhoto)}
                alt="Profile picture"
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
            />
        )}
    </div>
</div>
                        

                       
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={toggleListModal}>Fermer</button>
                            <button type="button" className="btn btn-primary" onClick={toggleConfirmEdit}>Mettre à jour</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>




             {/* Show Modal */}
             <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleShowModal}>Detail Packaging</ModalHeader>
                <ModalBody>
  {selectedFournisseur && (
    <form className="tablelist-form">
        <div className="d-flex flex-column align-items-center" >
        {selectedFournisseur.photo ? (
          <img
            src={`${selectedFournisseur.photo.replace('fournisseurs', '')}`} // Supprimer le préfixe 'fournisseurs'
            alt={selectedFournisseur.nom}
            style={{ width: "50px", height: "50px" ,
            borderRadius: "50%", // Appliquer une bordure en cercle
            objectFit: "cover",
            }}
            className="mb-3"
          />
        ) : (
          <p className="mb-3">Pas de photo</p>
        )}
        <p className="mb-0">{selectedFournisseur.nom}</p>
      </div>
      <div className="mb-3">
        <label htmlFor="name_packaging-field" className="form-label">Nom</label>
        <input type="text" id="name_packaging-field" className="form-control" value={selectedFournisseur.nom} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Email</label>
        <input type="text" id="nombre_package-field" className="form-control" value={selectedFournisseur.email} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre_package-field" className="form-label">Numero de telephone</label>
        <input type="text" id="nombre_package-field" className="form-control" value={selectedFournisseur.num_telephone} readOnly />
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

            <Modal isOpen={modal_confirm_add} toggle={toggleConfirmAdd} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleConfirmAdd}>Confirmer l'ajout</ModalHeader>

                {showSuccessMessage && Success ? (

                                    <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                                    Packaging ajoutée avec succès                                    
                                    </Alert>
                                                                ) : null}
    

{errorMessage && <div className="alert alert-danger"  style={{ width:'80%' , margin: '20px auto 0'}}>Une erreur s'est produite, Ressayez ultirierement</div>}

                <ModalBody>
                    
                        <p>Êtes-vous sûr de vouloir ajouter cette Packaging </p>
                   
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleConfirmAdd}>Retour</Button>
                    <Button color="primary" onClick={handleAddPackaging}>Confirmer</Button>
                </ModalFooter>
            </Modal>







            
             {/* confirm edit Modal */}

 <Modal isOpen={modal_confirm_edit} toggle={toggleConfirmEdit} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleConfirmEdit}>Confirmer la modification</ModalHeader>
                {showSuccessMessage && Success ? (
                                    <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                                    Packaging modifiée avec succès
                                    </Alert>
                                    
                                ) : null}

{errorMessage && <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>Une erreur s'est produite,Ressayez ultirierement</div>}

                <ModalBody>
                    
                        <p>Êtes-vous sûr de vouloir editer cette Packaging </p>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleConfirmEdit}>Retour</Button>
                    <Button color="primary" onClick={handleUpdate}>Modifier</Button>
                </ModalFooter>
            </Modal>






            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
                <ModalHeader className="bg-light p-3" toggle={toggleDeleteModal}>Confirmer la suppression</ModalHeader>
                <ModalBody>
                {showSuccessMessage && Success ? (
                                    <Alert color="success" style={{ width:'50%' , margin: '20px auto 0'}}>
                                    Packaging Supprimée avec succès
                                    </Alert>
                                    
                                ) : null}

{errorMessage && <div className="alert alert-danger" style={{ width:'80%' , margin: '20px auto 0'}}>Une erreur s'est produite,Ressayez ultirierement</div>}

                    {selectedFournisseur && (
                        <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedFournisseur.nom}?</p>
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
    
    
    
    



















    
    
    
    
    
    
    
   

export default FournisseurListTable;
