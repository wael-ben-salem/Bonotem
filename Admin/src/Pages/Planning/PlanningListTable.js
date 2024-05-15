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


} from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  getAllData,
  updatePlanning,
  deletePlanning,
  addPlanning,
  deleteAllPlanningsForPersonnel,
  updateAllPlanningsForPersonnel,
} from "../../store/planning/gitPlanningSlice";
import { getAllPersonnel } from "../../store/personnel/gitPersonnelSlice";
import { getAllJours } from "../../store/jour/gitJourSlice";

const PlanningTables = () => {
  const dispatch = useDispatch();
  const plannings = useSelector((state) => state.gitPlanning.plannings);
  const personnels = useSelector((state) => state.gitPersonnel.personnel);
  const jours = useSelector((state) => state.gitJours.jours);
  const semaine = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const groupedPlannings = plannings.reduce((acc, planning) => {
    const { personnel, jour, heure_debut, heure_fin ,taux_heure} = planning;
    if (personnel && personnel.type_personnel && personnel.type_personnel.nom) {
      const dayName = jour ? jour.name : "Unknown";
      const safePersonnelId = personnel.id || "Unknown";
      if (!acc[safePersonnelId]) {
        acc[safePersonnelId] = {
          personnel,
          days: {},
          type_personnel: personnel.type_personnel.nom,
          taux_heure,
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
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPlanning, setSelectedPlanning] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [hover, setHover] = useState(false);
  const [modalAddPlanning, setModalAddPlanning] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [selectedDayData, setSelectedDayData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [dayData, setDayData] = useState({ heure_debut: '', heure_fin: '' });
  const [hoverShow, setHoverShow] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverRemove, setHoverRemove] = useState(false);
   const toggleModal = (modalState, setModalState) => setModalState(!modalState);
   const [modalEdit, setModalEdit] = useState(false);
  
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = Object.values(groupedPlannings).slice(indexOfFirstItem, indexOfLastItem);
   const totalPages = Math.ceil(Object.values(groupedPlannings).length / itemsPerPage);
   const renderPageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
    <button key={number} onClick={() => setCurrentPage(number)} disabled={currentPage === number}>
      {number}
    </button>
  ));
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
};
   const [editData, setEditData] = useState({
    personnel_id: "",
    jour_id: "",
    heure_debut: "",
    heure_fin: "",
    taux_heure: "",
  });
 

  const [newPlanningData, setNewPlanningData] = useState({
    personnel_id: "",
    jour_id: "",
    heure_debut: "",
    heure_fin: "",
    taux_heure:"",
  });
  useEffect(() => {
    dispatch(getAllData());
    dispatch(getAllPersonnel());
    dispatch(getAllJours());
    console.log("Selected Planning:", selectedPlanning);
    console.log("Selected Day:", selectedDay);
  }, [dispatch,selectedPlanning, selectedDay]);
  const toggleModalEdit = () => {
    setModalEdit(prev => !prev);  
};
const handleUpdatePlanning = () => {
  if (!selectedPlanning || !selectedDay) {
    console.error("Error: Necessary data is undefined.", { planning: selectedPlanning, day: selectedDay });
    return;
  }


  if (!selectedPlanning.id || !selectedPlanning.personnel_id || !selectedDay) {
    console.error("Error: Planning ID, Personnel ID, or Day is undefined.", { 
      id: selectedPlanning.id, 
      personnel_id: selectedPlanning.personnel_id,
      day: selectedDay
    });
    return;
  }

  const updatedPlanningData = {
    ...selectedPlanning,
    personnel_id: selectedPlanning.personnel_id,
    jour_id: selectedDay,
    heure_debut: dayData.heure_debut,
    heure_fin: dayData.heure_fin
  };

  dispatch(updatePlanning({ id: selectedPlanning.id, planningData: updatedPlanningData }));
};

const onChangeDay = (event) => {
  const day = event.target.value;
  setSelectedDay(day);

  const dayInfo = selectedPlanning.days[day];
  if (dayInfo) {
    const [heure_debut, heure_fin] = dayInfo.split(' - ');
    setDayData({
      heure_debut: heure_debut.trim(),
      heure_fin: heure_fin.trim()
    });
  } else {
    setDayData({ heure_debut: '', heure_fin: '' });
  }
};
const formatTime = (timeString) => {
  if (!timeString || timeString === '-') return ''; // Return empty string if no time provided or if placeholder
  const time = timeString.split(':'); 
  return `${time[0]}:${time[1]}`; 
};

const onChange = (e) => {
  const selectedDayId = e.target.value;
  setSelectedDay(selectedDayId);

  
  const jourInfo = plannings.find(planning => planning.jour_id === selectedDayId);

  if (jourInfo) {
      setEditData({
          ...editData,
          heure_debut: jourInfo.heure_debut,
          heure_fin: jourInfo.heure_fin
      });
  } else {
      console.log('No jour info found for the selected day');
      setEditData({
          ...editData,
          heure_debut: '',
          heure_fin: ''
      });
  }
};
  /*const handleUpdatePlanning = () => {
    if (selectedPlanning && selectedPlanning.id) {
      const updatedData = {
        personnel_id: selectedPlanning.personnel.id,
        jour_id: selectedPlanning.jour.id,
        heure_debut: editData.heure_debut,
        heure_fin: editData.heure_fin,
        taux_heure: editData.taux_heure,
      };
      dispatch(updatePlanning(selectedPlanning.id, updatedData)); // Assurez-vous que votre action Redux d'updatePlanning prend les arguments id et data
      setModalEdit(false);
    } else {
      console.error('Error: Selected planning or planning ID is undefined.');
    }
  };*/
  const handleChangeDay = (event) => {
    const day = event.target.value;
    setSelectedDay(day);
  
    const dayString = selectedPlanning.days[day] || '-';
    const times = dayString.split(' - ');
    setDayData({
      heure_debut: times[0] || '',
      heure_fin: times[1] || ''
    });
  };

  /*const handleUpdateAllPlannings = () => {
    if (selectedPersonnel) {
      jours.forEach(jour => {
        const jourData = editData[jour.name];
        if (jourData && jourData.heure_debut && jourData.heure_fin) {
          const updatePayload = {
            personnelId: selectedPersonnel.id,
            planningData: {
              jour_id: jourData.jour_id,
              heure_debut: jourData.heure_debut,
              heure_fin: jourData.heure_fin,
              taux_heure: jourData.taux_heure
            }
          };
          dispatch(updateAllPlanningsForPersonnel(updatePayload));
        }
      });
      setModalEdit(false);
    }
  };*/

  const openEditModal = (planning) => {
   
    if (!planning || !planning.personnel || !planning.personnel.id || !planning.days) {
        console.error("Incomplete planning data", planning);
        return; 
    }

  
    const exampleDayKey = Object.keys(planning.days)[0]; 
    const exampleDayData = planning.days[exampleDayKey];

    setSelectedPlanning(planning);
    setEditData({
        personnel_id: planning.personnel.id,
        jour_id: exampleDayKey, 
        heure_debut: exampleDayData.split(' - ')[0],
        heure_fin: exampleDayData.split(' - ')[1],
        taux_heure: planning.taux_heure
    });

    toggleModalEdit(true);
};

const toggleAddPlanningModal = () => {
  if (modalAddPlanning) {
      
      setNewPlanningData({
          personnel_id: "",
          jour_id: "",
          heure_debut: "",
          heure_fin: "",
          taux_heure: ""
      });
  }
  setModalAddPlanning(!modalAddPlanning);
};
  
  const openShowModal = (planning) => {
    setSelectedPlanning(planning);
    setModalShow(true);
  };


  const openDeleteModal = (planning) => {
    setSelectedPlanning(planning);
    setSelectedPersonnel(planning.personnel);
    setModalDelete(true);
  };

  const handleDeletePlanning = () => {
    if (selectedPlanning && selectedPlanning.id) {
      dispatch(deletePlanning(selectedPlanning.id));
      setModalDelete(false);
    }
  };

  const handleDeleteAllPlannings = () => {
    if (selectedPersonnel && selectedPersonnel.id) {

        dispatch(deleteAllPlanningsForPersonnel(selectedPersonnel.id));
        setModalDelete(false);

    }
  };


  const handleAddPlanning = () => {
    const formData = new FormData();
    formData.append("personnel_id", newPlanningData.personnel_id);
    formData.append("jour_id", newPlanningData.jour_id);
    formData.append("heure_debut", newPlanningData.heure_debut);
    formData.append("heure_fin", newPlanningData.heure_fin);
    formData.append("taux_heure", newPlanningData.taux_heure);

    console.log("Dispatching addPlanning with:", Object.fromEntries(formData));

    dispatch(addPlanning(formData));
    setShowAddSuccessModal(true);
    setNewPlanningData({
      personnel_id: "",
      jour_id: "",
      heure_debut: "",
      heure_fin: "",
      taux_heure:"",
    });
    toggleAddPlanningModal();
  };
  useEffect(() => {
    if (showAddSuccessModal) {
        const timer = setTimeout(() => {
            setShowAddSuccessModal(false);
        }, 5000); 
        return () => clearTimeout(timer);
    }
}, [showAddSuccessModal]);


 

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="Plannings" />

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
                          <th className="sort" data-sort="TauxHeure">
                            Taux Heure
                          </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td >
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
                              <td key={day}>{item.days[day] ? formatTime(item.days[day].split(' - ')[0]) + ' - ' + formatTime(item.days[day].split(' - ')[1]) : '-'}</td>
                            ))}
                            <td>{item.taux_heure}</td>
                            <td>
                            
                                  <div className=" d-flex  gap-4">
                                    <Button
                                      color="soft-dark"
                                      size="sm"
                                      className="show-item-btn"
                                      onClick={() => openShowModal(item)}
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
                                      onClick={() => openEditModal(item)}
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
                                      onClick={() => openDeleteModal(item)}
                                      onMouseEnter={() => setHoverRemove(true)}
                                      onMouseLeave={() => setHoverRemove(false)}
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                      {hoverRemove ? " Supprimer" : ""}
                                    </Button>
                                  </div>
                                
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <ul className="pagination">
    {Array.from({ length: Math.ceil(totalPages) }, (_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => changePage(index + 1)}>{index + 1}</button>
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
      {/* Show Planning Modal */}
      <Modal isOpen={modalShow} toggle={() => setModalShow(!modalShow)} centered>
        <ModalHeader toggle={() => setModalShow(!modalShow)}>
          Détails Planning
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
          Ajout
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
                    {jour.name}
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
            <div className="form-group">
              <label htmlFor="taux_heure">Taux Heure:</label>
              <input
                type="text"
                className="form-control"
                id="taux_heure"
                value={newPlanningData.taux_heure}
                onChange={(e) =>
                  setNewPlanningData({
                    ...newPlanningData,
                    taux_heure: e.target.value,
                  })
                }
                placeholder="Enter Taux heure"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
        <Button
            color="secondary"
            onClick={() => toggleModal(modalAddPlanning, setModalAddPlanning)}
          >
            Annuler
          </Button>
          <Button color="primary" onClick={handleAddPlanning}>
            Enregistrer
          </Button>
         
        </ModalFooter>
        
      </Modal>
       {/* Success Modal */}
      <Modal isOpen={showAddSuccessModal} toggle={() => setShowAddSuccessModal(false)} centered>
    <ModalHeader   toggle={() => setShowAddSuccessModal(false)} >
        Success
    </ModalHeader>
    <ModalBody>
        Planning ajouté avec succès!
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={() => setShowAddSuccessModal(false)}>OK</Button>
    </ModalFooter>
</Modal>
      {/* Update Planning Modal */}
      <Modal isOpen={modalEdit} toggle={() => setModalEdit(false)} centered>
  <ModalHeader toggle={() => setModalEdit(false)}>
    Modifier Planning pour {selectedPlanning ? selectedPlanning.personnel.name : "le personnel sélectionné"}
  </ModalHeader>
  <ModalBody>
    <form>
    <div className="mb-3">
        <label htmlFor="personnel_id" className="form-label">Personnel:</label>
        <select
          className="form-control"
          id="personnel_id"
          value={editData.personnel_id}
          onChange={(e) => setEditData({ ...editData, personnel_id: e.target.value })}
        >
          {personnels.map((personnel) => (
            <option key={personnel.id} value={personnel.id}>{personnel.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="day_select">Jour:</label>
        <select
  id="day_select"
  className="form-control"
  value={selectedDay}
  onChange={onChangeDay}
  disabled={!selectedPlanning} // Disable selection if no planning is selected
>
  {jours.map(jour => (
    <option key={jour.name} value={jour.name}>{jour.name}</option>
  ))}
</select>
      </div>
      <div className="mb-3">
        <label htmlFor="heure_debut">Heure Début:</label>
        <input
          type="time"
          className="form-control"
          id="heure_debut"
          value={dayData.heure_debut || ''}
          onChange={(e) => setDayData({...dayData, heure_debut: e.target.value})}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="heure_fin">Heure Fin:</label>
        <input
          type="time"
          className="form-control"
          id="heure_fin"
          value={dayData.heure_fin || ''}
          onChange={(e) => setDayData({...dayData, heure_fin: e.target.value})}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="taux_heure">Taux Heure:</label>
        <input
          type="text"
          className="form-control"
          id="taux_heure"
          value={editData.taux_heure || ''}
          onChange={(e) => setEditData({ ...editData, taux_heure: e.target.value })}
        />
      </div>

    </form>
  </ModalBody>
  <ModalFooter>
  <Button color="secondary" onClick={() => setModalEdit(false)}>Annuler</Button>
    <Button color="primary" onClick={() => handleUpdatePlanning()}>Mettre à jour</Button>
  </ModalFooter>
</Modal>
{/* Delete Modal*/ }
      <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)} centered>
  <ModalHeader toggle={() => setModalDelete(!modalDelete)}>Supprimer</ModalHeader>
  <ModalBody>
  Êtes-vous sûr de vouloir supprimer ce planning?
  </ModalBody>
  <ModalFooter>
    <Button color="danger" onClick={handleDeleteAllPlannings}>
      Supprimer
    </Button>
    <Button color="secondary" onClick={() => setModalDelete(false)}>Fermer</Button>
  </ModalFooter>
</Modal>


    </React.Fragment>
  );
};

export default PlanningTables;
