import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from 'react-i18next';
import useCustomErrorHandler from "./../hooks/useCustomErrorHandler";

const ErrorBoundaryWrapper = ({children, message}) => {
  const {errorFallBack, logErrorToDatabase} = useCustomErrorHandler();
  const {t} = useTranslation();

  return (
    <ErrorBoundary
      FallbackComponent={() => errorFallBack(t(message))}
      onError={logErrorToDatabase}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;