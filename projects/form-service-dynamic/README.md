# FormServiceDynamic

[![GitHub top language](https://img.shields.io/github/languages/top/JeanPaulll/lib-form-service#readme.svg)]()
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/JeanPaulll/lib-form-service.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/JeanPaulll/lib-form-service.svg)]()
[![GitHub closed issues](https://img.shields.io/github/issues-closed/JeanPaulll/lib-form-service.svg)]()
[![GitHub contributors](https://img.shields.io/github/contributors/JeanPaulll/lib-form-service.svg)]()
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/JeanPaulll/lib-form-service)
[![npm](https://img.shields.io/npm/v/handle-json-payload.svg)]()
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=agenciacriamais)](http://www.agenciacriamais.com.br)

The `FormServiceDynamic` is a utility library for creating Angular forms with ease. It provides a simple way to generate
reactive forms and apply validations to form controls.

## Installation

You can install the FormServiceDynamic package using npm:

```bash
npm install form-service-dynamic --save
```

## Use in your component

```typescript
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormServiceDynamic} from 'form-service-dynamic'; 

interface Person {
    name: string;
    age: number | null;
    phones: Phone[];
}

interface Phone {
    number: string | null;
    description: string | null;
    types: string[];
}

@Component({
    selector: 'app-your-component',
    templateUrl: './your-component.component.html',
    styleUrls: ['./your-component.component.css']
})
export class YourComponent implements OnInit {
    personForm!: FormGroup;

    constructor(private formService: FormServiceDynamic) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        const person: Person = {
            name: '',
            age: null,
            phones: []
        };
        this.personForm = this.formService.createForm(person);
    }
}
```

## Usage in Service

1. Import the necessary classes and interfaces from the `@angular/forms` module and the `form-service` package:

```typescript
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    ValidatorFn,
    AsyncValidatorFn,
    AbstractControl
} from '@angular/forms';
import {FormServiceDynamic, FieldConfig} from 'form-service-dynamic';
```

2. Create an instance of `FormServiceDynamic` by injecting `FormBuilder`:

```typescript
@Injectable({
    providedIn: 'root'
})
export class YourFormService extends FormServiceDynamic {
    constructor(private formBuilder: FormBuilder) {
        super(formBuilder);
    }

    // Your custom form creation methods can go here
}
```

3. Define your form configuration using the `CampoConfig` interface:

```typescript
interface Phone {
    number: string | null;
    description: string | null;
    types: string[];
}

interface Person {
    name: string | null;
    age: number | null;
    phones: Phone[];
}

const phone: Phone = {
    number: '',
    description: '',
    types: []
};

const person: Person = {
    name: '',
    age: null,
    phones: [phone]
};
```

4. Use the `createForm` method from `FormServiceDynamic` to generate the form:

```typescript
const options: { [field: string]: CampoConfig } = {
    name: {value: '', validations: {required: true}},
    age: {value: null, validations: {required: true, min: 18}},
    phones: {value: [], validations: {required: true}}
};

const personForm: FormGroup = this.createForm(person, options);
```

5. Use the generated form in your component template:

```html

<form [formGroup]="personForm">
    <label for="name">Name:</label>
    <input type="text" id="name" formControlName="name">
    <!-- More form controls for other fields... -->
</form>
```

6. Custom Validators

```typescript
const options: { [field: string]: CampoConfig } = {
    name: {
        value: '',
        customValidation: (control: AbstractControl) => {
            if (control.value && control.value.toLowerCase() === 'admin') {
                return {forbiddenName: true};
            }
            return null;
        }
    },
// Other fields...
};
```

## Help improve

Found a bug or a problem? [Open a new issue](https://github.com/JeanPaulll/lib-form-service/issues)  GitHub.

## Contributing to this project

[GitHub](https://github.com/JeanPaulll/lib-form-service)

## Author

[@JeanPaul](https://twitter.com/jeanpaullx) – jeanpaulwebb@gmail.com

[![GitHub contributors](https://img.shields.io/github/contributors/JeanPaulll/lib-form-service.svg)]()

License
This project is licensed under the MIT License - see the LICENSE file for details.

## **Come and contribute to this library, I'm waiting for you** 😁

### About library for contributors

This library was generated with version 16.2.0.

## Code scaffolding

Run `ng generate component component-name --project form-service-dynamic` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project form-service-dynamic`.
> Note: Don't forget to add `--project form-service-dynamic` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build form-service-dynamic` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build form-service-dynamic`, go to the dist folder `cd dist/form-service-dynamic` and run `npm publish`.

## Obs: All version publications will be made by me, after approval by your MR


## Running unit tests

Run `ng test form-service-dynamic` to execute the unit tests via [Karma](https://karma-runner.github.io).
