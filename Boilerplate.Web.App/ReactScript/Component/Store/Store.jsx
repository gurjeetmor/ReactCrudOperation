
import React from 'react';
import AddEditStoreModal from './AddEditStoreModal';
import DeleteStoreModal from './DeleteStoreModal';
import { Button, Icon } from 'semantic-ui-react';

export class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: [
                {
                    id: '', name: '', address: '',
                }
            ],
            storeId: 0,
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

            showUpdate: true, showCreate: false, storeId: id

        });

    }

    createModal() {

        this.setState({

            showCreate: true, showUpdate: false, storeId: 0
        });

    }

    deleteModal(id) {
        this.setState({

            showDelete: true, showUpdate: false, showCreate: false, storeId: id
        });
    }

    saveModalDetails(item) {

        const storeId = this.state.storeId;

        let tempdata1 = this.state.store;

        tempdata1[storeId] = item;

        this.setState({ store: tempdata1 });

    }

    loadData() {
        $.ajax({
            url: "/Store/GetData",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ store: data });

            }.bind(this)

        });
    }

    render() {
        let storeList = this.state.store;
        let tableData = null;
        const storeId = this.state.storeId;
        let modalData = this.state.store[storeId];
        let popup = null;

        if (storeList != "") {
            tableData = storeList.map((item, index) => (
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

            popup = <DeleteStoreModal
                id={modalData.id}

                saveModalDetails={this.saveModalDetails}

            />
        }

        if (this.state.showCreate) {
            popup = <AddEditStoreModal
                id=''

                name=''

                address=''

                saveModalDetails={this.saveModalDetails}

            />
        }
        if (this.state.showUpdate) {
            popup = < AddEditStoreModal
                id={modalData.id}

                name={modalData.name}

                address={modalData.address}

                saveModalDetails={this.saveModalDetails}

            />
        }

        return (
            <React.Fragment>
                <div>
                    <Button color='blue' data-toggle="modal" data-target="#addEditModal" onClick={this.createModal.bind(this)}>New Store</Button>
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

export default Store;
