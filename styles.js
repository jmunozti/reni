import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, BORDER_RADIUS } from './../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 5,
        color: FONT_COLOR,
        padding: 10,
        margin: 40
    }

});