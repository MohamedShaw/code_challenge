import {StyleSheet} from 'react-native';
import colors from '../../common/defaults/colors';
import { responsiveWidth } from '../../common';

export default StyleSheet.create({
  underlineStyleBase: {
    width: responsiveWidth(20),
    height: 60,
    borderWidth: 1,
    backgroundColor:'#eee'
  },
  boxStyleBaseAfterAdd:{
    borderColor: colors.primary,
    width: responsiveWidth(20),
    height: 60,
    borderWidth: 0.5,
    backgroundColor:'#fff',
    color:"#000"
  },

  underlineStyleHighLighted: {
    borderColor: colors.primary,
    borderWidth: 0,
    borderBottomWidth: 2,
  },
})