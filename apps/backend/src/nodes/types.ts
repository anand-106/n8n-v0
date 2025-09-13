export interface ParameterSchema {
    type: 'string'| 'number' | 'boolean';
    required: boolean;
    label?: string;
    placeholder?:string;
}

export interface CredentialSchema {
    type: 'username'| 'password' | 'number' | 'boolean';
    required: boolean;
    label?: string;
    placeholder?:string;
}