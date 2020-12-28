package com.medical.balsam;

import android.app.Application;
import androidx.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.reactnativerestart.RestartPackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
// import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// import com.zyu.ReactNativeWheelPickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.airbnb.android.react.maps.MapsPackage;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.opensettings.OpenSettingsPackage;
import com.imagepicker.ImagePickerPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };
    return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public void onCreate() {
    super.onCreate();
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new CameraRollPackage(),
            new GeolocationPackage(),
            new RestartPackage(),
            new RNCViewPagerPackage(),
          
             new NetInfoPackage(), new AsyncStoragePackage(),
       new VectorIconsPackage(), new SvgPackage(),
        new SplashScreenReactPackage(), new RNSpinkitPackage(), new SnackbarPackage(), new RNShimmerPackage(),
        new ReanimatedPackage(), new LinearGradientPackage(), new RNI18nPackage(), new RNGestureHandlerPackage(),
        new FastImageViewPackage(), new ExtraDimensionsPackage(),
                    new OpenSettingsPackage(),
            new BackgroundGeolocationPackage(),
            new ImagePickerPackage(),

        new MapsPackage()

    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}