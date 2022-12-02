import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CryptoMeta = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.meta.name}
                    <img src={props.meta.logo} width="40px" height="40px" className="mx-2"/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.meta.description}
                </p>
                <h4>Tags</h4>
                {
                    props.meta.tags ?
                        props.meta.tags.map(
                            (tag, index) => {
                                return <button key={index} className="btn btn-warning btn-sm mx-1 my-1" disabled>{tag}</button>
                            }
                        )
                        :
                        "Loading Tags..."
                }

                <h4 className="my-2">Twitter</h4>
                <a href={"https://twitter.com/" + props.meta.twitter_username} className="btn btn-outline-primary btn-sm" target="_blank">@{props.meta.twitter_username}</a>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CryptoMeta;