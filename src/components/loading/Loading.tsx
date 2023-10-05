import React from "react";

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="loading">
      <p>{message}</p>
      {/* You can add a loading spinner or animation here if needed */}
    </div>
  );
};

export default Loading;
