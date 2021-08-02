import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../common/AppNavBar';
import { Link } from 'react-router-dom';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentSort: 'default',
            sortOptions: [{ id: 'name', desc: true },{ id: 'description', desc: true }]
        };
        this.remove = this.remove.bind(this);
    }


    componentDidMount() {
        fetch('/products')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }


    async remove(id) {
        await fetch(`/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({products: updatedProducts});
        });
    }

    render() {
        const {products, isLoading, filterStr} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const productList = products
            // .filter(e => e.category.name.toUpperCase().includes(filterStr ? filterStr.toUpperCase() : ""))
            .filter(e => e.name.toUpperCase().includes(filterStr ? filterStr.toUpperCase() : ""))
            .map(product => {
            return <tr key={product.id}>
                <td style={{whiteSpace: 'nowrap'}}>{product.name}</td>
                <td>{product.description}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/products/" + product.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(product.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>

                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/products/new">Add Product</Button>
                    </div>
                    <h3>Products</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                                <th width="20%">Description</th>
                                <th width="30%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {productList}
                        </tbody>
                    </Table>
                    <div className="float-right">
                        <label htmlFor="#input-filter">Filter name</label>
                        <input
                            id="input-filter"
                            type="text"
                            value={ filterStr }
                            onChange={ e => this.setState({ filterStr: e.target.value }) } />
                    </div>
                </Container>
            </div>
        );
    }
}
export default ProductList;