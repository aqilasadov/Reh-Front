import ValueLabel from "../ValueLabel";

export default class Address {


    constructor(id, addressLine, country, status, zipCode) {
        if (id === undefined) id = 0;
        if (addressLine === undefined) addressLine = '';
        if (country === undefined) country = new ValueLabel();
        if (status === undefined) status = 0;
        if (zipCode === undefined) zipCode = '';

        this.id = id;
        this.addressLine = addressLine;
        this.country = country;
        this.status = status;
        this.zipCode = zipCode;
    }

}
