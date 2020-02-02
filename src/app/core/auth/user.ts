import { User as apiUser} from '../../api';

export class User {
    get id() {
        return this.model.id;
    }

    get email() {
        return this.model.email;
    }

    constructor(private model: apiUser) {

    }

    get isAdmin() {
        return this.model.email == "slidenergy@gmail.com";
    }
}
