import "./circle-button.css";

export interface CircleButtonProps {
  handleOnClick(): void;
  label: string;
}

const CircleButton = (props: CircleButtonProps) => {
  return (
    <div className="circle-button-container">
      {props.label && <div className="circle-button-label">{props.label}</div>}
      <div className="circle-button-casing">
        <button
          className="circle-button"
          onClick={props.handleOnClick}></button>
      </div>
    </div>
  );
};

export default CircleButton;
