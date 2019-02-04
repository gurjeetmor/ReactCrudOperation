
import React from 'react';
import AddEditSalesModal from './AddEditSalesModal';
import DeleteSalesModal from './DeleteSalesModal';
import { Button, Icon } from 'semantic-ui-react';

export class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [
                {
                    id: '', customerId: '', productId: '', storeId:'', dateSold:''
                }
            ],
            salesId: 0,
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

            showUpdate: true, showCreate: false, salesId: id

        });

    }

    createModal() {

        this.setState({

            showCreate: true, showUpdate: false, salesId: 0
        });

    }

    deleteModal(id) {
        this.setState({

            showDelete: true, showUpdate: false, showCreate: false, salesId: id
        });
    }

    saveModalDetails(item) {

        const salesId = this.state.salesId;

        let tempdata1 = this.state.sales;

        tempdata1[salesId] = item;

        this.setState({ sales: tempdata1 });

    }

    loadData() {
        $.ajax({
            url: "/Sales/GetData",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ sales: data });

            }.bind(this)

        });
    }

    render() {
        let salesList = this.state.sales;
        let tableData = null;
        const salesId = this.state.salesId;
        let modalData = this.state.sales[salesId];
        let popup = null;

        if (salesList != "") {
            tableData = salesList.map((item, index) => (
                <tr key={index}>
                    <td className="two wide">{item.customerId}</td>
                    <td className="two wide">{item.productId}</td>
                    <td className="two wide">{item.storeId}</td>
                    <td className="two wide">{item.dateSold}</td>
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

            popup = <DeleteSalesModal
                id={modalData.id}

                saveModalDetails={this.saveModalDetails}

            />
        }

        if (this.state.showCreate) {
            popup = <AddEditSalesModal
                id=''

                customerId=''

                productId=''

                storeId=''

                dateSold=''

                saveModalDetails={this.saveModalDetails}

            />
        }
        if (this.state.showUpdate) {
            popup = < AddEditSalesModal
                id={modalData.id}

                customerId={modalData.customerId}

                productId={modalData.productId}

                storeId={modalData.storeId}

                dateSold={modalData.dateSold}

                saveModalDetails={this.saveModalDetails}

            />
        }

        return (
            <React.Fragment>
                <div>
                    <Button color='blue' data-toggle="modal" data-target="#addEditModal" onClick={this.createModal.bind(this)}>New Sales</Button>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Customer</th>
                                <th className="two wide">Product</th>
                                <th className="two wide">Store</th>
                                <th className="two wide">Date Sold</th>
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

export default Sales;
