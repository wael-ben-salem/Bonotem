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
  ModalHeader,Alert,
} from "reactstrap";
import {
  fetchChargesFixes,
  addChargeFixe,
  deleteChargeFixe,
  updateChargeFixe,
} from "../../store/chargefixe/gitChargeFixeSlice";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt ,faCheckCircle,faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const ChargeFixeTables = () => {
  const dispatch = useDispatch();
  const chargesFixes = useSelector((state) => state.gitchargefixe.chargesFixes);
  const { Success, errorMessage } = useSelector(state => ({
    Success: state.gitchargefixe.Success, // Assuming 'Success' is correctly set in your slice during actions
    errorMessage: state.gitchargefixe.errorMessage // Assuming 'errorMessage' is correctly set in your slice during actions
}));

  const [modal_list, setModal_list] = useState(false);
  const [editCharge, setEditCharge] = useState(null);
  const [editedNameCharge, setEditedNameCharge] = useState("");
  const [editedMontantCharge, setEditedMontantCharge] = useState("");
  const [editedFrequence, setEditedFrequence] = useState("");
  const [editedDatePaiement, setEditedDatePaiement] = useState("");
  const [hover, setHover] = useState(false);
  const [hoverShow, setHoverShow] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverRemove, setHoverRemove] = useState(false);
  const [modal_show, setModalShow] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [modal_delete, setModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [modalAddCharge, setModalAddCharge] = useState(false);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Define showSuccessMessage state
  const [newChargeData, setNewChargeData] = useState({
    nom: "",
    montant: "",
    frequence: "",
    date_paiement: "",
  });

  useEffect(() => {
    dispatch(fetchChargesFixes());
  }, [dispatch]);

  const toggleAddChargeModal = () => {
    setModalAddCharge(!modalAddCharge);
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

  const openDeleteModal = (charge) => {
    setSelectedCharge(charge);
    toggleDeleteModal();
  };

  const handleRemove = () => {
    dispatch(deleteChargeFixe(selectedCharge.id));
    toggleDeleteModal();
  };

  const openEditModal = (charge) => {
    setEditCharge(charge);
    setEditedNameCharge(charge.nom);
    setEditedMontantCharge(charge.montant);
    setEditedFrequence(charge.frequence);
    setEditedDatePaiement(charge.date_paiement);
    toggleListModal();
  };

  const handleUpdate = () => {
    const updatedCharge = {
      nom: editedNameCharge,
      montant: editedMontantCharge,
      frequence: editedFrequence,
      date_paiement: editedDatePaiement,
    };
    dispatch(
      updateChargeFixe({ id: editCharge.id, chargeData: updatedCharge })
    );
    toggleListModal();
  };
  const handleAddCharge = () => {
    const formData = new FormData();
    formData.append("nom", newChargeData.nom);
    formData.append("montant", newChargeData.montant);
    formData.append("frequence", newChargeData.frequence);
    formData.append("date_paiement", newChargeData.date_paiement);
    dispatch(addChargeFixe(formData));
    setShowAddSuccessModal(true);
    setNewChargeData({
      nom: "",
      montant: "",
      frequence: "",
      date_paiement: "",
    });
    toggleAddChargeModal();
  };
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
    if (errorMessage) {
 
    setTimeout(() => {
        window.location.reload()
 
    }, 3000); // Adjust the delay time as needed (3000 milliseconds = 3 seconds)
    }
}, [errorMessage]);
  const openShowModal = (charge) => {
    setSelectedCharge(charge);
    setModalShow(true);
  };
  const paginateCharges = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return chargesFixes.slice(startIndex, endIndex);
  };
  const changePage = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(chargesFixes.length / itemsPerPage);

  
  return (
    <React.Fragment>
  <div className="page-content">
    <Container fluid>
      <Breadcrumbs title="Tables" breadcrumbItem="Charges Fixes" />

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
                  onClick={toggleAddChargeModal}
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
                      <th className="sort" data-sort="charge-id">ID</th>
                      <th className="sort" data-sort="charge-nom">Nom</th>
                      <th className="sort" data-sort="charge-montant">Montant</th>
                      <th className="sort" data-sort="charge-frequence">Fréquence</th>
                      <th className="sort" data-sort="charge-date-paiement">Date de Paiement</th>
                      <th className="sort" data-sort="action">Action</th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                  {chargesFixes.length > 0 ? (
                          paginateCharges().map((charge) => (
                        <tr key={charge.id}>
                          <th scope="row"  onClick={() => openShowModal(charge)}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="chk_child"
                                value="option1"
                              />
                            </div>
                          </th>
                          <td>{charge.id}</td>
                          <td>{charge.nom}</td>
                          <td>{charge.montant}</td>
                          <td>{charge.frequence}</td>
                          <td>{charge.date_paiement}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                color="soft-dark"
                                size="sm"
                                className="show-item-btn"
                                onClick={() => openShowModal(charge)}
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
                                onClick={() => openEditModal(charge)}
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
                                onClick={() => openDeleteModal(charge)}
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
                        <td colSpan="7">Aucune charge fixe disponible</td>
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
  <Modal isOpen={modalAddCharge} toggle={toggleAddChargeModal} centered>
  <ModalHeader toggle={toggleAddChargeModal}>Ajout</ModalHeader>
  <ModalBody>
    <form>
      <div className="mb-3">
        <label htmlFor="nom" className="form-label">Nom</label>
        <input type="text" className="form-control" id="nom" value={newChargeData.nom} onChange={(e) => setNewChargeData({...newChargeData, nom: e.target.value})} required />
      </div>
      <div className="mb-3">
        <label htmlFor="montant" className="form-label">Montant</label>
        <input type="number" className="form-control" id="montant" value={newChargeData.montant} onChange={(e) => setNewChargeData({...newChargeData, montant: e.target.value})} required />
      </div>
      <div className="mb-3">
        <label htmlFor="frequence" className="form-label">Fréquence</label>
        <select className="form-control" id="frequence" value={newChargeData.frequence} onChange={(e) => setNewChargeData({...newChargeData, frequence: e.target.value})} required>
          <option value="">Sélectionner la fréquence</option>
          <option value="journalière">Journalière</option>
          <option value="hebdomadaire">Hebdomadaire</option>
          <option value="mensuelle">Mensuelle</option>
          <option value="annuelle">Annuelle</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="date_paiement" className="form-label">Date de Paiement</label>
        <input type="date" className="form-control" id="date_paiement" value={newChargeData.date_paiement} onChange={(e) => setNewChargeData({...newChargeData, date_paiement: e.target.value})} required />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={toggleAddChargeModal}>Annuler</Button>
    <Button color="primary" onClick={handleAddCharge}>Enregistrer</Button>
  </ModalFooter>
</Modal>
 {/* Success Modal */}
 <Modal isOpen={showAddSuccessModal} toggle={() => setShowAddSuccessModal(false)} centered>
    <ModalHeader   toggle={() => setShowAddSuccessModal(false)} >
        Success
    </ModalHeader>
    <ModalBody>
        Personnel ajouté avec succès!
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={() => setShowAddSuccessModal(false)}>OK</Button>
    </ModalFooter>
</Modal>
{/* Show Charge Modal */}
<Modal isOpen={modal_show} toggle={toggleShowModal} centered>
  <ModalHeader toggle={toggleShowModal}>Détails de la Charge Fixe</ModalHeader>
  <ModalBody>
    {selectedCharge && (
      <form>
        <div className="mb-3">
          <label className="form-label">ID</label>
          <input type="text" className="form-control" value={selectedCharge.id} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" className="form-control" value={selectedCharge.nom} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Montant</label>
          <input type="number" className="form-control" value={selectedCharge.montant} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Fréquence</label>
          <input type="text" className="form-control" value={selectedCharge.frequence} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de Paiement</label>
          <input type="date" className="form-control" value={selectedCharge.date_paiement} readOnly />
        </div>
      </form>
    )}
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={toggleShowModal}>Fermer</Button>
  </ModalFooter>
</Modal>

{/* Update*/ }
<Modal isOpen={modal_list} toggle={toggleListModal} centered>
  <ModalHeader toggle={toggleListModal}>Modifier la charge fixe</ModalHeader>
  <ModalBody>
    <form>
      <div className="mb-3">
        <label className="form-label">Nom</label>
        <input type="text" className="form-control" value={editedNameCharge} onChange={(e) => setEditedNameCharge(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Montant</label>
        <input type="number" className="form-control" value={editedMontantCharge} onChange={(e) => setEditedMontantCharge(e.target.value)} required />
      </div>
     
      <div className="mb-3">
        <label className="form-label">Fréquence</label>
        <select
          className="form-control"
          value={editedFrequence}
          onChange={(e) => setEditedFrequence(e.target.value)}
          required
        >
          <option value="">Sélectionner la fréquence</option>
          <option value="journalière">Journalière</option>
          <option value="hebdomadaire">Hebdomadaire</option>
          <option value="mensuelle">Mensuelle</option>
          <option value="annuelle">Annuelle</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Date de Paiement</label>
        <input type="date" className="form-control" value={editedDatePaiement} onChange={(e) => setEditedDatePaiement(e.target.value)} required />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={toggleListModal}>Annuler</Button>
    <Button color="primary" onClick={handleUpdate}>Enregistrer</Button>
  </ModalFooter>
</Modal>
{/*delete*/ }
<Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
  <ModalHeader toggle={toggleDeleteModal}>Confirmer la suppression</ModalHeader>
  <ModalBody>
    {Success && (
      <div className="text-center">
        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '3em' }} />
        <Alert color="success" style={{ width: '50%', margin: '20px auto' }}>
          Charge fixe supprimée avec succès
        </Alert>
      </div>
    )}
    {errorMessage && (
      <div className="text-center">
        <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '3em' }} />
        <div className="alert alert-danger" style={{ width: '80%', margin: '20px auto' }}>
          {errorMessage}
        </div>
      </div>
    )}
    {!Success && !errorMessage && (
      <p>Êtes-vous sûr de vouloir supprimer cette charge fixe : {selectedCharge?.nom}?</p>
    )}
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={toggleDeleteModal}>Annuler</Button>
    {!Success && !errorMessage && (
      <Button color="danger" onClick={handleRemove}>Supprimer</Button>
    )}
  </ModalFooter>
</Modal>


    </React.Fragment>
  );
};

export default ChargeFixeTables;
