import { useState, useEffect, useRef } from "react";
import I18n from "react-native-i18n";
import Api, { ACCESS_DATA, validateRequst } from "../utils/Network";
import { showError } from "../common";
import store from "../store";

export default (usePost = (
  endPoint,
  body,
  onSuccess,
  dataTransform = "data.data"
) => {
  const [posting, setPosting] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      (async () => {
        try {
          setPosting(true);
          const data = {
            ...ACCESS_DATA,
            ...body
          };
          console.log("Add to cart ", data);

          const res = await Api.post(`${endPoint}`, data);

          const response = validateRequst(res);
          const layers = dataTransform.split(".");
          let transformedData = response;
          for (let i = 0; i < layers.length; i++) {
            transformedData = transformedData[`${layers[i]}`];
          }
          setPosting(false);
          if (response.isError) {
            setError(true);
            setData(transformedData);
          } else {
            onSuccess(transformedData);
          }
        } catch (error) {
          setPosting(false);
          setError(true);
          console.log(error, JSON.stringify(error));
          if (!store.getState().network.isConnected) {
            showError(I18n.t("no-internet-connection"));
          }
        }
      })();
    } else {
      didMountRef.current = true;
    }
  }, [body]);
  return [posting, error, data];
});
