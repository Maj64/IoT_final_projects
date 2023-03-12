import React, { useEffect } from "react";
import { connect } from "react-redux";

const Validate = ({ name, value, validation, validateField }) => {
  useEffect(() => {
    validateField(name, value, validation);
  }, [name, value, validation, validateField]);

  return null;
};

const mapStateToProps = (state) => ({
  form: state.form,
});

const mapDispatchToProps = (dispatch) => ({
  validateField: (name, value, validation) =>
    dispatch({ type: "VALIDATE_FIELD", name, value, validation }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Validate);
