import React, { Component } from "react";

import { Button, Confirm, Modal, Icon, Header} from 'semantic-ui-react';
class Home extends Component {  

    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState(state => ({ openModal: !state.openModal }));
    }
    //open() {
    //    this.setState({ openModal: true })
    //}
    //close() {
    //    this.setState({ openModal: false })
    //}
    render() {
        const { openModal } = this.state
        return (
            <div>
                <button onClick={this.toggleModal}>Toggle Modal</button>
                <Modal open={openModal} closeIcon onClose={this.toggleModal}>
                    <Modal.Header>
                        <div>
                            <Header floated='left'>Title</Header>
                            <Button floated='right'>A Button</Button>
                        </div>
                    </Modal.Header>
                    <Modal.Content>

                        <p>Hello</p>

                    </Modal.Content>
                </Modal>
            </div>
        )
    }

}

export default Home;

