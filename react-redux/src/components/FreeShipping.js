import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  enableFreeShipping,
  disableFreeShipping,
} from "../actions/shippingActions";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { primaryColor, grayColor } from "../../src/assets/variables/color";

const customTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    gray: {
      main: grayColor,
    },
  },
});

function FreeShipping() {
  const dispatch = useDispatch();
  const isFreeShipping = useSelector(
    (state) => state.freeShipping.isFreeShipping
  );

  const handleEnableFreeShipping = () => {
    dispatch(enableFreeShipping());
  };

  const handleDisableFreeShipping = () => {
    dispatch(disableFreeShipping());
  };

  return (
    <ThemeProvider theme={customTheme}>
    <div className="sidebar__section">
      <p className="sidebar__title">
        Free Shipping
      </p>
      <div className="d-flex align-items-center">
        <FormControlLabel
          className="free-shipping-label m-0"
          label={`Display only items with free shipping:`}
          labelPlacement="start" // Display the label before the Switch
          control={
            <Switch
              color="primary"
              checked={isFreeShipping}
              onChange={isFreeShipping ? handleDisableFreeShipping : handleEnableFreeShipping}
              sx={{
                "&.Mui-checked": {
                  color: customTheme.palette.primary.main,
                },
                "&.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: customTheme.palette.primary.main,
                },
                "&.Mui-disabled": {
                  color: customTheme.palette.gray.main,
                },
              }}
            />
          }
        />
        <Typography
          className={`free-shipping-status ${
            isFreeShipping ? "text-primary" : "text-secondary"
          }`}
        >
          {isFreeShipping ? "Yes" : "No"}
        </Typography>
      </div>
    </div>
  </ThemeProvider>
  );
}

export default FreeShipping;
