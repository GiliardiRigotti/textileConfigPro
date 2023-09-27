import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ICreateUser, ILoginUser, IUser } from '../interfaces/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, getDocs, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from '../config/firebase';
import { Alert } from 'react-native';
import { IClient, IDesignation, IOrder } from '../interfaces/IClient';


interface AppContextData {
    load: boolean
    userAuth: IUser | null;
    signed: boolean;
    listUsers: IUser[];
    listClients: IClient[];
    listOrders: IOrder[];
    listEquipments: IEquipment[];
    listDesignation: IDesignation[];
    createUser: ({ email, password, name, photoUser, role }: ICreateUser) => Promise<void>;
    createClient: ({ email, name, phone }: IClient) => Promise<void>;
    createOrder: ({ order, many, clientId, filename }: IOrder) => Promise<void>;
    createEquipment: ({ name }: IEquipment) => Promise<void>;
    createDesignation: ({ userId, equipmentId }: IDesignation) => Promise<void>;
    login: ({ email, password }: ILoginUser) => Promise<void>;
    logout: () => Promise<void>;
    deleteUser: (id: string) => Promise<boolean>;
    deleteClient: (id: string) => Promise<boolean>;
    deleteOrder: (id: string) => Promise<boolean>;
    deleteEquipment: (id: string) => Promise<boolean>;
    deleteDesignation: (id: string) => Promise<boolean>;
}

const AppContext = createContext({} as AppContextData)

const keysStorage = {
    user: 'user',
}

const keysFirebase = {
    users: {
        nameTable: 'users',
        uuidLogin: 'uuidLogin',
    },
    clients: {
        nameTable: 'clients',
    },
    equipments: {
        nameTable: 'equipments',
    },
    designation: {
        nameTable: 'designation',
    },
    orders: {
        nameTable: 'orders',
    }
}

function AppProvider({ children }: any) {
    const [load, setLoad] = useState<boolean>(true)
    const [userAuth, setUserAuth] = useState<IUser | null>(null);
    const [listUsers, setListUsers] = useState<IUser[]>([]);
    const [listClients, setListClients] = useState<IClient[]>([]);
    const [listOrders, setListOrders] = useState<IOrder[]>([]);
    const [listDesignation, setListDesignation] = useState<IDesignation[]>([])
    const [listEquipments, setListEquipments] = useState<IEquipment[]>([]);

    function uriToBlob(uri: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                reject(new Error('uriToBlob failed'));
            };

            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);

            xhr.send(null);
        });
    };

    const storageUploadPhotoUser = useCallback(async (uuidLogin: string, imageUri: string) => {
        try {
            const storageRef = ref(storage, `${uuidLogin}.jpeg`);
            const blob = await uriToBlob(imageUri)
            const result = await uploadBytes(storageRef, blob)
            const linkImage = await getDownloadURL(result.ref)
            return linkImage
        } catch (error: any) {
            console.error(error)
            Alert.alert('Error:', error)
            return null
        }

    }, [])

    const storeData = async (value: Object, key: string) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const clearStoreData = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
        }
    }

    const getListUsers = useCallback(async () => {
        const userRef = collection(db, keysFirebase.users.nameTable)
        onSnapshot(userRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    name: docs.data().name,
                    photoUser: docs.data().photoUser,
                    role: docs.data().role,
                    uuidLogin: docs.data().uuidLogin,
                }
            }) as IUser[]
            setListUsers(data)
        })
    }, [])

    const createUser = useCallback(async ({ email, password, name, photoUser, role }: ICreateUser) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                //const uri = await storageUploadPhotoUser(userCredential.user.uid, photoUser)
                addDoc(collection(db, keysFirebase.users.nameTable), {
                    name,
                    role,
                    photoUse: '',
                    uuidLogin: userCredential.user.uid
                }).then((docRef) => {
                    console.log('New User', docRef.id)
                    return docRef.id
                })
                    .catch((error) => {
                        Alert.alert("Error adding document: ", error);
                    });

            })
            .catch((error) => {
                Alert.alert(`Error ${error.code}`, error.message);
            });
    }, [])

    const deleteUser = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(db, keysFirebase.users.nameTable, id));
            Alert.alert('Funcionario excluido com sucesso!')
            return true
        } catch (error: any) {
            Alert.alert('Error', error)
            return false
        }
    }, [])

    const getListDesignation = useCallback(async () => {
        const userRef = collection(db, keysFirebase.designation.nameTable)
        onSnapshot(userRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    ...docs.data()
                }
            }) as IDesignation[]
            setListDesignation(data)
        })
    }, [])

    const createDesignation = useCallback(async (newDesignation: IDesignation) => {

        addDoc(collection(db, keysFirebase.designation.nameTable), newDesignation).then((docRef) => {
            console.log('New Designation', docRef.id)
            return docRef.id
        })
            .catch((error) => {
                Alert.alert("Error adding document: ", error);
            });


    }, [])

    const deleteDesignation = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(db, keysFirebase.designation.nameTable, id));
            Alert.alert('Designação excluida com sucesso!')
            return true
        } catch (error: any) {
            Alert.alert('Error', error)
            return false
        }
    }, [])

    const getListOrders = useCallback(async () => {
        const orderRef = collection(db, keysFirebase.orders.nameTable)
        onSnapshot(orderRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    ...docs.data()
                }
            }) as IOrder[]
            setListOrders(data)
        })
    }, [])

    const createOrder = useCallback(async (newOrder: IOrder) => {

        addDoc(collection(db, keysFirebase.orders.nameTable), newOrder)
            .then((docRef) => {
                console.log('New order', docRef.id)
                return docRef.id
            })
            .catch((error) => {
                Alert.alert("Error adding document: ", error);
            });


    }, [])

    const deleteOrder = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(db, keysFirebase.orders.nameTable, id));
            Alert.alert('Designação excluida com sucesso!')
            return true
        } catch (error: any) {
            Alert.alert('Error', error)
            return false
        }
    }, [])

    const getListClients = useCallback(async () => {
        const userRef = collection(db, keysFirebase.clients.nameTable)
        onSnapshot(userRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    name: docs.data().name,
                    phone: docs.data().phone,
                }
            }) as IClient[]
            setListClients(data)
        })
    }, [])


    const createClient = useCallback(async ({ email, name, phone }: IClient) => {

        addDoc(collection(db, keysFirebase.clients.nameTable), {
            name,
            email,
            phone
        }).then((docRef) => {
            console.log('New Client', docRef.id)
            return docRef.id
        })
            .catch((error) => {
                Alert.alert("Error adding document: ", error);
            });


    }, [])

    const deleteClient = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(db, keysFirebase.clients.nameTable, id));
            Alert.alert('Cliente excluido com sucesso!')
            return true
        } catch (error: any) {
            Alert.alert('Error', error)
            return false
        }
    }, [])

    const getListEquipments = useCallback(async () => {
        const userRef = collection(db, keysFirebase.equipments.nameTable)
        onSnapshot(userRef, (querySnapshot) => {
            const data = querySnapshot.docs.map(docs => {
                return {
                    id: docs.id,
                    name: docs.data().name,
                }
            }) as IEquipment[]
            setListEquipments(data)
        })
    }, [])


    const createEquipment = useCallback(async ({ name }: IEquipment) => {

        addDoc(collection(db, keysFirebase.equipments.nameTable), {
            name,
        }).then((docRef) => {
            console.log('New Equipament', docRef.id)
            return docRef.id
        })
            .catch((error) => {
                Alert.alert("Error adding document: ", error);
            });


    }, [])

    const deleteEquipment = useCallback(async (id: string) => {
        try {
            await deleteDoc(doc(db, keysFirebase.equipments.nameTable, id));
            Alert.alert('Cliente excluido com sucesso!')
            return true
        } catch (error: any) {
            Alert.alert('Error', error)
            return false
        }
    }, [])

    const login = useCallback(async ({ email, password }: ILoginUser) => {
        setLoad(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const q = query(collection(db, keysFirebase.users.nameTable), where(keysFirebase.users.uuidLogin, "==", user.uid));

                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach(async (doc) => {
                        setUserAuth({
                            id: doc.id,
                            name: doc.data().name,
                            photoUser: doc.data().photoUser,
                            role: doc.data().role,
                            uuidLogin: doc.data().uuidLogin,
                        })

                        getListUsers();
                        getListClients();
                        getListOrders();
                        getListEquipments();
                        getListDesignation();

                        await storeData({
                            email,
                            password
                        }, keysStorage.user)
                    });
                });


            })
            .catch((error) => {
                Alert.alert(`Error ${error.code}`, error.message);
            }).finally(() => {
                setLoad(false)
            })
    }, []);

    const logout = async () => {
        setUserAuth(null);
        await clearStoreData();
    };

    useEffect(() => {
        (
            async () => {
                const userStorage = await getData(keysStorage.user);

                if (!!userStorage) {
                    await login(userStorage)
                }

            }
        )()
    }, [])

    return (
        <AppContext.Provider value={{
            load,
            userAuth,
            signed: !!userAuth?.uuidLogin,
            createUser,
            login,
            logout,
            listUsers,
            deleteUser,
            createClient,
            listClients,
            deleteClient,
            listEquipments,
            createEquipment,
            deleteEquipment,
            listDesignation,
            createDesignation,
            deleteDesignation,
            listOrders,
            createOrder,
            deleteOrder
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }