import Button from "@restart/ui/esm/Button";
import { Modal } from "react-bootstrap";

interface IGenericModalProps {
  visible: boolean;
  title: string;
  text: string;
  buttons: IActionButton[];
}

interface IActionButton {
  text: string;
  action: () => void;
}

function GenericModal(props: IGenericModalProps) {
  return (
    <Modal show={props?.visible}>
      <Modal.Header>
        <Modal.Title>{props?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{props?.text}</h3>
      </Modal.Body>
      <Modal.Footer>
        {props?.buttons?.map((button, index) => {
          return (
            <Button onClick={button.action} key={"modal-button" + index}>
              {button.text}
            </Button>
          );
        })}
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;
