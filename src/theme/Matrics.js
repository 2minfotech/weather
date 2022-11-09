import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

//horizontalScale
const hS = size => (width / guidelineBaseWidth) * size;
//verticalScale
const vS = size => (height / guidelineBaseHeight) * size;
//moderateScale
const mS = (size, factor = 0.5) => size + (hS(size) - size) * factor;

export {hS, vS, mS};
