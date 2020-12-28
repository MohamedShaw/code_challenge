import React from "react";
import { AppSwiper, Loader, useGet } from "../../components";
import { AppView, AppImage, AppText } from "../../common";

const HomeSwiper = ({ marginHorizontal }) => {
  const [loading, data] = useGet("sliders");

  return (
    <AppSwiper
      autoplay
      showsPagination={true}
      height={30}
      containerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        data.map((item) => (
          <AppView
            {...{ marginHorizontal }}
            flex
            stretch
            centerX
            {...{ key: item.slider_id }}
            stretch
          >
            <AppImage source={{ uri: item.img_url }} stretch height={30}>
              <AppView
                stretch
                left
                flex
                centerY
                paddingHorizontal={10}
                opacity={0.8}
              >
                <AppText bold size={8} color="white">
                  20 %
                </AppText>
                <AppText bold color="white">
                  Discount
                </AppText>
              </AppView>
            </AppImage>
          </AppView>
        ))
      )}
    </AppSwiper>
  );
};

export default HomeSwiper;
