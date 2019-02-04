
import React from 'react';
import AddEditProductModal from './AddEditProductModal';
import DeleteProductModal from './DeleteProductModal';
import { Button, Icon } from 'semantic-ui-react';

export class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [
                {
                    id: '', name: '', price: '',
                }
            ],
            productId: 0,
            showDelete: false,
            showCreate: false,
            showUpdate: false,
        };
        this.loadData = this.loadData.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.createModal = this.createModal.bind(this);
        this.deleteModal = this.deleteModal.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    updateModal(id) {

        this.setState({

            showUpdate: true, showCreate: false, productId: id

        });

    }

    createModal() {

        this.setState({

            showCreate: true, showUpdate: false, productId: 0
        });

    }

    deleteModal(id) {
        this.setState({

            showDelete: true, showUpdate: false, showCreate: false, productId: id
        });
    }

    saveModalDetails(item) {

        const productId = this.state.productId;

        let tempdata1 = this.state.product;

        tempdata1[productId] = item;

        this.setState({ product: tempdata1 });

    }

    loadData() {
        $.ajax({
            url: "/Product/GetData",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ product: data });

            }.bind(this)

        });
    }

    render() {
        let productList = this.state.product;
        let tableData = null;
        const productId = this.state.productId;
        let modalData = this.state.product[productId];
        let popup = null;

        if (productList != "") {
            tableData = productList.map((item, index) => (
                <tr key={index}>                    
                    <td className="two wide">{item.name}</td>
                    <td className="two wide">{item.price}</td>
                    <td className="two wide">
                        <Button icon labelPosition='left' color='yellow' data-toggle="modal" data-target="#addEditModal" onClick={this.updateModal.bind(this, index)}><Icon name='edit' />EDIT</Button>
                    </td>
                    <td className="two wide">
                        <Button icon labelPosition='left' color='red' data-toggle="modal" data-target="#deleteModal" onClick={this.deleteModal.bind(this, index)}><Icon name='trash' />DELETE</Button>
                    </td>
                </tr>
            )
            )
        }

        if (this.state.showDelete) {

            popup = <DeleteProductModal
                id={modalData.id}

                saveModalDetails={this.saveModalDetails}

            />
        }

        if (this.state.showCreate) {
            popup = <AddEditProductModal
                id=''

                name=''

                price=''

                saveModalDetails={this.saveModalDetails}

            />
        }
        if (this.state.showUpdate) {
            popup = < AddEditProductModal
                id={modalData.id}

                name={modalData.name}

                price={modalData.price}

                saveModalDetails={this.saveModalDetails}

            />
        }

        return (
            <React.Fragment>
                <div>
                    <Button color='blue' data-toggle="modal" data-target="#addEditModal" onClick={this.createModal.bind(this)}>New Product</Button>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="two wide">Price</th>
                                <th className="two wide">Action</th>
                                <th className="two wide">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                    {popup}
                </div>
            </React.Fragment>
        );
    }
}

export default Product;
