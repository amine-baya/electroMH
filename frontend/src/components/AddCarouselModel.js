import React from 'react';
import Modal from './Modal';
import { Row, Col } from 'react-bootstrap';



const AddCategoryModal = (props) => {

    const {
        show,
        handleclose,
        modaltitle,
        uploadFileHandler,
        onSubmit
    } = props;
    

    return (

        <Modal
            show={show}
            handleclose={handleclose}
            onSubmit={onSubmit}
            modaltitle={modaltitle}
        >
            <Row>
                <Col>
                    <input
                        type='file'
                        multiple
                        placeholder={`select Image`}
                        onChange={(e) => uploadFileHandler(e.target.files)}
                        className="form-control-sm"
                    /> 

                </Col>
                
            </Row>



        </Modal>
    );
}

export default AddCategoryModal;