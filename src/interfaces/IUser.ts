interface IUser {
    name: string;
    photoUser: string;
    role: 'coordinator' | 'employeer' | 'manager';
    uuidLogin?: string;
}

interface ILoginUser {
    email: string;
    password: string;
    uuidLogin?: string;
}

interface ICreateUser extends IUser, ILoginUser {

}

export { ILoginUser, IUser, ICreateUser }
