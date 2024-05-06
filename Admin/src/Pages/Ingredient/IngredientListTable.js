import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Common/Breadcrumb";
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

import {
  getAllData,
  updateIngredient,
  deleteIngredient,
  addIngredient,
} from "../../store/ingredient/gitIngredientSlice";

const IngredientTables = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.gitIngredient.ingredients);
  const [modal_list, setmodal_list] = useState(false);
  const [editIngredient, setEditIngredient] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedUnit, setEditedUnit] = useState("");
  const [editedIdFournisseur, setEditedIdFournisseur] = useState("");

  const [modal_show, setModalShow] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [modal_delete, setModalDelete] = useState(false);
  const [modalAddIngredient, setModalAddIngredient] = useState(false);
  const [newIngredientData, setNewIngredientData] = useState({
    name_ingredient: "",
    unit_measure: "",
    id_fournisseur: "",
  });

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const toggleAddIngredientModal = () => {
    setModalAddIngredient(!modalAddIngredient);
  };
  const toggleListModal = () => {
    setmodal_list(!modal_list);
  };

  const toggleDeleteModal = () => {
    setModalDelete(!modal_delete);
  };

  const openShowModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    toggleModal(modal_show, setModalShow);
  };

  /*const toggleShowModal = () => {
        setModalShow(!modal_show);
    }*/

  const openDeleteModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    toggleDeleteModal();
  };

  const handleRemove = () => {
    dispatch(deleteIngredient(selectedIngredient.id_ingredient));
    toggleDeleteModal();
  };

  const openEditModal = (ingredient) => {
    setEditIngredient(ingredient);
    setEditedName(ingredient.name_ingredient);
    setEditedUnit(ingredient.unit_measure);
    setEditedIdFournisseur(ingredient.id_fournisseur);
    toggleListModal();
  };

  const handleUpdate = () => {
    const updatedIngredient = {
        name_ingredient: editedName,
        unit_measure: editedUnit,
        id_fournisseur: editedIdFournisseur,
    };
    if (!editIngredient.id_ingredient) {
        console.error("No ID found for the ingredient, cannot update");
        return;  
    }
    dispatch(updateIngredient({
        id: editIngredient.id_ingredient, 
        ingredientData: updatedIngredient,
    }));
    toggleListModal();
};

  const toggleModal = (modal, setModal) => setModal(!modal);

  const handleAddIngredient = () => {
    dispatch(addIngredient(newIngredientData));
    setNewIngredientData({
      name_ingredient: "",
      unit_measure: "",
      id_fournisseur: "",
    });
    toggleAddIngredientModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="List Ingredient" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Gestion Ingredients</h4>
                </CardHeader>

                <CardBody>
                <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                <Button  className="btn btn-sm btn-info"
                            onClick={toggleAddIngredientModal}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Ajouter 
                          </Button>
                          
                          <Button color="soft-danger">
                                                        {/* onClick="deleteMultiple()" */}
                                                        <i className="ri-delete-bin-2-line"></i>
                                                    </Button>
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Chercher..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="ingredientTable"
                      >
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
                            <th className="sort" data-sort="User-Id">
                              Id
                            </th>
                            <th className="sort" data-sort="User-name">
                              Ingredient
                            </th>
                            <th className="sort" data-sort="User-email">
                              Unite Mesure
                            </th>
                            <th className="sort" data-sort="User-adresse">
                              Id Fournisseur
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {ingredients && ingredients.length > 0 ? (
                            ingredients.map((ingredient) => (
                              <tr key={ingredient.id_ingredient}>
                                <th
                                  scope="row"
                                  onClick={() => openShowModal(ingredient)}
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
                                <td onClick={() => openShowModal(ingredient)}>
                                  {ingredient.id_ingredient}
                                </td>
                                <td onClick={() => openShowModal(ingredient)}>
                                  {ingredient.name_ingredient}
                                </td>
                                <td onClick={() => openShowModal(ingredient)}>
                                  {ingredient.unit_measure}
                                </td>
                                <td onClick={() => openShowModal(ingredient)}>
                                  {ingredient.id_fournisseur}
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="show">
                                      <button
                                        className="btn btn-sm btn-dark show-item-btn"
                                        onClick={() =>
                                          openShowModal(ingredient)
                                        }
                                      >
                                        Detail
                                      </button>
                                    </div>
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        onClick={() =>
                                          openEditModal(ingredient)
                                        }
                                      >
                                        Modifier
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => {
                                          openDeleteModal(ingredient);
                                        }}
                                      >
                                        Supprimer
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7">Ingredient non disponibles</td>
                            </tr>
                          )}
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
      {/* Ajout Modal */}
      <Modal
        isOpen={modalAddIngredient}
        toggle={toggleAddIngredientModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={toggleAddIngredientModal}>
          Ajouter Ingredient
        </ModalHeader>
        <ModalBody>
          <form className="tablelist-form">
            <div className="mb-3">
              <label htmlFor="name-field" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name-field"
                className="form-control"
                placeholder="Enter Name"
                value={newIngredientData.name_ingredient}
                onChange={(e) =>
                  setNewIngredientData({
                    ...newIngredientData,
                    name_ingredient: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="unit-field" className="form-label">
                Unit mesure
              </label>
              <input
                type="text"
                id="unit-field"
                className="form-control"
                placeholder="Enter unite mesure"
                value={newIngredientData.unit_measure}
                onChange={(e) =>
                  setNewIngredientData({
                    ...newIngredientData,
                    unit_measure: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fournisseur-field" className="form-label">
                Id fournisseur
              </label>
              <input
                type="text"
                id="fournisseur-field"
                className="form-control"
                placeholder="Enter Id fournisseur"
                value={newIngredientData.id_fournisseur}
                onChange={(e) =>
                  setNewIngredientData({
                    ...newIngredientData,
                    id_fournisseur: e.target.value,
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
              color="secondary"
              onClick={toggleAddIngredientModal}
            >
              Annuler
            </Button>
            <Button type="button" color="primary" onClick={handleAddIngredient}>
              Enregistrer
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Modification Modal */}
      <Modal isOpen={modal_list} toggle={toggleListModal} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={toggleListModal}
        >
          {" "}
          Modification D'ingredient{" "}
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="username-field" className="form-label">
                Ingredient{" "}
              </label>
              <input
                type="text"
                id="username-field"
                className="form-control"
                placeholder="Enter Name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
                Unite Mesure
              </label>
              <input
                type="text"
                id="unit-field"
                className="form-control"
                placeholder="Enter Unit"
                value={editedUnit}
                onChange={(e) => setEditedUnit(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fournisseur-field" className="form-label">
                Id Fournisseur
              </label>
              <input
                type="text"
                id="fournisseur-field"
                className="form-control"
                placeholder="Enter Id Fournnisseur"
                value={editedIdFournisseur}
                onChange={(e) => setEditedIdFournisseur(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleListModal}>
              Annuler
            </Button>
            <Button color="primary" onClick={handleUpdate}>
              Mattre a jour
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <Modal
        isOpen={modal_show}
        toggle={() => toggleModal(modal_show, setModalShow)}
        centered
      >
        <ModalHeader toggle={() => toggleModal(modal_show, setModalShow)}>
          {" "}
          Details
        </ModalHeader>
        <ModalBody>
          {selectedIngredient && (
            <>
              <p>
                <strong>Ingredient:</strong>{" "}
                {selectedIngredient.name_ingredient}
              </p>
              <p>
                <strong>Unit Measure:</strong> {selectedIngredient.unit_measure}
              </p>
              <p>
                <strong>Fournisseur ID:</strong>{" "}
                {selectedIngredient.id_fournisseur}
              </p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => toggleModal(modal_show, setModalShow)}
          >
            Fermer
          </Button>
        </ModalFooter>
      </Modal>

      {/* Suppression Modal */}
      <Modal isOpen={modal_delete} toggle={toggleDeleteModal} centered>
        <ModalHeader className="bg-light p-3" toggle={toggleDeleteModal}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>
          {selectedIngredient && (
            <p>
              Voulez vous supprimer ingredient{" "}
              {selectedIngredient.name}?
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

export default IngredientTables;
