import {Injectable} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';

/**
 * @author Jean Paul <jeanpaulwebb@gmail.com>
 * @class FormServiceDynamic
 * @date 17/08/2023
 */
@Injectable({
  providedIn: 'root'
})
export class FormServiceDynamic {
  constructor(private formBuilder: FormBuilder) {
  }

  createForm<T extends Record<string, any>>(
    model: T,
    options?: { [field: string]: FieldConfig }
  ): FormGroup {
    const formGroup: { [key: string]: FormControl } = {};
    for (const field in model) {
      if (model.hasOwnProperty(field)) {
        const fieldConfig = options && options[field] ? options[field] : {};
        formGroup[field] = this.createControl(model[field], fieldConfig);
      }
    }
    return this.formBuilder.group(formGroup);
  }

  private createControl(value: any, config: FieldConfig): FormControl {
    const formControl = this.formBuilder.control(
      {value: value, disabled: !config.enabled},
      this.normalizeValidations(config.validations),
      this.normalizeAsyncValidations(config.asyncValidations)
    );
    if (config.customValidation) {
      formControl.setValidators([config.customValidation]);
    }
    if (config.asyncCustomValidation) {
      formControl.setAsyncValidators([config.asyncCustomValidation]);
    }
    if (config.requiredIf) {
      formControl.setValidators([this.conditionallyRequiredValidator(config)]);
    }
    return formControl;
  }

  private conditionallyRequiredValidator(config: FieldConfig): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.isConditionallyRequired(config)) {
        if (Validators.required(control)) {
          return null;
        } else {
          return {required: true};
        }
      }
      return null;
    };
  }

  private isConditionallyRequired(config: FieldConfig): boolean {
    return config.requiredIf && config.requiredIf.condition ? config.requiredIf.condition() : false;
  }

  private normalizeValidations(validations: { [key: string]: any } | undefined): ValidatorFn | null {
    if (!validations) {
      return null;
    }
    const validatorArray: ValidatorFn[] = [];
    for (const key in validations) {
      if (validations.hasOwnProperty(key) && Validators.hasOwnProperty(key)) {
        validatorArray.push((Validators as any)[key](validations[key]));
      }
    }
    return validatorArray.length > 0 ? Validators.compose(validatorArray) : null;
  }

  private normalizeAsyncValidations(asyncValidations: { [key: string]: any } | undefined): AsyncValidatorFn | null {
    if (!asyncValidations) {
      return null;
    }
    const asyncValidatorArray: AsyncValidatorFn[] = [];
    for (const key in asyncValidations) {
      if (asyncValidations.hasOwnProperty(key) && Validators.hasOwnProperty(key)) {
        asyncValidatorArray.push((Validators as any)[key](asyncValidations[key]));
      }
    }
    return asyncValidatorArray.length > 0 ? Validators.composeAsync(asyncValidatorArray) : null;
  }
}

export interface FieldConfig {
  value?: any;
  validations?: { [key: string]: any };
  asyncValidations?: { [key: string]: any };
  errorMessages?: { [error: string]: string };
  enabled?: boolean;
  customValidation?: ValidatorFn;
  asyncCustomValidation?: AsyncValidatorFn;
  requiredIf?: { condition: () => boolean };
}
