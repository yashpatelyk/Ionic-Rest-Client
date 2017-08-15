import { OpaqueToken } from '@angular/core';

export let SUPPORTED_METHODS = new OpaqueToken('methods');

export let methods = [
    'GET',
    'POST',
    'PUT',
    'DELETE'
]

