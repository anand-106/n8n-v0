export interface ParameterSchema {
    type: 'string'| 'number' | 'boolean';
    required: boolean
}

export interface CredentialSchema {
    type: 'username'| 'password' | 'number' | 'boolean';
    required: boolean
}