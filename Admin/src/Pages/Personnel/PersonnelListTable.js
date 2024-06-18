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
} from "reactstrap";
import { fetchTypePersonnel } from "../../store/typepersonnel/gitTypePersonnelSlice";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  addPersonnel,
  deletePersonnel,
  updatePersonnel,
} from "../../store/personnel/gitPersonnelSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  getAllPersonnel,
  getPersonnelDetails,
} from "../../store/personnel/gitPersonnelSlice";
const PersonnelTables = () => {
  const dispatch = useDispatch();
  const personnels = useSelector((state) => state.gitPersonnel.personnel);
  const typePersonnels = useSelector(
    (state) => state.gitTypePersonnel.typePersonnels
  ); 
  const [modal_list, setModal_list] = useState(false);
  const [editPersonnel, setEditPersonnel] = useState(null);
  const [editedNamePersonnel, setEditedNamePersonnel] = useState("");
  const [editedNumberPersonnel, setEditedNumberPersonnel] = useState("");
  const [editedNom, setEditedNom] = useState("");
  const [editedSalaire, setEditedSalaire] = useState(null);
  const [hover, setHover] = useState(false);
  const [hoverShow, setHoverShow] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverRemove, setHoverRemove] = useState(false);
  const [modal_show, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [modal_delete, setModalDelete] = useState(false);
  const [modalAddPersonnel, setModalAddPersonnel] = useState(false);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [newPersonnelData, setNewPersonnelData] = useState({
    name: "",
    num_telephone: "",
    type_personnel_id: "",
    nom: "",
    salaire: "",
  });
  const id = useSelector(state => state.login.user.id);

  useEffect(() => {
    dispatch(getAllPersonnel(id));
    dispatch(fetchTypePersonnel(id));
  }, [dispatch,id]);

  const toggleAddPersonnelModal = () => {
    setModalAddPersonnel(!modalAddPersonnel);
  };

  const toggleListModal = () => {
    setModal_list(!modal_list);
  };

  const toggleDeleteModal = () => {
    setModalDelete(!modal_delete);
  };
  const toggleShowModal = () => {
    setModalShow(!modal_show);
  };

  const openDeleteModal = (personnel) => {
    setSelectedPersonnel(personnel);
    toggleDeleteModal();
  };

  const handleRemove = () => {
    dispatch(deletePersonnel(selectedPersonnel.id));
    toggleDeleteModal();
  };
  //const typePersonnel = useSelector(state => state.gitPersonnel.typesPersonnel);
  const paginatePersonnels = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return personnels.slice(startIndex, endIndex);
  };
  const changePage = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(personnels.length / itemsPerPage);
  const openEditModal = (personnel) => {
    const typeInfo = typePersonnels.find(
      (t) => t.id === personnel.type_personnel_id
    );
    setEditPersonnel({
      ...personnel,
      typeName: typeInfo ? typeInfo.nom : "Type inconnu",
    });
    setEditedNamePersonnel(personnel.name);
    setEditedNumberPersonnel(personnel.num_telephone);
    setEditedSalaire(personnel.salaire);
    setEditedNom(typeInfo ? typeInfo.nom : "Type inconnu"); 
    toggleListModal();
  };

  const handleUpdate = () => {
    const updatedPersonnel = {
      name: editedNamePersonnel,
      num_telephone: editedNumberPersonnel,
      salaire: editedSalaire,
      type_personnel_id: editPersonnel.type_personnel_id,
      nom: editedNom,
    };

    dispatch(
      updatePersonnel({ id: editPersonnel.id, personnelData: updatedPersonnel })
    );
    toggleListModal();
  };

  /* const openShowModal = (personnel) => {
       setSelectedPersonnel(personnel);
        dispatch(getPersonnelDetails(personnel.id));
        toggleShowModal();
    }*/
  const openShowModal = (personnel) => {
    setSelectedPersonnel(personnel);
    const type = typePersonnels.find(
      (t) => t.id === personnel.type_personnel_id
    );
    setSelectedPersonnel({
      ...personnel,
      typeName: type ? type.name : "Type inconnu",
    });
    setModalShow(true);
  };

  const handleAddPersonnel = () => {
    const formData = new FormData();
    formData.append("name", newPersonnelData.name);
    formData.append("num_telephone", newPersonnelData.num_telephone);
    formData.append("type_personnel_id", newPersonnelData.type_personnel_id); 
    formData.append("salaire", newPersonnelData.salaire);

    dispatch(addPersonnel({ id: id, newPersonnelData:formData}))

    setShowAddSuccessModal(true);
    setNewPersonnelData({
      name: "",
      num_telephone: "",
      type_personnel_id: "",
      salaire: "",
    });
    toggleAddPersonnelModal();
  };
  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Tables" breadcrumbItem="Personnels" />

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
                      onClick={toggleAddPersonnelModal}
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
                            {/* <th className="sort" data-sort="Personnel-Id">
                              ID
                            </th> */}
                            <th className="sort" data-sort="Personnel-name">
                              Nom Personnel
                            </th>
                            <th
                              className="sort"
                              data-sort="Personnel-numtelephone"
                            >
                              Numéro de telephone
                            </th>
                            <th
                              className="sort"
                              data-sort="Personnel-id_typepersonnel"
                            >
                              Type Personnel
                            </th>
                            <th className="sort" data-sort="Personnel-salaire">
                              Salaire
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                        {personnels && personnels.length > 0 ? (
    paginatePersonnels().map((personnel) =>(
                              <tr key={personnel.id}>
                                <th
                                  scope="row"
                                  onClick={() => openShowModal(personnel)}
                                >
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                {/* <td onClick={() => openShowModal(personnel)}>
                                  {personnel.id}
                                </td> */}
                                <td onClick={() => openShowModal(personnel)}>
                                  {personnel.name}
                                </td>
                                <td onClick={() => openShowModal(personnel)}>
                                  {personnel.num_telephone}
                                </td>
                                <td onClick={() => openShowModal(personnel)}>
                                  {personnel.type_personnel
                                    ? personnel.type_personnel.nom
                                    : "Non défini"}
                                </td>

                                <td onClick={() => openShowModal(personnel)}>
  {parseFloat(personnel.salaire).toFixed(2)} TND
</td>
                                <td>
                                  <div className=" d-flex  gap-4">
                                    <Button
                                      color="soft-dark"
                                      size="sm"
                                      className="show-item-btn"
                                      onClick={() => openShowModal(personnel)}
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
                                      onClick={() => openEditModal(personnel)}
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
                                      onClick={() => openDeleteModal(personnel)}
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
                          ) : (
                            <tr>
                              <td colSpan="7">personnel non disponibles </td>
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
      {/* Add Personnel Modal */}
      <Modal
        isOpen={modalAddPersonnel}
        toggle={toggleAddPersonnelModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={toggleAddPersonnelModal}>
          Ajout
        </ModalHeader>
        <ModalBody>
          <form className="tablelist-form">
            <div className="mb-3">
              <label htmlFor="name-field" className="form-label">
                Nom Personnel:
              </label>
              <input
                type="text"
                id="name-field"
                className="form-control"
                placeholder="Enter Name"
                value={newPersonnelData.name}
                onChange={(e) =>
                  setNewPersonnelData({
                    ...newPersonnelData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description-field" className="form-label">
                Numero de telephone:{" "}
              </label>
              <input
                type="text"
                id="description-field"
                className="form-control"
                placeholder="Enter Numéro de téléphone"
                value={newPersonnelData.num_telephone}
                onChange={(e) =>
                  setNewPersonnelData({
                    ...newPersonnelData,
                    num_telephone: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="id_founisseur-field" className="form-label">
                Type de personnel :
              </label>
              <select
                id="id_founisseur-field"
                className="form-control"
                value={newPersonnelData.type_personnel_id}
                onChange={(e) =>
                  setNewPersonnelData({
                    ...newPersonnelData,
                    type_personnel_id: e.target.value,
                  })
                }
              >
                <option value="">Sélectionner un type de personnel</option>

                {typePersonnels.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.nom ? type.nom : "No"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="description-field" className="form-label">
                Salaire{" "}
              </label>
              <input
                type="text"
                id="description-field"
                className="form-control"
                placeholder="Enter Salaire"
                value={newPersonnelData.salaire}
                onChange={(e) =>
                  setNewPersonnelData({
                    ...newPersonnelData,
                    salaire: e.target.value,
                  })
                }
                required
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <Button
              type="button"
              color="light"
              onClick={toggleAddPersonnelModal}
            >
              Annuler
            </Button>
            <Button type="button" color="primary" onClick={handleAddPersonnel}>
              Enregistrer
            </Button>
          </div>
        </ModalFooter>
      </Modal>
       {/* Success Modal */}
       <Modal isOpen={showAddSuccessModal} toggle={() => setShowAddSuccessModal(false)} centered>
    <ModalHeader   toggle={() => setShowAddSuccessModal(false)} >
        Success
    </ModalHeader>
    <ModalBody>
    Ajout effectué avec succés      
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={() => setShowAddSuccessModal(false)}>OK</Button>
    </ModalFooter>
</Modal>
      {/* Edit Modal */}
      <Modal isOpen={modal_list} toggle={toggleListModal} centered>
        <ModalHeader className="bg-light p-3" toggle={toggleListModal}>
          Modifier Personnel
        </ModalHeader>
        <ModalBody>
          <form className="tablelist-form">
            <div className="mb-3">
              <label htmlFor="name-field" className="form-label">
                Nom Personnel
              </label>
              <input
                type="text"
                id="name-field"
                className="form-control"
                placeholder="Enter Name"
                value={editedNamePersonnel}
                onChange={(e) => setEditedNamePersonnel(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description-field" className="form-label">
                Numero de Telephone
              </label>
              <input
                type="text"
                id="description-field"
                className="form-control"
                placeholder="Enter Description"
                value={editedNumberPersonnel}
                onChange={(e) => setEditedNumberPersonnel(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type-field" className="form-label">
                Type Personnel
              </label>
              <input
                type="text"
                id="type-field"
                className="form-control"
                value={editedNom}
                onChange={(e) => setEditedNom(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description-field" className="form-label">
                Salaire
              </label>
              <input
                type="text"
                id="description-field"
                className="form-control"
                placeholder="Enter Description"
                value={editedSalaire}
                onChange={(e) => setEditedSalaire(e.target.value)}
                required
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={toggleListModal}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleUpdate}
            >
              Mettre à jour
            </button>
          </div>
        </ModalFooter>
      </Modal>
      {/* Show Modal */}
      <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
        <ModalHeader className="bg-light p-3" toggle={toggleShowModal}>
          Détail Personnel
        </ModalHeader>
        <ModalBody>
          {selectedPersonnel && (
            <form className="tablelist-form">
              <div className="mb-3">
                <label htmlFor="name-field" className="form-label">
                  Nom Personnel
                </label>
                <input
                  type="text"
                  id="name-field"
                  className="form-control"
                  value={selectedPersonnel.name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description-field" className="form-label">
                  Numero de telephone
                </label>
                <input
                  type="text"
                  id="description-field"
                  className="form-control"
                  value={selectedPersonnel.num_telephone}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type-field" className="form-label">
                  Type de Personnel
                </label>
                <input
                  type="text"
                  id="type-field"
                  className="form-control"
                  value={selectedPersonnel.type_personnel.nom}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description-field" className="form-label">
                  Salaire
                </label>
                <input
                  type="text"
                  id="description-field"
                  className="form-control"
                  value={selectedPersonnel.salaire}
                  readOnly
                />
              </div>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={toggleShowModal}
            >
              Fermer
            </button>
          </div>
        </ModalFooter>
      </Modal>
      {/* Remove Modal */}
      <Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
        <ModalHeader className="bg-light p-3" toggle={toggleDeleteModal}>
          Confirmer la suppression
        </ModalHeader>
        <ModalBody>
          {selectedPersonnel && (
            <p>
              Êtes-vous sûr de vouloir supprimer le personnel{" "}
              {selectedPersonnel.name}?
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
           Annuler
          </Button>
          <Button color="danger" onClick={handleRemove}>
            Supprimer
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default PersonnelTables;
