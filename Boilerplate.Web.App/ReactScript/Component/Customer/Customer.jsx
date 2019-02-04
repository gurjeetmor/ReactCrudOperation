
import React from 'react';
import AddEditCustomerModal from './AddEditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import { Button, Icon } from 'semantic-ui-react';

export class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: [
                {
                    id: '', name: '', address: '',
                }
            ],
            customerId: 0,
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

            showUpdate: true, showCreate: false, customerId: id

        });

    }

    createModal() {

        this.setState({

            showCreate: true, showUpdate: false, customerId: 0
        });

    }

    deleteModal(id) {
        this.setState({

            showDelete: true, showUpdate: false, showCreate: false, customerId: id
        });
    }

    saveModalDetails(item) {

        const customerId = this.state.customerId;

        let tempdata1 = this.state.customer;

        tempdata1[customerId] = item;

        this.setState({ customer: tempdata1 });

    }

    loadData() {
        $.ajax({
            url: "/Customer/GetData",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ customer: data });

            }.bind(this)

        });
    }

    render() {
        let customerList = this.state.customer;
        let tableData = null;
        const customerId = this.state.customerId;
        let modalData = this.state.customer[customerId];
        let popup = null;

        if (customerList != "") {
            tableData = customerList.map((item, index) => (
                <tr key={index}>
                    <td className="two wide">{item.name}</td>
                    <td className="two wide">{item.address}</td>
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

            popup = <DeleteCustomerModal
                id={modalData.id}

                saveModalDetails={this.saveModalDetails}

            />
        }

        if (this.state.showCreate) {
            popup = <AddEditCustomerModal
                id=''

                name=''

                address=''

                saveModalDetails={this.saveModalDetails}

            />
        }
        if (this.state.showUpdate) {
            popup = < AddEditCustomerModal
                id={modalData.id}

                name={modalData.name}

                address={modalData.address}

                saveModalDetails={this.saveModalDetails}

            />
        }

        return (
            <React.Fragment>
                <div>
                    <Button color='blue' data-toggle="modal" data-target="#addEditModal" onClick={this.createModal.bind(this)}>New Customer</Button>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="two wide">Address</th>
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

export default Customer;
