import React from "react";
import "./Loading.css";

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-icon">
        <i className="fa fa-spinner"></i>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
