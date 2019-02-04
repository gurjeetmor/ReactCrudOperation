import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

export class DeleteSalesModal extends Component {

    constructor(props) {

        super(props);

        this.handleSave = this.handleSave.bind(this);

        this.state = {
          
            id: '',

        }

    }

    componentWillReceiveProps(nextProps) {

        this.setState({

            id: nextProps.id,

        });

    }

    handleSave() {
        const item = this.state;

        this.props.saveModalDetails(item)

        var productDelete = {
            'id': this.state.id
        }
        $.ajax({
            url: "/Sales/Delete/",
            dataType: 'json',
            type: 'POST',
            data: productDelete,
            success: function (json) {
                if (json.isRedirect) {
                    window.location.href = json.redirectUrl;
                }
            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);


            }.bind(this),
        });
    }

    render() {

        return (

            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h3 className="modal-title" id="deleteModalLabel">Delete Sales</h3>

                        </div>

                        <div className="modal-body">

                            <h4>Are you sure ?</h4>
                        </div>

                        <div className="modal-footer">

                            <Button color='black' data-dismiss="modal">Close</Button>

                            <Button color='red' icon labelPosition='right' data-dismiss="modal" onClick={() => { this.handleSave() }}><Icon name='times' />Delete</Button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

}



export default DeleteSalesModal;