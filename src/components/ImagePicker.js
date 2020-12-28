import React, { Component } from "react";

import ImagePickerRN from "react-native-image-picker";
import {
  AppView,
  AppScrollView,
  AppIcon,
  AppNavigation,
  AppImage,
  AppInputError,
} from "../common";

import LightBox from "./LightBox";
import upload from "../assets/imgs/upload.png";

export default class Imagesicker extends Component {
  static defaultProps = {
    maxImages: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: props.data ? props.data || [] : [],
      isLightBoxVisible: false,
      currentImageIndex: undefined,
      isTouched: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isTouched: nextProps.isTouched,
    });
  }

  handleChange = () => {
    const { name, onChange, requiredImages, maxImages } = this.props;

    let imgs = this.state.images;
    if (requiredImages && requiredImages !== this.state.images.length) {
      imgs = [];
    }

    if (maxImages === 1) {
      if (imgs.length) imgs = imgs[0];
      else imgs = "";
    }

    if (onChange) {
      if (name) {
        onChange(
          name,
          imgs,
          requiredImages === 1
            ? false
            : !(
                this.state.images.length === 0 ||
                (requiredImages && imgs.length === requiredImages)
              )
        );
      } else onChange(imgs);
    }
  };

  pickImage = async () => {
    const options = {
      title: "Select Avatar Picture",
      storageOptions: {
        quality: 0.4,
        maxWidth: 300,
        maxHeight: 300,
        skipBackup: true,
        path: "images",
      },
    };
    ImagePickerRN.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log("reponse data ==>>", response.uri);

        // this.setState({ imageDisplay: response.uri, image: source.uri });
        this.setState(
          (prevState) => ({
            images: [...prevState.images, response.uri],
          }),
          () => {
            this.handleChange();
          }
        );
      }
    });
  };

  addNewImage = () => {
    if (!this.props.editable) return;

    AppNavigation.push({
      name: "photoSelection",
      passProps: {
        headerTitle: this.props.headerTitle,
        action: (uri) => {
          this.setState(
            (prevState) => ({
              images: [...prevState.images, uri],
            }),
            () => {
              this.handleChange();
            }
          );
        },
      },
    });
  };

  showImage = (index) => {
    if (!this.props.editable) return;

    this.setState({
      isLightBoxVisible: true,
      currentImageIndex: index,
    });
  };

  renderPlaceholder = () => (
    <AppView
      borderColor={this.props.borderColor ? this.props.borderColor : "primary"}
      borderWidth={1}
      circleRadius={this.props.circleRadius ? this.props.circleRadius : 12}
      backgroundColor="grey"
      center
      onPress={this.props.selectPicker ? this.pickImage : this.addNewImage}
    >
      <AppIcon
        name="add"
        type="material"
        size={12}
        color={this.props.colorIcon ? this.props.colorIcon : "primary"}
      />
    </AppView>
  );

  renderPlaceholderImage = () => (
    <AppView
      center
      onPress={this.addNewImage}
      backgroundColor="#E6E8EA"
      width={10}
      height={6}
    >
      <AppImage source={upload} equalSize={9} center />
    </AppView>
  );

  render() {
    const {
      error,
      upload,
      errorTextMarginHorizontal,
      noPlaceholder,
      circleRadius,
      noValidation,
      errorTextMarginBottom,
      ...rest
    } = this.props;

    console.log("error ->>", error);

    const Container = upload
      ? this.renderPlaceholderImage()
      : noPlaceholder
      ? null
      : this.renderPlaceholder();
    return (
      <>
        <AppScrollView
          {...rest}
          horizontal
          stretch
          alwaysBounceHorizontal={false}
        >
          {this.state.images.map((img, index) =>
            upload ? (
              <AppImage
                key={String(index)}
                source={{
                  uri: img,
                }}
                borderWidth={1}
                borderColor="grey"
                marginLeft={5}
                // equalSize={10}
                circleRadius={circleRadius || 12}
                onPress={() => {
                  this.showImage(index);
                }}
              />
            ) : (
              <AppImage
                key={String(index)}
                source={{
                  uri: img,
                }}
                borderWidth={1}
                borderColor="grey"
                circleRadius={this.props.circleRadius ? circleRadius : 12}
                marginLeft={5}
                onPress={() => {
                  this.showImage(index);
                }}
              />
            )
          )}
          {this.state.images.length < this.props.maxImages ? Container : null}
        </AppScrollView>

        {!noValidation && (
          <AppInputError
            error={this.state.isTouched ? error : " "}
            errorTextMarginHorizontal={errorTextMarginHorizontal ? 4 : 10}
            errorTextMarginBottom={errorTextMarginBottom}
            size={5}
          />
        )}

        <LightBox
          isVisible={this.state.isLightBoxVisible}
          images={this.state.images}
          currentImageIndex={this.state.currentImageIndex}
          changeImages={(imgs) => {
            this.setState(
              {
                images: imgs,
              },
              () => {
                this.handleChange();
              }
            );
          }}
          changeState={(v) => {
            this.setState({
              isLightBoxVisible: v,
            });
          }}
        />
      </>
    );
  }
}
