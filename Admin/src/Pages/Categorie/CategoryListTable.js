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

import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  addCategorie,
  deleteCategorie,
  getAllData,
  getCategorieeDetails,
  updateCategorie,
} from "../../store/categorie/gitCategorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CategoryTables = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.gitCategory.categories);

  const [modal_list, setmodal_list] = useState(false);
  const [editCategorie, setEditCategorie] = useState(null);
  const [editedNameCategorie, setEditedNameCategorie] = useState("");
  const [editedDescriptionCategorie, setEditedDescriptionCategorie] =
    useState("");
  const [editedPhoto, setEditedPhoto] = useState(null); // Store the file itself, initialize as null

  const [modal_show, setModalShow] = useState(false); // State for Show Modal
  const [selectedCategorie, setSelectedCategorie] = useState(null); // State to store selected
  const [modal_delete, setModalDelete] = useState(false); // State for Delete Modal
  const [modalAddCategorie, setModalAddCategorie] = useState(false);
  const [hover, setHover] = useState(false);

  const [newCategorieData, setNewCategorieData] = useState({
    name: "",
    description: "",
    photo: null,
  });
  // const [currentPage, setCurrentPage] = useState(1);
  //const itemsPerPage = 5; // Nombre d'éléments à afficher par page

  // const goToNextPage = () => {
  //  setCurrentPage((prevPage) => prevPage + 1);
  // };

  // const goToPreviousPage = () => {
  // setCurrentPage((prevPage) => prevPage - 1);
  // };

  // const totalPages = Math.ceil(categories.length / itemsPerPage);

  //

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const toggleAddCategorieModal = () => {
    setModalAddCategorie(!modalAddCategorie);
  };

  const toggleListModal = () => {
    setmodal_list(!modal_list);
  };

  const toggleDeleteModal = () => {
    setModalDelete(!modal_delete);
  };
  const toggleShowModal = () => {
    setModalShow(!modal_show);
  };

  const openDeleteModal = (categorie) => {
    setSelectedCategorie(categorie);
    toggleDeleteModal();
  };

  const handleRemove = () => {
    dispatch(deleteCategorie(selectedCategorie.id));
    toggleDeleteModal();
  };

  const openEditModal = (categories) => {
    setEditCategorie(categories);
    setEditedNameCategorie(categories.name);
    setEditedDescriptionCategorie(categories.description);
    setEditedPhoto(categories.photo);

    toggleListModal();
  };

  const handleUpdate = () => {
    const updatedCategorie = {
      id: editCategorie.id,
      name: editedNameCategorie,
      description: editedDescriptionCategorie,
      photo: editedPhoto,
    };

    dispatch(
      updateCategorie({ id: editCategorie.id, categorieData: updatedCategorie })
    );

    toggleListModal();
  };

  const openShowModal = (categorie) => {
    setSelectedCategorie(categorie);
    dispatch(getCategorieeDetails(categorie.id));
    toggleShowModal();
  };

  const [hoverShow, setHoverShow] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverRemove, setHoverRemove] = useState(false);

  const handleAddCategorie = () => {
    const formData = new FormData();
    formData.append("name", newCategorieData.name);
    formData.append("description", newCategorieData.description);
    formData.append("photo", newCategorieData.photo);
    console.log(formData);
    dispatch(addCategorie(formData));

    // Reset the state
    setNewCategorieData({
      name: "",
      description: "",
      photo: null,
    });
    toggleAddCategorieModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="List Categorie" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Gérer les Categories</h4>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-2">
                          <Button
                            color="soft-info"
                            className="btn btn-sm btn-info"
                            onClick={toggleAddCategorieModal}
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
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="categorieTable"
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
                            <th className="sort" data-sort="Categorie-Id">
                              ID
                            </th>
                            <th className="sort" data-sort="Categorie-name">
                              Nom Categorie
                            </th>
                            <th
                              className="sort"
                              data-sort="Categorie-description"
                            >
                              description
                            </th>
                            <th className="sort" data-sort="Categorie-photo">
                              photo
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {categories && categories.length > 0 ? (
                            categories.map((categorie) => (
                              <tr key={categorie.id}>
                                <th
                                  scope="row"
                                  onClick={() => openShowModal(categories)}
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
                                <td onClick={() => openShowModal(categorie)}>
                                  {categorie.id}
                                </td>
                                <td onClick={() => openShowModal(categorie)}>
                                  {categorie.name}
                                </td>
                                <td onClick={() => openShowModal(categorie)}>
                                  {categorie.description}
                                </td>
                                <td onClick={() => openShowModal(categorie)}>
                                  {categorie.photo ? (
                                    <img
                                      src={`${categorie.photo.replace(
                                        "categories",
                                        ""
                                    )}`}
                                    alt={categorie.name}
                                    style={{ width: "50px", height: "50px" }}
                                    />
                                ) : (
                                    "No photo"
                                )}
                                </td>
                                <td>
                                <div className=" d-flex  gap-4">
                                    <Button
                                    color="soft-dark"
                                    size="sm"
                                    className="show-item-btn"
                                    onClick={() => openShowModal(categorie)}
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
                                    onClick={() => openEditModal(categorie)}
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
                                    onClick={() => openDeleteModal(categorie)}
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
                            <td colSpan="7">No Categories available</td>
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
      {/* Add Packaging Modal */}
    <Modal
        isOpen={modalAddCategorie}
        toggle={toggleAddCategorieModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={toggleAddCategorieModal}>
          Ajout
        </ModalHeader>
        <ModalBody>
          <form className="tablelist-form">
            <div className="mb-3">
              <label htmlFor="name-field" className="form-label">
                Nom Categorie
              </label>
              <input
                type="text"
                id="naem-field"
                className="form-control"
                placeholder="Enter Name"
                value={newCategorieData.name}
                onChange={(e) =>
                  setNewCategorieData({
                    ...newCategorieData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description-field" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description-field"
                className="form-control"
                placeholder="Enter La description"
                value={newCategorieData.description}
                onChange={(e) =>
                  setNewCategorieData({
                    ...newCategorieData,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo-field" className="form-label">
                Photo
              </label>
              <input
                type="file"
                id="photo-field"
                className="form-control"
                onChange={(e) =>
                  setNewCategorieData({
                    ...newCategorieData,
                    photo: e.target.files[0],
                  })
                } // Handle file selection
                name="photo"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <Button
              type="button"
              color="light"
              onClick={toggleAddCategorieModal}
            >
              Fermer
            </Button>
            <Button type="button" color="success" onClick={handleAddCategorie}>
              Ajouter{" "}
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={modal_list} toggle={toggleListModal} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={toggleListModal}
        >
          {" "}
          Modifier Packaging{" "}
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="name-field" className="form-label">
                Nom Description
              </label>
              <input
                type="text"
                id="name-field"
                className="form-control"
                placeholder="Entrer Nom"
                value={editedNameCategorie}
                onChange={(e) => setEditedNameCategorie(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description-field" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description-field"
                className="form-control"
                placeholder="Enter la description"
                value={editedDescriptionCategorie}
                onChange={(e) => setEditedDescriptionCategorie(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="validate-field" className="form-label">
                Validate :
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="photo-field" className="form-label">
                Photo
              </label>
              <input
                type="file"
                id="photo-field"
                className="form-control"
                onChange={(e) => setEditedPhoto(e.target.files[0])} // Handle file selection
                name="photo"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={toggleListModal}
              >
                Fermer
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
        </form>
      </Modal>

      {/* Show Modal */}
      <Modal isOpen={modal_show} toggle={toggleShowModal} centered>
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={toggleShowModal}
        >
          Detail Packaging
        </ModalHeader>
        <ModalBody>
          {selectedCategorie && (
            <form className="tablelist-form">
              <div className="mb-3">
                <label htmlFor="nom-field" className="form-label">
                  Nom Description
                </label>
                <input
                  type="text"
                  id="name_packaging-field"
                  className="form-control"
                  value={selectedCategorie.name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description-field" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  id="description-field"
                  className="form-control"
                  value={selectedCategorie.description}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="photo-label">Photo:</label>
                {selectedCategorie.photo ? (
                  <img
                    src={selectedCategorie.photo}
                    alt="Category"
                    style={{ width: "100px" }}
                  />
                ) : (
                  "No photo available"
                )}
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
          {selectedCategorie && (
            <p>
              Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
              {selectedCategorie.name}?
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Retour
          </Button>
          <Button color="danger" onClick={handleRemove}>
            Supprimer
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default CategoryTables;
