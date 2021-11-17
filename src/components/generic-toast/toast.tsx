import React from "react";
import { Toast } from "react-bootstrap";

interface IGenericToastProps {
  text: string;
  hide: boolean;
  action: () => void;
}

function Notification(props: IGenericToastProps) {
  return (
    <Toast onClose={props?.action} show={props?.hide}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">ToDoList</strong>
      </Toast.Header>
      <Toast.Body>{props?.text}</Toast.Body>
    </Toast>
  );
}

export default Notification;
