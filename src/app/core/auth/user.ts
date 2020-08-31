import { User as apiUser} from '../../api';

export class User {
    get id() {
        return this.model.id;
    }

    get email() {
        return this.model.email;
    }

    get isAdmin() {
        return this.model.isAdmin;
    }

    constructor(private model: apiUser) {

    }
}
