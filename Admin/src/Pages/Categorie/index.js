import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
//import SimpleBar from 'simplebar-react';
//import { Link } from 'react-router-dom';

const ListCategorie = () => {
    const [categories, setCategories] = useState([]);
    const [nomCategorie, setNomCategorie] = useState('');
    const [descriptionCategorie, setDescriptionCategorie] = useState('');
    const [imageCategorie, setImageCategorie] = useState(null);
    const [modalList, setModalList] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

     const fetchCategories = async () => {
           try {
               const response = await axios.get('http://localhost:8000/api/categories');
               console.log(response.data); // Débogage: afficher les données dans la console
               setCategories(response.data);
           } catch (error) {
               console.error("Erreur lors de la récupération des catégories:", error);
           }
       };

    const togList = () => {
        setModalList(!modalList);
    }

    const handleFileChange = (e) => {
        setImageCategorie(e.target.files[0]);
    };

    const handleAddCategorie = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', nomCategorie);
            formData.append('description', descriptionCategorie);
            formData.append('photo', imageCategorie);

            const response = await axios.post('http://localhost:8000/api/categories', formData);
            console.log(response.data);

            // Rafraîchir la liste des catégories après l'ajout
            fetchCategories();
            // Fermer le modal d'ajout de catégorie
            togList();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie:", error);
        }
    };

   return (
       <React.Fragment>
           <Container fluid>
               <Row>
                   <Col lg={12}>
                       <Card>
                           <CardHeader>
                               <h4 className="card-title mb-0">Gestion Catégorie</h4>
                           </CardHeader>
                           <CardBody>
                               <div className="d-flex gap-1">
                                   <Button color="success" className="add-btn" onClick={togList}><i className="ri-add-line align-bottom me-1"></i> Ajouter</Button>
                               </div>
                               <div className="table-responsive table-card mt-3 mb-1">
                                   <table className="table align-middle table-nowrap" id="customerTable">
                                       <thead className="table-light">
                                           <tr>
                                               <th scope="col" style={{ width: "50px" }}>
                                                   <div className="form-check">
                                                       <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                   </div>
                                               </th>
                                               <th className="sort" data-sort="customer_name">Id</th>
                                               <th className="sort" data-sort="categorie_name">Nom</th>
                                               <th className="sort" data-sort="phone">Description</th>
                                               <th className="sort" data-sort="image">Image</th>
                                           </tr>
                                       </thead>
                                  <tbody className="list form-check-all">
                                      {categories && categories.length > 0 ? (
                                          categories.map((category, index) => (
                                              <tr key={index}>
                                                  <th scope="row">
                                                      <div className="form-check">
                                                          <input className="form-check-input" type="checkbox" name="chk_child" value={category.id_categorie} />
                                                      </div>
                                                  </th>
                                                  <td className="id">{category.id_categorie}</td>
                                                  <td className="categorie_name">{category.name}</td>
                                                  <td className="email">{category.description}</td>
                                                  <td className="phone">
                                                      <img src={category.photo} alt={`image_${category.id_categorie}`} />
                                                  </td>
                                              </tr>
                                          ))
                                           ) : (
                                               <tr>
                                                   <td colSpan="5" className="text-center">
                                                       Aucune catégorie trouvée.
                                                   </td>
                                               </tr>
                                           )}
                                       </tbody>
                                   </table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modalList} toggle={togList} centered>
                <ModalHeader className="bg-light p-3" toggle={togList}>Ajout Catégorie</ModalHeader>
                <form onSubmit={handleAddCategorie} className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Nom</label>
                            <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" required value={nomCategorie} onChange={(e) => setNomCategorie(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="desc-field" className="form-label">Description</label>
                            <input type="text" id="desc-field" className="form-control" placeholder="Enter Description" required value={descriptionCategorie} onChange={(e) => setDescriptionCategorie(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image-field" className="form-label">Image</label>
                            <input type="file" id="imageCategorie" name="imageCategorie"  className="form-control" onChange={handleFileChange} required />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={togList}>Fermer</button>
                            <button type="submit" className="btn btn-success">Enregistrer</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default ListCategorie;
