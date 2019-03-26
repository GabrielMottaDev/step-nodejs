export class Aula {
    id: number;
    nome: string = '';
    concluida: boolean = false;
    
    constructor (values: Object = {}) {
        Object.assign(this, values);
    }
    
}