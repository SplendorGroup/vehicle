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

    const colorIds = colors.map((color) => color.color_id);
    const uniqueColorIds = new Set(colorIds);
    return uniqueColorIds.size === colorIds.length;
  }

  defaultMessage(_args: any) {
    return 'All the colour_ids in the array must be unique.';
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
