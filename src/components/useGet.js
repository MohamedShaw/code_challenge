import { useState, useEffect } from "react";
import I18n from "react-native-i18n";
import Api, { ACCESS_DATA, validateRequst } from "../utils/Network";
import { showError } from "../common";
import store from "../store";

export default useGet = (endPoint, params, dataTransform = "data.data") => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const url = [
          `${endPoint}?accessKey=${ACCESS_DATA.accessKey}&accessPassword=${ACCESS_DATA.accessPassword}`,
          ...(params || []),
        ].join("&");
        const res = await Api.get(url);

        console.log("res -----", res);

        const response = validateRequst(res);

        console.log("response ", response);

        if (response.isError) {
          if (
            store.getState().auth.currentUser === null &&
            response.data.message === "العمـيل غـير موجـود"
          ) {
            setLoading(false);
          } else {
            showError(response.data.message);
          }
        } else {
          setLoading(false);
          const layers = dataTransform.split(".");

          let transformedData = response;
          for (let i = 0; i < layers.length; i++) {
            transformedData = transformedData[`${layers[i]}`];
          }

          setData(transformedData);
        }
      } catch (error) {
        console.log("error response ==>> ********", error);
        if (!error.response) {
          showError(I18n.t("something-went-wrong"));
        }

        setLoading(false);
        if (!store.getState().network.isConnected)
          showError(I18n.t("no-internet-connection"));
        console.log("ER", error);
      }
    })();
  }, []);
  return [loading, data];
};
