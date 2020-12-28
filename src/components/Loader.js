import React from "react";
import { AppView, AppSpinner } from "../common";

export default (Loader = () => {
  return (
    <AppView stretch flex marginVertical={5} center>
      <AppSpinner size={15} />
    </AppView>
  );
});
