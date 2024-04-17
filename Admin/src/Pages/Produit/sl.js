import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { getAllCategories } from "../../store/categorie/gitCategorySlice"; 
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
  ModalHeader,
  Row,
} from "reactstrap";
import {
  getAllData,
  updateProduit,
  deleteProduit,
  addProduit,
} from "../../store/produit/gitProduitSlice";

const ProduitListTables = () => {
  const dispatch = useDispatch();
  const produits = useSelector((state) => state.gitProduit.produits);
  const categories = useSelector((state) => state.gitCategory.categories);
  const [modalShow, setModalShow] = useState(false);
  const [modalEditProduit, setModalEditProduit] = useState(false);
  const [modalAddProduit, setModalAddProduit] = useState(false);
  const [currentProduit, setCurrentProduit] = useState(null);
  const [newProduitData, setNewProduitData] = useState({
    name_produit: "",
    id_categorie: "",
    marge: "",
  });

  useEffect(() => {
    dispatch(getAllData());
    // dispatch(getAllCategories()); 
  }, [dispatch]);

  const handleAddProduit = () => {
    dispatch(addProduit(newProduitData));
    setNewProduitData({ name_produit: "", id_categorie: "", marge: "" });
    setModalAddProduit(false);
  };

  const handleEditProduit = () => {
    dispatch(
      updateProduit({
        id: currentProduit.id,
        name_produit:currentProduit.name_produit,
        produitData: currentProduit,
      })
    );
    setModalEditProduit(false);
  };

  const openEditModal = (produit) => {
    setCurrentProduit({ ...produit });
    setModalEditProduit(true);
  };

 
  const openShowModal = (produit) => {
    const category = categories.find(c => c.id_categorie === produit.id_categorie);
    setCurrentProduit({
        ...produit,
        categoryName: category ? category.name : 'Catégorie inconnue'
    });
    setModalShow(true);
};

  return (
    <React.Fragment>
    <div className="page-content">
        <Container fluid>
        <Breadcrumbs title="Tables" breadcrumbItem="Produits" />
        <Row>
            <Col lg={12}>
            <Card>
                <CardHeader>
                <h4 className="card-title mb-0">Gérer Produits</h4>
                </CardHeader>
                <CardBody>
                <Row className="g-4 mb-3">
                    <Col
                    lg={6}
                    md={6}
                    sm={12}
                    className="d-flex align-items-center gap-1"
                    >
                    <Button
                        className="btn btn-sm btn-info"
                        onClick={() => setModalAddProduit(true)}
                    >
                        <i className="ri-add-line align-bottom me-1"></i>{" "}
                        Ajouter Produit
                    </Button>
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
                    <table className="table align-middle table-nowrap">
                    <thead className="table-light">
                        <tr>
                        <th>ID</th>
                        <th>Nom du Produit</th>
                        <th>Catégorie</th>
                        <th>Marge</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {produits.map((produit) => {
                                return (
                                    <tr key={produit.id}>
                                        <td>{produit.id}</td>
                                        <td>{produit.name_produit}</td>
                                        <td onClick={() => openShowModal(produit)}>{produit.categorie ? produit.categorie.name : 'No'}</td> 
                                        <td>{produit.marge}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button className="btn btn-sm btn-dark show-item-btn" onClick={() => openShowModal(produit)}>
                                                    Details
                                                </Button>
                                                <Button className="btn btn-sm btn-success edit-item-btn" onClick={() => openEditModal(produit)}>
                                                    Modifier
                                                </Button>
                                                <Button className="btn btn-sm btn-danger remove-item-btn" onClick={() => dispatch(deleteProduit(produit.id))}>
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </Container>
    </div>
      {/* Add Product Modal */}
<Modal isOpen={modalAddProduit} toggle={() => setModalAddProduit(!modalAddProduit)}>
    <ModalHeader toggle={() => setModalAddProduit(!modalAddProduit)}>
        Ajouter Produit
    </ModalHeader>
    <ModalBody>
        <div className="form-group">
            <label htmlFor="name_produit">Nom du Produit:</label>
            <input
                id="name_produit"
                type="text"
                className="form-control"
                value={newProduitData.name_produit}
                onChange={(e) => setNewProduitData({
                    ...newProduitData,
                    name_produit: e.target.value
                })}
            />
        </div>
        <div className="form-group">
            <label htmlFor="id_categorie">Catégorie:</label>
            <select
                id="id_categorie"
                className="form-control"
                value={newProduitData.id_categorie}
                onChange={(e) => setNewProduitData({
                    ...newProduitData,
                    id_categorie: e.target.value
                })}
            >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                    <option key={category.id_categorie} value={category.id_categorie}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="marge">Marge:</label>
            <input
                id="marge"
                type="text"
                className="form-control"
                value={newProduitData.marge}
                onChange={(e) => setNewProduitData({ ...newProduitData, marge: e.target.value })}
            />
        </div>
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={() => setModalAddProduit(false)}>
            Annuler
        </Button>
        <Button color="primary" onClick={handleAddProduit}>
            Enregistrer
        </Button>
    </ModalFooter>
</Modal>
      {/* Edit Product Modal */}
    <Modal
        isOpen={modalEditProduit}
        toggle={() => setModalEditProduit(!modalEditProduit)}
    >
        <ModalHeader toggle={() => setModalEditProduit(!modalEditProduit)}>
        Modifier Produit
        </ModalHeader>
        <ModalBody>
        <div className="form-group">
            <label>Nom du Produit:</label>
            <input
            className="form-control"
            value={currentProduit?.name_produit}
            onChange={(e) =>
                setCurrentProduit({
                ...currentProduit,
                name_produit: e.target.value,
                })
            }
            />
        </div>
        <div className="form-group">
    <label>Catégorie:</label>
    <select
        className="form-control"
        value={currentProduit?.id_categorie}
        onChange={(e) => setCurrentProduit({
            ...currentProduit,
            id_categorie: e.target.value
        })}
    >
        <option value="">Sélectionner une catégorie</option>
        {categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ))}
    </select>
</div>
        <div className="form-group">
            <label>Marge:</label>
            <input
            className="form-control"
            value={currentProduit?.marge}
            onChange={(e) =>
                setCurrentProduit({ ...currentProduit, marge: e.target.value })
            }
            />
        </div>
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={() => setModalEditProduit(false)}>
            Annuler
        </Button>
        <Button color="primary" onClick={handleEditProduit}>
            Mettre à jour
        </Button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={modalShow} toggle={() => setModalShow(!modalShow)}>
    <ModalHeader toggle={() => setModalShow(!modalShow)}>
        Détails du Produit
    </ModalHeader>
    <ModalBody>
        {currentProduit ? (
            <div>
                <p><strong>ID:</strong> {currentProduit.id}</p>
                <p><strong>Nom du Produit:</strong> {currentProduit.name_produit}</p>
                <p><strong>Catégorie:</strong> {currentProduit.categoryName}</p> 
                <p><strong>Marge:</strong> {currentProduit.marge}</p>
            </div>
        ) : (
            <div>Chargement des détails...</div>
        )}
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={() => setModalShow(false)}>
            Fermer
        </Button>
    </ModalFooter>
</Modal>
    </React.Fragment>
);
};

export default ProduitListTables;
