import * as React from "react";
import PropTypes from "prop-types";
import {
  StyledToast,
  StyledContainer,
} from "src/shared/UIkit/components/Toast/styled";
import Button from "src/shared/UIkit/components/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Toast({ message, duration, isWithButton }) {
  const [toastsData, setToastsData] = useState([]);

  const toastId = useSelector((state) => state.schedule.toastId);

  useEffect(() => {
    if (!isWithButton && toastId) showToast();
  }, [toastId]);

  function showToast() {
    const newId = isWithButton ? new Date().getTime() : toastId;
    const delay = duration * 1000;
    setToastsData([
      ...toastsData,
      {
        message: message,
        id: newId,
      },
    ]);
    setTimeout(() => removeToast(newId), delay);
  }

  function removeToast(toastId) {
    setToastsData((toastsData) =>
      toastsData.filter((toast) => toast.id !== toastId)
    );
  }

  const toastsContent = toastsData.map((toast) => {
    return (
      <StyledToast key={toast.id}>
        <p>{message}</p>
        <button onClick={() => removeToast(toast.id)}></button>
      </StyledToast>
    );
  });

  return (
    <>
      {isWithButton && (
        <Button
          primary={true}
          label="Toast!"
          onClick={showToast}
          data-testid="open-button"
        />
      )}
      <StyledContainer data-testid="container">{toastsContent}</StyledContainer>
    </>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  duration: PropTypes.number,
};
