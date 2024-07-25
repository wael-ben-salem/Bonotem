import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
  Input,
  Label,
  FormGroup,
  Table,
} from "reactstrap";
import { fetchTypePersonnel, addTypePersonnel, deleteTypePersonnel, updateTypePersonnel } from "../../store/typepersonnel/gitTypePersonnelSlice";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TypePersonnelTables = () => {
  const dispatch = useDispatch();
  const typePersonnels = useSelector((state) => state.gitTypePersonnel.typePersonnels);
  
  const [modalList, setModalList] = useState(false);
  const [editTypePersonnel, setEditTypePersonnel] = useState(null);
  const [editedNom, setEditedNom] = useState("");
  const [editedPrixHeure, setEditedPrixHeure] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [hoverShow, setHoverShow] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverRemove, setHoverRemove] = useState(false);
  const [hover, setHover] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedTypePersonnel, setSelectedTypePersonnel] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAddTypePersonnel, setModalAddTypePersonnel] = useState(false);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [newTypePersonnelData, setNewTypePersonnelData] = useState({
    nom: "",
    prix_heure: "",
  });
  const id = useSelector(state => state.login.user.id);

  useEffect(() => {
    dispatch(fetchTypePersonnel(id));
  }, [dispatch,id]);

  const toggleModal = (modal, setModal) => () => setModal(!modal);

  const handleRemove = () => {
    dispatch(deleteTypePersonnel(selectedTypePersonnel.id));
    toggleModal(modalDelete, setModalDelete)();
  };
  const paginateTypePersonnels = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return typePersonnels.slice(startIndex, endIndex);
  };
  const changePage = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(typePersonnels.length / itemsPerPage);
  const openEditModal = (typePersonnel) => {
    setEditTypePersonnel(typePersonnel);
    setEditedNom(typePersonnel.nom);
    setEditedPrixHeure(typePersonnel.prix_heure);
    toggleModal(modalList, setModalList)();
  };

  const handleUpdate = () => {
    const updatedTypePersonnel = {
      id: editTypePersonnel.id,
      nom: editedNom,
      prix_heure: editedPrixHeure,
    };
    dispatch(updateTypePersonnel(updatedTypePersonnel));
    toggleModal(modalList, setModalList)();
  };

  const handleAddTypePersonnel = () => {
    const formData = new FormData();
    formData.append("nom", newTypePersonnelData.nom);
    formData.append("prix_heure", newTypePersonnelData.prix_heure);
    dispatch(addTypePersonnel({ id: id, personnelData:formData}))

    dispatch(addTypePersonnel(formData));
    setShowAddSuccessModal(true);
    setNewTypePersonnelData({ nom: "", prix_heure: "" });
    toggleModal(modalAddTypePersonnel, setModalAddTypePersonnel)();
  };
  const openShowModal = (typePersonnel) => {
    setSelectedTypePersonnel(typePersonnel);
    setModalShow(true);
  };

  const openDeleteModal = (typePersonnel) => {
    setSelectedTypePersonnel(typePersonnel);
    setModalDelete(true);
  };
  return (
    <React.Fragment>
         <div className="page-content">
    <Container fluid>
      <Breadcrumbs title="Tables" breadcrumbItem="types personnels" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              
            </CardHeader>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Button
                  color="soft-info"
                  className="btn btn-sm btn-info"
                  onClick={() => setModalAddTypePersonnel(true)}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  id="create-btn"
                >
                  <i
                    className={
                      hover
                        ? "ri-add-fill align-bottom me-1"
                        : "ri-add-line align-bottom me-1"
                    }
                  ></i>
                  {hover ? "Ajouter" : ""}
                </Button>
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </div>
              <div className="table-responsive table-card">
                    <table className="table align-middle table-nowrap">
                      <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: "50px" }}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkAll"
                            value="option"
                          />
                        </div>
                      </th>
                      
                      <th>Nom</th>
                      <th>Prix par Heure</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
  
      {typePersonnels && typePersonnels.length > 0 ? (
        paginateTypePersonnels().map((type) =>(
      <tr key={type.id}>
        <td>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="option1"
              onClick={() => openShowModal(type)}
            />
          </div>
        </td>
       
        <td>{type.nom}</td>
        <td>{`${type.prix_heure} TND/h`}</td>
        <td>
        <div className=" d-flex  gap-4">
            <Button
               color="soft-dark"
               size="sm"
               className="show-item-btn"
              onClick={() => openShowModal(type)}
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
              onClick={() => openEditModal(type)}
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
              onClick={() => openDeleteModal(type)}
              onMouseEnter={() => setHoverRemove(true)}
              onMouseLeave={() => setHoverRemove(false)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              {/* {hoverRemove ? " Supprimer" : ""} */}
            </Button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">Type Personnel non disponible</td>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>


      {/* Add Modal */}
      <Modal isOpen={modalAddTypePersonnel} toggle={toggleModal(modalAddTypePersonnel, setModalAddTypePersonnel)} centered>
        <ModalHeader toggle={toggleModal(modalAddTypePersonnel, setModalAddTypePersonnel)}>Ajout</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nom">Nom:</Label>
            <Input type="text" id="nom"  placeholder="Enter Nom" value={newTypePersonnelData.nom} onChange={(e) => setNewTypePersonnelData({ ...newTypePersonnelData, nom: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="prix_heure">Prix par Heure :</Label>
            <Input type="number" id="prix_heure"  placeholder="Enter Prix per heure" value={newTypePersonnelData.prix_heure} onChange={(e) => setNewTypePersonnelData({ ...newTypePersonnelData, prix_heure: e.target.value })} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal(modalAddTypePersonnel, setModalAddTypePersonnel)}>Annuler</Button>
          <Button color="primary" onClick={handleAddTypePersonnel}>Enregistrer</Button>
        </ModalFooter>
      </Modal>
{/* Success Modal */}
<Modal isOpen={showAddSuccessModal} toggle={() => setShowAddSuccessModal(false)} centered>
    <ModalHeader   toggle={() => setShowAddSuccessModal(false)} >
        Success
    </ModalHeader>
    <ModalBody>
        Type Personnel ajouté avec succès!
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={() => setShowAddSuccessModal(false)}>OK</Button>
    </ModalFooter>
</Modal>
      {/* Edit  Modal */}
      <Modal isOpen={modalList} toggle={toggleModal(modalList, setModalList)} centered>
        <ModalHeader toggle={toggleModal(modalList, setModalList)}>Modifier Type Personnel</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nom">Nom:</Label>
            <Input type="text" id="nom" value={editedNom} onChange={(e) => setEditedNom(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="prix_heure">Prix par Heure (€):</Label>
            <Input type="number" id="prix_heure" value={editedPrixHeure} onChange={(e) => setEditedPrixHeure(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal(modalList, setModalList)}>Annuler</Button>
          <Button color="primary" onClick={handleUpdate}>Mettre à jour</Button>
        </ModalFooter>
      </Modal>

      {/* Show Type Personnel Details Modal */}
      <Modal isOpen={modalShow} toggle={toggleModal(modalShow, setModalShow)} centered>
        <ModalHeader toggle={toggleModal(modalShow, setModalShow)}>Type Personnel Details</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>ID:</Label>
            <Input type="text" value={selectedTypePersonnel?.id} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Nom:</Label>
            <Input type="text" value={selectedTypePersonnel?.nom} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Prix par Heure (€):</Label>
            <Input type="text" value={selectedTypePersonnel?.prix_heure + "€/h"} readOnly />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal(modalShow, setModalShow)}>Fermer</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Type Personnel Confirmation Modal */}
      <Modal isOpen={modalDelete} toggle={toggleModal(modalDelete, setModalDelete)} centered>
        <ModalHeader toggle={toggleModal(modalDelete, setModalDelete)}>Supprimer</ModalHeader>
        <ModalBody>
        Êtes-vous sûr de vouloir supprimer ce type personnel: {selectedTypePersonnel?.nom}?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal(modalDelete, setModalDelete)}>Annuler</Button>
          <Button color="danger" onClick={handleRemove}>Supprimer</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default TypePersonnelTables;
