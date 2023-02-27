import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#3FA535'
    },
    smallText: {
        fontSize: 16
    },
    container: {
        margin: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        padding: 16,
        height: 150,
        width: '80%',
        marginTop: '100%',
        marginLeft:'10%',
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    player: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    containerScroll: {
        margin: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
    }

})

export default styles;