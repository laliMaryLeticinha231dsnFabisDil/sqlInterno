// import React, { useEffect, useState } from 'react';
// import { usarBD } from './hooks/usarBD';
// import { View, Button, StyleSheet, TextInput, Alert, FlatList } from 'react-native';
// import { Produto } from './components/produto';

// export function Index() {
//     const [id, setId] = useState('');
//     const [nome, setNome] = useState('');
//     const [quantidade, setQuantidade] = useState('');
//     const [pesquisa, setPesquisa] = useState('');
//     const [produtos, setProdutos] = useState([]);

//     const produtosBD = usarBD();

//     async function create() {
//         if (isNaN(quantidade)) {
//             return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
//         }
//         try {
//             const item = await produtosBD.create({
//                 nome,
//                 quantidade,
//             });
//             Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
//             setId(item.idProduto);
//             listar();
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     async function listar() {
//         try {
//             const captura = await produtosBD.read(pesquisa)
//             setProdutos(captura)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         listar();
//     }, [pesquisa]);

//     const remove = async (id) => {
//         try {
//             await produtosBD.remove(id);
//             await listar();
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     return (
//         <View style={styles.container}>
//             <TextInput style={styles.texto} placeholder="Nome" onChangeText={setNome} value={nome} />
//             <TextInput style={styles.texto} placeholder="Quantidade" onChangeText={setQuantidade} value={quantidade} />
//             <Button title="Salvar" onPress={create} />
//             <TextInput style={styles.texto} placeholder="Pesquisar" onChangeText={setPesquisa}/>
//             <FlatList
//                 contentContainerStyle={styles.listContent}
//                 data={produtos}
//                 keyExtractor={(item) => String(item.id)}
//                 renderItem={({ item }) => (
//                     <Produto data={item} onDelete={() => remove(item.id)} />
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 32,
//         gap: 16,
//     },
//     texto: {
//         height: 54,
//         borderWidth: 1,
//         borderRadius: 7,
//         borderColor: "#999",
//         paddingHorizontal: 16,
//     },
//     listContent: {
//         gap: 16,
//     },
// });


import React, { useEffect, useState } from 'react';
import { usarBD } from './hooks/usarBD';
import { View, Button, StyleSheet, TextInput, Alert, FlatList, ImageBackground } from 'react-native';
import { Produto } from './components/produto';

export function Index() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const produtosBD = usarBD();

    async function create() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            const item = await produtosBD.create({
                nome,
                quantidade,
            });
            Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
            setId(item.idProduto);
            listar();
            setNome('');
            setQuantidade('');
        } catch (error) {
            console.error("Erro ao criar produto:", error);
        }
    }

    async function update() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            await produtosBD.update({
                id,
                nome,
                quantidade,
            });
            Alert.alert('Produto atualizado com sucesso!');
            setSelectedItem(null);
            listar();
            setNome('');
            setQuantidade('');
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    }

    async function listar() {
        try {
            const captura = await produtosBD.read(pesquisa);
            setProdutos(captura);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
        }
    }

    useEffect(() => {
        listar();
    }, [pesquisa]);

    const remove = async (id) => {
        try {
            await produtosBD.remove(id.toString()); // Certifique-se de que o ID é uma string
            await listar(); // Atualiza a lista de produtos
            if (selectedItem?.id === id) {
                setSelectedItem(null);
                setNome('');
                setQuantidade('');
            }
            Alert.alert('Produto excluído com sucesso!');
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            Alert.alert('Erro ao excluir o produto.');
        }
    };

    const onSelect = (item) => {
        setSelectedItem(item);
        setId(item.id);
        setNome(item.nome);
        setQuantidade(item.quantidade.toString());
    };

    return (
        <ImageBackground source={require('./assets/fundo.jpg')} style={styles.container}>
            <View style={styles.innerContainer}>
                <TextInput
                    style={styles.texto}
                    placeholder="Nome"
                    onChangeText={setNome}
                    value={nome}
                />
                <TextInput
                    style={styles.texto}
                    placeholder="Quantidade"
                    onChangeText={setQuantidade}
                    value={quantidade}
                />
                <Button title={selectedItem ? "Atualizar" : "Salvar"} onPress={selectedItem ? update : create} />
                <TextInput
                    style={styles.texto}
                    placeholder="Pesquisar"
                    onChangeText={setPesquisa}
                    value={pesquisa}
                />
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={produtos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Produto
                            data={item}
                            onDelete={() => remove(item.id)}
                            onSelect={() => onSelect(item)}
                            isSelected={selectedItem?.id === item.id}
                        />
                    )}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Outros estilos, se necessário
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
    },
    texto: {
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#999",
        paddingHorizontal: 16,
        backgroundColor: 'white', // Adiciona um fundo branco aos campos de texto
    },
    listContent: {
        gap: 16,
    },
});
