interface IClient {
    id?: string;
    name: string;
    phone: string;
    email: string;
}

interface IDesignation {
    id?: string;
    equipamentId: string;
    userId: string;
}

export { IClient, IDesignation }