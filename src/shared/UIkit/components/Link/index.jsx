import * as React from "react";
import PropTypes from "prop-types";
import { StyledLink } from "src/components/Link/styled";

export default function Link({ disabled, label, reference }) {
  const linkProps = {
    disabled,
  };

  if (!disabled) {
    linkProps.href = reference;
  }

  return <StyledLink {...linkProps}>{label}</StyledLink>;
}

Link.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  reference: PropTypes.string,
};
