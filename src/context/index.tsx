import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ICreateUser, ILoginUser, IUser } from '../interfaces/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, getDocs, where, onSnapshot } from "firebase/firestore";
import { auth, db, storage } from '../config/firebase';
import { Alert, ImageProps } from 'react-native';
import { ImagePickerResult } from 'expo-image-picker';


interface AppContextData {
    userAuth: IUser;
    signed: boolean;
    listUsers: IUser[];
    createUser: ({ email, password, name, photoUser, role }: ICreateUser) => Promise<void>;
    login: ({ email, password }: ILoginUser) => Promise<void>;
    logout: () => Promise<void>;
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
}

function AppProvider({ children }: any) {
    const [userAuth, setUserAuth] = useState<IUser | null>(null);
    const [listUsers, setListUsers] = useState<IUser[]>([]);

    const storageUploadPhotoUser = useCallback(async (uuidLogin: string, image: string) => {
        const response = await fetch(image)
        const blob = await response.blob()
        const filename = image.substring(image.lastIndexOf('/') + 1)
        const storageRef = ref(storage, 'photoUser' + filename);
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!: ', snapshot);
        });
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
                console.log(docs.data())
                return {
                    name: docs.data().name,
                    photoUser: docs.data().photoUser,
                    role: docs.data().role,
                    uuidLogin: docs.data().uuidLogin,
                }
            }) as IUser[]
            setListUsers(data)
        })
    }, [])

    const createUser = useCallback(async ({ email, password, name, photoUser, role, image }: ICreateUser) => {
        storageUploadPhotoUser
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                storageUploadPhotoUser(userCredential.user.uid, image)
                addDoc(collection(db, keysFirebase.users.nameTable), {
                    name,
                    role,
                    photoUser,
                    uuidLogin: userCredential.user.uid
                }).then((docRef) => {
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

    const login = useCallback(async ({ email, password }: ILoginUser) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User Credential: ', userCredential.user);
                const q = query(collection(db, keysFirebase.users.nameTable), where(keysFirebase.users.uuidLogin, "==", user.uid));

                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach(async (doc) => {
                        console.log(doc.id, " => ", doc.data());
                        setUserAuth({
                            name: doc.data().name,
                            photoUser: doc.data().photoUser,
                            role: doc.data().role,
                            uuidLogin: doc.data().uuidLogin,
                        })
                        if (doc.data().role == 'coordinator') {
                            getListUsers()
                        }
                        await storeData({
                            email,
                            password
                        }, keysStorage.user)
                    });
                });


            })
            .catch((error) => {
                Alert.alert(`Error ${error.code}`, error.message);
            });
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
        <AppContext.Provider value={{ userAuth, signed: !!userAuth?.uuidLogin, createUser, login, logout, listUsers }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }