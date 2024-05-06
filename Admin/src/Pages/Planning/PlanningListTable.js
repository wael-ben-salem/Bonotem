import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  getAllData,
  updatePlanning,
  deletePlanning,
  addPlanning,
} from "../../store/planning/gitPlanningSlice";
import { getAllPersonnel } from "../../store/personnel/gitPersonnelSlice";
import { getAllJours } from "../../store/jour/gitJourSlice";

const PlanningTables = () => {
  const dispatch = useDispatch();
  const plannings = useSelector((state) => state.gitPlanning.plannings);
  const personnels = useSelector((state) => state.gitPersonnel.personnel);
  const jours = useSelector((state) => state.gitJours.jours);
  const [selectedPlanningId, setSelectedPlanningId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPlanning, setSelectedPlanning] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [hover, setHover] = useState(false);
  const [modalAddPlanning, setModalAddPlanning] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [hoverShow, setHoverShow] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverRemove, setHoverRemove] = useState(false);
    const [selectedJour, setSelectedJour] = useState('');
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
  const semaine = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const [newPlanningData, setNewPlanningData] = useState({
    personnel_id: "",
    jour_id: "",
    heure_debut: "",
    heure_fin: "",
  });
  useEffect(() => {
    dispatch(getAllData());
    dispatch(getAllPersonnel());
    dispatch(getAllJours());
  }, [dispatch]);
  const toggleAddPlanningModal = () => {
    setModalAddPlanning(!modalAddPlanning);
  };
  const toggleModal = (modalState, setModalState) => setModalState(!modalState);

  const openShowModal = (planning) => {
    setSelectedPlanning(planning);
    setModalShow(true);
  };
  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

 /* const updateJourDetails = (jour) => {
    console.log(jour); 
    setSelectedJour(jour.nom);
    setHeureDebut(jour.heure_debut || '');
    setHeureFin(jour.heure_fin || '');

  };
  const handleJourChange = (event) => {
    const jourNom = event.target.value;
    const jour = selectedPlanning.jours.find(j => j.nom === jourNom);
    if (jour) updateJourDetails(jour);
  };*/
 

  const openEditModal = (planning) => {
    setSelectedPlanning(planning);
    setModalEdit(true); 
  };
  const openDeleteModal = (planning) => {
    if (planning && planning.id) {
      setSelectedPlanning(planning);
      toggleModal(modalDelete, setModalDelete);
    } else {
      console.error("Attempted to open delete modal with invalid planning data");
    }
  };
  const handleUpdatePlanning = () => {
    if (selectedPlanning) {
      dispatch(updatePlanning({
        id: selectedPlanning.id,
        planningData: selectedPlanning,
      }));
      setModalEdit(false); 
    }
  };
  const toggleDeleteModal = () => {
    setModalDelete(!modalDelete);
  };
  const handleRemove = () => {
    dispatch(deletePlanning(selectedPlanning.id));
    toggleDeleteModal();
  };
  const handleDeletePlanning = () => {
    dispatch(deletePlanning(selectedPlanning.id));
    toggleModal(modalDelete, setModalDelete);
  };
  const handleAddPlanning = () => {
    const formData = new FormData();
    formData.append("personnel_id", newPlanningData.personnel_id);
    formData.append("jour_id", newPlanningData.jour_id);
    formData.append("heure_debut", newPlanningData.heure_debut);
    formData.append("heure_fin", newPlanningData.heure_fin);

    console.log("Dispatching addPlanning with:", Object.fromEntries(formData)); 

    dispatch(addPlanning(formData));

    setNewPlanningData({
      personnel_id: "",
      jour_id: "",
      heure_debut: "",
      heure_fin: "",
    });
    toggleAddPlanningModal();
  };
 
  
   /* const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };*/
  
   /* const handleSubmit = () => {
      onUpdate(formData);
      toggle(); // Close modal after update
    };*/

  const groupedPlannings = plannings.reduce((acc, planning) => {
    const { personnel, jour, heure_debut, heure_fin } = planning;
    if (personnel && personnel.type_personnel && personnel.type_personnel.nom) {
      const dayName = jour ? jour.nom : "Unknown";
      const safePersonnelId = personnel.id || "Unknown";
      if (!acc[safePersonnelId]) {
        acc[safePersonnelId] = {
          personnel,
          days: {},
          type_personnel: personnel.type_personnel.nom,
        };
        semaine.forEach((day) => {
          acc[safePersonnelId].days[day] = "-";
        });
      }

      acc[safePersonnelId].days[dayName] = `${heure_debut || "Start"} - ${
        heure_fin || "End"
      }`;
    }
    return acc;
  }, {});

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="Gérer Planning" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Gérer Planning</h4>
                </CardHeader>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button
                      color="soft-info"
                      className="btn btn-sm btn-info"
                      onClick={toggleAddPlanningModal}
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
                          <th className="sort" data-sort="Personnel-Id">
                            Personnel
                          </th>
                          <th className="sort" data-sort="TypePersonnel-name">
                            Type de Personnel
                          </th>
                          {semaine.map((day) => (
                            <th key={day}>{day}</th>
                          ))}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(groupedPlannings).map((item, index) => (
                          <tr key={index}>
                            <td scope="row">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                  onClick={() => openShowModal(item)}
                                />
                              </div>
                            </td>
                            <td>{item.personnel.name}</td>
                            <td>{item.type_personnel}</td>
                            {semaine.map((day) => (
                              <td key={day}>{item.days[day]}</td>
                            ))}
                            <td>
                              <div className="d-flex gap-3">
                                <Button
                                  color="dark"
                                  size="sm"
                                  onClick={() => openShowModal(item)}
                                  onMouseEnter={() => setHoverShow(true)}
                                  onMouseLeave={() => setHoverShow(false)}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                  {hoverShow ? " Consulter" : ""}
                                </Button>
                                <Button
                                  color="success"
                                  size="sm"
                                  onClick={() => openEditModal(item)}
                                  onMouseEnter={() => setHoverEdit(true)}
                                  onMouseLeave={() => setHoverEdit(false)}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                  {hoverEdit ? " Modifier" : ""}
                                </Button>
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => openDeleteModal(item)}
                                  onMouseEnter={() => setHoverRemove(true)}
                                  onMouseLeave={() => setHoverRemove(false)}>
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                  {hoverRemove ? " Supprimer" : ""}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Show Planning Modal */}
      <Modal isOpen={modalShow} toggle={() => setModalShow(!modalShow)} centered>
        <ModalHeader toggle={() => setModalShow(!modalShow)}>
          Détails du Planning
        </ModalHeader>
        <ModalBody>
          {selectedPlanning ? (
            <div>
              <p>Personnel: {selectedPlanning.personnel.name}</p>
              <p>Type de Personnel: {selectedPlanning.type_personnel}</p>
              {Object.entries(selectedPlanning.days).map(([day, hours]) => (
                <p key={day}>{day}: {hours}</p>
              ))}
            </div>
    ) : (
      <p>Aucun planning sélectionné.</p>
    )}
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={() => setModalShow(false)}>
      Fermer
    </Button>
  </ModalFooter>
</Modal>

      {/* Add Planning Modal */}
      <Modal
        isOpen={modalAddPlanning}
        toggle={() => toggleModal(modalAddPlanning, setModalAddPlanning)}
      >
        <ModalHeader
          toggle={() => toggleModal(modalAddPlanning, setModalAddPlanning)}
        >
          Ajouter un nouveau Planning
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <label htmlFor="personnel_id" className="form-label">
                Personnel:
              </label>
              <select
                id="personnel_id"
                className="form-control"
                value={newPlanningData.personnel_id}
                onChange={(e) =>
                  setNewPlanningData({
                    ...newPlanningData,
                    personnel_id: e.target.value,
                  })
                }
              >
                <option value="">Sélectionner un personnel</option>

                {personnels.map((personnel) => (
                  <option key={personnel.id} value={personnel.id}>
                    {personnel.name ? personnel.name : "No"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="jour_id" className="form-label">
                Jour:
              </label>
              <select
                id="jour_id"
                className="form-control"
                value={newPlanningData.jour_id}
                onChange={(e) =>
                  setNewPlanningData({
                    ...newPlanningData,
                    jour_id: e.target.value,
                  })
                }
              >
                <option value="">Sélectionner un jour</option>
                {jours.map((jour) => (
                  <option key={jour.id} value={jour.id}>
                    {jour.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="heure_debut">Heure Début:</label>
              <input
                type="time"
                className="form-control"
                id="heure_debut"
                value={newPlanningData.heure_debut}
                onChange={(e) =>
                  setNewPlanningData({
                    ...newPlanningData,
                    heure_debut: e.target.value,
                  })
                }
                placeholder="Enter Heure Début"
              />
            </div>
            <div className="form-group">
              <label htmlFor="heure_fin">Heure Fin:</label>
              <input
                type="time"
                className="form-control"
                id="heure_fin"
                value={newPlanningData.heure_fin}
                onChange={(e) =>
                  setNewPlanningData({
                    ...newPlanningData,
                    heure_fin: e.target.value,
                  })
                }
                placeholder="Enter Heure Fin"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddPlanning}>
            Ajouter
          </Button>
          <Button
            color="secondary"
            onClick={() => toggleModal(modalAddPlanning, setModalAddPlanning)}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Planning Modal */}
    {/* <Modal isOpen={modalEdit} toggle={toggleModalEdit} centered>
        <ModalHeader toggle={toggleModalEdit}>Modifier le Planning</ModalHeader>
        <ModalBody>
        <form>
          <div>
            <label for="personnel_id">Personnel:</label>
            <input type="select" name="personnel_id" id="personnel_id" value={formData.personnel_id} onChange={handleChange}>
              {personnels.map(personnel => (
                <option key={personnel.id} value={personnel.id}>{personnel.name}</option>
              ))}
            </input>
          </div>
          <div>
            <label for="jour_id">Jour:</label>
            <input type="select" name="jour_id" id="jour_id" 
                  value={selectedPlanning.jour_id}
                  onChange={(e) => setSelectedPlanning({...selectedPlanning, jour_id: e.target.value})}>
                  {jours.map(jour => (
                    <option key={jour.id} value={jour.id}>{jour.nom}</option>
                  ))}
                </input>
          </div>
          <div>
          <label for="heure_debut">Heure Début:</label>
                <input type="time" name="heure_debut" id="heure_debut" 
                  value={selectedPlanning.heure_debut}
                  onChange={(e) => setSelectedPlanning({...selectedPlanning, heure_debut: e.target.value})} />
          </div>
          <div>
          <label for="heure_fin">Heure Fin:</label>
                <input type="time" name="heure_fin" id="heure_fin" 
                  value={selectedPlanning.heure_fin}
                  onChange={(e) => setSelectedPlanning({...selectedPlanning, heure_fin: e.target.value})} />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
      <Button color="primary" onClick={() => handleUpdatePlanning(selectedPlanning)}>Mettre à jour</Button>
            <Button color="secondary" onClick={() => setModalEdit(false)}>Annuler</Button>
      </ModalFooter>
                  </Modal>*/}

      {/* Delete Planning Modal */}
      <Modal
        isOpen={modalDelete}
        toggle={() => toggleModal(modalDelete, setModalDelete)}
      >
        <ModalHeader toggle={() => toggleModal(modalDelete, setModalDelete)}>
          Supprimer le Planning
        </ModalHeader>
        <ModalBody>Êtes-vous sûr de vouloir supprimer ce planning?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeletePlanning}>
            Supprimer
          </Button>
          <Button
            color="secondary"
            onClick={handleRemove}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default PlanningTables;
