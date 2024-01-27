import Modal from "components/modal/modal";
import { useState, useEffect } from "react";
import { useInputHandler } from "hooks/useInputHandler";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Button from "@mui/material/Button";
import { sendOtpToPhone, verifyPhoneOtp } from "store/actions/userActions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const STATES = {
  PHONE_NUMBER: "PHONE_NUMBER",
  CODE: "CODE",
};

const PhoneNumberDialog = ({ open, handleClose }) => {
  const phoneNumber = useInputHandler("");
  const code = useInputHandler("");
  const [state, setState] = useState(STATES.PHONE_NUMBER);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitPhoneNumber = () => {
    dispatch(sendOtpToPhone({ mobile: phoneNumber.value })).then(() => {
      setState(STATES.CODE);
    });
  };

  useEffect(() => {
    if (!open) {
      setState(STATES.PHONE_NUMBER);
      phoneNumber.onChange({ target: { value: "" } });
      code.onChange({ target: { value: "" } });
    }
  }, [open]);

  const handleSubmitCode = () => {
    dispatch(verifyPhoneOtp({ mobile: phoneNumber.value, otp: code.value }))
      .then(() => {
        handleClose();
        enqueueSnackbar("Mobile Edited Successfuly", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {state === STATES.PHONE_NUMBER ? (
        <Grid container direction="column">
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="phoneNumber"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
            {...phoneNumber}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSubmitPhoneNumber}
          >
            submit
          </Button>
        </Grid>
      ) : state === STATES.CODE ? (
        <Grid container direction="column">
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="code"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
            {...code}
          />
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSubmitCode}
          >
            submit
          </Button>
        </Grid>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default PhoneNumberDialog;
