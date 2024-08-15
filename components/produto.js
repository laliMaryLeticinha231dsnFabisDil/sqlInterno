// import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

// export function Produto({ data, onDelete }) {
//     return (
//         <Pressable style={styles.container} >
//             <Text style={styles.text}>
//                 {data.quantidade} - {data.nome}
//             </Text>
//             <TouchableOpacity onPress={onDelete} >
//                 <MaterialIcons name="delete" size={24} color="red" />
//             </TouchableOpacity>
//         </Pressable>

//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#CECECE",
//         padding: 24,
//         borderRadius: 5,
//         gap: 12,
//         flexDirection: "row",
//     },
//     text: {
//         flex: 1,
//     },
    
// });
import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ data, onDelete, onSelect, isSelected }) {
    return (
        <Pressable
            style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={onSelect}
        >
            <Text style={styles.text}>
                {data.quantidade} - {data.nome}
            </Text>
            <TouchableOpacity style={styles.icon} onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color="#243a4b" />
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 23,
        padding: 24,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 29,
        backgroundColor: '#bee0faa9', // Remove o fundo
    },
    selectedContainer: {
        borderColor: '#007BFF',
        borderWidth: 2,
    },
    text: {
        flex: 1,
        fontSize: 20
    },
    icon:{
        marginLeft: '80%',
        justifyContent: 'center',
        marginTop: '5%'
    }
});
