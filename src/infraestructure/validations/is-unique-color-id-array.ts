import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsUniqueColorIdArrayConstraint implements ValidatorConstraintInterface {
  validate(colors: any[]) {
    if (!Array.isArray(colors)) {
      return false;
    }

    const color_ids = colors.map((color) => color.color_id);
    const unique_color_ids = new Set(color_ids);
    return unique_color_ids.size === color_ids.length;
  }

  defaultMessage() {
    return 'All color_ids in the array must be unique.';
  }
}

export function IsUniqueColorIdArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueColorIdArrayConstraint,
    });
  };
}
