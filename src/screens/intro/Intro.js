import React, { useRef, useState } from "react";
import { AppSwiper, Loader, useGet } from "../../components";
import {
  AppView,
  AppImage,
  AppText,
  responsiveHeight,
  AppIcon,
  responsiveWidth,
  getColors,
  AppNavigation,
} from "../../common";

import intro1 from "../../assets/imgs/intro1.png";
import intro2 from "../../assets/imgs/intro2.png";
import intro3 from "../../assets/imgs/intro3.png";
import { View } from "react-native";
import Swiper from "react-native-swiper";
import colors from "../../common/defaults/colors";
import store from "../../store";

export const IntroSwiper = ({ marginHorizontal }) => {
  const data = [intro1, intro2, intro3];
  let swiper = useRef();

  const [index, setIndex] = useState(0);
  const renderNext = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: responsiveHeight(2),
          right: 20,
          //   left: index !== 0 ? 20 : undefined,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {index === 2 ? (
          <AppView
            height={7}
            borderRadius={25}
            backgroundColor="primary"
            width={20}
            center
            onPress={() => {
              AppNavigation.init("MAIN_STACK", {
                rtl: store.getState().lang.rtl,
                name: "home",
                sideMenu: "menu",
              });
            }}
          >
            <AppText color="white" bold>
              Get Start
            </AppText>
          </AppView>
        ) : (
          <AppView
            circleRadius={12}
            backgroundColor="primary"
            center
            onPress={() => {
              swiper.current.scrollBy(1);
            }}
          >
            <AppIcon
              name={"keyboard-arrow-right"}
              type="material"
              color="white"
              size={10}
            />
          </AppView>
        )}
      </View>
    );
  };
  const renderPrevious = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: responsiveHeight(2),

          left: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppView
          circleRadius={12}
          backgroundColor="primary"
          center
          onPress={() => {
            console.log("swiper.current", swiper.current);

            swiper.current.scrollTo(index - 1);
          }}
        >
          <AppIcon
            name={"keyboard-arrow-left"}
            type="material"
            color="white"
            size={10}
          />
        </AppView>
      </View>
    );
  };
  return (
    <AppView stretch flex>
      <Swiper
        width={responsiveWidth(100)}
        ref={swiper}
        dotStyle={[
          {
            width: responsiveWidth(3),
            height: responsiveWidth(3),
            borderRadius: responsiveWidth(3 / 2),
            borderColor: getColors().primary,
            borderWidth: 1,
          },
        ]}
        activeDotStyle={[
          {
            width: responsiveWidth(3),
            height: responsiveWidth(3),
            borderRadius: responsiveWidth(1.5),
          },
        ]}
        dotColor={"white"}
        activeDotColor={getColors().primary}
        showsPagination={true}
        index={index}
        // height={100}
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onIndexChanged={(i) => {
          setIndex(i);
        }}
      >
        {data.map((item) => (
          <AppView
            flex
            stretch
            centerX
            // backgroundColor="red"
            stretch
            height={100}
          >
            <AppImage source={item} stretch height={65}></AppImage>
          </AppView>
        ))}
      </Swiper>
      {renderNext()}
      {index !== 0 && renderPrevious()}
    </AppView>
  );
};
